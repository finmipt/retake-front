<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios'; // Убедитесь, что axios установлен
import {getCookie} from "../../../../controllers/cookie.js";
import LogOutButton from "@/components/elements/buttons/LogOutButton.vue";
const userData = ref(null);

async function fetchUserData() {
  try {
    const jwt = getCookie('jwt');
    const response = await axios.get('http://localhost:3000/users/user', {
      headers: {
        'Authorization': `${jwt}`
      }
    });
    userData.value = response.data;
    console.log(userData);
  } catch (error) {
    console.error('Error while getting userData', error);
  }
}

onMounted(fetchUserData);
</script>

<template>
  <div v-if="userData" class="sticky inset-x-0 bottom-0 border-t border-gray-100">
    <LogOutButton/>
    <a href="#" class="flex items-center gap-2 bg-white p-4 hover:bg-gray-50">
      <img
          :alt="userData.name"
          src="https://files.oaiusercontent.com/file-SIIL8eRU33IZCzHwSnOl62m0?se=2024-01-07T17%3A05%3A07Z&sp=r&sv=2021-08-06&sr=b&rscc=max-age%3D31536000%2C%20immutable&rscd=attachment%3B%20filename%3Dd79b6a84-600e-41d3-a517-7088afa9a41c.webp&sig=Y1ebq/uWPMCAFYJ3rbBVhl%2Bp3auYtAFf9H0qVA6cnCI%3D"
          class="h-10 w-10 rounded-full object-cover"
      />

      <div>
        <p class="text-xs">
          <strong class="block font-medium">{{ userData.name }}</strong>
          <span> {{ userData.email }} </span>
        </p>
      </div>
    </a>
  </div>
</template>


<style scoped>

</style>