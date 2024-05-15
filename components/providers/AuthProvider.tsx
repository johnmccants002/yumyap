// src/context/AuthContext.tsx
import React, { createContext, ReactNode, useEffect, useState } from "react";
import { useSegments } from "expo-router";
import { decode as decodeToken } from "base-64";
import useLocalStorage from "@/components/hooks/useLocalStorage"; // Ensure the path is correct

global.atob = decodeToken;

interface AuthContextType {
  user: any; // Adjust the type according to your user model
  token: string | null | boolean;
  signout: () => void;
  loaded: boolean;
  decode: (token: string) => void;
  setToken: (token: string | null) => void; // Include setToken in the context
  isOnboarded: boolean; // Update the type to be strictly boolean
  setIsOnboarded: (isOnboarded: boolean) => void; // Setter for isOnboarded
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [storageValues, setStorageValue, loaded] = useLocalStorage({
    token: null, // Initial value for token
    onboarded: false, // Initial value for onboarded
  });

  const { token, onboarded } = storageValues;
  const [user, setUser] = useState<object | null>(null);

  const decode = (token: string) => {
    try {
      const result = JSON.parse(atob(token.split(".")[1]));
      setUser(result);
    } catch (e) {
      console.error("Error decoding token:", e);
      setUser(null);
    }
  };

  const setToken = (value: string | null) => setStorageValue("token", value);
  const setIsOnboarded = (value: boolean) =>
    setStorageValue("onboarded", value);

  const signout = () => {
    setUser(null);
    setToken(null);
  };

  useEffect(() => {
    if (token && typeof token === "string") {
      decode(token);
    }
  }, [token]);

  return (
    <AuthContext.Provider
      value={{
        user: null, // You may want to manage this based on decoded token info
        token,
        signout,
        loaded,
        decode,
        setToken,
        isOnboarded: onboarded as boolean,
        setIsOnboarded,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
