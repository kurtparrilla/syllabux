import { render, screen } from "@testing-library/react";
import {
  MemoryRouter,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import ProtectedRoute from "./ProtectedRoute";

let authState;

vi.mock("./authContext", () => ({
  useAuth: () => authState,
}));

function CurrentPath() {
  return <span>{useLocation().pathname}</span>;
}

function renderRoutes() {
  return render(
    <MemoryRouter initialEntries={["/learn/dashboard"]}>
      <Routes>
        <Route element={<ProtectedRoute roles={["student"]} />}>
          <Route path="/learn/dashboard" element={<span>learner page</span>} />
        </Route>
        <Route path="/" element={<CurrentPath />} />
        <Route path="/instructor/dashboard" element={<CurrentPath />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe("ProtectedRoute", () => {
  it("redirects unauthenticated users to the landing page", () => {
    authState = {
      isAuthenticated: false,
      isRestoring: false,
      user: null,
    };

    renderRoutes();

    expect(screen.getByText("/")).toBeInTheDocument();
  });

  it("redirects the wrong role to its own dashboard", () => {
    authState = {
      isAuthenticated: true,
      isRestoring: false,
      user: { role: "instructor" },
    };

    renderRoutes();

    expect(screen.getByText("/instructor/dashboard")).toBeInTheDocument();
  });

  it("renders the protected page for an allowed role", () => {
    authState = {
      isAuthenticated: true,
      isRestoring: false,
      user: { role: "student" },
    };

    renderRoutes();

    expect(screen.getByText("learner page")).toBeInTheDocument();
  });
});
