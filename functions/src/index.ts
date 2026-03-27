import { onRequest } from "firebase-functions/v2/https";
import * as admin from "firebase-admin";
import { verifySlackSignature } from "./slack/verify";
import { handleAccessCommand } from "./slack/access-command";

admin.initializeApp();

export const slackAccessCommand = onRequest(async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).send("Method Not Allowed");
    return;
  }

  const signingSecret = process.env.SLACK_SIGNING_SECRET;
  if (!signingSecret) {
    console.error("SLACK_SIGNING_SECRET not set");
    res.status(500).send("Server misconfigured");
    return;
  }

  const timestamp = req.headers["x-slack-request-timestamp"] as string;
  const signature = req.headers["x-slack-signature"] as string;

  if (!timestamp || !signature) {
    res.status(400).send("Missing Slack headers");
    return;
  }

  const isValid = verifySlackSignature(
    signingSecret,
    timestamp,
    req.rawBody,
    signature
  );

  if (!isValid) {
    res.status(401).send("Invalid signature");
    return;
  }

  try {
    const result = await handleAccessCommand(req.body);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error handling access command:", error);
    res.status(500).json({ text: "Something went wrong. Please try again." });
  }
});
