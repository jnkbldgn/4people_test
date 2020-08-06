<i18n src="./i18n.json"></i18n>

<template>
  <v-card outlined>
    <v-card-title class="ma-0 pa-0 cyan lighten-5">
      <v-btn block text>
        <span class="d-flex justify-space-between flex-grow-1">
          <span class="text-body-2 text-capitalize">{{$t(id)}}</span>
          <v-icon>mdi-chevron-down</v-icon>
        </span>
      </v-btn>
    </v-card-title>
    <v-card-text class="ma-0 pa-0">
      <slot />
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'category',
  props: {
    id: [String, Number],
  },
};
</script>
