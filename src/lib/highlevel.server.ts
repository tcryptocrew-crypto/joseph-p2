import type { EvaluationLead } from "./evaluation-lead";

const highLevelOrigin = "https://services.leadconnectorhq.com";
const propertyAddressField = "arNAYodrZv4Cv08XWfmV";
const evaluationGoalsField = "0fOh5jbfik5iWW97Qmvs";
const defaultLocationId = "vrDGBhvc95fD3XQ4JGzW";
const defaultFormId = "068Tat3aDkIti56tSHoO";

function postToHighLevel(path: string, token: string, body: object) {
  return fetch(`${highLevelOrigin}${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      Version: "2021-07-28",
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
    redirect: "error",
    signal: AbortSignal.timeout(10_000),
  });
}

export async function saveEvaluationLead(
  lead: EvaluationLead,
): Promise<{ saved: boolean; contactId?: string }> {
  const token =
    process.env["GHL_PRIVATE_INTEGRATION_TOKEN"]?.trim() ||
    process.env["VITE_GHL_PRIVATE_INTEGRATION_TOKEN"]?.trim();

  const locationId =
    process.env["GHL_LOCATION_ID"]?.trim() ||
    process.env["VITE_GHL_LOCATION_ID"]?.trim() ||
    defaultLocationId;

  const formId =
    process.env["GHL_FORM_ID"]?.trim() ||
    process.env["VITE_GHL_FORM_ID"]?.trim() ||
    defaultFormId;

  const workflowId =
    process.env["GHL_WORKFLOW_ID"]?.trim() ||
    process.env["VITE_GHL_WORKFLOW_ID"]?.trim();

  const webhookUrl =
    process.env["GHL_WEBHOOK_URL"]?.trim() ||
    process.env["VITE_GHL_WEBHOOK_URL"]?.trim();

  if (!token || !locationId) {
    console.error("[HighLevel] Evaluation form configuration is incomplete: missing GHL token or location ID.");
    return { saved: false };
  }

  const tags = [
    "website-lead",
    "sell-and-buy-evaluation",
    "vsl-2",
    formId,
  ];

  // 1. Optional Inbound Webhook dispatch (if configured in GHL workflow)
  if (webhookUrl) {
    try {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: lead.name,
          email: lead.email,
          phone: lead.phone,
          address: lead.address,
          needs: lead.needs || "",
          source: "Joseph | Free Home Evaluation",
          landingPageSource: lead.landingPageSource || "VSL 2",
          locationId,
          formId,
          tags,
          submittedAt: new Date().toISOString(),
        }),
        signal: AbortSignal.timeout(6_000),
      });
    } catch (whErr) {
      console.warn("[HighLevel] Webhook dispatch warning:", whErr);
    }
  }

  // 2. HighLevel Contact Upsert
  const customFields: Array<{ id: string; value: string; fieldValue: string }> = [
    { id: propertyAddressField, value: lead.address, fieldValue: lead.address },
  ];
  if (lead.needs) {
    customFields.push({ id: evaluationGoalsField, value: lead.needs, fieldValue: lead.needs });
  }

  let contactId: string;
  try {
    const response = await postToHighLevel("/contacts/upsert", token, {
      locationId,
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      address1: lead.address,
      source: "Joseph | Free Home Evaluation",
      tags,
      customFields,
    });

    if (!response.ok) {
      const errBody = await response.text();
      console.error(`[HighLevel] Contact save rejected (HTTP ${response.status}):`, errBody);
      return { saved: false };
    }

    const result = (await response.json()) as { contact?: { id?: unknown } };
    if (typeof result.contact?.id !== "string" || !result.contact.id) {
      console.error("[HighLevel] Contact save response did not contain a contact ID.");
      return { saved: false };
    }
    contactId = result.contact.id;
  } catch (err) {
    console.error("[HighLevel] Contact save request could not be confirmed:", err);
    return { saved: false };
  }

  // 3. Optional Direct Workflow Enrollment (if workflowId is provided)
  if (workflowId) {
    try {
      const response = await postToHighLevel(
        `/contacts/${encodeURIComponent(contactId)}/workflow/${encodeURIComponent(workflowId)}`,
        token,
        {},
      );
      if (!response.ok) {
        console.warn(
          `[HighLevel] Saved contact ${contactId}; workflow enrollment returned HTTP ${response.status}.`,
        );
      }
    } catch (wfErr) {
      console.warn(`[HighLevel] Saved contact ${contactId}; workflow enrollment request failed:`, wfErr);
    }
  }

  return { saved: true, contactId };
}
