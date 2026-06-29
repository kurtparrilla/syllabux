import { AUTH_UNAUTHORIZED_EVENT } from "../auth/authEvents";
import { getAccessToken } from "../auth/authStorage";

const BASE_URL = (import.meta.env.VITE_API_URL || "/api").replace(/\/+$/, "");

export class ApiError extends Error {
  constructor(status, data, message) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
  }
}

async function parseResponse(response) {
  if (response.status === 204) {
    return null;
  }

  const contentType = response.headers.get("content-type") ?? "";

  if (contentType.includes("json")) {
    return response.json();
  }

  const text = await response.text();
  return text || null;
}

export async function apiReq(path, options = {}) {
  const {
    authenticated = false,
    headers,
    json,
    ...requestOptions
  } = options;
  const token = authenticated ? getAccessToken() : null;
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  let res;

  try {
    res = await fetch(`${BASE_URL}${normalizedPath}`, {
      headers: {
        ...(json === undefined ? {} : { "Content-Type": "application/json" }),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
      },
      ...(json === undefined ? {} : { body: JSON.stringify(json) }),
      ...requestOptions,
    });
  } catch {
    throw new ApiError(
      0,
      null,
      "unable to reach the server. please try again later",
    );
  }

  const data = await parseResponse(res);

  if (!res.ok) {
    if (authenticated && res.status === 401 && typeof window !== "undefined") {
      window.dispatchEvent(new Event(AUTH_UNAUTHORIZED_EVENT));
    }

    const message =
      (typeof data === "object" && data?.message) ||
      (typeof data === "string" && data) ||
      `Request failed with status ${res.status}.`;

    throw new ApiError(res.status, data, message);
  }

  return data;
}
