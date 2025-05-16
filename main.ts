import { createClient } from "@libsql/client";
import { serveDir } from "@std/http/file-server";
import { route } from "@std/http/unstable-route";

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

            const url = Deno.env.get("TURSO_DATABASE_URL");
            if (!url) {
              throw new Error("TURSO_DATABASE_URL is not set");
            }

            const authToken = Deno.env.get("TURSO_AUTH_TOKEN");
            if (!authToken) {
              throw new Error("TURSO_AUTH_TOKEN is not set");
            }

            const client = createClient({ url, authToken });
            await client
              .batch([
                "CREATE TABLE IF NOT EXISTS waitlist (email TEXT PRIMARY KEY, created_at DATETIME DEFAULT CURRENT_TIMESTAMP)",
                {
                  sql: "SELECT email FROM waitlist WHERE email = ?",
                  args: [body.email],
                },
              ], "read")
              .then((result) => {
                if (result[1].rows.length > 0) {
                  throw new Error("Email already registered");
                }
              });

            await client.batch([
              {
                sql: "INSERT INTO waitlist (email) VALUES (?)",
                args: [body.email],
              },
            ], "write");

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
