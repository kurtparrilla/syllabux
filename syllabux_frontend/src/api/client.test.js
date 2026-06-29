import { beforeEach, describe, expect, it, vi } from "vitest";
import { apiReq } from "./client";
import { saveAuthSession } from "../auth/authStorage";
import { AUTH_UNAUTHORIZED_EVENT } from "../auth/authEvents";

const user = {
  user_id: 1,
  first_name: "Jane",
  last_name: "Doe",
  email: "jane@example.com",
  role: "student",
};

function createJwt() {
  const payload = window
    .btoa(
      JSON.stringify({
        exp: Math.floor(Date.now() / 1000) + 60,
        role: user.role,
        sub: user.user_id,
      }),
    )
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replaceAll("=", "");
  return `header.${payload}.signature`;
}

describe("apiReq", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("adds a bearer token to authenticated requests", async () => {
    const token = createJwt();
    saveAuthSession({ token, rememberToken: null, user }, false);
    const fetchMock = vi
      .spyOn(window, "fetch")
      .mockResolvedValue(
        new Response(JSON.stringify({ ok: true }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }),
      );

    await apiReq("/users", { authenticated: true });

    expect(fetchMock).toHaveBeenCalledWith(
      "/api/users",
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: `Bearer ${token}`,
        }),
      }),
    );
  });

  it("signals the auth provider after a protected 401", async () => {
    saveAuthSession(
      { token: createJwt(), rememberToken: null, user },
      false,
    );
    vi.spyOn(window, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ message: "expired" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      }),
    );
    const listener = vi.fn();
    window.addEventListener(AUTH_UNAUTHORIZED_EVENT, listener);

    await expect(
      apiReq("/users", { authenticated: true }),
    ).rejects.toMatchObject({ status: 401 });
    expect(listener).toHaveBeenCalledOnce();

    window.removeEventListener(AUTH_UNAUTHORIZED_EVENT, listener);
  });

  it("serializes JSON request bodies consistently", async () => {
    const fetchMock = vi.spyOn(window, "fetch").mockResolvedValue(
      new Response(null, { status: 204 }),
    );

    await apiReq("auth/login", {
      method: "POST",
      json: { email: "jane@example.com" },
    });

    expect(fetchMock).toHaveBeenCalledWith(
      "/api/auth/login",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify({ email: "jane@example.com" }),
      }),
    );
  });

  it("normalizes network failures", async () => {
    vi.spyOn(window, "fetch").mockRejectedValue(new TypeError("Failed to fetch"));

    await expect(apiReq("/auth/login")).rejects.toMatchObject({
      name: "ApiError",
      status: 0,
      message: "unable to reach the server. please try again later",
    });
  });
});
