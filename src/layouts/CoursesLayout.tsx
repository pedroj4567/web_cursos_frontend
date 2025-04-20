import { Outlet } from "react-router-dom";
import { Navbar } from "../components/courses";
import { ThemeConfig } from "flowbite-react";

const StudentsLayout = () => {
  return (
    <main className="h-screen">
      <ThemeConfig dark={false} />

      <Navbar />
      <Outlet />
    </main>
  );
};

export default StudentsLayout;
