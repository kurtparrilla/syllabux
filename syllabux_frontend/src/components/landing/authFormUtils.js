export function validateEmail(email) {
  const value = email.trim();

  if (!value) return "email is required";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
    return "enter a valid email address";
  }

  return undefined;
}

export function getAuthErrorMessage(error, statusMessages, fallback) {
  const statusMessage = statusMessages?.[error?.status];
  if (statusMessage) return statusMessage;

  const data = error?.data;
  if (typeof data?.message === "string") return data.message;
  if (typeof data?.error === "string") return data.error;
  if (typeof data?.detail === "string") return data.detail;
  if (typeof error?.message === "string") return error.message;

  return fallback;
}
