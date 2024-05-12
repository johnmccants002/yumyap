import axios from "axios";
import { UnsplashApiResponse, UnsplashPhoto } from "@/types"; // Ensure this path matches where you've stored your interfaces

export const fetchImages = async (
  searchQuery: string
): Promise<UnsplashPhoto[] | undefined> => {
  try {
    const response = await axios.get<UnsplashApiResponse>(
      `https://api.unsplash.com/search/photos`,
      {
        params: {
          query: searchQuery,
          client_id: process.env.EXPO_PUBLIC_UNSPLASH_API_KEY,
          per_page: 1,
        },
      }
    );
    console.log(response.data.results);
    return response.data.results; // This will return an array of UnsplashPhoto or undefined if the catch block is executed
  } catch (error) {
    console.error("Error fetching images:", error);
    return undefined; // Explicitly return undefined on error to match the return type
  }
};
