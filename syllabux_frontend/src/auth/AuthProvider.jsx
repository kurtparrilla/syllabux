import { useCallback, useEffect, useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  clearAuthSession,
  isJwtExpired,
  readAuthSession,
  saveAuthSession,
} from "./authStorage";
import { loginUser, validateRememberToken } from "../services/authService";
import { AUTH_UNAUTHORIZED_EVENT } from "./authEvents";
import { AuthContext, AuthSessionError } from "./authContext";
import { ApiError } from "../api/client";

function normalizeLoginResponse(data) {
  const user = data?.user;

  if (
    typeof data?.token !== "string" ||
    !data.token ||
    !user ||
    !Number.isInteger(user.user_id) ||
    typeof user.first_name !== "string" ||
    typeof user.last_name !== "string" ||
    typeof user.email !== "string" ||
    typeof user.role !== "string"
  ) {
    throw new AuthSessionError("The server returned an invalid login response.");
  }

  if (!["student", "instructor"].includes(user.role)) {
    throw new AuthSessionError(
      "A dashboard is not available for this account role.",
    );
  }

  return {
    token: data.token,
    rememberToken:
      typeof data.remember_token === "string" && data.remember_token
        ? data.remember_token
        : null,
    user,
  };
}

export function AuthProvider({ children }) {
  const queryClient = useQueryClient();
  const [session, setSession] = useState(null);
  const [isRestoring, setIsRestoring] = useState(true);

  const clearSession = useCallback(() => {
    clearAuthSession();
    setSession(null);
    queryClient.clear();
  }, [queryClient]);

  useEffect(() => {
    let isCurrent = true;

    async function restoreSession() {
      const stored = readAuthSession();

      if (!stored || isJwtExpired(stored.session.token)) {
        clearAuthSession();
        if (isCurrent) setIsRestoring(false);
        return;
      }

      if (stored.remembered && stored.session.rememberToken) {
        try {
          const result = await validateRememberToken(
            stored.session.rememberToken,
          );
          if (
            typeof result?.isValid !== "boolean" ||
            result.isValid === false
          ) {
            clearAuthSession();
            if (isCurrent) {
              setSession(null);
              setIsRestoring(false);
            }
            return;
          }
        } catch (error) {
          if (error instanceof ApiError && error.status === 401) {
            clearAuthSession();
            if (isCurrent) {
              setSession(null);
              setIsRestoring(false);
            }
            return;
          }

          // An unexpired JWT remains usable during temporary service failures.
        }
      }

      if (isCurrent) {
        setSession(stored.session);
        setIsRestoring(false);
      }
    }

    restoreSession();
    return () => {
      isCurrent = false;
    };
  }, []);

  useEffect(() => {
    window.addEventListener(AUTH_UNAUTHORIZED_EVENT, clearSession);
    return () =>
      window.removeEventListener(AUTH_UNAUTHORIZED_EVENT, clearSession);
  }, [clearSession]);

  const login = useCallback(async ({ email, password, rememberMe }) => {
    const data = await loginUser({ email, password, rememberMe });
    const nextSession = normalizeLoginResponse(data);
    const canRemember = rememberMe && Boolean(nextSession.rememberToken);
    saveAuthSession(nextSession, canRemember);
    setSession(nextSession);
    return nextSession;
  }, []);

  const value = useMemo(
    () => ({
      user: session?.user ?? null,
      token: session?.token ?? null,
      isAuthenticated: Boolean(session),
      isRestoring,
      login,
      logout: clearSession,
    }),
    [clearSession, isRestoring, login, session],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
