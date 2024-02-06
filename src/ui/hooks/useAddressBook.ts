import { useCallback, useState } from "react";
import { useStore } from "react-redux";

import transformAddress, { Address } from "../../core/models/address";
import databaseService from "../../core/services/databaseService";
import {
  addAddress,
  removeAddress,
  setAddresses,
} from "../../core/store/addressBook";
import { useAppDispatch } from "../../core/store";
import { RootState } from "../../core/store/configure";

export default function useAddressBook() {
  const dispatch = useAppDispatch();
  const store = useStore<RootState>();
  const [loading, setLoading] = useState(true);

  const updateDatabase = useCallback(() => {
    const state = store.getState();
    databaseService.setItem("addresses", state.addressBook.addresses);
  }, [store]);

  return {
    /** Add address to the redux store */
    addAddress: (address: Address) => {
      addAddress(address);
      updateDatabase();
    },
    /** Remove address by ID from the redux store */
    removeAddress: (id: string) => {
      removeAddress(id);
      dispatch({ type: "address/remove", payload: id });
      updateDatabase();
    },
    /** Loads saved addresses from the indexedDB */
    loadSavedAddresses: async () => {
      const saved = await databaseService.getItem("addresses");
      // No saved item found, exit this function
      if (!saved || !Array.isArray(saved)) {
        setLoading(false);
        return;
      }
      setAddresses(saved.map((address) => transformAddress(address)));
      setLoading(false);
    },
    loading,
  };
}
