import store from 'Store';

const eventType = 'PRODUCTS';

function handle(event) {
  const parseData = JSON.parse(event.data);
  store.dispatch('SET_PRODUCTS', parseData);
}

export default {
  eventType,
  handle,
};
