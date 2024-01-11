<script setup>


const props = defineProps({
  text: String,
  href: String
});
</script>

<template>
  <li>
    <a :href=href class="block rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-700">
      {{text}}
    </a>
  </li>
</template>

<style scoped>

</style>