export interface Recipe {
  name: string;
  cuisine: string;
  image: string;
  people: number;
  cookTime: string;
  ingredients: Ingredients;
  steps: Steps;
}

interface Steps {
  "1": string;
  "2": string;
  "3": string;
  "4": string;
  "5": string;
  "6": string;
  "7": string;
}

interface Ingredients {
  "1": string;
  "2": string;
  "3": string;
  "4": string;
  "5": string;
  "6": string;
  "7": string;
  "8": string;
  "9": string;
  "10": string;
  "11": string;
}

export interface SaveRecipeResponse {
  message: string;
  savedMeal: SavedMeal;
}

interface SavedMeal {
  user: string;
  meal: string;
  _id: string;
  createdAt: string;
  __v: number;
}
