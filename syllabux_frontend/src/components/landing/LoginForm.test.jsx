import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import LoginForm from "./LoginForm";

const mutate = vi.fn();
const reset = vi.fn();

vi.mock("../../hooks/useLoginMutation", () => ({
  useLoginMutation: () => ({
    error: null,
    isError: false,
    isPending: false,
    mutate,
    reset,
  }),
}));

describe("LoginForm", () => {
  it("submits email, password, and rememberMe", () => {
    render(<LoginForm initialEmail="jane@example.com" onSuccess={vi.fn()} />);

    fireEvent.change(screen.getByLabelText("password"), {
      target: { value: "secret123" },
    });
    fireEvent.click(screen.getByLabelText("remember me"));
    fireEvent.click(screen.getByRole("button", { name: "continue" }));

    expect(mutate).toHaveBeenCalledWith({
      email: "jane@example.com",
      password: "secret123",
      rememberMe: true,
    });
  });

  it("blocks invalid email submission", () => {
    mutate.mockClear();
    render(<LoginForm />);

    fireEvent.change(screen.getByLabelText("email"), {
      target: { value: "invalid" },
    });
    fireEvent.click(screen.getByRole("button", { name: "continue" }));

    expect(screen.getByText("enter a valid email address")).toBeInTheDocument();
    expect(mutate).not.toHaveBeenCalled();
  });
});
