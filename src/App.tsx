import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  CourseDetailPage,
  CoursePage,
  FavoritiesPage,
  LandingPage,
  LoginPage,
  ProfilePage,
  RecoverPassword,
  SearchPage,
  SignupPage,
} from "./pages";
import { AuthLayout, StudentsLayout } from "./layouts";
import { ProtectedRoute } from "./components/protected/ProtectedRouter";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
        </Routes>
        <Routes>
          <Route path="/auth" element={<AuthLayout />}>
            <Route path="/auth/login" element={<LoginPage />} index />
            <Route path="/auth/signup" element={<SignupPage />} />
            <Route path="/auth/recoverPassword" element={<RecoverPassword />} />
          </Route>

          <Route
            element={
              <ProtectedRoute>
                <StudentsLayout />
              </ProtectedRoute>
            }
          >
            <Route path="/courses" element={<CoursePage />} index />
            <Route path="/courses/favorites" element={<FavoritiesPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/courses/search" element={<SearchPage />} />
            <Route path="/courses/:id" element={<CourseDetailPage />} />
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
