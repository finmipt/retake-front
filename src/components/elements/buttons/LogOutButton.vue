<script setup >
import {BACK_END} from "../../../../config";
  import { ref } from 'vue';
  import axios from 'axios';

  const logoutUser = async () => {
  try {
  // Clear token from local storage or where it is stored
  localStorage.removeItem('jwt'); // or cookies, sessionStorage, etc.

  // Redirect to login page or home page
  window.location.href = `${BACK_END}/logout`;
} catch (error) {
  console.error('Error during logout:', error);
}
};
</script>

<template>
  <!-- Base -->

  <a
      class="inline-block rounded border border-red-400 bg-red-400 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-red-400 focus:outline-none focus:ring active:text-red-400"
      @click = "logoutUser"
  >
    Loggi välja
  </a>

</template>

<style scoped>

</style>