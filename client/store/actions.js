import { fetchProducts } from 'Api';
import Product from 'Models/product';
import Group from 'Models/group';

export default {
  FETCH_PRODUCTS: async ({ commit }) => {
    const { Value: data = {} } = await fetchProducts();
    const { Goods: products = [] } = data;
    const groups = {};

    for (let i = 0; i < products.length; i++) {
      const groupId = products[i].G;
      if (groups[groupId] === undefined) {
        groups[groupId] = new Group(groupId);
      }
      groups[groupId].products.push(new Product(products[i]));
    }
    commit('SET_CATEGORIES', groups);
  },
};
