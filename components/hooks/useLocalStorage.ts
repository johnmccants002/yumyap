import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

type StorageAPI = {
  getItem: (key: string) => Promise<string | null>;
  setItem: (key: string, value: string) => Promise<void>;
};

const useLocalStorage = (
  key: string,
  initialValue: string | boolean | null
): [
  string | boolean | null,
  (value: string | boolean | null) => void,
  boolean
] => {
  const [storedValue, setStoredValue] = useState<string | boolean | null>(
    initialValue
  );
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    getItem().then((value) => {
      if (value != null) {
        try {
          // Attempt to parse the stored JSON
          const parsed = JSON.parse(value);
          setStoredValue(parsed);
        } catch {
          // If parsing fails, treat as a string
          setStoredValue(value);
        }
      } else {
        setStoredValue(initialValue);
      }
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

  const setValue = (value: string | boolean | null) => {
    setStoredValue(value);
    // Ensure that the value is always serialized to a string before storing
    storage.setItem(key, JSON.stringify(value));
  };

  return [storedValue, setValue, loading];
};

export default useLocalStorage;
