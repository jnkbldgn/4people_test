<style lang="sass" scoped>
@import './styles.scss';
</style>

<i18n src="./i18n.json"></i18n>

<template>
  <v-btn text class="product text-body-2 pa-0">
      <div class="product__name flex-grow-1 pl-2">{{$t(id, { quantity })}}</div>
      <div :class="coastClasses" class="product__coast lighten-5 pr-2">{{coast}}</div>
  </v-btn>
</template>

<script>
export default {
  name: 'product',
  props: {
    id: Number,
    quantity: Number,
    coast: Number,
  },
  destroyed() {
    clearTimeout(this.timeout);
  },
  data() {
    return {
      coastClasses: {
        'blue-grey': true,
        red: false,
        green: false,
      },
    };
  },
  watch: {
    coast: {
      handler: 'changeCoast',
    },
  },
  methods: {
    changeCoast(newValue, oldValue) {
      this.coastClasses['blue-grey'] = newValue === oldValue;
      this.coastClasses.red = newValue < oldValue;
      this.coastClasses.green = newValue > oldValue;
      this.timeout = setTimeout(this.resetCoastClasses, 5000);
    },
    resetCoastClasses() {
      this.coastClasses['blue-grey'] = true;
      this.coastClasses.red = false;
      this.coastClasses.green = false;
    },
  },
};
</script>
