<style lang="scss" scoped>
@import './styles.scss';
</style>

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
        <span class="text-body-2 text-capitalize">{{$t(`categories.${id}`)}}</span>
      </v-expansion-panel-header>
      <v-expansion-panel-content class="category__content">
        <slot />
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>

export default {
  name: 'category',
  props: {
    id: Number,
  },
  data() {
    return {
      active: [0],
    };
  },
};
</script>
