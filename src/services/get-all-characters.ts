import axios from "axios";
import { CharacterResponse } from "../types/Character";

export const getAllCharcters = (status?: "alive" | "dead" | "unknown") => {
  try {
    const response = axios
      .get<CharacterResponse>(
        `${process.env.NEXT_PUBLIC_API_URL}/character${
          status ? `?status=${status}` : ""
        }`
      )
      .then((res) => res.data as CharacterResponse);
    return response;
  } catch (error) {
    console.error(error);
    return [];
  }
};
