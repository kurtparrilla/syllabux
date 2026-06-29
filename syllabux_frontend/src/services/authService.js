import { apiReq } from "../api/client";

export function registerUser({ firstName, lastName, email, password }) {
  return apiReq("/auth/register", {
    method: "POST",
    json: {
      first_name: firstName.trim(),
      last_name: lastName.trim(),
      email: email.trim(),
      password,
      role: "student",
    },
  });
}

export function loginUser({ email, password, rememberMe }) {
  return apiReq("/auth/login", {
    method: "POST",
    json: {
      email: email.trim(),
      password,
      remember_me: rememberMe,
    },
  });
}

export function validateRememberToken(token) {
  return apiReq("/auth/validatetoken", {
    method: "POST",
    json: { token },
  });
}
