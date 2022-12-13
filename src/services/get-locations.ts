import axios from "axios";
import { LocationResponse } from "../types/Location";

export const getLocations = async (page: number = 1) => {
  try {
    const response: LocationResponse = await axios
      .get<any>(`${process.env.NEXT_PUBLIC_API_URL}/location/?page=${page}`)
      .then((res) => res.data);
    return response;
  } catch (error) {
    console.error(error);
    return [];
  }
};
