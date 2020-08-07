<style lang="scss" scoped>
@import './styles.scss';
</style>

<i18n src="./i18n.json"></i18n>

<template>
  <v-expansion-panels
    v-model="active"
    accordion
    flat
    multiple
    class="category"
  >
    <v-expansion-panel>
      <v-expansion-panel-header class="blue-grey lighten-4">
        <span class="text-body-2 text-capitalize">{{$t(id)}}</span>
      </v-expansion-panel-header>
      <v-expansion-panel-content class="category__content">
        <div :class="classesProducts" class="d-flex">
          <product
            v-for="(product) in products"
            :key="product.id"
            :id="product.id"
            :quantity="product.quantity"
            :coast="product.coast"
          />
        </div>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import product from 'Components/product';

export default {
  name: 'category',
  components: {
    product,
  },
  props: {
    id: [String, Number],
    products: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      active: [0],
    };
  },
  computed: {
    classesProducts() {
      const oddClasses = ['flex-column'];
      const evenClasses = ['flex-row', 'flex-wrap'];
      return this.products.length % 2 === 0 ? evenClasses : oddClasses;
    },
  },
};
</script>
