function Cart(products = []) {
  this.products = products;

  this.getTotalQuantity = () => this.products.reduce((acc, item) => {
    const summ = acc + item.quantity;
    return parseFloat(summ.toFixed(2), 10);
  }, 0);

  this.getTotalCoast = () => this.products.reduce((acc, item) => {
    const summ = acc + item.getTotalCoast();
    return parseFloat(summ.toFixed(2), 10);
  }, 0);
}

export default Cart;
