<style lang="scss" scoped>
@import './styles.scss';
</style>

<template>
  <v-expansion-panels
    v-model="active"
    accordion
    flat
    multiple
  >
    <v-expansion-panel>
      <v-expansion-panel-header class="indigo lighten-4">
        <span>Корзина</span>
      </v-expansion-panel-header>
      <v-expansion-panel-content>

      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>

</template>

<script>
export default {
  name: 'cart',
  props: {
    items: Array,
    quantity: Number,
    total: Number,
  },
  data() {
    return {
      active: [0],
    };
  },
};
</script>
