type AddressInfo = Partial<{
  firstName: string;
  lastName: string;
  city: string;
  houseNumber: string;
  lat: string;
  lon: string;
  postcode: string;
  street: string;
}>;

export type Address = {
  id: string;
  firstName: string;
  lastName: string;
  city: string;
  houseNumber: string;
  postcode: string;
  street: string;
};

export default function transformAddress(data: AddressInfo): Address {
  const { firstName, lastName, city, houseNumber, lat, lon, postcode, street } =
    data;
  return {
    city: city || "",
    firstName: firstName || "",
    houseNumber: houseNumber || "",
    id: `${lat || Date.now()}_${lon || Math.random() * 1000000}_${houseNumber}`,
    lastName: lastName || "",
    postcode: postcode || "",
    street: street || "",
  };
}
