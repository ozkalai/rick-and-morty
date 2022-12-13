import { createSlice } from "@reduxjs/toolkit";
import { Character } from "../../../types/Character";

type CharacterState = {
  characters: Character[];
  isLoading: boolean;
  currentPage: number;
  error: string | null;
};

const initialState: CharacterState = {
  characters: [] as Character[],
  isLoading: false,
  currentPage: 2,
  error: null,
};

const charactersSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {
    setCharacters: (state, action) => {
      state.characters = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setCharacters, setIsLoading, setCurrentPage, setError } =
  charactersSlice.actions;
export default charactersSlice.reducer;
