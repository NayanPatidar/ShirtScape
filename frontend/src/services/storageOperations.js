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
  // console.log(`${id} - ${newSize}`);
  const storedData = JSON.parse(localStorage.getItem("ShirtScape_Cart"));

  if (newSize != undefined && storedData) {
    const updatedData = storedData.map((item) => {
      if (item.id == id) {
        // console.log("Size Updated");
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

export {
  AddProduct,
  FindSizeByIdFromLocalStorage,
  ChangeSizeInLocalStorage,
  FindQuantityeByIdFromLocalStorage,
  ChangeQuantityInLocalStorage,
};
