<style lang="scss" scoped>
@import './styles.scss';
</style>

<template>
  <v-container class="home">
    <cart
      class="home__cart"
      :total-coast="CART_TOTAL_COAST"
      :total-quantity="CART_TOTAL_QUANTITY"
      :products="CART_PRODUCTS"
      @deleteProduct="deleteProduct"
      @changeQuantity="setQuantityProduct"
    />
    <v-row v-if="GROUPS && GROUPS.length" class="home__categories">
      <v-col>
        <category
          class="category"
          v-for="index in middle"
          :key="GROUPS[index - 1].id"
          :id="GROUPS[index - 1].id"
        >
          <div
            v-if="GROUPS[index - 1].products.length"
            :class="getClassesProducts(GROUPS[index - 1].products.length)"
            class="d-flex"
          >
            <product
              v-for="(product) in GROUPS[index - 1].products"
              :key="product.id"
              :id="product.id"
              :quantity="product.quantity"
              :coast="product.coast"
              :disabled="isDisabledProduct(product)"
              :has-cart="hasCart(product.id)"
              @click="addCart(product)"
            />
          </div>
        </category>
      </v-col>
      <v-col>
        <category
          class="category"
          v-for="index in (GROUPS.length) - middle"
          :key="GROUPS[middle + index - 1].id"
          :id="GROUPS[middle + index - 1].id"
        >
          <div
            v-if="GROUPS[middle + index - 1].products.length"
            :class="getClassesProducts(GROUPS[middle + index - 1].products.length)"
            class="d-flex"
          >
            <product
              v-for="(product) in GROUPS[middle + index - 1].products"
              :key="product.id"
              :id="product.id"
              :quantity="product.quantity"
              :coast="product.coast"
              :disabled="isDisabledProduct(product)"
              :has-cart="hasCart(product.id)"
              @click="addCart(product)"
            />
          </div>
        </category>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// Components
import category from 'Components/category';
import cart from 'Components/cart';
import product from 'Components/product';

// Modules
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'home',
  components: {
    category,
    cart,
    product,
  },
  computed: {
    ...mapGetters(['GROUPS', 'CART_TOTAL_QUANTITY', 'CART_TOTAL_COAST', 'CART_PRODUCTS']),
    middle() {
      return this.GROUPS ? Math.round(this.GROUPS.length / 2) : 0;
    },
  },
  methods: {
    ...mapActions(['FETCH_PRODUCTS', 'ADD_TO_CART', 'DELETE_FROM_CART', 'SET_PRODUCT_QUANTITY']),
    addCart(item) {
      this.ADD_TO_CART({ product: item });
    },
    hasCart(id) {
      return this.CART_PRODUCTS.some((item) => item.id === id);
    },
    isDisabledProduct(item) {
      const cartProduct = this.CART_PRODUCTS.find((el) => el.id === item.id);
      return cartProduct && cartProduct.quantity === cartProduct.maxQuantity;
    },
    getClassesProducts(productsCount) {
      const oddClasses = ['flex-column'];
      const evenClasses = ['flex-row', 'flex-wrap'];
      return productsCount % 2 === 0 ? evenClasses : oddClasses;
    },
    deleteProduct(id) {
      this.DELETE_FROM_CART(id);
    },
    setQuantityProduct({ id, quantity }) {
      this.SET_PRODUCT_QUANTITY({ id, quantity });
    },
  },
};
</script>
