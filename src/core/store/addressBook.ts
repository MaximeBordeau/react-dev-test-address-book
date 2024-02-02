import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Address } from '../models/address'

const initialState: { addresses: Address[] } = { addresses: [] }

//TODO: correct address slice reducers
export const addressSlice = createSlice({
  name: 'addressBook',
  initialState,
  reducers: {
    addAddress: (state, action: PayloadAction<Address>) => {
      state.addresses = []
    },
    removeAddress: (state, action: PayloadAction<string>) => {
      state.addresses = []
    },
    setAddresses: (state, action: PayloadAction<Address[]>) => {
      state.addresses = []
    },
  }
})

// Action creators are generated for each case reducer function
export const { addAddress, removeAddress, setAddresses } = addressSlice.actions

export default addressSlice.reducer
