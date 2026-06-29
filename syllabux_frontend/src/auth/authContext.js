import { createContext, useContext } from "react";

export const AuthContext = createContext(null);

export class AuthSessionError extends Error {
  constructor(message) {
    super(message);
    this.name = "AuthSessionError";
  }
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider.");
  }
  return context;
}
