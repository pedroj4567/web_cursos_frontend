import { Form, FormField } from "../../components/auth";
import { Button } from "flowbite-react";
import { HiMail } from "react-icons/hi";
import { IoEyeSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const LoginPage = () => {
  const { register, errors, onSubmit } = useLogin();

  return (
    <section className="h-full relative">
      <ToastContainer />
      <div className="flex flex-col justify-center h-full bg-white px-10 rounded-2xl">
        <Form
          className="flex flex-col items-center justify-center"
          onSubmit={onSubmit}
        >
          <div className="text-left text-4xl mb-7 font-bold text-blue-700">
            <h2>¡Bienvenido nuevamente!</h2>
            <span className="text-sm text-slate-500">
              Continúa aprendiendo donde lo dejaste. ¡Ingresa ahora y sigue
              avanzando!
            </span>
          </div>
          <FormField
            icon={HiMail}
            idField="email"
            placeholder="correo@example.com"
            required={true}
            type="email"
            label="Correo electrónico"
            error={errors.email?.message}
            {...register("email")}
          />
          <FormField
            icon={IoEyeSharp}
            idField="password"
            placeholder="Ej: pass1234"
            required={true}
            type="password"
            label="Contraseña"
            error={errors.password?.message}
            {...register("password")}
          />
          <div className="w-lg px-1">
            <div>
              <span>
                ¿Has olvidado tu contraseña?
                <Link
                  to={"/auth/recoverPassword"}
                  className="border px-3 py-0.5 rounded-2xl text-blue-500 hover:bg-blue-600 hover:text-white transition-all text-sm font-bold mx-4"
                >
                  Ingresa aquí
                </Link>
              </span>
            </div>
          </div>
          <Button type="submit" className="w-lg mt-8 cursor-pointer">
            Ingresar
          </Button>
          <div className="text-center mt-4">
            ¿Aún no te has registrado?{" "}
            <Link to="/auth/signup" className="text-blue-600 font-bold">
              ¡Hazlo aquí y accede a todos los cursos!
            </Link>
          </div>
        </Form>
      </div>
    </section>
  );
};

export default LoginPage;
