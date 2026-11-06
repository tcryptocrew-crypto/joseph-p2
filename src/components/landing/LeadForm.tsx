import { useState } from "react";
import { z } from "zod";
import { ChevronRight, CheckCircle2 } from "lucide-react";

const schema = z.object({
  name: z.string().trim().min(1, "Please enter your full name").max(100),
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: z.string().trim().min(7, "Please enter a valid phone number").max(30),
  address: z.string().trim().min(3, "Please enter your property address").max(200),
  needs: z.string().trim().max(1000).optional(),
});

type Errors = Partial<Record<keyof z.infer<typeof schema>, string>>;

const field =
  "w-full rounded-md border border-border bg-background/60 px-4 py-3 text-base text-foreground placeholder:text-muted-foreground/70 outline-none transition focus:border-primary focus:shadow-[var(--glow-soft)]";

export function LeadForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState(false);

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const r = schema.safeParse(data);
    if (!r.success) {
      const errs: Errors = {};
      r.error.issues.forEach((i) => (errs[i.path[0] as keyof Errors] = i.message));
      setErrors(errs);
      return;
    }
    setErrors({});
    setDone(true);
  }

  if (done)
    return (
      <div className="panel gold-frame rounded-xl p-10 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-primary" />
        <h3 className="mt-4 text-3xl">Thank you.</h3>
        <p className="mt-3 text-muted-foreground">
          Joseph's team will contact you shortly to arrange a conversation.
        </p>
      </div>
    );

  const F = ({ name, label, type = "text", ph }: { name: keyof Errors; label: string; type?: string; ph: string }) => (
    <label className="block">
      <span className="mb-1.5 block text-[15px] font-semibold">{label}</span>
      <input name={name} type={type} placeholder={ph} className={field} />
      {errors[name] && <span className="mt-1 block text-sm text-destructive">{errors[name]}</span>}
    </label>
  );

  return (
    <form onSubmit={onSubmit} noValidate className="panel gold-frame space-y-5 rounded-xl p-6 sm:p-8">
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
          placeholder="Another bedroom, a better layout, more outdoor space, or something else."
          className={field}
        />
      </label>
      <button type="submit" className="btn-gold w-full justify-center px-5! py-2.5! text-sm! sm:text-base! [&>svg]:h-4! [&>svg]:w-4!">
        Request My Free Home Evaluation <ChevronRight className="h-5 w-5" />
      </button>
    </form>
  );
}
