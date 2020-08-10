<style lang="scss" scoped>
@import './styles.scss';
</style>

<i18n src="./i18n.json"></i18n>

<template>
  <v-expansion-panels
    accordion
    multiple
    class="cart"
  >
    <v-expansion-panel :disabled="isEmptyCart">
      <v-expansion-panel-header class="indigo lighten-4">
        <v-row class=" flex-column flex-md-row">
          <v-col>{{ $t('header.title') }}</v-col>
          <v-col>{{ $t('header.quantity') }}&nbsp;{{ totalQuantity }}&nbsp;{{ $t('unit') }}</v-col>
          <v-col>{{ $t('header.summary') }}&nbsp;{{ totalCoast }}&nbsp;{{ $t('currency') }}</v-col>
        </v-row>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-simple-table
          v-if="!isEmptyCart"
          fixed-header
          :height="350"
          class="cart__table"
        >
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Наменование</th>
                <th class="text-center">Кол-во</th>
                <th class="text-center">Цена</th>
                <th class="text-center"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in products" :key="item.id">
                <td class="cart__table__name">{{ $t(`products.${item.id}`) }}</td>
                <td class="text-center cart__table__quantity">
                  <product-quantity
                    :min="1"
                    :max="item.maxQuantity"
                    :value="item.quantity"
                    :validateRules="getValidateQuantityRules(item)"
                    @changeQuantity="onChangeQuantity(item, $event)"
                  />
                </td>
                <td class="text-center cart__table__coast">
                  <product-coast
                    unit
                    :value="item.coast"
                    class="justify-center"
                  />
                </td>
                <td class="text-center cart__table__delete">
                  <v-btn icon @click="onDelete(item.id)">
                    <v-icon medium>mdi-delete</v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>

</template>

<script>
import productCoast from 'Components/productCoast';
import productQuantity from 'Components/productQuantity';

export default {
  name: 'cart',
  components: {
    productCoast,
    productQuantity,
  },
  props: {
    products: Array,
    totalQuantity: Number,
    totalCoast: Number,
  },
  computed: {
    isEmptyCart() {
      return this.products.length === 0;
    },
  },
  methods: {
    onDelete(id) {
      this.$emit('deleteProduct', id);
    },
    onChangeQuantity({ id }, quantity) {
      this.$emit('changeQuantity', { id, quantity });
    },
    getValidateQuantityRules({ maxQuantity }) {
      const maxValue = (value) => maxQuantity >= value || `Максимальное количество ${maxQuantity}`;
      const minValue = (value) => value > 0 || 'Минимальное количество 1';
      return [minValue, maxValue];
    },
  },
};
</script>
