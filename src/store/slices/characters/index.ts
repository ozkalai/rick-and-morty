import { createSlice } from "@reduxjs/toolkit";
import { Character } from "../../../types/Character";

type CharacterState = {
  characters: Character[];
  filteredCharacters: Character[];
  isLoading: boolean;
  currentPage: number;
  error: string | null;
  filter: "" | "alive" | "dead" | "unknown";
};

const initialState: CharacterState = {
  characters: [] as Character[],
  filteredCharacters: [] as Character[],
  isLoading: false,
  currentPage: 1,
  error: null,
  filter: "",
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
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    setFilteredCharacters: (state, action) => {
      state.filteredCharacters = action.payload;
    },
  },
});

export const {
  setCharacters,
  setIsLoading,
  setCurrentPage,
  setError,
  setFilter,
} = charactersSlice.actions;
export default charactersSlice.reducer;
