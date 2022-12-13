import axios from "axios";
import { Character } from "../types/Character";

export const getCharacter = (id: string) => {
  try {
    const response = axios
      .get<Character>(`${process.env.NEXT_PUBLIC_API_URL}/character/${id}`)
      .then((res) => res.data);
    return response;
  } catch (error) {
    console.error(error);
    return [];
  }
};
