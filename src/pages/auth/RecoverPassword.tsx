import { HiMail } from "react-icons/hi";
import { Link } from "react-router-dom";
import { Form, FormField } from "../../components/auth";
import { Button } from "flowbite-react";

const RecoverPassword = () => {
  return (
    <section className="flex  justify-center flex-col px-5">
      <Form>
        <div className="  text-3xl text-blue-700 font-bold mb-5">
          <h1>Recuperar contraseña</h1>
        </div>
        <div className=" text-lg text-slate-500 mb-4 w-lg">
          <p>
            Al ingresar tu correo, te enviaremos un enlace seguro para cambiar
            tu contraseña. Revisa tu bandeja de entrada o spam.
          </p>
        </div>
        <FormField
          icon={HiMail}
          idField="email"
          label=""
          placeholder="correo@correo.com"
          required={true}
          type="email"
        />

        <Button className="mt-5 w-lg cursor-pointer">Enviar correo</Button>
      </Form>

      <div className=" w-lg mx-auto font-bold text-blue-700 text-center">
        <Link to={"/auth/login"} className="">
          Regresar al login
        </Link>
      </div>
    </section>
  );
};

export default RecoverPassword;
