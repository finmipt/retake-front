<template>
  <select v-model="selectedValue" @change="onChange">
    <option v-for="(option, index) in props.options" :key="index" :value="option">
      {{ getOptionLabel(option) }}
    </option>
  </select>
</template>

<script setup>
import { ref } from 'vue';
// Передай в этот компонент options - массив объектов
// label - это поле из объекта которое должна отображаться

const props = defineProps({
  options: Array,
  label: String
});

const emit = defineEmits(['update:modelValue']);

// Internal state for selected value
const selectedValue = ref(null);

function getOptionLabel(option) {
  return props.label && typeof option === 'object' ? option[props.label] : option;
}

function onChange() {
  emit('update:modelValue', selectedValue.value);
}
</script>