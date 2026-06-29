function AuthField({
  label,
  name,
  placeholder,
  type,
  value,
  onChange,
  required = false,
  disabled = false,
  error,
  autoComplete,
}) {
  const fieldId = `auth-${name}`;
  const errorId = `${fieldId}-error`;

  return (
    <div>
      <label
        className="mb-1 ml-1 block font-label-sm text-label-sm lowercase text-on-surface-variant"
        htmlFor={fieldId}
      >
        {label}
      </label>
      <input
        id={fieldId}
        name={name}
        className={`w-full rounded-xl border bg-white/30 px-4 py-3 text-body-md text-primary outline-none transition placeholder:text-on-surface-variant/40 disabled:cursor-not-allowed disabled:opacity-60 ${
          error
            ? "border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/10"
            : "border-outline-variant focus:border-primary focus:ring-2 focus:ring-primary/10"
        }`}
        placeholder={placeholder}
        type={type}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
      />
      {error && (
        <p
          id={errorId}
          className="ml-1 mt-1 text-sm text-red-700"
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}

export default AuthField;
