const AUTH_STORAGE_KEY = "syllabux:auth-session";

function getStorage(type) {
  if (typeof window === "undefined") return null;
  return type === "local" ? window.localStorage : window.sessionStorage;
}

function isUser(value) {
  return (
    value &&
    Number.isInteger(value.user_id) &&
    typeof value.first_name === "string" &&
    typeof value.last_name === "string" &&
    typeof value.email === "string" &&
    typeof value.role === "string"
  );
}

function decodeJwtPayload(token) {
  try {
    const payloadSegment = token.split(".")[1];
    if (!payloadSegment) return null;

    const normalized = payloadSegment
      .replaceAll("-", "+")
      .replaceAll("_", "/")
      .padEnd(Math.ceil(payloadSegment.length / 4) * 4, "=");
    const payload = JSON.parse(window.atob(normalized));
    return payload && typeof payload === "object" ? payload : null;
  } catch {
    return null;
  }
}

export function isSessionValid(value, now = Date.now()) {
  const payload =
    typeof value?.token === "string" ? decodeJwtPayload(value.token) : null;

  return (
    value &&
    typeof value.token === "string" &&
    value.token.length > 0 &&
    (value.rememberToken === null ||
      typeof value.rememberToken === "string") &&
    isUser(value.user) &&
    ["student", "instructor"].includes(value.user.role) &&
    payload &&
    Number.isInteger(payload.sub) &&
    payload.sub === value.user.user_id &&
    payload.role === value.user.role &&
    typeof payload.exp === "number" &&
    payload.exp * 1000 > now
  );
}

function readStorage(type) {
  const storage = getStorage(type);
  if (!storage) return null;

  try {
    const rawValue = storage.getItem(AUTH_STORAGE_KEY);
    if (!rawValue) return null;

    const session = JSON.parse(rawValue);
    if (!isSessionValid(session)) {
      storage.removeItem(AUTH_STORAGE_KEY);
      return null;
    }

    return session;
  } catch {
    storage.removeItem(AUTH_STORAGE_KEY);
    return null;
  }
}

export function readAuthSession() {
  const sessionSession = readStorage("session");
  if (sessionSession) {
    return { session: sessionSession, remembered: false };
  }

  const localSession = readStorage("local");
  return localSession
    ? { session: localSession, remembered: true }
    : null;
}

export function saveAuthSession(session, remembered) {
  clearAuthSession();
  const storage = getStorage(remembered ? "local" : "session");
  storage?.setItem(AUTH_STORAGE_KEY, JSON.stringify(session));
}

export function clearAuthSession() {
  getStorage("local")?.removeItem(AUTH_STORAGE_KEY);
  getStorage("session")?.removeItem(AUTH_STORAGE_KEY);
}

export function getAccessToken() {
  return readAuthSession()?.session.token ?? null;
}

export function getJwtExpiration(token) {
  const payload = decodeJwtPayload(token);
  return typeof payload?.exp === "number" ? payload.exp * 1000 : null;
}

export function isJwtExpired(token, now = Date.now()) {
  const expiration = getJwtExpiration(token);
  return expiration === null || expiration <= now;
}

export { AUTH_STORAGE_KEY };
