import {
  BR,
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
  const form = document.querySelector(".waitlist-form");
  const formContainer = document.querySelector(".waitlist-form-container");

  // Set up custom elements for waitlist states.
${
  ["waitlist-error", "waitlist-warning", "waitlist-success", "waitlist-loading"]
    .map(
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
}

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    formContainer.innerHTML = "<waitlist-loading></waitlist-loading>";

    const formData = new FormData(form);
    const email = formData.get("email");
    const response = await fetch("/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    if (!response.ok) {
      // TODO: Handle error email already registered.
      // https://github.com/FartLabs/cpu.fartlabs.org/blob/6d1fbcc48efa186db592afb8b207b0ebc06132b4/components/sign-up-form.tsx#L58
      const { error } = await response.json();
      formContainer.innerHTML = \`<waitlist-error>\${error}</waitlist-error>\`;
      return;
    }

    formContainer.innerHTML = "<waitlist-success></waitlist-success>";
  });
});`;

export function WaitlistSection() {
  return (
    <Section id="waitlist">
      <SCRIPT>{script}</SCRIPT>

      <H2>
        <TextGradient>Claim Your Free FartLabs Computer Today!</TextGradient>
      </H2>

      <P>
        Join the waitlist to be among the first to experience the future of
        computing.
      </P>

      <DIV class="waitlist-form-container">
        <WaitlistForm />
      </DIV>

      <WaitlistErrorTemplate />
      <WaitlistWarningTemplate />
      <WaitlistSuccessTemplate />
      <WaitlistLoadingTemplate />
    </Section>
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
      <INPUT
        type="submit"
        value="Claim Your Computer"
        class="fart-cta"
        style="background: #4a8c56; color: var(--fart-white)"
      />
    </FORM>
  );
}

function WaitlistErrorTemplate() {
  return (
    <TEMPLATE id="waitlist-error-template">
      <DIV class="waitlist-error">
        <SLOT name="content">
          <P style="color: red">An error occurred. Please try again later.</P>
        </SLOT>
      </DIV>
    </TEMPLATE>
  );
}

function WaitlistWarningTemplate() {
  return (
    <TEMPLATE id="waitlist-warning-template">
      <DIV class="waitlist-warning">
        <SLOT name="content">
          <P>
            Thank you! This email is already registered. Join our{" "}
            <Link href="https://go.fart.tools/chat">community on Discord</Link>.
          </P>
        </SLOT>
      </DIV>
    </TEMPLATE>
  );
}

function WaitlistSuccessTemplate() {
  return (
    <TEMPLATE id="waitlist-success-template">
      <DIV class="waitlist-success">
        <P style="color: #4a8c56">
          Thank you for joining the waitlist! We will notify you when we are
          ready to launch.
        </P>
        <BR />
        <P>
          In the meantime, join our{" "}
          <Link href="https://go.fart.tools/chat">community on Discord</Link>
          {" "}
          to stay updated!
        </P>
      </DIV>
    </TEMPLATE>
  );
}

function WaitlistLoadingTemplate() {
  return (
    <TEMPLATE id="waitlist-loading-template">
      <DIV class="waitlist-loading">
        <P>Loading...</P>
      </DIV>
    </TEMPLATE>
  );
}

// function WaitlistError() {
//   return (
//     <DIV>
//       <P style="color: red">
//         Oops! Something went wrong. Please try again later.
//       </P>
//     </DIV>
//   );
// }

// function WaitlistWarning() {
//   return (
//     <DIV class="waitlist-warning">
//       Thank you! This email is already registered.
//       <BR />
//       Join our{" "}
//       <Link href="https://go.fart.tools/chat">
//         community on Discord
//       </Link>
//       .
//     </DIV>
//   );
// }

// function WaitlistSuccess() {
//   return (
//     <div className="relative z-10">
//       <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#4a8c56]">
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           width="24"
//           height="24"
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="2"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           className="text-white"
//         >
//           <path d="M20 6 9 17l-5-5"></path>
//         </svg>
//       </div>
//       <h3 className="mb-2 text-xl font-bold">Thank You!</h3>
//       <p className="text-[#a3ffb0]/80">
//         Thank you for your interest in{" "}
//         <span className="font-bold">FartLabs Computer</span>! We're excited to
//         hear your feedback and welcome you to our{" "}
//         <a href="https://go.fart.tools/chat" className="underline">
//           community on Discord
//         </a>
//         .
//       </p>
//     </div>
//   );
// }
