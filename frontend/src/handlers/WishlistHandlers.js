import { getCookie } from "../services/cookieOperations";

export const AddProductToWishlist = (ProductID) => {
  console.log(JSON.stringify({ Product_Id: ProductID }));
  try {
    const token = getCookie("sscape");
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ Product_Id: ProductID }),
    };

    fetch("http://localhost:8080/wishlist/add", options)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Product Added To Wishlist:", data);
      })
      .catch((error) => {
        console.error("Error Adding product to wishlist :", error.message);
      });
  } catch (error) {
    console.error("Failed to Add the Address : ", error.message);
  }
};

export const RemoveProductFromWishlist = (ProductID) => {
  try {
    const token = getCookie("sscape");
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ Product_Id: ProductID }),
    };

    fetch("http://localhost:8080/wishlist/delete", options)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Product Added To Wishlist:", data);
      })
      .catch((error) => {
        console.error("Error Adding product to wishlist :", error.message);
      });
  } catch (error) {
    console.error("Failed to Add the Address : ", error.message);
  }
};
