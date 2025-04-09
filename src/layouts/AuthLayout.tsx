import { ThemeConfig } from "flowbite-react";
import { Outlet } from "react-router-dom";
import { HeroSide } from "../components/auth";

const AuthLayout = () => {
  return (
    <main className="h-screen bg-white grid grid-cols-2">
      <ThemeConfig dark={false} />
      <HeroSide />
      <Outlet />
    </main>
  );
};

export default AuthLayout;
