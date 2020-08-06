import Vue from 'vue';

export default {
  SET_CATEGORIES: (state, groups) => {
    Vue.set(state, 'groups', groups);
  },
};
