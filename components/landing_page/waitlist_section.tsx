import {
  BR,
  DIV,
  FORM,
  H2,
  INPUT,
  LABEL,
  P,
  SCRIPT,
  SPAN,
} from "@fartlabs/htx";
import { Link, Section, TextGradient } from "@fartlabs/css";
import { BorderTube } from "#/components/border-tube.tsx";

const script = `async function submitWaitlistForm(event) {
  event.preventDefault();
  event.stopPropagation();

  const formContainer = document.querySelector(".waitlist-form-container");
  formContainer.innerHTML = \`${(
  <WaitlistForm
    button={<WaitlistFormButton state="loading" />}
  />
)}\`;

  const token = await new Promise((resolve, reject) => {
    // https://developers.google.com/recaptcha/docs/v3#programmatically_invoke_the_challenge
    grecaptcha.ready(() => {
      grecaptcha.execute(
        // https://github.com/FartLabs/cpu.fartlabs.org/blob/6d1fbcc48efa186db592afb8b207b0ebc06132b4/lib/recaptcha.ts
        "6LfJUC8rAAAAALwhkiZR_6YxdJGF9Q42jOkAXfa1",
        { action: "submit" },
      ).then(resolve, reject);
    });
  });

  const formData = new FormData(event.target);
  const email = formData.get("email");
  const response = await fetch("/waitlist", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, token }),
  });
  if (!response.ok) {
    // TODO: Handle error email already registered.
    // https://github.com/FartLabs/cpu.fartlabs.org/blob/6d1fbcc48efa186db592afb8b207b0ebc06132b4/components/sign-up-form.tsx#L58
    const { error } = await response.json();
    if (error === "Email already registered") {
      formContainer.innerHTML = \`${(
  <WaitlistForm
    message={<WaitlistFormMessage state="already-registered" />}
  />
)}\`;
      return;
    }

    formContainer.innerHTML = \`${(
  <WaitlistForm
    message={<WaitlistFormMessage state="error" />}
  />
)}\`;
    return;
  }

  formContainer.innerHTML = \`${(
  <WaitlistForm
    message={<WaitlistFormMessage state="success" />}
  />
)}\`;
}`;

export function WaitlistSection() {
  return (
    <Section id="waitlist">
      <SCRIPT>{script}</SCRIPT>

      <H2>
        <TextGradient>Claim your free FartLabs Computer today!</TextGradient>
      </H2>

      <P>
        Join the waitlist to be among the first to experience the future of
        computing.
      </P>

      <BorderTube glow color="green" class="waitlist-form-container">
        <WaitlistForm />
      </BorderTube>
    </Section>
  );
}

function WaitlistForm(props: { message?: string; button?: string }) {
  // TODO: Support disabled JavaScript.
  return (
    // @ts-expect-error onsubmit
    <FORM class="waitlist-form" onsubmit="submitWaitlistForm(event)">
      <LABEL
        for="email"
        style="color: var(--fart-primary); font-weight: bold"
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
      {props.message ?? ""}
      {props.button ?? <WaitlistFormButton />}
    </FORM>
  );
}

function WaitlistFormButton(props: { state?: "loading" }) {
  return (
    <INPUT
      id="waitlist-form-submit"
      slot="submit-button"
      type="submit"
      class="fart-cta"
      style="background: #4a8c56; color: var(--fart-white)"
      {...(props.state === "loading"
        ? { value: "Loading...", disabled: "true" }
        : { value: "Claim your free Computer" })}
    />
  );
}

function WaitlistFormMessage(
  props: { state: "already-registered" | "error" | "success" },
) {
  switch (props?.state) {
    case "already-registered": {
      return (
        <DIV class="waitlist-warning" slot="message">
          <P>
            Thank you! This email is already registered. Join our{" "}
            <Link href="https://go.fart.tools/chat">community on Discord</Link>.
          </P>
        </DIV>
      );
    }

    case "error": {
      return (
        <DIV class="waitlist-error" slot="message">
          <P style="color: red">An error occurred. Please try again later.</P>
        </DIV>
      );
    }

    case "success": {
      // TODO: Add confetti!
      return (
        <DIV class="waitlist-success" slot="message">
          <Check />
          <P>
            Thank you for joining the waitlist! We will notify you when we are
            ready to launch.<BR />
            In the meantime, join our{" "}
            <Link href="https://go.fart.tools/chat">community on Discord</Link>
            {" "}
            to stay updated!
          </P>
        </DIV>
      );
    }

    default: {
      throw new Error("Invalid waitlist message state");
    }
  }
}

function Check() {
  // https://github.com/FartLabs/cpu.fartlabs.org/blob/6d1fbcc48efa186db592afb8b207b0ebc06132b4/components/sign-up-form.tsx#L84C13-L97C19
  return `<div style="display: flex; justify-content: center; align-items: center; margin: 0 auto; border-radius: 50%; width: 3rem; height: 3rem; background: #4a8c56">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 6 9 17l-5-5"></path>
  </svg>
</div>`;
}
