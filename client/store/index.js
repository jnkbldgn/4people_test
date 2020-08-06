import Vue from 'vue';
import Vuex from 'vuex';
import getters from 'Store/getters';
import actions from 'Store/actions';
import mutations from 'Store/mutations';

Vue.use(Vuex);

const store = new Vuex.Store({
  getters,
  actions,
  mutations,
});

export default store;
