import { FC } from "react"
import $ from "./Address.module.css";
import { Address } from "../../../core/models/address";

type AddressProps = { address: Address }

const Address: FC<AddressProps> = ({ address }) => {
  return (
    <address className={$.address}>
      {address.street} {address.houseNumber}, {address.postcode}, {address.city}
    </address>
  );
};

export default Address;
