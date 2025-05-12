import { FORM, H2, INPUT, LABEL, P, SPAN } from "@fartlabs/htx";
import { Section, TextGradient } from "@fartlabs/css";

export function WaitlistSection() {
  return (
    <Section id="waitlist">
      <H2>
        <TextGradient>Claim Your Free FartLabs Computer Today!</TextGradient>
      </H2>

      <P>
        Join the waitlist to be among the first to experience the future of
        computing.
      </P>

      <WaitlistForm />
    </Section>
  );
}

export function WaitlistForm() {
  return (
    <FORM class="waitlist-form">
      <LABEL
        for="email"
        style="color: var(--fart-primary); font-weight: bold;"
      >
        Email address<SPAN style="color: red">*</SPAN>
      </LABEL>
      <INPUT
        id="email"
        name="email"
        type="email"
        placeholder="you@fartlabs.org"
        required="true"
      />
      <INPUT
        type="submit"
        value="Claim Your Computer"
        class="fart-cta"
        style="background: #4a8c56; color: var(--fart-white)"
      />
    </FORM>
  );
}

{
  /* <form
  onSubmit={handleSubmit}
  className="space-y-4 rounded-lg border border-[#1a3a1a] bg-[#0a1f0a] p-6"
>
  <div className="space-y-2 text-left">
    <Label htmlFor="email">
      Email address <span className="text-red-500">*</span>
    </Label>
    <Input
      id="email"
      name="email"
      type="email"
      placeholder="you@example.com"
      required
      value={formState.email}
      onChange={handleChange}
      className="border border-[#1a3a1a] bg-[#0f2a0f] text-[#a3ffb0] placeholder:text-[#a3ffb0]/50 focus:border-[#4a8c56] focus:ring-[#4a8c56]"
    />
  </div>

  {isEmailRegistered && (
    <div className="rounded bg-yellow-900/20 p-3 text-sm text-yellow-400">
      Thank you! This email is already registered.
      <br />
      Join our{" "}
      <a href="https://go.fart.tools/chat" className="underline">
        community on Discord
      </a>
      .
    </div>
  )}

  {error && (
    <div className="rounded bg-red-900/20 p-3 text-sm text-red-400">
      {error}
    </div>
  )}

  <Button
    type="submit"
    disabled={isSubmitting}
    className="w-full bg-[#4a8c56] text-white hover:bg-[#5aa366]"
  >
    {isSubmitting
      ? (
        <>
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          Processing...
        </>
      )
      : (
        "Claim Your Computer"
      )}
  </Button>
</form>; */
}
