import { createContext, useContext, useEffect, useReducer, useState } from "react";

const AddressContext = createContext();

const AddressProvider = ({ children }) => {
  const [showForm, setShowForm] = useState(false);

  const [address, setAddress] = useState({
    name: "",
    street: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
    mobile: "",
  });

  return (
    <AddressContext.Provider
      value={{
        showForm,
        setShowForm,
        address,
        setAddress,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};

export { AddressProvider, AddressContext };
