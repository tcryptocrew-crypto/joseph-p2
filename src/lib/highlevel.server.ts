import type { EvaluationLead } from "./evaluation-lead";

const highLevelOrigin = "https://services.leadconnectorhq.com";
const propertyAddressField = "arNAYodrZv4Cv08XWfmV";
const evaluationGoalsField = "0fOh5jbfik5iWW97Qmvs";

function postToHighLevel(path: string, token: string, body: object) {
  return fetch(`${highLevelOrigin}${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Version: "v3",
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
    redirect: "error",
    signal: AbortSignal.timeout(10_000),
  });
}

export async function saveEvaluationLead(lead: EvaluationLead): Promise<{ saved: boolean }> {
  const token = process.env["GHL_PRIVATE_INTEGRATION_TOKEN"]?.trim();
  const locationId = process.env["GHL_LOCATION_ID"]?.trim();
  const workflowId = process.env["GHL_WORKFLOW_ID"]?.trim();

  if (!token || !locationId || !workflowId) {
    console.error("[HighLevel] Evaluation form configuration is incomplete.");
    return { saved: false };
  }

  const customFields = [{ id: propertyAddressField, fieldValue: lead.address }];
  if (lead.needs) customFields.push({ id: evaluationGoalsField, fieldValue: lead.needs });

  let contactId: string;
  try {
    const response = await postToHighLevel("/contacts/upsert", token, {
      locationId,
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      customFields,
      source: "Stay-or-Move Evaluation Landing Page",
    });
    if (!response.ok) {
      console.error(`[HighLevel] Contact save rejected (HTTP ${response.status}).`);
      return { saved: false };
    }

    const result = (await response.json()) as { contact?: { id?: unknown } };
    if (typeof result.contact?.id !== "string" || !result.contact.id) {
      console.error("[HighLevel] Contact save response did not contain a contact ID.");
      return { saved: false };
    }
    contactId = result.contact.id;
  } catch {
    console.error("[HighLevel] Contact save request could not be confirmed.");
    return { saved: false };
  }

  try {
    const response = await postToHighLevel(
      `/contacts/${encodeURIComponent(contactId)}/workflow/${encodeURIComponent(workflowId)}`,
      token,
      {},
    );
    const result = response.ok
      ? ((await response.json()) as { succeeded?: boolean; succeded?: boolean })
      : null;
    if ((result?.succeeded ?? result?.succeded) !== true) {
      console.error(
        `[HighLevel] Saved contact ${contactId}; workflow enrollment was not confirmed (HTTP ${response.status}).`,
      );
    }
  } catch {
    console.error(`[HighLevel] Saved contact ${contactId}; workflow enrollment was not confirmed.`);
  }

  // A follow-up failure must not ask the visitor to resubmit a saved lead.
  return { saved: true };
}
