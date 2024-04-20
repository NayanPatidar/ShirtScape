import React, { useEffect, useState } from "react";
import { useAddress } from "../../../../contexts/AddressContext";

export const AddressList = () => {
  const [Address, setAddress] = useState(null);

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const token = getCookie("sscape");

        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };

        let UserAddress = await fetch(
          `http://localhost:8080/profile/address/get`,
          options
        );

        const data = await UserAddress.json();

        if (!response.ok || UserAddress.message) {
          console.log(`Error: ${data.message}`);
        } else {
          console.log(data);
          setAddress(data);
        }
      } catch (error) {
        console.error("Error during login: ", error.message);
      }
    };
    fetchAddress();
  });

  return (
    <div>
      <ul>
        {/* {addresses.map((item, index) => (
        //   <AddressItem key={index} addressItem={item} />
        ))} */}
      </ul>
    </div>
  );
};
