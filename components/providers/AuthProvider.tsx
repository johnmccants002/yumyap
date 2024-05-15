// src/context/AuthContext.tsx
import React, { createContext, ReactNode, useState, useEffect } from "react";
import { useSegments } from "expo-router";
import { decode as decodeToken } from "base-64";
import useLocalStorage from "@/components/hooks/useLocalStorage"; // Ensure the path is correct

global.atob = decodeToken;

interface AuthContextType {
  user: any; // Adjust the type according to your user model
  token: string | boolean | null;
  signout: () => void;
  loaded: boolean;
  decode: (token: string) => void;
  setToken: (token: string | null) => void; // Include setToken in the context
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [token, setToken, loaded] = useLocalStorage("token", null); // useLocalStorage manages token
  const segments = useSegments();

  const decode = (token: string) => {
    try {
      const result = JSON.parse(atob(token.split(".")[1]));
      setUser(result);
    } catch (e) {
      console.error("Error decoding token:", e);
      setUser(null); // Optionally handle decoding errors more gracefully
    }
  };

  const signout = () => {
    setUser(null);
    setToken(null); // Clear token in local storage
  };

  useEffect(() => {
    if (token && typeof token === "string") {
      decode(token);
    }
  }, [token]); // Decode user info when token changes

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        signout,
        loaded,
        decode,
        setToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
