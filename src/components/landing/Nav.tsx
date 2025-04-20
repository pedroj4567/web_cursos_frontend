import { Link } from "react-router-dom";
import MenuItem from "./MenuItem";

const Nav = () => {
  return (
    <nav className="w-full  h-20 flex justify-around items-center py-5 gap-3 space-x-3">
      {/* Menu de navegacion */}
      <ol className="flex w-90 justify-evenly">
        <MenuItem title={"Inicio"} id="inicio" />
        <MenuItem title={"Informacion"} id="information" />
        <MenuItem title={"Cursos"} id="courses" />
      </ol>

      {/* Logo */}
      <div className=" w-90 flex items-center justify-center">
        <h1 className="text-2xl text-blue-700 font-bold">HPDU</h1>
      </div>

      {/* Botones de ingreso */}
      <div className="w-90 flex  h-15 items-center-safe  justify-evenly text-md">
        <div>
          <Link
            to={`auth/signup`}
            className="py-2.5 px-4 rounded-3xl font-bold text-blue-700 border-2  hover:bg-blue-700 hover:text-white hover:border hover:border-[#074699] transition-all"
          >
            Registrarse
          </Link>
        </div>
        <div className="py-2 px-3 rounded-3xl font-bold text-white bg-blue-700 hover:bg-white hover:text-[#074799] hover:border hover:border-[#074699] transition-all">
          <Link to={`auth/login`}>Iniciar Sesion</Link>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
