import { Form, FormField } from "../../components/auth";
import { Button } from "flowbite-react";

import { HiMail } from "react-icons/hi";
import { IoEyeSharp } from "react-icons/io5";
const LoginPage = () => {
  return (
    <section className="h-full">
      <div className=" w-1/3 h-full mx-auto flex flex-col space-y-5 justify-center items-center ">
        <div className="text-2xl">
          <h2>Formulario de login</h2>
        </div>

        <div className="w-full">
          <Form>
            <FormField
              icon={HiMail}
              idField="email"
              placeholder="correo@example.com"
              required={true}
              type="email"
              label="Correo Electronico"
            />

            <FormField
              icon={IoEyeSharp}
              idField="password"
              placeholder="Ej: pass1234"
              required={true}
              type="password"
              label="Contraseña"
            />

            <Button className="w-full mt-8">Ingresar</Button>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
