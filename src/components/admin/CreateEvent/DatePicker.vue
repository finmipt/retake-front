<script setup >
import { ref } from 'vue';

const selectedDate = ref(null);

</script>

<template>
  <div class="caption-bottom">
    <div class="flex justify-end mr-5">
      <input
          type="date"
          class="form-input px-4 py-3 rounded-md border-2 border-gray-300 focus:border-blue-500 m-2.5 "
          v-model="selectedDate"
      />
    </div>
  </div>
</template>

<style scoped>

</style>