import { getCookie } from "../services/cookieOperations";

const backendUrl = process.env.REACT_APP_BACKEND_URL;

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

    fetch(`${backendUrl}wishlist/add`, options)
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

    fetch(`${backendUrl}wishlist/delete`, options)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Product Deleted From Wishlist:", data);
      })
      .catch((error) => {
        console.error("Error Deleting Product from Wishlist :", error.message);
      });
  } catch (error) {
    console.error(
      "Failed to Delete the Product from Wishlist : ",
      error.message
    );
  }
};

export const MoveProductToCart = (ProductID) => {
  try {
    const token = getCookie("sscape");
    console.log(token);
    const data = {
      product_id: ProductID,
      quantity: 1,
      size: `S`,
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    };

    fetch(`${backendUrl}AddUserCart`, options)
      .then((response) => response.json())
      .then((data) => {
        console.log("Successfully Added Product to cart");
        RemoveProductFromWishlist(ProductID);
      })
      .catch((error) => console.error("Error:", error));
  } catch (error) {
    console.error(
      "Failed to Delete the Product from Wishlist : ",
      error.message
    );
  }
};
