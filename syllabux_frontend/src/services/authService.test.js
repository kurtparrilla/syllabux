import { beforeEach, describe, expect, it, vi } from "vitest";
import {
  loginUser,
  registerUser,
  validateRememberToken,
} from "./authService";

describe("auth service", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("sends the backend registration contract", async () => {
    const fetchMock = vi.spyOn(window, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ user_id: 1 }), {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }),
    );

    await registerUser({
      firstName: " Jane ",
      lastName: " Doe ",
      email: " jane@example.com ",
      password: "secret123",
    });

    expect(fetchMock).toHaveBeenCalledWith(
      "/api/auth/register",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify({
          first_name: "Jane",
          last_name: "Doe",
          email: "jane@example.com",
          password: "secret123",
          role: "student",
        }),
      }),
    );
  });

  it("sends the backend login contract", async () => {
    const fetchMock = vi.spyOn(window, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ token: "jwt", user: {} }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );

    await loginUser({
      email: " jane@example.com ",
      password: "secret123",
      rememberMe: true,
    });

    expect(fetchMock).toHaveBeenCalledWith(
      "/api/auth/login",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify({
          email: "jane@example.com",
          password: "secret123",
          remember_me: true,
        }),
      }),
    );
  });

  it("sends remember tokens to the validation endpoint", async () => {
    const fetchMock = vi.spyOn(window, "fetch").mockResolvedValue(
      new Response(JSON.stringify({ isValid: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }),
    );

    await validateRememberToken("remember-token");

    expect(fetchMock).toHaveBeenCalledWith(
      "/api/auth/validatetoken",
      expect.objectContaining({
        method: "POST",
        headers: expect.objectContaining({
          "Content-Type": "application/json",
        }),
        body: JSON.stringify({ token: "remember-token" }),
      }),
    );
  });
});
