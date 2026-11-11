import type { EvaluationLead } from "./evaluation-lead";

export async function appendP2Lead(lead: EvaluationLead) {
  const webhook = process.env["GOOGLE_SHEET_WEBHOOK_URL"]?.trim();
  const secret = process.env["GOOGLE_SHEET_WEBHOOK_SECRET"]?.trim();
  if (!webhook || !secret) throw new Error("P2 Lead Feedback webhook is not configured");

  const url = new URL(webhook);
  if (url.origin !== "https://script.google.com" || !/^\/macros\/s\/[\w-]+\/exec$/.test(url.pathname)) {
    throw new Error("P2 Lead Feedback webhook must be an Apps Script deployment URL");
  }

  const response = await fetch(url, {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({
      fullName: lead.name,
      email: lead.email,
      phoneNumber: lead.phone,
      propertyAddress: lead.address,
      whatTheyAreLookingFor: lead.needs ?? "",
      landingPageSource: "VSL 2",
      webhookSecret: secret,
    }),
    redirect: "follow",
    signal: AbortSignal.timeout(15_000),
  });
  if (!response.ok) throw new Error(`P2 Lead Feedback webhook returned HTTP ${response.status}`);

  const result = await response.json();
  if (result?.saved !== true) {
    throw new Error("P2 lead was not confirmed in the Lead Feedback tab");
  }
}
