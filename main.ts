import { serveDir } from "@std/http/file-server";
import { route } from "@std/http/unstable-route";

export default {
  fetch: route(
    [
      // TODO: PORST /waitlist API endpoint.
      // {},
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
