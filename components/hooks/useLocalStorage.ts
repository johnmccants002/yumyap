import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

type StorageAPI = {
  getItem: (key: string) => Promise<string | null>;
  setItem: (key: string, value: string) => Promise<void>;
};

const useLocalStorage = (
  key: string,
  initialValue: string
): [string | null, (value: string) => void, boolean] => {
  const [storedValue, setStoredValue] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getItem().then((value) => {
      setStoredValue(value);
      setLoading(false);
    });
  }, [key]);

  const storage: StorageAPI =
    Platform.OS === "web"
      ? {
          async getItem(key: string) {
            return localStorage.getItem(key);
          },
          async setItem(key: string, value: string) {
            localStorage.setItem(key, value);
          },
        }
      : {
          async getItem(key: string) {
            return SecureStore.getItemAsync(key);
          },
          async setItem(key: string, value: string) {
            await SecureStore.setItemAsync(key, value);
          },
        };

  const getItem = async () => {
    return await storage.getItem(key);
  };

  const setValue = (value: string) => {
    setStoredValue(value);
    storage.setItem(key, value);
  };

  return [storedValue, setValue, loading];
};

export default useLocalStorage;
