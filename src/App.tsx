import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingPage, LoginPage, SignupPage } from "./pages";
import { AuthLayout } from "./layouts";

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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
