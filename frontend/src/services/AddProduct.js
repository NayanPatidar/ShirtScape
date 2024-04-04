function AddProduct({ product_id }) {
  let Cart_Product = {
    id: product_id,
    size: "S",
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

export default AddProduct;
