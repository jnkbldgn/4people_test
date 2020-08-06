import { get } from 'Api/instance';

export function fetchProducts() {
  return get('/products');
}

export default {
  fetchProducts,
};
