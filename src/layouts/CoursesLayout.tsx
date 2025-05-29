import { Outlet } from "react-router-dom";
import { Navbar } from "../components/courses";
import { ThemeConfig } from "flowbite-react";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const StudentsLayout = () => {
  return (
    <main className="h-screen">
      <ToastContainer />
      <ThemeConfig dark={false} />

      <Navbar />
      <Outlet />
    </main>
  );
};

export default StudentsLayout;
