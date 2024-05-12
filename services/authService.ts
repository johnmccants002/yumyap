// src/services/authService.ts
import axios from "axios";

const API_URL = "https://yumyap-7d40e95bc185.herokuapp.com";

interface LoginCredentials {
  email: string;
  password: string;
}

interface SignUpData {
  password: string;
  email: string;
  // Add other necessary fields
}

export const login = async (credentials: LoginCredentials): Promise<string> => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    return response.data.token; // Adjust based on how your API responds
  } catch (error) {
    throw new Error("Failed to login");
  }
};

export const signUp = async (data: SignUpData): Promise<any> => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, data);
    return response.data.token; // Adjust based on how your API responds
  } catch (error) {
    throw new Error("Failed to sign up");
  }
};

export const fetchUser = async (token: string): Promise<any> => {
  try {
    const response = await axios.get(`${API_URL}/user`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.user; // Adjust based on how your API responds
  } catch (error) {
    throw new Error("Failed to fetch user");
  }
};
