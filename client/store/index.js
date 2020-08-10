import Vue from 'vue';
import Vuex from 'vuex';
import state from 'Store/state';
import getters from 'Store/getters';
import actions from 'Store/actions';
import mutations from 'Store/mutations';

Vue.use(Vuex);

const store = new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  strict: process.argv.mode === 'development',
  devtools: process.argv.mode === 'development',
});

export default store;
