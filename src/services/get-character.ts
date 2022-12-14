import axios from "axios";
import { Character } from "../types/Character";

export const getCharacter = async (id: string) => {
  try {
    const response: Character = await fetch(
      `https://rickandmortyapi.com/api/character/${id}`,
      {
        headers: {
          accept: "application/json",
        },
      }
    ).then((res) => res.json());
    return response;
  } catch (error) {
    console.error(error);
    return [];
  }
};
