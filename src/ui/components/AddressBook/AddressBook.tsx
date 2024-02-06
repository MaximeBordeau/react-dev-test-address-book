import React from "react";

import Address from "../Address/Address";
import Button from "../Button/Button";
import Card from "../Card/Card";
import useAddressBook from "../../hooks/useAddressBook";

import $ from "./AddressBook.module.css";
import { useAppSelector } from "../../../core/store";
import { useDispatch } from "react-redux";
import { removeAddress } from "../../../core/store/addressBook";

const AddressBook = () => {
  const addresses = useAppSelector((state) => state.addressBook.addresses);
  const dispatch = useDispatch();
  const { loadSavedAddresses, loading } = useAddressBook();

  React.useEffect(() => {
    loadSavedAddresses();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRemove = (id: string) => {
    dispatch(removeAddress(id));
  };

  return (
    <section className={$.addressBook}>
      <h2>📓 Carnet d'adresses ({addresses.length})</h2>
      {!loading && (
        <>
          {addresses.length === 0 && <p>Carnet vide, essayez d'ajouter une adresse 😉</p>}
          {addresses.map((address) => {
            return (
              <Card key={address.id}>
                <div className={$.item}>
                  <div>
                    <h3>
                      {address.firstName} {address.lastName}
                    </h3>
                    <Address address={address} />
                  </div>
                  <div className={$.remove}>
                    <Button
                      variant="secondary"
                      onClick={() => handleRemove(address.id)}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
        </>
      )}
    </section>
  );
};

export default AddressBook;
