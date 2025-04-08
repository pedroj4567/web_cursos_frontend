import { ThemeConfig } from "flowbite-react";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <main className="h-screen bg-[#F1EFEC]">
      <ThemeConfig dark={false} />
      <Outlet />
    </main>
  );
};

export default AuthLayout;
