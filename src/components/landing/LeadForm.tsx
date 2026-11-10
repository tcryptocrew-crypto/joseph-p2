import { useState } from "react";
import { z } from "zod";
import { ChevronRight, CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { submitLeadToGoogleSheet } from "@/lib/submit-lead";

const schema = z.object({
  name: z.string().trim().min(1, "Please enter your full name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().min(7, "Please enter a valid phone number").max(30),
  address: z.string().trim().min(3, "Please enter your property address").max(200),
  needs: z.string().trim().max(1000).optional(),
});

type FormData = z.infer<typeof schema>;
type Errors = Partial<Record<keyof FormData, string>>;

const field =
  "w-full rounded-md border border-input bg-white px-4 py-3 text-base text-foreground placeholder:text-muted-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/35";

export function LeadForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitError(null);

    const rawData = Object.fromEntries(new FormData(e.currentTarget));
    const r = schema.safeParse(rawData);
    if (!r.success) {
      const errs: Errors = {};
      r.error.issues.forEach((i) => (errs[i.path[0] as keyof Errors] = i.message));
      setErrors(errs);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    const validData = r.data;
    const ghlWebhookUrl = (import.meta.env.VITE_GHL_WEBHOOK_URL as string | undefined)?.trim();
    const sheetWebhookUrl =
      (import.meta.env.VITE_GOOGLE_SHEET_WEBHOOK_URL as string | undefined)?.trim() ||
      "https://script.google.com/macros/s/AKfycby47KQUMYOTJHLkXo3aH6tylLbmM4Fw2izJCclGnjQ7fJzyiYhCeHPXRLysvhZtatxI/exec";

    // Google Sheet exact payload per requirements:
    const googleSheetPayload = {
      dateSubmitted: new Date().toLocaleString("en-US", { timeZone: "America/New_York" }),
      fullName: validData.name,
      email: validData.email,
      phoneNumber: validData.phone,
      propertyAddress: validData.address,
      whatTheyAreLookingFor: validData.needs || "",
      landingPageSource: "VSL 2",
    };

    // GoHighLevel standardized payload
    const payload = {
      name: validData.name,
      first_name: validData.name,
      email: validData.email,
      phone: validData.phone,
      address: validData.address,
      property_address: validData.address,
      arNAYodrZv4Cv08XWfmV: validData.address,
      needs: validData.needs || "",
      accomplish_plan: validData.needs || "",
      "0fOh5jbfik5iWW97Qmvs": validData.needs || "",
      terms_and_conditions: "terms_and_conditions",
      formId: "068Tat3aDkIti56tSHoO",
      locationId: "F5UyRGb9N62uJFgPLaxw",
      formName: "Joseph | Free Evaluation",
      submittedAt: new Date().toISOString(),
      source: "Sell to Buy Free Evaluation Landing Page",
      landingPageSource: "VSL 2",
    };

    try {
      // 1. Submit to Google Sheet via Server Function (avoids CORS) with direct client fallback
      try {
        await submitLeadToGoogleSheet({ data: validData });
      } catch (serverErr) {
        console.warn("[Google Sheet] Server function error, falling back to direct fetch:", serverErr);
        await fetch(sheetWebhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "text/plain;charset=utf-8",
          },
          body: JSON.stringify(googleSheetPayload),
          redirect: "follow",
          mode: "no-cors",
        });
      }

      // 2. Submit to GoHighLevel if webhook URL is provided
      if (ghlWebhookUrl) {
        try {
          await fetch(ghlWebhookUrl, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          });
        } catch (ghlErr) {
          console.warn("[GHL] Webhook failed:", ghlErr);
        }
      }

      setDone(true);
    } catch (err: unknown) {
      console.error("[Lead Form Error]:", err);
      setSubmitError(
        "There was a problem submitting your request. Please try again or contact Joseph directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (done)
    return (
      <div className="panel rounded-xl p-10 text-center animate-in fade-in duration-300">
        <CheckCircle2 className="mx-auto h-12 w-12 text-primary" />
        <h3 className="mt-4 text-3xl">Thank you.</h3>
        <p className="mt-3 text-muted-foreground">
          Joseph's team will contact you shortly to arrange a conversation.
        </p>
      </div>
    );

  const F = ({
    name,
    label,
    type = "text",
    ph,
  }: {
    name: keyof Errors;
    label: string;
    type?: string;
    ph: string;
  }) => (
    <label className="block">
      <span className="mb-1.5 block text-[15px] font-semibold">{label}</span>
      <input
        name={name}
        type={type}
        placeholder={ph}
        disabled={isSubmitting}
        className={field}
      />
      {errors[name] && (
        <span className="mt-1 block text-sm text-destructive">{errors[name]}</span>
      )}
    </label>
  );

  return (
    <form onSubmit={onSubmit} noValidate className="panel space-y-5 rounded-2xl p-4 sm:p-8">
      <div className="grid gap-5 sm:grid-cols-2">
        {F({ name: "name", label: "Full name", ph: "Enter your full name" })}
        {F({ name: "email", label: "Email address", type: "email", ph: "Enter your email address" })}
        {F({ name: "phone", label: "Phone number", type: "tel", ph: "Enter your phone number" })}
        {F({ name: "address", label: "Property address", ph: "Enter your property address" })}
      </div>

      <label className="block">
        <span className="mb-1.5 block text-[15px] font-semibold">
          What would your next home need that your current home is missing?{" "}
          <span className="font-normal italic text-muted-foreground">Optional</span>
        </span>
        <textarea
          name="needs"
          rows={3}
          disabled={isSubmitting}
          placeholder="Another bedroom, a better layout, more outdoor space, or something else."
          className={field}
        />
      </label>

      {submitError && (
        <div className="flex items-center gap-2 rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">
          <AlertCircle className="h-4 w-4 shrink-0" />
          <span>{submitError}</span>
        </div>
      )}

      <div className="space-y-3 text-center">
        <button
          type="submit"
          disabled={isSubmitting}
          className="evaluation-button evaluation-submit cursor-pointer disabled:cursor-not-allowed disabled:opacity-75"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Submitting...
            </>
          ) : (
            <>
              Request My Free Home Evaluation <ChevronRight className="size-4 max-[359px]:hidden" aria-hidden="true" />
            </>
          )}
        </button>

        <p className="text-[11px] text-muted-foreground text-center leading-relaxed">
          By providing your phone number, you agree to receive communications regarding your property evaluation.
        </p>
      </div>
    </form>
  );
}
