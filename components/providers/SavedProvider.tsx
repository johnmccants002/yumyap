import { getSavedRecipes } from "@/services/recipeService";
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { GetSavedRecipeArgs } from "@/services/recipeService";
import useAuth from "../hooks/useAuth";

// Define the context interface types for TypeScript
export interface Meal {
  __v: number;
  _id: string;
  cookTime: string;
  createdAt: string;
  cuisine: string;
  image: string;
  ingredients: object[];
  name: string;
  people: number;
  steps: object[];
}

export interface SavedMealsObject {
  __v: number;
  _id: string;
  createdAt: string;
  meal: Meal;
  user: string;
}

interface SavedMealsContextType {
  savedMeals: SavedMealsObject[];
  isLoading: boolean;
  error: string | null;
  refreshMeals: () => void;
}

// Creating the context with default values
const SavedMealsContext = createContext<SavedMealsContextType>({
  savedMeals: [],
  isLoading: false,
  error: null,
  refreshMeals: () => {},
});

// Custom hook to use the SavedMealsContext
export const useSavedMeals = () => useContext(SavedMealsContext);

// Provider component

interface SavedProviderProps {
  children: ReactNode;
}
export const SavedProvider: React.FC<SavedProviderProps> = ({ children }) => {
  const [savedMeals, setSavedMeals] = useState<SavedMealsObject[]>([]);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { user, token } = useAuth();

  const getSavedMeals = async () => {
    if (!user.user.id || !token) return;
    const args = { userId: user.user.id, token: token };

    try {
      // Simulating an API call
      const data = await getSavedRecipes(args);

      setSavedMeals(data);
      setLoading(false);
    } catch (e) {
      setError("Failed to fetch data");
      setLoading(false);
    }
  };

  // Function to refresh the meals from the API
  const refreshMeals = () => {
    setLoading(true);
    getSavedMeals();
  };

  useEffect(() => {
    getSavedMeals();
  }, []);

  return (
    <SavedMealsContext.Provider
      value={{ savedMeals, isLoading, error, refreshMeals }}
    >
      {children}
    </SavedMealsContext.Provider>
  );
};
