export const addDecimals = (num) => {
  return (Math.round(num * 100) / 100).toFixed(2);
};

export const updateCart = (state) => {
  // Calculate items price
  state.itemPrice = state.cartItems
    .reduce((acc, item) => acc + item.price * item.qty, 0)
    .toFixed(2);

  // Calculate shipping price (above $100 free ship, else $10)
  state.shippingPrice = addDecimals(state.itemPrice > 100 ? 0 : 10);

  // Calculate tax price (18%)
  state.taxPrice = addDecimals((state.itemPrice * 0.18).toFixed(2));

  // Calculate total price
  state.totalPrice = (
    Number(state.itemPrice) +
    Number(state.shippingPrice) +
    Number(state.taxPrice)
  ).toFixed(2);

  localStorage.setItem("cart", JSON.stringify(state));

  return state;
};
