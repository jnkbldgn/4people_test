<template>
  <v-text-field
    step="1"
    type="number"
    v-model="quantity"
    :min="min"
    :max="max"
    :rules="validateRules"
    @change="onChange"
  />
</template>

<script>
export default {
  name: 'product-quantity',
  props: {
    min: Number,
    max: Number,
    value: Number,
    validateRules: Array,
  },
  data() {
    return {
      quantity: this.value,
    };
  },
  watch: {
    value(newValue) {
      this.quantity = newValue;
    },
  },
  methods: {
    onChange(newValue) {
      const inputValue = parseInt(newValue, 10);
      if (inputValue <= this.max && inputValue >= this.min) {
        this.$emit('changeQuantity', inputValue);
      } else {
        this.quantity = this.value;
      }
    },
  },
};
</script>
