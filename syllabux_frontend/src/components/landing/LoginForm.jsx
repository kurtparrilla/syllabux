import { useState } from "react";
import { useLoginMutation } from "../../hooks/useLoginMutation";
import AuthField from "./AuthField";
import { getAuthErrorMessage, validateEmail } from "./authFormUtils";

function validate(credentials) {
  const errors = {};
  errors.email = validateEmail(credentials.email);

  if (!credentials.password) {
    errors.password = "password is required";
  }

  if (!errors.email) delete errors.email;
  return errors;
}

function getLoginError(error) {
  return getAuthErrorMessage(
    error,
    {
      400: "please review your login details",
      401: "invalid email or password",
    },
    "we couldn't sign you in. please try again",
  );
}

function LoginForm({ initialEmail = "", onSuccess, registrationMessage }) {
  const [credentials, setCredentials] = useState({
    email: initialEmail,
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});
  const loginMutation = useLoginMutation({ onSuccess });

  const updateField = (event) => {
    const { checked, name, type, value } = event.target;
    setCredentials((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((current) => ({ ...current, [name]: undefined }));
    if (loginMutation.isError) loginMutation.reset();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate(credentials);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    loginMutation.mutate(credentials);
  };

  const isPending = loginMutation.isPending;

  return (
    <form className="space-y-6" onSubmit={handleSubmit} noValidate>
      {registrationMessage && (
        <p
          className="rounded-xl border border-green-200 bg-green-50/80 px-4 py-3 text-sm text-green-800"
          role="status"
        >
          {registrationMessage}
        </p>
      )}

      <div className="space-y-4">
        <AuthField
          label="email"
          name="email"
          placeholder="you@example.com"
          type="email"
          value={credentials.email}
          onChange={updateField}
          required
          disabled={isPending}
          error={errors.email}
          autoComplete="email"
        />
        <AuthField
          label="password"
          name="password"
          placeholder="••••••••"
          type="password"
          value={credentials.password}
          onChange={updateField}
          required
          disabled={isPending}
          error={errors.password}
          autoComplete="current-password"
        />
      </div>

      <div className="flex items-center justify-between gap-4">
        <label className="flex cursor-pointer items-center gap-2 font-label-sm text-label-sm lowercase text-on-surface-variant">
          <input
            className="h-4 w-4 rounded border-outline-variant text-primary focus:ring-primary/20"
            name="rememberMe"
            type="checkbox"
            checked={credentials.rememberMe}
            disabled={isPending}
            onChange={updateField}
          />
          remember me
        </label>
      </div>

      {loginMutation.isError && (
        <p
          className="rounded-xl border border-red-200 bg-red-50/80 px-4 py-3 text-sm text-red-800"
          role="alert"
        >
          {getLoginError(loginMutation.error)}
        </p>
      )}

      <button
        className="w-full rounded-xl bg-primary py-4 font-label-md lowercase text-on-primary shadow-md shadow-primary/10 transition hover:bg-primary-container active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 disabled:active:scale-100"
        type="submit"
        disabled={isPending}
      >
        {isPending ? "signing in..." : "continue"}
      </button>
    </form>
  );
}

export default LoginForm;
