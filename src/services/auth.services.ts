/* eslint-disable @typescript-eslint/no-explicit-any */
import strapiApi from "../lib/axios";
import {
  LoginPayload,
  RegisterPayload,
  StrapiAuthResponse,
  User,
} from "./types";

export const AuthService = {
  async login({
    identifier,
    password,
  }: LoginPayload): Promise<{ token: string; user: User }> {
    try {
      const { data } = await strapiApi.post<StrapiAuthResponse>("/auth/local", {
        identifier,
        password,
      });

      localStorage.setItem("jwt", data.jwt);
      localStorage.setItem("user", JSON.stringify(data.user));

      return {
        token: data.jwt,
        user: data.user,
      };
    } catch (error: any) {
      let defaultErrorMessage = "";

      if (error.response?.data.error.status == 400) {
        defaultErrorMessage = "Credenciales Invalidas";
      } else {
        defaultErrorMessage = "Error al iniciar sesión";
      }

      const errorMessage =
        error.response?.data?.message?.[0]?.messages?.[0]?.message ||
        error.response?.data?.message ||
        defaultErrorMessage;
      throw new Error(errorMessage);
    }
  },

  logout(): void {
    localStorage.removeItem("jwt");
  },

  async checkAuth(): Promise<User | null> {
    const token = localStorage.getItem("jwt");
    if (!token) return null;

    try {
      const { data } = await strapiApi.get<User>("/users/me");
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  },

  async register({
    username,
    email,
    password,
  }: RegisterPayload): Promise<StrapiAuthResponse | null> {
    try {
      const { data } = await strapiApi.post<StrapiAuthResponse>(
        "/auth/local/register",
        { username, email, password }
      );

      if (data.jwt) {
        localStorage.setItem("jwt", data.jwt);
        localStorage.setItem("user", data.user.username);
        return data;
      }

      return null;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message?.[0]?.messages?.[0]?.message ||
        error.response?.data?.message ||
        "Error al registrarse";

      if (error.response?.data.error.status == 400) {
        throw new Error(errorMessage);
      }

      throw new Error(errorMessage);
    }
  },

  async resetPassword(email: string): Promise<void> {
    try {
      await strapiApi.post("/auth/forgot-password", { email });
    } catch (error: any) {
      throw new Error(
        error.response?.data?.message || "Error al solicitar recuperación"
      );
    }
  },

  async getUserInSession() {
    const user = localStorage.getItem("user");

    if (user) {
      const userParsed = JSON.parse(user);

      const data = await strapiApi.get(
        `/users/${userParsed.id}?populate=favoritesCourse`
      );
      console.log(data.data);
      return data.data;
    }
  },
};
