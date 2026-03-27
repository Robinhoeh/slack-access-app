import * as admin from "firebase-admin";

interface SlackCommandPayload {
  user_id: string;
  user_name: string;
  text: string;
  response_url: string;
  command: string;
}

export async function handleAccessCommand(
  payload: SlackCommandPayload
): Promise<{ text: string }> {
  const toolId = payload.text.trim().toLowerCase();

  if (!toolId) {
    return { text: "Usage: `/access [tool-name]` — e.g. `/access jira`" };
  }

  const db = admin.firestore();
  const docRef = db.collection("requests").doc();

  await docRef.set({
    id: docRef.id,
    userId: payload.user_id,
    userName: payload.user_name,
    toolId,
    status: "pending",
    requestedAt: admin.firestore.FieldValue.serverTimestamp(),
    approvedBy: null,
    approvedAt: null,
  });

  return {
    text: `Your request for *${toolId}* access has been submitted. Request ID: \`${docRef.id}\``,
  };
}
