import { serveDir } from "@std/http/file-server";
import { useGoogleAnalytics } from "./google-analytics.ts";

Deno.serve(useGoogleAnalytics(
  Deno.env.get("GOOGLE_ANALYTICS_ID")!,
  (request) => serveDir(request, { fsRoot: Deno.args[0] ?? "." }),
));
