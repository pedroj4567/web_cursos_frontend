import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  CoursePage,
  FavoritiesPage,
  LandingPage,
  LoginPage,
  ProfilePage,
  RecoverPassword,
  SignupPage,
} from "./pages";
import { AuthLayout, StudentsLayout } from "./layouts";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>

      <Routes>
        <Route path="/auth" element={<AuthLayout />}>
          <Route path="/auth/login" element={<LoginPage />} index />
          <Route path="/auth/signup" element={<SignupPage />} />
          <Route path="/auth/recoverPassword" element={<RecoverPassword />} />
          {/* <Route
            path="/auth/changePassword/:token"
            element={<ChangePassword />}
          /> */}
        </Route>

        <Route element={<StudentsLayout />}>
          <Route path="/courses" element={<CoursePage />} index />
          <Route path="/courses/favorites" element={<FavoritiesPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
