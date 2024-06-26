// src/context/AuthContext.tsx
import React, { createContext, ReactNode, useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { decode as decodeToken } from "base-64";
import useLocalStorage from "@/components/hooks/useLocalStorage";
import { fetchUser } from "@/services/authService";

global.atob = decodeToken;

interface UserType {
  exp: number;
  iat: number;
  user: {
    id: string;
  };
}

interface AuthContextType {
  user: UserType | null;
  token: string | null | boolean;
  signout: () => void;
  loaded: boolean;
  setToken: (token: string | null) => void;
  isOnboarded: boolean;
  setIsOnboarded: (isOnboarded: boolean) => void;
  decode: (token: string) => void;
  currentUser: any | null;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [storageValues, setStorageValue, loaded] = useLocalStorage({
    token: null,
    onboarded: false,
  });

  const { token, onboarded } = storageValues;
  const [user, setUser] = useState<UserType | null>(null);
  const [currentUser, setCurrentUser] = useState(null);
  const router = useRouter();

  const decode = (token: string) => {
    console.log(token, "THIS IS THE TOKEN TO DECODE");
    try {
      const result: UserType = JSON.parse(atob(token.split(".")[1]));
      if (new Date(result.exp * 1000) < new Date()) {
        console.log("Token expired.");
        signout();
      } else {
        console.log("THIS IS THE USER: ", result);
        setUser(result);
      }
    } catch (e) {
      console.error("Error decoding token:", e);
      setUser(null);
    }
  };

  const getUser = async () => {
    if (!user || !token) return;
    const params = {
      token: `${token}`,
      id: user ? user?.user.id : "",
    };
    console.log("THESE are the params", params);
    try {
      const user = await fetchUser(params);
      setCurrentUser(user);
      console.log(user, "get user");
    } catch (e) {
      console.log("Unable to fetch user", e);
    }
  };

  const setToken = (value: string | null) => setStorageValue("token", value);
  const setIsOnboarded = (value: boolean) =>
    setStorageValue("onboarded", value);

  const signout = () => {
    setUser(null);
    setToken(null);
    router.replace("/(auth)/login");
  };

  useEffect(() => {
    if (token && typeof token === "string") {
      decode(token);
    }
  }, [token]);

  useEffect(() => {
    if (user && token) {
      getUser();
    }
  }, [user, token]);

  useEffect(() => {
    if (loaded && !token) {
      if (!onboarded) {
        router.replace("/(auth)/onboarding");
      } else {
        router.replace("/(auth)/login");
      }
    }
  }, [loaded, token, onboarded]);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        signout,
        loaded,
        setToken,
        isOnboarded: onboarded as boolean,
        setIsOnboarded,
        decode,
        currentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
