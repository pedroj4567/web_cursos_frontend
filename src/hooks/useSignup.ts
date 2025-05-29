/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { href, useNavigate } from "react-router-dom";
import { AuthService } from "../services";

export const signupSchema = z
  .object({
    username: z
      .string()
      .min(3, "El nombre de usuario debe tener al menos 3 caracteres"),
    email: z.string().min(1, "El correo es requerido").email("Correo inválido"),
    confirmEmail: z.string().min(1, "Confirme su correo"),
    password: z
      .string()
      .min(6, "La contraseña debe tener al menos 6 caracteres"),
    confirmPassword: z.string().min(1, "Confirme su contraseña"),
  })
  .refine((data) => data.email === data.confirmEmail, {
    message: "Los correos no coinciden",
    path: ["confirmEmail"],
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export type SignupFormData = z.infer<typeof signupSchema>;

type RegisterPayload = {
  username: string;
  email: string;
  password: string;
};

export const useSignup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const navigate = useNavigate();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const registerData: RegisterPayload = {
        username: data.username,
        email: data.email,
        password: data.password,
      };

      const response = await AuthService.register(registerData);

      if (!response) {
        toast.success("¡Error en registro!");
      }

      toast.success("¡Registro exitoso!");

      setTimeout(() => {
        navigate("/courses");
      }, 1000);
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.error?.message ||
        error.response?.data?.message ||
        "Error al registrarse";
      toast.error(errorMessage);
    }
  });

  return { register, errors, onSubmit };
};
