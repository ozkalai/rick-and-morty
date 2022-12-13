import { CharacterResponse } from "../types/Character";

export const getAllCharacters = async (
  status?: "alive" | "dead" | "unknown"
) => {
  try {
    const response: CharacterResponse = await fetch(
      `https://rickandmortyapi.com/api/character${
        status ? `?status=${status}` : ""
      }`
    ).then((res) => res.json());
    return response;
  } catch (error) {
    console.error(error);
    return [];
  }
};
