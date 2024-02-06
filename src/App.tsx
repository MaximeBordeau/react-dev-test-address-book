import { FormEvent, useState } from "react";

import AddressBook from "./ui/components/AddressBook/AddressBook";
import InputText from "./ui/components/InputText/InputText";
import Radio from "./ui/components/Radio/Radio";
import Section from "./ui/components/Section/Section";
import useAddressBook from "./ui/hooks/useAddressBook";
import "./App.css";
import useFormFields from "./ui/hooks/useFormFields";
import transformAddress, {
  Address as ModelAddress,
} from "./core/models/address";
import { useDispatch, useSelector } from "react-redux";
import { setAddresses } from "./core/store/addressBook";
import ErrorMessage from "./ui/components/ErrorMessage/ErrorMessage";
import Address from "./ui/components/Address/Address";
import GenericForm from "./ui/components/GenericForm/GenericForm";

function App() {
  const { fields, handleChange, setFields } = useFormFields({
    zipCode: "",
    houseNumber: "",
    firstName: "",
    lastName: "",
    selectedAddress: "",
  });
  /**
   * Results states
   */
  const [error, setError] = useState<string | undefined>(undefined);
  const [addresses, setLocalAddress] = useState<ModelAddress[]>([]);
  /**
   * Redux actions
   */
  const { addAddress } = useAddressBook();
  const dispatch = useDispatch();
  const storedAddresses = useSelector((state: any) => state.addressBook);
  console.log(storedAddresses);

  // HandleChange directement 
  const handleZipCodeChange = handleChange("zipCode");
  const handleHouseNumberChange = handleChange("houseNumber");
  const handleFirstNameChange = handleChange("firstName");
  const handleLastNameChange = handleChange("lastName");
  const handleSelectedAddressChange = handleChange("selectedAddress");

  const handleAddressSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(undefined);
    if (fields.zipCode === "") {
      setError("Please enter zip code!");
      return;
    }
    if (fields.houseNumber === "") {
      setError("Please enter house number!");
      return;
    }
    try {
      const res = await fetch(
        // API de base
        // `http://api.postcodedata.nl/v1/postcode/?postcode=${fields.zipCode}&streetnumber=${fields.houseNumber}&ref=domeinnaam.nl&type=json`
        
        // Changement d'API -> gouv.fr
        // houseNumber = adresse complète
         `https://api-adresse.data.gouv.fr/search/?q=${fields.houseNumber}&type=housenumber&postcode=${fields.zipCode}`

        
      );
      const data = await res.json();
      console.log(data);
      console.log(data.features[0].properties.city);
      console.log(data.features[0].properties.name);


      const constantResData = {
        firstName: "",
        lastName: "",
        city: data.features[0].properties.city,
        // houseNumber: fields.houseNumber,
        houseNumber : data.features[0].properties.name,
        lat: "",
        lon: "",
        postcode: fields.zipCode,
        street: "",
      };
      const transformedAddress = transformAddress(constantResData);
      setLocalAddress([transformedAddress]);
    } catch (error: any) {
      console.log(error?.message);
    }
  };
  const handlePersonSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(undefined);
    if (fields.firstName === "") {
      setError("Entrez un nom !");
      return;
    }
    if (!fields.selectedAddress || !addresses.length) {
      setError(
        "Veuillez selectionner une addresse"
      );
      return;
    }

    const foundAddress: ModelAddress | undefined = addresses.find(
      (address) => address.id === fields.selectedAddress
    );
    const isExist = storedAddresses?.addresses?.find(
      (address: ModelAddress) => address.houseNumber === fields.houseNumber
    );
    if (isExist) {
      setError("Impossible de dupliquer la même adresse");
      return;
    }
    if (foundAddress !== undefined) {
      addAddress({
        ...foundAddress,
        firstName: fields.firstName,
        lastName: fields.lastName,
      });
      dispatch(
        setAddresses([
          {
            ...foundAddress,
            firstName: fields.firstName,
            lastName: fields.lastName,
          },
        ])
      );
    }
  };

  const handleClearFields = () => {
    setFields({
      zipCode: "",
      houseNumber: "",
      firstName: "",
      lastName: "",
      selectedAddress: "",
    });
    setLocalAddress([]);
    setError(undefined)
  };

  return (
    <main>
      <Section variant="light">
        <div className="header">
          <h1 id='title'>Créez votre propre carnet d'adresses !</h1>
          <p id='subtitle'>Entrez le code postal suivi de l'adresse, ajoutez les informations du contact et c'est fait ! 👏</p>
        </div>
        {/* TODO: Create generic <Form /> component to display form rows, legend and a submit button  */}
        <GenericForm
          onSubmit={handleAddressSubmit}
          legend="🏠 Trouver une adresse"
          btnText="Recherche"
        >
          <div className="form-row">
            <InputText
              name="zipCode"
              onChange={handleZipCodeChange}
              placeholder="Code Postal"
              value={fields.zipCode}
            />
          </div>
          <div className="form-row">
            <InputText
              name="houseNumber"
              onChange={handleHouseNumberChange}
              value={fields.houseNumber}
              placeholder="Adresse complète"
            />
          </div>
        </GenericForm>
        {addresses.length > 0 &&
          addresses.map((address) => {
            return (
              <Radio
                name="selectedAddress"
                id={address.id}
                key={address.id}
                onChange={handleSelectedAddressChange}
              >
                <Address address={address} />
              </Radio>
            );
          })}
        {fields.selectedAddress !== "" && (
          <GenericForm
            legend="✏️ Ajouter les informations personnelles"
            onSubmit={handlePersonSubmit}
            btnText="Enregistrer"

          >
            <div className="form-row">
              <InputText
                name="firstName"
                placeholder="Prénom"
                onChange={handleFirstNameChange}
                value={fields.firstName}
              />
            </div>
            <div className="form-row">
              <InputText
                name="lastName"
                placeholder="Nom de famille"
                onChange={handleLastNameChange}
                value={fields.lastName}
              />
            </div>
          </GenericForm>
        )}
        {error && <ErrorMessage message={error} />}

        <button className="clear-btn" onClick={handleClearFields}>
          Effacer la recherche
        </button>
      </Section>

      <Section variant="dark">
        <AddressBook />
      </Section>
    </main>
  );
}

export default App;
