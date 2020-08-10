import { fetchProducts } from 'Api';
import Product from 'Models/product';
import CartProduct from 'Models/cartProduct';
import Group from 'Models/group';
import Cart from 'Models/cart';

export default {
  FETCH_PRODUCTS: async ({ commit, getters, dispatch }) => {
    const { Value: data = {} } = await fetchProducts();
    const { Goods: products = [] } = data;
    const cartProducts = [...getters.CART_PRODUCTS];
    const groupsMap = {};

    for (let i = 0; i < products.length; i++) {
      const groupId = products[i].G;
      if (groupsMap[groupId] === undefined) {
        groupsMap[groupId] = new Group(groupId);
      }
      const product = new Product(products[i]);
      const cartProduct = cartProducts.find((item) => item.id === product.id);
      if (cartProduct) {
        cartProduct.coast = product.coast;
      }
      groupsMap[groupId].products.push(product);
    }
    const groups = Object.values(groupsMap);
    commit('SET_CATEGORIES', groups);
    dispatch('CHANGE_CART', cartProducts);
  },
  CHANGE_CART: ({ commit }, products) => {
    const cart = new Cart(products);
    commit('SET_CART', cart);
  },
  ADD_TO_CART: ({ dispatch, getters }, { product, quantity = 1 }) => {
    const products = [...getters.CART_PRODUCTS];
    let cartProduct = products.find((item) => item.id === product.id);
    if (cartProduct) {
      cartProduct.quantity += quantity;
    } else {
      cartProduct = new CartProduct(product.id, product.coast, 1, product.quantity);
      products.push(cartProduct);
    }
    dispatch('CHANGE_CART', products);
  },
  DELETE_FROM_CART: ({ dispatch, getters }, id) => {
    let products = [...getters.CART_PRODUCTS];
    const product = products.find((item) => item.id === id);
    if (product) {
      products = products.filter((item) => item !== product);
    }
    dispatch('CHANGE_CART', products);
  },
  SET_PRODUCT_QUANTITY: ({ dispatch, getters }, { id, quantity }) => {
    const products = [...getters.CART_PRODUCTS];
    const cartProduct = products.find((item) => item.id === id);
    cartProduct.quantity = quantity;
    dispatch('CHANGE_CART', products);
  },
};
