"use client";
import { AuthContextType, RegisterInput, User } from "@/types/allTypes";
import { createContext, useEffect, useState } from "react";
import { useAuthService } from "@/services/AuthService";

const AuthContext = createContext<AuthContextType | null>(null);

// Deterministic fallback avatar (initials) when the user has no image.
function withAvatar(user: User): User {
  if (user.userImage) return user;
  const name = encodeURIComponent(user.name || user.email || "User");
  return {
    ...user,
    userImage: `https://ui-avatars.com/api/?name=${name}&background=002366&color=fff&bold=true`,
  };
}

const AuthContextWrapper = ({ children }: { children: React.ReactNode }) => {
  const { login: apiLogin, register: apiRegister, logout: apiLogout, me } =
    useAuthService();

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userPrinciple, setUserPrinciple] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Restore the session on first mount from the httpOnly cookie.
  useEffect(() => {
    let active = true;
    me()
      .then((user) => {
        if (!active) return;
        if (user) {
          setUserPrinciple(withAvatar(user));
          setIsLoggedIn(true);
        }
      })
      .finally(() => active && setLoading(false));
    return () => {
      active = false;
    };
    // run once on mount; service fns are stable for our purposes
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = async (email: string, password: string) => {
    const user = await apiLogin({ email, password });
    setUserPrinciple(withAvatar(user));
    setIsLoggedIn(true);
    return true;
  };

  const register = async (input: RegisterInput) => {
    await apiRegister(input);
    return true;
  };

  const logout = async () => {
    await apiLogout();
    setIsLoggedIn(false);
    setUserPrinciple(null);
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, userPrinciple, loading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextWrapper;
export { AuthContext };
