import { Button } from "flowbite-react";
import { Form, FormField } from "../../components/auth";
import { HiEye, HiIdentification, HiMail } from "react-icons/hi";
import { Link } from "react-router-dom";
import { useSignup } from "../../hooks/useSignup"; // Asegúrate de que la ruta sea correcta

const SignupPage = () => {
  const { register, errors, onSubmit } = useSignup();

  return (
    <section className="w-full flex flex-col items-center justify-center">
      <Form onSubmit={onSubmit}>
        <div className="w-full mb-5 font-bold text-blue-600">
          <h2 className="text-3xl mb-2">Crear una cuenta</h2>
          <span className="text-sm text-slate-500">
            ¡Tu futuro aprendizaje empieza con un clic! Regístrate para no
            perderte nada 💡
          </span>
        </div>
        <FormField
          idField="username"
          label="Nombre de usuario"
          placeholder="Ej: usuario123"
          required={true}
          type="text"
          icon={HiIdentification}
          error={errors.username?.message}
          {...register("username")}
        />
        <FormField
          idField="email"
          label="Correo Electrónico"
          placeholder="Ej: correo@correo.com"
          required={true}
          type="email"
          icon={HiMail}
          error={errors.email?.message}
          {...register("email")}
        />
        <FormField
          idField="confirmEmail"
          label="Confirme su Correo Electrónico"
          placeholder="Ej: correo@correo.com"
          required={true}
          type="email"
          icon={HiMail}
          error={errors.confirmEmail?.message}
          {...register("confirmEmail")}
        />
        <FormField
          idField="password"
          label="Contraseña"
          placeholder="Ej: 1234abABC"
          required={true}
          type="password"
          icon={HiEye}
          error={errors.password?.message}
          {...register("password")}
        />
        <FormField
          idField="confirmPassword"
          label="Confirme su Contraseña"
          placeholder="Ej: 1234abABC"
          required={true}
          type="password"
          icon={HiEye}
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />
        <Button type="submit" className="w-lg mt-8 cursor-pointer">
          Registrarse
        </Button>
      </Form>
      <div>
        <span>
          ¿Ya tienes una cuenta?{" "}
          <Link to="/auth/login" className="text-blue-700 font-bold">
            Ingresa aquí
          </Link>
        </span>
      </div>
    </section>
  );
};

export default SignupPage;
