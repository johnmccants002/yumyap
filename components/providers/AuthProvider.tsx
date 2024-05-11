// src/context/AuthContext.tsx
import { useSegments } from "expo-router";
import React, { ReactNode, createContext, useEffect, useState } from "react";
// import * as SecureStore from "expo-secure-store";
import { decode as decodeToken } from "base-64";

global.atob = decodeToken;
interface AuthContextType {
  user: any; // Adjust the type according to your user model
  token: string | null;
  signout: () => void;
  getToken: () => Promise<string | null>;
  setToken: (token: string) => void;
  loaded: boolean;
  decode: (token: string) => void;
  saveToken: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loaded, setLoaded] = useState<boolean>(false);
  const segments = useSegments();

  const decode = (token: string) => {
    setLoaded(false);
    try {
      const result = JSON.parse(atob(token.split(".")[1]));

      console.log(result);
      setToken(token);
      setUser(result);
      return result;
    } catch (e) {
      console.log(e);
      throw e;
    }
  };

  const signout = () => {
    setUser(null);
    setToken(null);
    console.log("User signed out");
  };

  const getToken = async () => {
    // const token = await SecureStore.getItemAsync("token");

    setToken(token);
    setLoaded(true);

    return token;
  };
  const saveToken = async () => {
    if (token) {
      // await SecureStore.setItemAsync("token", token);
    }
  };
  useEffect(() => {
    if (!loaded) {
      getToken();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        signout,
        getToken,
        setToken,
        loaded,
        decode,
        saveToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
