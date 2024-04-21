import { getCookie } from "../services/cookieOperations";

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

    fetch("/address/add", options)
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
  } catch (error) {}
};

export const UpdateAddress = async (address) => {};

export const DeleteAddress = async (address) => {};
