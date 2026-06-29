import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ApiError } from "../api/client";
import { loginUser, validateRememberToken } from "../services/authService";
import { AUTH_STORAGE_KEY } from "./authStorage";
import { AuthProvider } from "./AuthProvider";
import { useAuth } from "./authContext";

vi.mock("../services/authService", () => ({
  loginUser: vi.fn(),
  validateRememberToken: vi.fn(),
}));

const user = {
  user_id: 1,
  first_name: "Jane",
  last_name: "Doe",
  email: "jane@example.com",
  role: "student",
};

function createJwt({ exp, role = user.role, sub = user.user_id } = {}) {
  const payload = window
    .btoa(
      JSON.stringify({
        exp: exp ?? Math.floor(Date.now() / 1000) + 60,
        role,
        sub,
      }),
    )
    .replaceAll("+", "-")
    .replaceAll("/", "_")
    .replaceAll("=", "");
  return `header.${payload}.signature`;
}

function saveRememberedSession(overrides = {}) {
  const session = {
    token: createJwt(),
    rememberToken: "remember-token",
    user,
    ...overrides,
  };
  window.localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
  return session;
}

function AuthProbe() {
  const auth = useAuth();

  return (
    <>
      <span>{auth.isRestoring ? "restoring" : "ready"}</span>
      <span>{auth.isAuthenticated ? auth.user.email : "signed-out"}</span>
      <button
        type="button"
        onClick={() =>
          auth.login({
            email: "jane@example.com",
            password: "secret123",
            rememberMe: true,
          })
        }
      >
        login
      </button>
    </>
  );
}

function renderProvider() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <AuthProbe />
      </AuthProvider>
    </QueryClientProvider>,
  );
}

describe("AuthProvider", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("restores a remembered session after successful validation", async () => {
    saveRememberedSession();
    validateRememberToken.mockResolvedValue({
      isValid: true,
      message: "The token is valid",
    });

    renderProvider();

    expect(await screen.findByText(user.email)).toBeInTheDocument();
    expect(validateRememberToken).toHaveBeenCalledWith("remember-token");
  });

  it.each([
    ["an invalid response", { isValid: false, message: "invalid" }],
    ["a malformed response", { message: "missing boolean" }],
  ])("clears the session for %s", async (_label, response) => {
    saveRememberedSession();
    validateRememberToken.mockResolvedValue(response);

    renderProvider();

    expect(await screen.findByText("signed-out")).toBeInTheDocument();
    expect(window.localStorage.getItem(AUTH_STORAGE_KEY)).toBeNull();
  });

  it("clears the session when validation returns 401", async () => {
    saveRememberedSession();
    validateRememberToken.mockRejectedValue(
      new ApiError(401, { message: "Invalid token" }, "Invalid token"),
    );

    renderProvider();

    expect(await screen.findByText("signed-out")).toBeInTheDocument();
    expect(window.localStorage.getItem(AUTH_STORAGE_KEY)).toBeNull();
  });

  it.each([
    ["a network failure", new TypeError("Failed to fetch")],
    [
      "a server failure",
      new ApiError(500, { message: "failed" }, "failed"),
    ],
  ])("retains an unexpired JWT during %s", async (_label, error) => {
    saveRememberedSession();
    validateRememberToken.mockRejectedValue(error);

    renderProvider();

    expect(await screen.findByText(user.email)).toBeInTheDocument();
    expect(window.localStorage.getItem(AUTH_STORAGE_KEY)).not.toBeNull();
  });

  it("does not restore an expired JWT even with a remember token", async () => {
    saveRememberedSession({
      token: createJwt({ exp: Math.floor(Date.now() / 1000) - 60 }),
    });

    renderProvider();

    expect(await screen.findByText("signed-out")).toBeInTheDocument();
    expect(validateRememberToken).not.toHaveBeenCalled();
  });

  it("falls back to session storage when login returns no remember token", async () => {
    loginUser.mockResolvedValue({
      remember_token: null,
      token: createJwt(),
      user,
    });

    renderProvider();
    await screen.findByText("signed-out");
    fireEvent.click(screen.getByRole("button", { name: "login" }));

    await waitFor(() =>
      expect(window.sessionStorage.getItem(AUTH_STORAGE_KEY)).not.toBeNull(),
    );
    expect(window.localStorage.getItem(AUTH_STORAGE_KEY)).toBeNull();
  });
});
