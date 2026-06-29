import { useEffect, useState } from "react";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

function AuthModal({
  isOpen,
  onClose,
  onLoginSuccess,
}) {
  const [mode, setMode] = useState("signup");
  const [registeredEmail, setRegisteredEmail] = useState("");
  const [registrationMessage, setRegistrationMessage] = useState("");

  const handleRegistrationSuccess = (_data, variables) => {
    setRegisteredEmail(variables.email.trim());
    setRegistrationMessage("account created. sign in to continue");
    setMode("login");
  };

  const selectMode = (nextMode) => {
    setMode(nextMode);
    if (nextMode !== "login") setRegistrationMessage("");
  };

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-primary/20 p-4 backdrop-blur-md"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <section
        className="glass-panel-heavy max-h-[calc(100vh-2rem)] w-full max-w-[480px] animate-modal-in overflow-y-auto rounded-[1.5rem] p-8 shadow-glass md:p-12"
        role="dialog"
        aria-modal="true"
        aria-labelledby="auth-title"
      >
        <div className="relative mb-10 text-center">
          <div className="px-12">
            <h2
              id="auth-title"
              className="mb-2 font-display-lg text-headline-lg text-primary lowercase"
            >
              syllabux
            </h2>
            <p className="text-on-surface-variant">academic serenity awaits.</p>
          </div>
          <button
            className="absolute right-0 top-0 flex h-12 w-12 items-center justify-center rounded-full border border-glass-border bg-white/40 text-primary transition hover:bg-white/70"
            type="button"
            aria-label="close auth modal"
            onClick={onClose}
          >
            <span className="material-symbols-outlined block">close</span>
          </button>
        </div>

        <div className="mb-8 flex border-b border-outline-variant">
          {["signup", "login"].map((tab) => (
            <button
              key={tab}
              className={`flex-1 border-b-2 py-3 font-label-md text-label-md lowercase transition ${
                mode === tab
                  ? "border-primary font-semibold text-primary"
                  : "border-transparent text-on-surface-variant hover:text-primary"
              }`}
              type="button"
              onClick={() => selectMode(tab)}
            >
              {tab === "signup" ? "sign up" : "login"}
            </button>
          ))}
        </div>

        {mode === "signup" ? (
          <RegisterForm onSuccess={handleRegistrationSuccess} />
        ) : (
          <LoginForm
            initialEmail={registeredEmail}
            onSuccess={onLoginSuccess}
            registrationMessage={registrationMessage}
          />
        )}

        <p className="mx-auto mt-8 max-w-[280px] text-center font-label-sm text-label-sm leading-relaxed text-on-surface-variant/60">
          by continuing, you agree to our{" "}
          <a className="underline hover:text-primary" href="#terms">
            terms
          </a>{" "}
          and{" "}
          <a className="underline hover:text-primary" href="#privacy">
            privacy policy
          </a>
          .
        </p>
      </section>
    </div>
  );
}

export default AuthModal;
