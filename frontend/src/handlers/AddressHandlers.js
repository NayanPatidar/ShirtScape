import { getCookie } from "../services/cookieOperations";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const AddAddress = async (address) => {
  try {
    const token = getCookie("sscape");
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(address),
    };

    fetch("http://localhost:8080/address/add", options)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Address addition successful:", data);
      })
      .catch((error) => {
        console.error("Error adding address:", error);
      });
  } catch (error) {
    console.error("Failed to Add the Address : ", error.message);
  }
};

export const UpdateAddress = async (addressID, UpdatedAddress) => {
  console.log(
    JSON.stringify({ AddressId: addressID, Address: UpdatedAddress })
  );
  try {
    const token = getCookie("sscape");
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ AddressId: addressID, Address: UpdatedAddress }),
    };

    fetch(`${backendUrl}address/update`, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Address Modified successful:", data.message);
      })
      .catch((error) => {
        console.error("Error adding address:", error);
      });
  } catch (error) {
    console.error("Failed to Add the Address : ", error.message);
  }
};

export const DeleteAddress = async (addressID) => {
  try {
    const token = getCookie("sscape");
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ AddressId: addressID }),
    };

    fetch(`${backendUrl}address/delete`, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Address deletion successful:", data.message);
      })
      .catch((error) => {
        console.error("Error adding address:", error);
      });
  } catch (error) {
    console.error("Failed to Add the Address : ", error.message);
  }
};
