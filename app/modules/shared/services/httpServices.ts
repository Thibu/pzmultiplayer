import axios, {
  type AxiosError,
  type AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
} from "axios";

// Centralized API error type returned by this module
export interface ApiError {
  name: "ApiError";
  status?: number;
  code?: string | number;
  message: string;
  details?: unknown;
}

export const isApiError = (error: unknown): error is ApiError => {
  return (
    typeof error === "object" &&
    error !== null &&
    (error as { name?: string }).name === "ApiError"
  );
};

// Base URL is configurable via environment variable for flexibility across envs
// In SSR/Node, Axios needs an absolute URL (protocol + host). On the browser, relative works.
function resolveBaseURL(): string {
  const isServer = typeof window === "undefined";
  if (isServer) {
    const appBase = process.env.NEXT_PUBLIC_APP_BASE_URL || "http://localhost:3000";
    const trimmed = appBase.replace(/\/$/, "");
    return `${trimmed}/api`;
  }
  return "/api";
}

const baseURL: string = resolveBaseURL();

const api: AxiosInstance = axios.create({
  baseURL,
  timeout: 15000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  // Axios v1 supports AbortController via the `signal` option we expose downstream
});

let authToken: string | null = null;

export function setAuthToken(token: string | null): void {
  authToken = token;
}

// Attach Authorization header if a token was set
api.interceptors.request.use((config) => {
  if (authToken) {
    config.headers = {
      ...(config.headers || {}),
      Authorization: `Bearer ${authToken}`,
    } as typeof config.headers;
  }
  return config;
});

function normalizeError(error: unknown): ApiError {
  if (axios.isAxiosError(error)) {
    const axiosErr = error as AxiosError<{message?: string; error?: string}>;
    const status = axiosErr.response?.status;
    const code = axiosErr.code;
    const message =
      // Try common API error shapes
      (axiosErr.response?.data &&
        (axiosErr.response.data.message || axiosErr.response.data.error)) ||
      axiosErr.message ||
      "Request failed";
    return {
      name: "ApiError",
      status,
      code,
      message,
      details: axiosErr.response?.data,
    };
  }
  if (error instanceof Error) {
    return { name: "ApiError", message: error.message };
  }
  return { name: "ApiError", message: "Unknown error" };
}

// Re-throw normalized errors
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    throw normalizeError(error);
  }
);

export type HttpConfig = AxiosRequestConfig;

export async function httpGet<T>(
  url: string,
  config?: HttpConfig
): Promise<T> {
  const res = await api.get<T>(url, config);
  return res.data;
}

export async function httpPost<TBody, TResp = unknown>(
  url: string,
  body: TBody,
  config?: HttpConfig
): Promise<TResp> {
  const res = await api.post<TResp>(url, body, config);
  return res.data;
}

export async function httpPut<TBody, TResp = unknown>(
  url: string,
  body: TBody,
  config?: HttpConfig
): Promise<TResp> {
  const res = await api.put<TResp>(url, body, config);
  return res.data;
}

export async function httpPatch<TBody, TResp = unknown>(
  url: string,
  body: TBody,
  config?: HttpConfig
): Promise<TResp> {
  const res = await api.patch<TResp>(url, body, config);
  return res.data;
}

export async function httpDelete<TResp = unknown>(
  url: string,
  config?: HttpConfig
): Promise<TResp> {
  const res = await api.delete<TResp>(url, config);
  return res.data;
}

// Expose the underlying instance for advanced configuration (e.g., custom interceptors)
export const httpClient = api;

export default {
  client: httpClient,
  setAuthToken,
  get: httpGet,
  post: httpPost,
  put: httpPut,
  patch: httpPatch,
  delete: httpDelete,
};


