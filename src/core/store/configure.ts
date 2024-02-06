import { configureStore } from '@reduxjs/toolkit'
import addressReducer from './addressBook'

const store = configureStore({
  reducer: {
    addressBook: addressReducer
  }
})

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
