import Vue from 'vue';
import vuetify from 'Plugins/vuetify';
import store from 'Store';
import i18n from 'I18n';
import App from '@/App.vue';

Vue.config.devtools = process.argv.mode === 'development';

const app = new Vue({
  i18n,
  vuetify,
  store,
  render: (h) => h(App),
});

app.$mount('#app');
