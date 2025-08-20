import { serveDir } from "@std/http/file-server";
import { route } from "@std/http/unstable-route";
import { addToWaitlist, checkEmailExists } from "./database/kv.ts";

export default {
  fetch: route(
    [
      {
        method: "POST",
        pattern: new URLPattern({ pathname: "/waitlist" }),
        handler: async (request) => {
          try {
            const body: { email: string; token: string } = await request.json();
            const recaptchaSecretKey = Deno.env.get("RECAPTCHA_SECRET_KEY");
            if (!recaptchaSecretKey) {
              throw new Error("RECAPTCHA_SECRET_KEY is not set");
            }

            const recaptchaResponse = await fetch(
              `https://www.google.com/recaptcha/api/siteverify?secret=${recaptchaSecretKey}&response=${body.token}`,
              { method: "POST" },
            );

            const recaptchaData = await recaptchaResponse.json();
            if (!recaptchaData.success) {
              throw new Error("Failed reCAPTCHA verification");
            }

            const kv = await Deno.openKv(Deno.env.get("DENO_KV_PATH")!);
            const emailExists = await checkEmailExists(kv, body.email);
            if (emailExists) {
              throw new Error("Email already registered");
            }

            await addToWaitlist(kv, body.email);

            return new Response(null, { status: 200 });
          } catch (error) {
            console.error(error);
            if (error instanceof Error) {
              return Response.json({ error: error.message }, { status: 500 });
            }

            throw error;
          }
        },
      },
      {
        method: "GET",
        pattern: new URLPattern({ pathname: "/*" }),
        handler: (request) =>
          serveDir(request, { fsRoot: Deno.args[0] ?? "." }),
      },
    ],
    () => Response.json({ error: "Not Found" }, { status: 404 }),
  ),
} satisfies Deno.ServeDefaultExport;
