<style lang="sass" scoped>
@import './styles.scss';
</style>

<i18n src="./i18n.json"></i18n>

<template>
  <v-btn text class="product text-capitalize text-body-2 pa-0">
      <div class="product__name flex-grow-1 pl-2">{{$t(id)}}</div>
      <div class="product__coast blue-grey lighten-5 pr-2">{{coast}}</div>
  </v-btn>
</template>

<script>
export default {
  name: 'product',
  props: {
    id: Number,
    coast: Number,
  },
};
</script>
