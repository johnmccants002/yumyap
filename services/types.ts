export interface SavedResponse {
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
