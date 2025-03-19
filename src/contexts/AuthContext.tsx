import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { login as apiLogin } from "../services/auth";
import { updatePassword, deleteUser } from "../services/user";
import { IUser } from "../interfaces/User";

interface AuthContextType {
  user: IUser | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  setToken: (token: string | null) => void;
  setUser: (user: IUser | null) => void;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  removeUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const login = async (email: string, password: string) => {
    try {
      const response = await apiLogin(email, password);
      setUser(response.data.user);
      setToken(response.data.token);
      localStorage.setItem("authToken", response.data.token);
      localStorage.setItem("authUser", JSON.stringify(response.data.user));
    } catch (error) {
      console.error("Error en login:", error);
      throw error;
    }
  };

  useEffect(() => {
    try {
      const savedToken = localStorage.getItem("authToken");
      const savedUser = localStorage.getItem("authUser");

      if (savedToken) setToken(savedToken);
      if (savedUser) setUser(JSON.parse(savedUser));
    } catch (error) {
      console.error("Error al cargar el usuario desde el almacenamiento:", error);
      setUser(null);
      setToken(null);
      localStorage.removeItem("authToken");
      localStorage.removeItem("authUser");
    }
  }, []);

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("authToken");
    localStorage.removeItem("authUser");
  };

  const changePassword = async (currentPassword: string, newPassword: string) => {
    try {
      if(!user)
        return
      const response = await updatePassword(user._id, currentPassword, newPassword);
      if (response) {
        setUser(response.data.user);  
        localStorage.setItem("authUser", JSON.stringify(response.data.user));
      }
    } catch (error) {
      console.error("Error al actualizar la contraseña:", error);
      throw error;
    }
  };

  const removeUser = async () => {
    try {
      if(!user)
        return
      const response = await deleteUser(user?._id);
      if (response.error === 0) {
        logout(); 
      }
    } catch (error) {
      console.error("Error al eliminar el usuario:", error);
      throw error;
    }
  };

  const handleUpdateEvent = (event: CustomEvent) => {
    const updatedUser: IUser = event.detail;
    if (updatedUser) {
      setUser(updatedUser);
      localStorage.setItem("authUser", JSON.stringify(updatedUser));
    }
  };

  useEffect(() => {
    window.addEventListener("updateExpectedMonthlyIncome", handleUpdateEvent as EventListener);

    return () => {
      window.removeEventListener("updateExpectedMonthlyIncome", handleUpdateEvent as EventListener);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ 
      user, 
      token, 
      login, 
      logout, 
      setToken, 
      setUser, 
      changePassword, 
      removeUser 
    }}>
      {children}
    </AuthContext.Provider>
  );
};
