'use client';
import { useAuthService } from "@/services/AuthService";
import { AuthContextType } from "@/types/allTypes";
import { createContext, useState } from "react";

const AuthContext = createContext<AuthContextType | null>(null);

const AuthContextWrapper = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [userPrinciple, setUserPrinciple] = useState<User | null>(null);
  const { login: apiLogin } = useAuthService();

  const login: (email: string, password: string) => Promise<boolean> = async (email: string, password: string) => {
    const user = await apiLogin({ email, password });
    setUserPrinciple({
      userImage:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSL_rJQS-xaUvygvCxc4O5PzNkG_oOqQsdSew&s",
      ...user,
    });
    setIsLoggedIn(true);
    return true;
  };

  const logout: () => void = () => {
    setIsLoggedIn(false);
    setUserPrinciple(null);
  };

  return (
    <AuthContext.Provider value={{ login, logout, isLoggedIn, userPrinciple }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextWrapper;
export { AuthContext };
