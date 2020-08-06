import Vue from 'vue';
import vuetify from 'Plugins/vuetify';
import App from '@/App.vue';

Vue.config.devtools = process.argv.mode === 'development';

const app = new Vue({
  vuetify,
  render: (h) => h(App),
});

app.$mount('#app');
