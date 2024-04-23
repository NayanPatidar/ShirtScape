import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

const AddressContext = createContext();

const AddressProvider = ({ children }) => {
  const [showForm, setShowForm] = useState(false);
  const [AllowEdit, setAllowEdit] = useState(false);
  const [AddressID, setAddressID] = useState(-1);

  const [addressInForm, setAddressInForm] = useState({
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
        addressInForm,
        setAddressInForm,
        AllowEdit,
        setAllowEdit,
        AddressID,
        setAddressID,
      }}
    >
      {children}
    </AddressContext.Provider>
  );
};

export { AddressProvider, AddressContext };
