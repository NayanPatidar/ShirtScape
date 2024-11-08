import { getCookie } from "../services/cookieOperations";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

export const ConfirmOrder = async (AddressIndex) => {
  try {
    const token = getCookie("sscape");
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        address_Id: AddressIndex,
      }),
    };

    fetch(`${backendUrl}order/confirmation`, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Order Placed Successfully:", data);
        return 1;
      })
      .catch((error) => {
        console.error("Error adding address:", error);
        return 0;
      });
  } catch (error) {
    console.error("Failed to Place Order : ", error.message);
    return 0;
  }
};
