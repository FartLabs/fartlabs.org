import { serveDir } from "@std/http/file-server";
import { route } from "@std/http/unstable-route";

export default {
  fetch: route(
    [
      {
        method: "GET",
        pattern: new URLPattern({ pathname: "/*" }),
        handler: (request) =>
          serveDir(request, { fsRoot: Deno.args[0] ?? "generated" }),
      },
    ],
    () => Response.json({ error: "Not Found" }, { status: 404 }),
  ),
} satisfies Deno.ServeDefaultExport;
