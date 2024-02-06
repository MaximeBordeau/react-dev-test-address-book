import { useState, ChangeEvent } from 'react';

type FormFields = {
  zipCode: string;
  houseNumber: string;
  firstName: string;
  lastName: string;
  selectedAddress: string;
};

const useFormFields = (initialState: FormFields) => {
  const [fields, setFields] = useState<FormFields>(initialState);

  const handleChange = (fieldName: keyof FormFields) => (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    setFields((prevFields) => ({ ...prevFields, [fieldName]: e.target.value }));
  };

  return { fields, handleChange, setFields };
};

export default useFormFields;
