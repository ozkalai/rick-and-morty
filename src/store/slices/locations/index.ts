import { createSlice } from "@reduxjs/toolkit";
import { Location, LocationResponse } from "../../../types/Location";

type LocationState = {
  selectedLocation: Location;
  locations: LocationResponse;
  currentPage: number;
};

const initialState: LocationState = {
  selectedLocation: [] as unknown as Location,
  locations: {} as LocationResponse,
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
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

export const { setSelectedLocation, setLocations, setCurrentPage } =
  locationsSlice.actions;
export default locationsSlice.reducer;
