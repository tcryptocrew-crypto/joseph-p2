import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { LeadForm, CustomLeadForm } from "@/components/landing/LeadForm";
import { submitLeadToGoogleSheet } from "@/lib/submit-lead";

vi.mock("@/lib/submit-lead", () => ({ submitLeadToGoogleSheet: vi.fn() }));

const saveLead = vi.mocked(submitLeadToGoogleSheet);
const request = vi.fn<typeof fetch>();

beforeEach(() => {
  saveLead.mockReset();
  request.mockReset();
  request.mockResolvedValue(Response.json({ success: true }));
  vi.stubGlobal("fetch", request);
  vi.stubEnv("VITE_GHL_WEBHOOK_URL", "https://example.test/highlevel");
  vi.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  cleanup();
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

function submitForm() {
  render(<CustomLeadForm />);
  for (const [label, value] of [
    ["Full name", "P2 LIVE TEST"],
    ["Email address", "p2@example.test"],
    ["Phone number", "+12015550123"],
    ["Property address", "123 Test Street"],
  ]) {
    fireEvent.change(screen.getByLabelText(label!), { target: { value } });
  }
  fireEvent.click(screen.getByRole("button", { name: "Request My Free Home Evaluation" }));
}

describe("P2 live form Sheet confirmation", () => {
  it("renders the embedded GoHighLevel evaluation form iframe", () => {
    render(<LeadForm />);
    const iframe = screen.getByTitle("Joseph | Free Home Evaluation");
    expect(iframe).toBeInTheDocument();
    expect(iframe).toHaveAttribute(
      "src",
      "https://api.leadconnectorhq.com/widget/form/068Tat3aDkIti56tSHoO",
    );
  });

  it("submits once and confirms success after the Sheet save and existing GHL webhook", async () => {
    saveLead.mockResolvedValueOnce({ success: true });
    submitForm();
    expect(await screen.findByText("Thank you.")).toBeInTheDocument();
    expect(saveLead).toHaveBeenCalledTimes(1);
    expect(request).toHaveBeenCalledTimes(1);
    expect(request).toHaveBeenCalledWith("https://example.test/highlevel", expect.any(Object));
  });

  it("runs the GHL webhook but shows an error if the Sheet append fails", async () => {
    saveLead.mockRejectedValueOnce(new Error("Sheet write failed"));
    submitForm();
    await waitFor(() => expect(screen.getByText(/There was a problem submitting your request/)).toBeInTheDocument());
    expect(request).toHaveBeenCalledTimes(1);
    expect(saveLead).toHaveBeenCalledTimes(1);
    expect(screen.queryByText("Thank you.")).not.toBeInTheDocument();
  });
});
