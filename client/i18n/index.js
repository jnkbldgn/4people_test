import Vue from 'vue';
import VueI18n from 'vue-i18n';
import messages from './messages.json';

Vue.use(VueI18n);

const i18n = new VueI18n({
  silentFallbackWarn: true,
  locale: 'ru',
  messages,
});

export default i18n;
