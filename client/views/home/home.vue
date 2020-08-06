<style lang="scss" scoped>
@import './styles.scss';
</style>

<template>
  <v-container class="home">
    <v-row class="home__categories d-block">
      <category
        class="category align-self-start"
        v-for="(group, id, index) in GROUPS"
        :class="getClassesCategory(index)"
        :key="id"
        :id="id"
      >
        <div :class="getClassesProducts(group.products.length)" class="d-flex">
          <product
            class=""
            v-for="(product) in group.products"
            :key="`${group.id}-${product.id}`"
            :id="product.id"
            :coast="product.coast"
          />
        </div>
      </category>
    </v-row>
  </v-container>
</template>

<script>
// Components
import category from 'Components/category';
import product from 'Components/product';

// Modules
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'home',
  components: {
    category,
    product,
  },
  async mounted() {
    await this.FETCH_PRODUCTS();
    this.interval = setInterval(this.FETCH_PRODUCTS, 15000);
  },
  destroyed() {
    clearInterval(this.interval);
  },
  data() {
    return {
      categories: [
        {
          id: 0,
          title: 'Книги',
          products: [
            {
              id: 0,
              name: 'Азбука',
              coast: 1.89,
            },
            {
              id: 1,
              name: 'Чехов',
              coast: 10.89,
            },
          ],
        },
        {
          id: 1,
          title: 'Еда',
          products: [
            {
              id: 0,
              name: 'Печенье',
              coast: 1100.89,
            },
            {
              id: 1,
              name: 'Варенье',
              coast: 10100.89,
            },
            {
              id: 2,
              name: 'Колбаса',
              coast: 100.89,
            },
          ],
        },
        {
          id: 2,
          title: 'Мороженное',
          products: [
            {
              id: 0,
              name: 'Пломбир',
              coast: 1.89,
            },
            {
              id: 1,
              name: 'Шоколадное',
              coast: 10.89,
            },
            {
              id: 4,
              name: 'Крем брюле',
              coast: 234.89,
            },
            {
              id: 3,
              name: 'Вкусное',
              coast: 1044.89,
            },
          ],
        },
      ],
    };
  },
  computed: {
    ...mapGetters(['GROUPS']),
  },
  methods: {
    ...mapActions(['FETCH_PRODUCTS']),
    getClassesProducts(length) {
      const oddClasses = ['flex-column'];
      const evenClasses = ['flex-row', 'flex-wrap'];

      return length % 2 === 0 ? evenClasses : oddClasses;
    },
    getClassesCategory(index) {
      const oddClasses = ['float-right'];
      const evenClasses = ['float-left'];

      return index % 2 === 0 ? evenClasses : oddClasses;
    },
  },
};
</script>
