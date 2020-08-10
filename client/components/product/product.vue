<style lang="sass" scoped>
@import './styles.scss';
</style>

<template>
  <v-btn
    text
    class="product flex-grow-1 text-body-2 pa-0"
    :class="classes"
    :disabled="disabled"
    @click="$emit('click')"
  >
      <div
        class="product__name flex-grow-1 pl-2"
      >
        {{$t(`products.${id}`)}}&nbsp;({{quantity}})
      </div>
      <productCoast class="product__coast" :value="coast" />
  </v-btn>
</template>

<script>
import productCoast from 'Components/productCoast';

export default {
  name: 'product',
  components: {
    productCoast,
  },
  props: {
    id: Number,
    quantity: Number,
    coast: Number,
    hasCart: Boolean,
    disabled: Boolean,
  },
  computed: {
    classes() {
      const { hasCart } = this;
      return {
        indigo: hasCart,
        'lighten-4': hasCart,
      };
    },
  },
};
</script>
