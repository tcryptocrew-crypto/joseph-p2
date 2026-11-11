import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { appendP2Lead } from "@/lib/p2-lead-feedback.server";

const lead = {
  name: "P2 LIVE TEST",
  email: "p2@example.test",
  phone: "+12015550123",
  address: "123 Test Street",
  needs: "Test submission",
};

const request = vi.fn<typeof fetch>();

beforeEach(() => {
  request.mockReset();
  vi.stubGlobal("fetch", request);
  vi.stubEnv("GOOGLE_SHEET_WEBHOOK_URL", "https://script.google.com/macros/s/test/exec");
  vi.stubEnv("GOOGLE_SHEET_WEBHOOK_SECRET", "test-key");
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

describe("P2 Lead Feedback delivery", () => {
  it("sends one request using the existing receiver's secret and lead field names", async () => {
    request.mockResolvedValueOnce(Response.json({ saved: true }));
    await appendP2Lead(lead);

    expect(request).toHaveBeenCalledTimes(1);
    const [url, options] = request.mock.calls[0]!;
    expect(String(url)).toBe("https://script.google.com/macros/s/test/exec");
    expect(options?.method).toBe("POST");
    expect(options?.redirect).toBe("follow");
    expect(options?.signal).toBeInstanceOf(AbortSignal);
    expect(JSON.parse(String(options?.body))).toEqual({
      fullName: lead.name,
      email: lead.email,
      phoneNumber: lead.phone,
      propertyAddress: lead.address,
      whatTheyAreLookingFor: lead.needs,
      landingPageSource: "VSL 2",
      webhookSecret: "test-key",
    });
  });

  it("requires the server secret before sending a request", async () => {
    vi.stubEnv("GOOGLE_SHEET_WEBHOOK_SECRET", "");
    await expect(appendP2Lead(lead)).rejects.toThrow("not configured");
    expect(request).not.toHaveBeenCalled();
  });

  it("rejects a spreadsheet editor link as a submission endpoint", async () => {
    vi.stubEnv("GOOGLE_SHEET_WEBHOOK_URL", "https://docs.google.com/spreadsheets/d/test/edit");
    await expect(appendP2Lead(lead)).rejects.toThrow("Apps Script deployment URL");
    expect(request).not.toHaveBeenCalled();
  });

  it.each([{ saved: false }, { saved: "true" }, {}])("requires a confirmed Sheet write", async (response) => {
    request.mockResolvedValueOnce(Response.json(response));
    await expect(appendP2Lead(lead)).rejects.toThrow("not confirmed in the Lead Feedback tab");
  });

  it("leaves optional needs empty and rejects HTTP errors", async () => {
    request.mockResolvedValueOnce(new Response(null, { status: 503 }));
    const { needs, ...withoutNeeds } = lead;
    await expect(appendP2Lead(withoutNeeds)).rejects.toThrow("HTTP 503");
    expect(JSON.parse(String(request.mock.calls[0]?.[1]?.body)).whatTheyAreLookingFor).toBe("");
  });
});
