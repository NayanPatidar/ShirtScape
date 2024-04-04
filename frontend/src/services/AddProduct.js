function AddProduct({ product_id }) {
  let Cart_Product = {
    id: product_id,
    size: "S",
  };

  if (localStorage.getItem("ShirtScape_Cart")) {
    let cart = JSON.parse(localStorage.getItem("ShirtScape_Cart"));

 

    cart.push(Cart_Product);
    localStorage.setItem("ShirtScape_Cart", JSON.stringify(cart));
  } else {
    let cart = [Cart_Product];
    localStorage.setItem("ShirtScape_Cart", JSON.stringify(cart));
  }
}

export default AddProduct;
