<style lang="scss" scoped>
@import './styles.scss';
</style>

<template>
  <div
    :class="coastClasses"
    class="product-coast lighten-5 pr-2 pl-2"
  >
    {{value}}&nbsp;{{ $t('currency') }}<span v-if="unit">/{{ $t('unit') }}</span>
  </div>
</template>

<script>
export default {
  name: 'product-coast',
  props: {
    value: Number,
    unit: {
      type: Boolean,
      default: false,
    },
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
    value: {
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
