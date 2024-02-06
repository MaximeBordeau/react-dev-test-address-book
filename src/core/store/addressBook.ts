import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Address } from "../models/address";

const initialState: { addresses: Address[] } = { addresses: [] };

export const addressSlice = createSlice({
  name: "addressBook",
  initialState,
  reducers: {
    addAddress: (state, action: PayloadAction<Address>) => {
      state.addresses = [...state.addresses, action.payload];
    },
    removeAddress: (state, action: PayloadAction<string>) => {
      const filteredAddresses = state.addresses.filter(
        (address) => address.id !== action.payload
      );
      state.addresses = [...filteredAddresses];
    },
    setAddresses: (state, action: PayloadAction<Address[]>) => {
      state.addresses = [...state.addresses, ...action.payload];
    },
  },
});

// Action creators are generated for each case reducer function
export const { addAddress, removeAddress, setAddresses } = addressSlice.actions;

export default addressSlice.reducer;
