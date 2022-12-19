import { LocationResponse } from "../types/Location";

export const getLocations = async (page: number = 1) => {
  try {
    const response: LocationResponse = await fetch(
      `https://rickandmortyapi.com/api/location?page=${page}`,
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
