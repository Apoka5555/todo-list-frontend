import { LoginDto } from "../../types/users";
import { baseUrl } from "./task";

export const login = async (
  user: LoginDto
): Promise<{ success: boolean; message: string }> => {
  const res = await fetch(`${baseUrl}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(user),
  });

  const result = await res.json();

  return {
    success: res.ok,
    message: result.message,
  };
};

export const signUp = async (
  user: LoginDto
): Promise<{ success: boolean; message: string }> => {
  const res = await fetch(`${baseUrl}/auth/registration`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(user),
  });

  const result = await res.json();

  return {
    success: res.ok,
    message: result.message,
  };
};

export const logout = async (): Promise<void> => {
  const res = await fetch(`${baseUrl}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  await res.json();
};

export const getCurrentUser = async (): Promise<{
  success: boolean;
  message: string;
  data: string;
}> => {
  const res = await fetch(`${baseUrl}/auth/user`, {
    credentials: "include",
  });
  const result = await res.json();

  return {
    success: res.ok,
    message: result.message,
    data: result.login,
  };
};
