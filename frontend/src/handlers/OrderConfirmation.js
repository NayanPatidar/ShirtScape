export const ConfirmOrder = async (
  product_id,
  quantity,
  size,
  amountPaid,
  addressId
) => {
  try {
    const token = getCookie("sscape");
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        product_id: product_id,
        quantity: quantity,
        size: size,
        amountPaid: amountPaid,
        addressId: addressId,
      }),
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
