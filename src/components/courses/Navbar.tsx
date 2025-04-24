import { useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Avatar,
  Dropdown,
  DropdownDivider,
  DropdownItem,
} from "flowbite-react";

const Navbar = () => {
  const { pathname } = useLocation();

  const isActive = useCallback((path: string) => pathname === path, [pathname]);

  return (
    <section className="flex flex-col justify-between p-3">
      <div className="flex justify-between h-20 bg-gradient-to-r from-blue-800 to-blue-600 rounded-3xl gap-4">
        <div className="flex justify-evenly items-center w-lg rounded-3xl">
          <Link
            to="/courses"
            className="text-2xl font-bold text-white cursor-pointer text-center w-full py-5 "
          >
            HDUP
          </Link>
        </div>

        <nav className="w-lg flex justify-evenly items-center text-lg text-white gap-2">
          <Link
            to="/courses"
            className={`hover:bg-white px-10 py-2 rounded-3xl hover:text-blue-700 transition-all font-bold flex gap-2  items-center ${
              isActive("/courses") ? "bg-white text-blue-700" : ""
            }`}
          >
            Cursos
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
              />
            </svg>
          </Link>
          <Link
            to="/courses/favorites"
            className={`hover:bg-white px-10 py-2 rounded-3xl hover:text-blue-700 transition-all font-bold flex gap-2  items-center ${
              isActive("/courses/favorites") ? "bg-white text-blue-700" : ""
            }`}
          >
            Favoritos
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
          </Link>
          {/*  */}
        </nav>

        <div className="flex justify-evenly items-center w-lg">
          <Dropdown
            label={
              <Avatar
                img="https://t3.ftcdn.net/jpg/03/94/89/90/360_F_394899054_4TMgw6eiMYUfozaZU3Kgr5e0LdH4ZrsU.jpg"
                rounded
              >
                <div className="space-y-1 font-medium dark:text-white">
                  <div>Joe Doe</div>
                </div>
              </Avatar>
            }
            arrowIcon={true}
            inline
          >
            <DropdownItem>
              {" "}
              <Link to={"/profile"}>Perfil</Link>
            </DropdownItem>

            <DropdownDivider />
            <DropdownItem>
              <Link to={"/"}>Cerrar Sesion</Link>
            </DropdownItem>
          </Dropdown>
        </div>
      </div>
    </section>
  );
};

export default Navbar;
