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

export interface TokenPayload {
  exp: number;
  iat: number;
  user: User;
}

interface User {
  id: string;
}

export interface SavedMealsResponse {
  data: SavedMealsObject[];
}

export interface SavedMealsObject {
  __v: number;
  _id: string;
  createdAt: string;
  meal: Meal;
  user: string;
}

interface Meal {
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

const results = [
  {
    __v: 0,
    _id: "663c184851c225701724f220",
    createdAt: "2024-05-09T00:26:48.199Z",
    meal: {
      __v: 0,
      _id: "663c184851c225701724f21e",
      cookTime: "40 minutes",
      createdAt: "2024-05-09T00:26:48.180Z",
      cuisine: "Mexican",
      image: "https://www.example.com/tacos_al_pastor.jpg",
      ingredients: [Object],
      name: "Tacos al Pastor",
      people: 4,
      steps: [Object],
    },
    user: "663abe047f9fdb672691cc67",
  },
  {
    __v: 0,
    _id: "663eccd9a69a4859546ee8fe",
    createdAt: "2024-05-11T01:41:45.827Z",
    meal: {
      __v: 0,
      _id: "663eccd9a69a4859546ee8fc",
      cookTime: "20 minutes",
      createdAt: "2024-05-11T01:41:45.808Z",
      cuisine: "Mexican",
      image: "https://www.example.com/huevos_a_la_mexicana_con_tortilla.jpg",
      ingredients: [Object],
      name: "Huevos a la Mexicana con Tortilla",
      people: 2,
      steps: [Object],
    },
    user: "663abe047f9fdb672691cc67",
  },
  {
    __v: 0,
    _id: "663ee38c5b20914c1d26cf36",
    createdAt: "2024-05-11T03:18:36.908Z",
    meal: {
      __v: 0,
      _id: "663ee38c5b20914c1d26cf34",
      cookTime: "10 minutes",
      createdAt: "2024-05-11T03:18:36.887Z",
      cuisine: "Italian",
      image: "https://www.example.com/caprese_panini.jpg",
      ingredients: [Object],
      name: "Caprese Panini",
      people: 1,
      steps: [Object],
    },
    user: "663abe047f9fdb672691cc67",
  },
  {
    __v: 0,
    _id: "663ee3b25b20914c1d26cf3a",
    createdAt: "2024-05-11T03:19:14.885Z",
    meal: {
      __v: 0,
      _id: "663ee3b25b20914c1d26cf38",
      cookTime: "10 minutes",
      createdAt: "2024-05-11T03:19:14.878Z",
      cuisine: "Indian",
      image: "https://www.example.com/mango_lassi.jpg",
      ingredients: [Object],
      name: "Mango Lassi",
      people: 2,
      steps: [Object],
    },
    user: "663abe047f9fdb672691cc67",
  },
];

export interface UnsplashApiResponse {
  results: UnsplashPhoto[];
}

export interface UnsplashPhoto {
  id: string;
  created_at: string;
  updated_at: string;
  promoted_at: string | null;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  description: string | null;
  alt_description: string | null;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
    small_s3?: string;
  };
  links: {
    self: string;
    html: string;
    download: string;
    download_location: string;
  };
  likes: number;
  liked_by_user: boolean;
  sponsorship: null | {
    impression_urls: string[];
    tagline: string;
    tagline_url: string;
    sponsor: {
      id: string;
      updated_at: string;
      username: string;
      name: string;
      first_name: string;
      last_name: string | null;
      twitter_username: string | null;
      portfolio_url: string | null;
      bio: string | null;
      location: string | null;
      links: {
        self: string;
        html: string;
        photos: string;
        likes: string;
        portfolio: string;
        following: string;
        followers: string;
      };
      profile_image: {
        small: string;
        medium: string;
        large: string;
      };
      instagram_username: string | null;
      total_collections: number;
      total_likes: number;
      total_photos: number;
      accepted_tos: boolean;
      for_hire: boolean;
    };
  };
  user: {
    id: string;
    updated_at: string;
    username: string;
    name: string;
    first_name: string;
    last_name: string | null;
    twitter_username: string | null;
    portfolio_url: string | null;
    bio: string | null;
    location: string | null;
    links: {
      self: string;
      html: string;
      photos: string;
      likes: string;
      portfolio: string;
      following: string;
      followers: string;
    };
    profile_image: {
      small: string;
      medium: string;
      large: string;
    };
    instagram_username: string | null;
    total_collections: number;
    total_illustrations?: number; // if applicable
    total_likes: number;
    total_photos: number;
    total_promoted_illustrations?: number; // if applicable
    total_promoted_photos: number;
    accepted_tos: boolean;
    for_hire: boolean;
  };
  tags?: {
    title: string;
  }[];
  topic_submissions?: {
    [topic: string]: {
      status: string;
      approved_on?: string;
    };
  };
  current_user_collections: any[]; // This could be further defined if structure is known
}
