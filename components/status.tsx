import { A, SPAN } from "@fartlabs/htx";

export function ServicesStatus() {
  return (
    <A
      href="https://fartlabs.openstatus.dev/"
      style="gap: 0.5rem;
      width: fit-content;
      background-color: rgba(0, 255, 0, 0.1);
      border: 1px solid rgba(0, 255, 0, 0.2);
      border-radius: 999px;
      padding: 0.25rem 0.75rem;
      margin: 1rem auto;
      font-size: 0.875rem;
      line-height: 1.25rem;"
    >
      <SPAN style="width: 8px;
        height: 8px;
        background-color: #00ff00;
        border-radius: 50%;
        display: inline-block;" />
      <SPAN style="color: var(--fart-white)">All services online</SPAN>
    </A>
  );
}
