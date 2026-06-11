import type { RegisterInput, User } from "@/types/allTypes";

// Thin client wrapper over the auth API. Auth state lives in an httpOnly
// cookie set by the server — there is no token in localStorage here.
export const useAuthService = () => {
  const register = async (input: RegisterInput) => {
    const response = await fetch(`/api/v1/users`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Registration failed");
    }
    return data.data as User;
  };

  const login = async (credentials: { email: string; password: string }) => {
    const response = await fetch(`/api/v1/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Login failed");
    }
    return data.data as User;
  };

  const logout = async () => {
    await fetch(`/api/v1/auth/logout`, { method: "POST" });
  };

  const me = async (): Promise<User | null> => {
    const response = await fetch(`/api/v1/auth/me`, { cache: "no-store" });
    if (!response.ok) return null;
    const data = await response.json();
    return data.data as User;
  };

  return { register, login, logout, me };
};
