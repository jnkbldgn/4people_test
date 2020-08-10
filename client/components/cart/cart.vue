<style lang="scss" scoped>
@import './styles.scss';
</style>

<i18n src="./i18n.json"></i18n>

<template>
  <v-expansion-panels
    accordion
    multiple
  >
    <v-expansion-panel>
      <v-expansion-panel-header class="indigo lighten-4">
        <v-row>
          <v-col>{{ $t('header.title') }}</v-col>
          <v-col>{{ $t('header.quantity') }}&nbsp;{{ totalQuantity }}&nbsp;{{ $t('unit') }}</v-col>
          <v-col>{{ $t('header.summary') }}&nbsp;{{ totalCoast }}&nbsp;{{ $t('currency') }}</v-col>
        </v-row>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-simple-table v-if="!isEmptyCart">
          <template v-slot:default>
            <thead>
              <tr>
                <th class="text-left">Наменование</th>
                <th width="300px" class="text-center">Кол-во</th>
                <th width="400px" class="text-center">Цена</th>
                <th width="70px" class="text-center"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in products" :key="item.id">
                <td>{{ $t(`products.${item.id}`) }}</td>
                <td class="text-center">
                  <product-quantity
                    :min="1"
                    :max="item.maxQuantity"
                    :value="item.quantity"
                    :validateRules="getValidateQuantityRules(item)"
                    @changeQuantity="onChangeQuantity(item, $event)"
                  />
                </td>
                <td class="text-center">
                  <product-coast
                    unit
                    :value="item.coast"
                    class="justify-center"
                  />
                </td>
                <td class="text-center">
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
  data() {
    return {
      validateQuantity: [
        (...rest) => console.info(rest) || 'Error',
      ],
    };
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
