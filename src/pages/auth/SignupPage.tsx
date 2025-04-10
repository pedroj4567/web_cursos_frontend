import { Button } from "flowbite-react";
import { Form, FormField } from "../../components/auth";
import { HiEye, HiIdentification, HiMail } from "react-icons/hi";
import { Link } from "react-router-dom";
const SignupPage = () => {
  return (
    <section className="w-full flex flex-col items-center justify-center">
      <Form>
        <div className="w-full mb-5 font-bold text-blue-600  ">
          <h2 className="text-3xl mb-2 ">Crear una cuenta</h2>
          <span className="text-sm text-slate-500">
            ¡Tu futuro aprendizaje empieza con un clic! Regístrate para no
            perderte nada 💡
          </span>
        </div>
        <FormField
          idField="name"
          label="Nombre"
          placeholder=""
          required={true}
          type={"text"}
          icon={HiIdentification}
        />
        <FormField
          idField="lastname"
          label="Apellido"
          placeholder=""
          required={true}
          type={"text"}
          icon={HiIdentification}
        />
        <FormField
          idField="email"
          label="Correo Electrónico"
          placeholder="Ej: correo@correo.com"
          required={true}
          type={"email"}
          icon={HiMail}
        />
        <FormField
          idField="email"
          label=" Confirme su Correo Electrónico"
          placeholder="Ej: correo@correo.com"
          required={true}
          type={"email"}
          icon={HiMail}
        />
        <FormField
          idField="password"
          label="Confirme su Contraseña"
          placeholder="Ej: 1234abABC"
          required={true}
          type={"email"}
          icon={HiEye}
        />
        <FormField
          idField="confirm-password"
          label="Confirme su Contraseña"
          placeholder="Ej: 1234abABC"
          required={true}
          type={"email"}
          icon={HiEye}
        />

        <Button className="w-lg mt-8 cursor-pointer">Registrarse</Button>
      </Form>

      <div>
        <span>
          Ya tienes una cuenta?{" "}
          <Link to="/auth/login" className="text-blue-700 font-bold">
            Ingresa aquí
          </Link>
        </span>
      </div>
    </section>
  );
};

export default SignupPage;
