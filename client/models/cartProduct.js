function CartProduct(id, coast, quantity, maxQuantity) {
  this.id = id;
  this.coast = coast;
  this.quantity = quantity;
  this.maxQuantity = maxQuantity;

  this.getTotalCoast = () => this.coast * this.quantity;
}

export default CartProduct;
