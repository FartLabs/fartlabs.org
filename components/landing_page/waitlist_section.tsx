import {
  DIV,
  FORM,
  H2,
  INPUT,
  LABEL,
  P,
  SCRIPT,
  SLOT,
  SPAN,
  TEMPLATE,
} from "@fartlabs/htx";
import { Link, Section, TextGradient } from "@fartlabs/css";

const script = `document.addEventListener("DOMContentLoaded", () => {
  // Set up custom elements for the waitlist form.
${
  ["waitlist-form"].map(
    (component) =>
      `  customElements.define(
    "${component}",
    class extends HTMLElement {
      constructor() {
        super();
        document.body.appendChild(document.getElementById("${component}-template").cloneNode(true));
      }
    }
  );`,
  ).join("\n\n")
}});

async function submitWaitlistForm(event) {
  event.preventDefault();

  const formContainer = document.querySelector(".waitlist-form-container");
  formContainer.innerHTML = \`<waitlist-form>${(
  <WaitlistFormButton state="loading" />
)}</waitlist-form>\`;

  const token = await new Promise((resolve, reject) => {
    // https://developers.google.com/recaptcha/docs/v3#programmatically_invoke_the_challenge
    grecaptcha.ready(() => {
      console.log("grecaptcha ready");
      grecaptcha.execute(
        // https://github.com/FartLabs/cpu.fartlabs.org/blob/6d1fbcc48efa186db592afb8b207b0ebc06132b4/lib/recaptcha.ts
        "6LfJUC8rAAAAALwhkiZR_6YxdJGF9Q42jOkAXfa1",
        { action: "submit" },
      ).then(resolve, reject);
    });
  });

  const form = document.querySelector(".waitlist-form");
  const formData = new FormData(form);
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
    formContainer.innerHTML = \`<waitlist-form>${(
  <WaitlistFormMessage state="error" />
)}</waitlist-form>\`;
    return;
  }

  formContainer.innerHTML = \`<waitlist-form>${(
  <WaitlistFormMessage state="success" />
)}</waitlist-form>\`;
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

      <DIV class="waitlist-form-container">
        <WaitlistForm />
      </DIV>

      <WaitlistFormTemplate />
    </Section>
  );
}

function WaitlistFormTemplate() {
  return (
    <TEMPLATE id="waitlist-form-template">
      <WaitlistForm />
    </TEMPLATE>
  );
}

function WaitlistForm() {
  return (
    <FORM class="waitlist-form">
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
      <SLOT name="message" />
      <SLOT name="submit">
        <WaitlistFormButton />
      </SLOT>
    </FORM>
  );
}

function WaitlistFormButton(props: { state?: "loading" }) {
  return (
    <INPUT
      id="waitlist-form-submit"
      slot="submit"
      type="submit"
      value={props.state === "loading" ? "Loading..." : "Claim Your Computer"}
      disabled={String(props.state === "loading")}
      class="fart-cta"
      style="background: #4a8c56; color: var(--fart-white)"
      // TODO: Fix bug where event does not fire when button is disabled.
      onclick="submitWaitlistForm(event)"
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
      return (
        <DIV class="waitlist-success" slot="message">
          <P style="color: #4a8c56">
            Thank you for joining the waitlist! We will notify you when we are
            ready to launch.
          </P>
          <P>
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
