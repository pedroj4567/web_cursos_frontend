/* eslint-disable @typescript-eslint/no-explicit-any */
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "./useAuth";
import { toast } from "react-toastify";

const loginSchema = z.object({
  email: z.string().min(1, "El correo es requerido").email("Correo inválido"),
  password: z.string().min(1, "La contraseña es requerida"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export const useLogin = () => {
  const { login } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = handleSubmit(async (data) => {
    try {
      await login(data.email, data.password);
      toast.success("¡Sesión iniciada correctamente!");
    } catch (error: any) {
      toast.error(error.message);
    }
  });

  return { register, errors, onSubmit };
};
