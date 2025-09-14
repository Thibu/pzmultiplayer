import { NextResponse } from "next/server";
import { registerClient, unregisterClient } from "@/app/modules/shared/lib/sseBus";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  let doClose: (() => void) | null = null;

  const stream = new ReadableStream<Uint8Array>({
    start(controller) {
      const encoder = new TextEncoder();
      let isClosed = false;

      const safeEnqueue = (chunk: string) => {
        if (isClosed) return;
        try {
          controller.enqueue(encoder.encode(chunk));
        } catch {
          // Stream is likely closed; ensure cleanup
          if (doClose) doClose();
        }
      };

      const client = registerClient(safeEnqueue);
      console.log(`[SSE] client ${client.id} connected`)

      // Open the stream with a comment
      safeEnqueue(": connected\n\n");

      // Heartbeat to keep connections alive
      const pingId = setInterval(() => {
        safeEnqueue(`event: ping\n\n`);
      }, 25000);

      const close = () => {
        if (isClosed) return;
        isClosed = true;
        clearInterval(pingId);
        unregisterClient(client);
        console.log(`[SSE] client ${client.id} disconnected`)
        try { controller.close(); } catch {}
      };

      // Expose close for external cancellation
      doClose = close;
    },

    cancel() {
      // Called when the consumer (client) closes the connection
      if (doClose) doClose();
    },
  });

  // Also listen to the request's abort signal (Node/Next provides this)
  try {
    request.signal.addEventListener("abort", () => {
      if (doClose) doClose();
    });
  } catch {}

  return new NextResponse(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}


