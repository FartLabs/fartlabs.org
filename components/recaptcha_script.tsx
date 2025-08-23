import { SCRIPT } from "@fartlabs/htx/script";

export const recaptchaSiteKey = "6LfJUC8rAAAAALwhkiZR_6YxdJGF9Q42jOkAXfa1";

export function RecaptchaScript() {
  return (
    <SCRIPT
      src={`https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`}
    />
  );
}
