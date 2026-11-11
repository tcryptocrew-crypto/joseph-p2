import { createServerFn } from "@tanstack/react-start";
import { evaluationLeadSchema } from "./evaluation-lead";

export const submitLeadToGoogleSheet = createServerFn({ method: "POST" })
  .validator(evaluationLeadSchema)
  .handler(async ({ data }) => {
    const { appendP2Lead } = await import("./p2-lead-feedback.server");
    await appendP2Lead(data);
    return { success: true };
  });
