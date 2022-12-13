import { createSlice } from "@reduxjs/toolkit";

type LocationState = {
  selectedLocation: string;
};

const initialState: LocationState = {
  selectedLocation: "",
};

const locationsSlice = createSlice({
  name: "locations",
  initialState,
  reducers: {
    setSelectedLocation: (state, action) => {
      state.selectedLocation = action.payload;
    },
  },
});

export const { setSelectedLocation } = locationsSlice.actions;
export default locationsSlice.reducer;
