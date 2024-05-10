import axios from "axios";
import { Recipe } from "@/types";

const API_URL = "https://yumyap-7d40e95bc185.herokuapp.com";

export const getRecipe = async (text: string): Promise<any> => {
  console.log(text);
  try {
    const response = await axios.post(`${API_URL}/ai/openAi`, { text });
    console.log("response", response);
    return response.data;
  } catch (error) {
    console.error("Error fetching recipe:", error);
    throw error;
  }
};

export const getSavedRecipes = async (id: any): Promise<Recipe> => {
  console.log(id);
  try {
    const response = await axios.get(`${API_URL}/meal/get/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching saved recipes:", error);
    throw error;
  }
};
