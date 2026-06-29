import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import InstructorDashboard from "./pages/InstructorDashboard";
import LandingPage from "./pages/LandingPage";
import LearnerCoursePage from "./pages/LearnerCoursePage";
import LearnerDashboard from "./pages/LearnerDashboard";
import { AuthProvider } from "./auth/AuthProvider";
import ProtectedRoute from "./auth/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route element={<ProtectedRoute roles={["student"]} />}>
            <Route path="/learn/dashboard" element={<LearnerDashboard />} />
            <Route
              path="/learn/courses/:courseId"
              element={<LearnerCoursePage />}
            />
            <Route
              path="/learn/courses/:courseId/lessons/:lessonId"
              element={<LearnerCoursePage />}
            />
          </Route>
          <Route element={<ProtectedRoute roles={["instructor"]} />}>
            <Route
              path="/instructor/dashboard"
              element={<InstructorDashboard />}
            />
          </Route>
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
