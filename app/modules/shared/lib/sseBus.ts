type Client = {
  id: string;
  enqueue: (chunk: string) => void;
};

declare global {
  // eslint-disable-next-line no-var
  var __sseClients: Set<Client> | undefined;
}

const clients: Set<Client> = globalThis.__sseClients || new Set<Client>();
globalThis.__sseClients = clients;

let nextId = 1;

export function registerClient(enqueue: (chunk: string) => void): Client {
  const id = String(nextId++);
  const client: Client = { id, enqueue };
  clients.add(client);
  return client;
}

export function unregisterClient(client: Client): void {
  clients.delete(client);
}

export function broadcastEvent(eventName: string, data?: unknown): void {
  const payload = data === undefined ? "" : JSON.stringify(data);
  const message = `event: ${eventName}\n` + (payload ? `data: ${payload}\n` : "") + "\n";
  for (const c of clients) {
    try {
      c.enqueue(message);
    } catch {
      // Drop failed client
      clients.delete(c);
    }
  }
}


