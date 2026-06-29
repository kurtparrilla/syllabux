import { useState } from "react";
import { useRegisterMutation } from "../../hooks/useRegisterMutation";
import AuthField from "./AuthField";
import { getAuthErrorMessage, validateEmail } from "./authFormUtils";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

function validate(values) {
  const errors = {};

  if (!values.firstName.trim()) errors.firstName = "first name is required";
  if (!values.lastName.trim()) errors.lastName = "last name is required";

  errors.email = validateEmail(values.email);

  if (!values.password) errors.password = "password is required";

  if (!values.confirmPassword) {
    errors.confirmPassword = "confirm your password";
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "passwords do not match";
  }

  if (!errors.email) delete errors.email;
  return errors;
}

function getRegistrationError(error) {
  return getAuthErrorMessage(
    error,
    {
      400: "please review your details and try again",
      409: "an account with this email already exists",
    },
    "we couldn't create your account. please try again",
  );
}

function RegisterForm({ onSuccess }) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const registerMutation = useRegisterMutation({ onSuccess });

  const updateField = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));

    if (registerMutation.isError) {
      registerMutation.reset();
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validate(values);

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    registerMutation.mutate(values);
  };

  const isPending = registerMutation.isPending;

  return (
    <form className="space-y-6" onSubmit={handleSubmit} noValidate>
      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <AuthField
            label="first name"
            name="firstName"
            placeholder="Kurt"
            type="text"
            value={values.firstName}
            onChange={updateField}
            required
            disabled={isPending}
            error={errors.firstName}
            autoComplete="given-name"
          />
          <AuthField
            label="last name"
            name="lastName"
            placeholder="Shon"
            type="text"
            value={values.lastName}
            onChange={updateField}
            required
            disabled={isPending}
            error={errors.lastName}
            autoComplete="family-name"
          />
        </div>
        <AuthField
          label="email"
          name="email"
          placeholder="learner@syllabux.edu"
          type="email"
          value={values.email}
          onChange={updateField}
          required
          disabled={isPending}
          error={errors.email}
          autoComplete="email"
        />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <AuthField
            label="password"
            name="password"
            placeholder="••••••••"
            type="password"
            value={values.password}
            onChange={updateField}
            required
            disabled={isPending}
            error={errors.password}
            autoComplete="new-password"
          />
          <AuthField
            label="confirm password"
            name="confirmPassword"
            placeholder="••••••••"
            type="password"
            value={values.confirmPassword}
            onChange={updateField}
            required
            disabled={isPending}
            error={errors.confirmPassword}
            autoComplete="new-password"
          />
        </div>
      </div>

      {registerMutation.isError && (
        <p
          className="rounded-xl border border-red-200 bg-red-50/80 px-4 py-3 text-sm text-red-800"
          role="alert"
        >
          {getRegistrationError(registerMutation.error)}
        </p>
      )}

      <button
        className="w-full rounded-xl bg-primary py-4 font-label-md lowercase text-on-primary shadow-md shadow-primary/10 transition hover:bg-primary-container active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60 disabled:active:scale-100"
        type="submit"
        disabled={isPending}
      >
        {isPending ? "creating account..." : "continue"}
      </button>
    </form>
  );
}

export default RegisterForm;
