// src/context/AuthContext.tsx
import { useSegments } from "expo-router";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import * as SecureStore from "expo-secure-store";

interface AuthContextType {
  user: any; // Adjust the type according to your user model
  token: string | null;
  login: (username: string, password: string) => void;
  signout: () => void;
  getToken: () => Promise<string | null>;
  setToken: (token: string) => void;
  loaded: boolean;
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

  const login = async (email: string, password: string) => {
    // Here you should integrate your backend authentication logic
    // For example, using fetch or axios to post credentials and receive a token
    console.log("Login logic here", email, password);
    // Dummy token for example
    const dummyToken = "123456";
    setUser({ email });
    setToken(dummyToken);
  };

  const signout = () => {
    setUser(null);
    setToken(null);
    console.log("User signed out");
  };

  const getToken = async () => {
    const token = await SecureStore.getItemAsync("token");

    setToken(token);
    setLoaded(true);

    return token;
  };
  const saveToken = async () => {
    if (token) {
      await SecureStore.setItemAsync("token", token);
    }
  };
  useEffect(() => {
    if (!loaded) {
      getToken();
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, token, login, signout, getToken, setToken, loaded }}
    >
      {children}
    </AuthContext.Provider>
  );
};
