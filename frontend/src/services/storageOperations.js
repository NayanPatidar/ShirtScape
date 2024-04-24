// Add Product to the Local Storage
function AddProduct({ product_id }) {
  let Cart_Product = {
    id: product_id,
    size: "S",
    quantity: 1,
  };

  if (localStorage.getItem("ShirtScape_Cart")) {
    let cart = JSON.parse(localStorage.getItem("ShirtScape_Cart"));

    if (!cart.some((item) => item.id === product_id)) {
      cart.push(Cart_Product);
      localStorage.setItem("ShirtScape_Cart", JSON.stringify(cart));
      return "Product Added to Cart";
    }

    return "Product Already Present";
  } else {
    let cart = [Cart_Product];
    localStorage.setItem("ShirtScape_Cart", JSON.stringify(cart));
    return "Product Added to Cart";
  }
}

// Find Size by ID From the Local Storage
const FindSizeByIdFromLocalStorage = (id) => {
  const storedData = JSON.parse(localStorage.getItem("ShirtScape_Cart"));
  const filteredData = storedData.filter((item) => item.id == `${id}`);
  return filteredData ? filteredData[0].size : null;
};

// Change Size using ID from the Local Storage
const ChangeSizeInLocalStorage = (id, newSize) => {
  const storedData = JSON.parse(localStorage.getItem("ShirtScape_Cart"));

  if (newSize != undefined && storedData) {
    const updatedData = storedData.map((item) => {
      if (item.id == id) {
        return { ...item, size: newSize };
      }
      return item;
    });
    localStorage.setItem("ShirtScape_Cart", JSON.stringify(updatedData));
  }
};

// Find Quantity by ID From the Local Storage
const FindQuantityeByIdFromLocalStorage = (id) => {
  const storedData = JSON.parse(localStorage.getItem("ShirtScape_Cart"));
  const filteredData = storedData.filter((item) => item.id == `${id}`);
  return filteredData ? filteredData[0].quantity : null;
};

// Change Qunatity using ID from Local Storage
const ChangeQuantityInLocalStorage = (id, newQuantity) => {
  const storedData = JSON.parse(localStorage.getItem("ShirtScape_Cart"));

  if (newQuantity != undefined && storedData) {
    const updatedData = storedData.map((item) => {
      if (item.id == id) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    localStorage.setItem("ShirtScape_Cart", JSON.stringify(updatedData));
  }
};

//Delete the product from the Local Storage For Wishlist
const DeleteProductFromLocalStorage = (id) => {
  const storedData = JSON.parse(localStorage.getItem("ShirtScape_Cart"));
  if (storedData && id) {
    const index = storedData.findIndex((item) => parseInt(item.id) == id);
    storedData.splice(index, 1);
    localStorage.setItem("ShirtScape_Cart", JSON.stringify(storedData));
  }
};

// Add Product to the Local Storage For Wishlist
function AddProductToWishlistInLocalStorage({ product_id }) {
  let Wishlist_Product = {
    id: product_id,
    size: "S",
    quantity: 1,
  };
  console.log("Product ID In : ", product_id);

  if (localStorage.getItem("ShirtScape_Wishlist")) {
    let wishlist = JSON.parse(localStorage.getItem("ShirtScape_Wishlist"));

    if (!wishlist.some((item) => item.id === product_id)) {
      wishlist.push(Wishlist_Product);
      localStorage.setItem("ShirtScape_Wishlist", JSON.stringify(wishlist));
      console.log("Product Added to Wishlist");
      return "Product Added to Wishlist";
    }
    console.log("Product Already Present In Wishlist");

    return "Product Already Present In Wishlist";
  } else {
    let wishlist = [Wishlist_Product];
    localStorage.setItem("ShirtScape_Wishlist", JSON.stringify(wishlist));
    console.log("Product Added to Wishlist: New Local Storage");
    return "Product Added to Wishlist";
  }
}

//Delete the product from the Local Storage
const DeleteProductOfWishlistFromLocalStorage = (id) => {
  const storedData = JSON.parse(localStorage.getItem("ShirtScape_Wishlist"));
  if (storedData && id) {
    const index = storedData.findIndex((item) => parseInt(item.id) == id);
    storedData.splice(index, 1);
    localStorage.setItem("ShirtScape_Wishlist", JSON.stringify(storedData));
  }
};

export {
  AddProduct,
  FindSizeByIdFromLocalStorage,
  ChangeSizeInLocalStorage,
  FindQuantityeByIdFromLocalStorage,
  ChangeQuantityInLocalStorage,
  DeleteProductFromLocalStorage,
  AddProductToWishlistInLocalStorage,
  DeleteProductOfWishlistFromLocalStorage,
};
