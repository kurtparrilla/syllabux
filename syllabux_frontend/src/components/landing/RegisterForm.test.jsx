import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import RegisterForm from "./RegisterForm";

const mutation = {
  error: null,
  isError: false,
  isPending: false,
  mutate: vi.fn(),
  reset: vi.fn(),
};

vi.mock("../../hooks/useRegisterMutation", () => ({
  useRegisterMutation: () => mutation,
}));

function fillRegistrationForm() {
  fireEvent.change(screen.getByLabelText("first name"), {
    target: { value: "Jane" },
  });
  fireEvent.change(screen.getByLabelText("last name"), {
    target: { value: "Doe" },
  });
  fireEvent.change(screen.getByLabelText("email"), {
    target: { value: "jane@example.com" },
  });
  fireEvent.change(screen.getByLabelText("password"), {
    target: { value: "secret123" },
  });
  fireEvent.change(screen.getByLabelText("confirm password"), {
    target: { value: "secret123" },
  });
}

describe("RegisterForm", () => {
  beforeEach(() => {
    mutation.error = null;
    mutation.isError = false;
    mutation.isPending = false;
    mutation.mutate.mockClear();
    mutation.reset.mockClear();
  });

  it("submits the values expected by the registration service", () => {
    render(<RegisterForm onSuccess={vi.fn()} />);
    fillRegistrationForm();
    fireEvent.click(screen.getByRole("button", { name: "continue" }));

    expect(mutation.mutate).toHaveBeenCalledWith({
      firstName: "Jane",
      lastName: "Doe",
      email: "jane@example.com",
      password: "secret123",
      confirmPassword: "secret123",
    });
  });

  it("blocks mismatched passwords", () => {
    render(<RegisterForm />);
    fillRegistrationForm();
    fireEvent.change(screen.getByLabelText("confirm password"), {
      target: { value: "different" },
    });
    fireEvent.click(screen.getByRole("button", { name: "continue" }));

    expect(screen.getByText("passwords do not match")).toBeInTheDocument();
    expect(mutation.mutate).not.toHaveBeenCalled();
  });

  it("shows a useful duplicate-email response", () => {
    mutation.isError = true;
    mutation.error = {
      status: 409,
      data: { message: "Duplicate entry" },
    };

    render(<RegisterForm />);

    expect(
      screen.getByText("an account with this email already exists"),
    ).toBeInTheDocument();
  });
});
