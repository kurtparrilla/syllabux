import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthModal from "../components/landing/AuthModal";
import Footer from "../components/landing/Footer";
import Header from "../components/landing/Header";
import Hero from "../components/landing/Hero";
import Philosophy from "../components/landing/Philosophy";
import ShaderBackground from "../components/landing/ShaderBackground";
import { useAuth } from "../auth/authContext";
import { getDashboardPath } from "../auth/authRoutes";

function LandingPage() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  const handleLoginSuccess = (session) => {
    setIsAuthOpen(false);
    navigate(getDashboardPath(session.user.role));
  };

  return (
    <>
      <ShaderBackground />
      <Header
        onSignIn={() => {
          if (isAuthenticated) {
            navigate(getDashboardPath(user.role));
          } else {
            setIsAuthOpen(true);
          }
        }}
      />
      <main className="relative z-10">
        <Hero />
        <Philosophy />
      </main>
      <Footer />
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </>
  );
}

export default LandingPage;
