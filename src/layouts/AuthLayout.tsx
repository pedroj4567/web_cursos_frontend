import { ThemeConfig } from "flowbite-react";
import { PiStudentBold } from "react-icons/pi";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <main className="h-screen bg-white grid grid-cols-2">
      <ThemeConfig dark={false} />

      <div className="flex flex-col justify-center items-center bg-gradient-to-r from-blue-800 to-blue-600 rounded-r-3xl">
        <div className="w-full text-center text-white font-bold text-3xl mb-2 flex  justify-center  items-center">
          <h1 className="">Herramienta Profesional de Aprendizaje</h1>
          <PiStudentBold className="text-4xl ml-4" />
        </div>
        <div className="flex  items-center justify-center h-1/2   rounded-3xl my-3">
          <img
            src={"/images/authhero.webp"}
            alt="Course hero image"
            className="w-lg h-[500px]"
            draggable="false"
          />
        </div>

        <div className="w-full text-center font-bold text-2xl text-white mb-10">
          <h2 className="mb-1">
            Aprende, crece y triunfa con nuestros cursos.
          </h2>

          <span className="text-xl">¡Tu futuro comienza aquí! 🚀</span>
          <div className="w-58 bg-white h-0.5 mx-auto mt-1"></div>
        </div>
      </div>
      <Outlet />
    </main>
  );
};

export default AuthLayout;
