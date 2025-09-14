import { NextResponse } from "next/server";
import { registerClient, unregisterClient } from "@/app/modules/shared/lib/sseBus";

export const dynamic = "force-dynamic";

export async function GET() {
  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      const encoder = new TextEncoder();
      const enqueue = (chunk: string) => controller.enqueue(encoder.encode(chunk));
      const client = registerClient(enqueue);
      // eslint-disable-next-line no-console
      console.log(`[SSE] client ${client.id} connected`)
      // Send a comment to open the stream
      enqueue(": connected\n\n");

      // Heartbeat to keep connections alive
      const pingId = setInterval(() => enqueue(`event: ping\n\n`), 25000);

      // Close hook
      const close = () => {
        clearInterval(pingId);
        unregisterClient(client);
        // eslint-disable-next-line no-console
        console.log(`[SSE] client ${client.id} disconnected`)
        try { controller.close(); } catch {}
      };

      // Abort support
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const signal: AbortSignal | undefined = (controller as any).signal;
      if (signal) {
        signal.addEventListener("abort", close);
      }
    },
  });

  return new NextResponse(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}


