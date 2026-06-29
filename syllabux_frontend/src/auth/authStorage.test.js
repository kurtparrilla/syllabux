import { beforeEach, describe, expect, it } from "vitest";
import {
  AUTH_STORAGE_KEY,
  clearAuthSession,
  getAccessToken,
  isJwtExpired,
  readAuthSession,
  saveAuthSession,
} from "./authStorage";

const user = {
  user_id: 1,
  first_name: "Jane",
  last_name: "Doe",
  email: "jane@example.com",
  role: "student",
};

function createJwt(
  expirationSeconds,
  { sub = user.user_id, role = user.role } = {},
) {
  const payload = window
    .btoa(JSON.stringify({ exp: expirationSeconds, role, sub }))
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replaceAll("=", "");
  return `header.${payload}.signature`;
}

describe("auth storage", () => {
  beforeEach(clearAuthSession);

  it("uses sessionStorage when remember me is false", () => {
    const session = {
      token: createJwt(Math.floor(Date.now() / 1000) + 60),
      rememberToken: null,
      user,
    };

    saveAuthSession(session, false);

    expect(window.sessionStorage.getItem(AUTH_STORAGE_KEY)).not.toBeNull();
    expect(window.localStorage.getItem(AUTH_STORAGE_KEY)).toBeNull();
    expect(readAuthSession()).toEqual({ session, remembered: false });
    expect(getAccessToken()).toBe(session.token);
  });

  it("uses localStorage and clears a stale session when remembered", () => {
    const staleSession = {
      token: "stale",
      rememberToken: null,
      user,
    };
    window.sessionStorage.setItem(
      AUTH_STORAGE_KEY,
      JSON.stringify(staleSession),
    );
    const session = {
      token: createJwt(Math.floor(Date.now() / 1000) + 60),
      rememberToken: "remember-token",
      user,
    };

    saveAuthSession(session, true);

    expect(window.sessionStorage.getItem(AUTH_STORAGE_KEY)).toBeNull();
    expect(readAuthSession()).toEqual({ session, remembered: true });
  });

  it("detects expired and malformed JWTs", () => {
    expect(isJwtExpired(createJwt(Math.floor(Date.now() / 1000) - 1))).toBe(
      true,
    );
    expect(isJwtExpired("not-a-jwt")).toBe(true);
  });

  it("removes sessions whose JWT identity does not match the user", () => {
    const session = {
      token: createJwt(Math.floor(Date.now() / 1000) + 60, { sub: 999 }),
      rememberToken: null,
      user,
    };
    window.sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));

    expect(readAuthSession()).toBeNull();
    expect(window.sessionStorage.getItem(AUTH_STORAGE_KEY)).toBeNull();
  });

  it("removes sessions with unsupported roles", () => {
    const adminUser = { ...user, role: "admin" };
    const session = {
      token: createJwt(Math.floor(Date.now() / 1000) + 60, {
        role: "admin",
      }),
      rememberToken: null,
      user: adminUser,
    };
    window.sessionStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));

    expect(readAuthSession()).toBeNull();
  });
});
