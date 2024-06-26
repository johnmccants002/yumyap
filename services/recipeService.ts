import axios from "axios";
import {
  Recipe,
  SaveRecipeResponse,
  SavedMealsObject,
  SavedMealsResponse,
} from "@/types";

interface SaveRecipeArg {
  recipe: Recipe;
  userId: number;
  token: string;
}

export interface GetSavedRecipeArgs {
  token: string;
  userId: number;
}

const API_URL = "https://yumyap-7d40e95bc185.herokuapp.com";

export const getRecipe = async (text: string): Promise<any> => {
  try {
    const response = await axios.post(`${API_URL}/ai/openAi`, { text });
    return response.data;
  } catch (error) {
    console.error("Error fetching recipe:", error);
    throw error;
  }
};

export const getSavedRecipes = async (
  args: GetSavedRecipeArgs
): Promise<SavedMealsObject[]> => {
  try {
    const response = await axios.get(`${API_URL}/meal/get/${args.userId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${args.token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching saved recipes:", error);
    throw error;
  }
};

export const saveRecipe = async (
  arg: SaveRecipeArg
): Promise<SaveRecipeResponse> => {
  try {
    const response = await axios.post(
      `${API_URL}/meal/saveMeal/${arg.userId}`,
      JSON.stringify(arg.recipe), // This is the body of the request.
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${arg.token}`,
        },
      }
    );
    return response.data;
  } catch (err) {
    console.log("Error saving recipe", err);
    throw err;
  }
};

export const deleteRecipe = async (id: string, token: string) => {
  try {
    const response = await axios.delete(`${API_URL}/meal/delete/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err) {
    console.log("Error saving recipe", err);
    throw err;
  }
};
