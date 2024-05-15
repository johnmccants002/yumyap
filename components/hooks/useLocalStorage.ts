import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

type StorageValue = string | boolean | null;
type StorageValues = Record<string, StorageValue>;
type SetValue = (key: string, value: StorageValue) => void;

interface StorageAPI {
  getItem: (key: string) => Promise<string | null>;
  setItem: (key: string, value: string) => Promise<void>;
}

const useLocalStorage = (
  initialValues: StorageValues
): [StorageValues, SetValue, boolean] => {
  const [values, setValues] = useState<StorageValues>(initialValues);
  const [loaded, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const loadAll = async () => {
      const allValues = await Promise.all(
        Object.keys(initialValues).map(async (key) => {
          const value = await storage.getItem(key);
          return {
            key,
            value: value !== null ? JSON.parse(value) : initialValues[key],
          };
        })
      );

      const newValues = allValues.reduce((acc, { key, value }) => {
        acc[key] = value;
        return acc;
      }, {});

      setValues(newValues);
      setLoading(true);
    };

    loadAll();
  }, []);

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

  const setValue: SetValue = (key, value) => {
    const newValue = { ...values, [key]: value };
    setValues(newValue);
    storage.setItem(key, JSON.stringify(value));
  };

  return [values, setValue, loaded];
};

export default useLocalStorage;
