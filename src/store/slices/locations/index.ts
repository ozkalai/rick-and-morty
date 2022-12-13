import { createSlice } from "@reduxjs/toolkit";
import { Location, LocationResponse } from "../../../types/Location";

type LocationState = {
  selectedLocation: Location;
  locations: LocationResponse;
  isLoading: boolean;
  currentPage: number;
};

const initialState: LocationState = {
  selectedLocation: [] as unknown as Location,
  locations: {} as LocationResponse,
  isLoading: false,
  currentPage: 2,
};

const locationsSlice = createSlice({
  name: "locations",
  initialState,
  reducers: {
    setSelectedLocation: (state, action) => {
      state.selectedLocation = action.payload;
    },
    setLocations: (state, action) => {
      state.locations = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

export const {
  setSelectedLocation,
  setLocations,
  setIsLoading,
  setCurrentPage,
} = locationsSlice.actions;
export default locationsSlice.reducer;
