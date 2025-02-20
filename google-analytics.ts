import { GA4Report } from "@kitsonk/ga4";

export function useGoogleAnalytics(
  measurementId: string | undefined,
  fn: (
    request: Request,
    info: Deno.ServeHandlerInfo<Deno.NetAddr>,
  ) => Response | Promise<Response>,
) {
  return async function (
    request: Request,
    info: Deno.ServeHandlerInfo<Deno.NetAddr>,
  ) {
    let response: Response;
    try {
      response = await fn(request, info);
    } finally {
      const report = new GA4Report({
        measurementId,
        conn: info,
        request,
        response: response!,
      });
      await report.send();
    }

    return response;
  };
}
