import { fetchProducts } from 'Api';
import Product from 'Models/product';
import Group from 'Models/group';

export default {
  FETCH_PRODUCTS: async ({ commit }) => {
    const { Value: data = {} } = await fetchProducts();
    const { Goods: products = [] } = data;
    const groupsMap = {};

    for (let i = 0; i < products.length; i++) {
      const groupId = products[i].G;
      if (groupsMap[groupId] === undefined) {
        groupsMap[groupId] = new Group(groupId);
      }
      groupsMap[groupId].products.push(new Product(products[i]));
    }
    const groups = Object.values(groupsMap);
    commit('SET_CATEGORIES', groups);
  },
};
