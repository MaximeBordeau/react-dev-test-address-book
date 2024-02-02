type AddressInfo = Partial<{
  firstName: string,
  lastName: string,
  city: string,
  houseNumber: string,
  lat: string,
  lon: string,
  postcode: string,
  street: string
}>

// TODO: Add typing for this element
export type Address = any

export default function transformAddress(data: AddressInfo): Address {
  const { firstName, lastName, city, houseNumber, lat, lon, postcode, street } =
    data;
  return {
    city: city || "",
    firstName: firstName || "",
    houseNumber: houseNumber || "",
    id: `${lat || Date.now()}_${lon || Math.random()}`,
    lastName: lastName || "",
    postcode: postcode || "",
    street: street || "",
  };
}
