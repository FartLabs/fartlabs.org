import { BR, DIV, FORM, H2, INPUT, LABEL, P, SPAN } from "@fartlabs/htx";
import { Link, Section, TextGradient } from "@fartlabs/css";

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

      {/* TODO: Set up waitlist logic. */}
      <WaitlistForm />
    </Section>
  );
}

function WaitlistForm() {
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
