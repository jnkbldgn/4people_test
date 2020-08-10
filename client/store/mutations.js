import Vue from 'vue';

export default {
  SET_CATEGORIES: (state, groups) => {
    Vue.set(state, 'groups', groups);
  },
  SET_CART: (state, cart) => {
    Vue.set(state, 'cart', cart);
  },
};
