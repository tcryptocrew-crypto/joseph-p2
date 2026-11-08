import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { saveToGoogleSheet } from "@/lib/google-sheet.server";

const lead = {
  name: "Usman Qadir",
  email: "usman@example.com",
  phone: "+12015550199",
  address: "123 Main St, Alpine, NJ",
  needs: "Addition of 2 master bedrooms",
};

const request = vi.fn<typeof fetch>();

beforeEach(() => {
  request.mockReset();
  vi.stubGlobal("fetch", request);
  vi.stubEnv("GOOGLE_SHEET_WEBHOOK_URL", "https://sheetdb.io/api/v1/test-id");
  vi.spyOn(console, "error").mockImplementation(() => {});
  vi.spyOn(console, "warn").mockImplementation(() => {});
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

describe("Google Sheet evaluation lead submission", () => {
  it("formats payload correctly for SheetDB with exact column names and default VSL 1 source", async () => {
    request.mockResolvedValueOnce(Response.json({ created: 1 }, { status: 201 }));

    const res = await saveToGoogleSheet(lead);
    expect(res).toEqual({ saved: true });

    expect(request).toHaveBeenCalledTimes(1);
    expect(request).toHaveBeenCalledWith(
      "https://sheetdb.io/api/v1/test-id",
      expect.objectContaining({
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }),
    );

    const sentPayload = JSON.parse(String(request.mock.calls[0]?.[1]?.body));
    expect(sentPayload.data).toBeDefined();
    expect(sentPayload.data[0]).toMatchObject({
      "Full Name": "Usman Qadir",
      Email: "usman@example.com",
      "Phone Number": "+12015550199",
      "Property Address": "123 Main St, Alpine, NJ",
      "What They're Looking For": "Addition of 2 master bedrooms",
      "Landing Page Source": "VSL 1",
    });
    expect(sentPayload.data[0]["Date Submitted"]).toBeDefined();
  });

  it("handles missing webhook URL gracefully", async () => {
    vi.stubEnv("GOOGLE_SHEET_WEBHOOK_URL", "");
    const res = await saveToGoogleSheet(lead);
    expect(res.saved).toBe(false);
    expect(request).not.toHaveBeenCalled();
  });

  it("handles webhook HTTP error status", async () => {
    request.mockResolvedValueOnce(new Response(null, { status: 500 }));
    const res = await saveToGoogleSheet(lead);
    expect(res.saved).toBe(false);
  });
});
