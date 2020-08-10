export default {
  GROUPS: (state) => state?.groups || [],
  CART_PRODUCTS: (state) => state?.cart?.products || [],
  CART_TOTAL_COAST: (state) => state?.cart?.getTotalCoast() || 0,
  CART_TOTAL_QUANTITY: (state) => state?.cart?.getTotalQuantity() || 0,
};
