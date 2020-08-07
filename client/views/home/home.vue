<style lang="scss" scoped>
@import './styles.scss';
</style>

<template>
  <v-container class="home">
    <v-row>
      <v-col>
        <cart />
      </v-col>
    </v-row>
    <v-row v-if="GROUPS && GROUPS.length" class="home__categories">
      <v-col>
        <category
          class="category"
          v-for="index in middle"
          :key="GROUPS[index - 1].id"
          :id="GROUPS[index - 1].id"
          :products="GROUPS[index - 1].products"
        />
      </v-col>
      <v-col>
        <category
          class="category"
          v-for="index in (GROUPS.length) - middle"
          :key="GROUPS[middle + index - 1].id"
          :id="GROUPS[middle + index - 1].id"
          :products="GROUPS[middle + index - 1].products"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// Components
import category from 'Components/category';
import cart from 'Components/cart';

// Modules
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'home',
  components: {
    category,
    cart,
  },
  async mounted() {
    await this.FETCH_PRODUCTS();
    this.interval = setInterval(this.FETCH_PRODUCTS, 15000);
  },
  destroyed() {
    clearInterval(this.interval);
  },
  computed: {
    ...mapGetters(['GROUPS']),
    middle() {
      return this.GROUPS ? Math.round(this.GROUPS.length / 2) : 0;
    },
  },
  methods: {
    ...mapActions(['FETCH_PRODUCTS']),
  },
};
</script>
