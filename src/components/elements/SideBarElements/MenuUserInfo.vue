<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import {getCookie} from "../../../controllers/cookie.js";
import LogOutButton from "@/components/elements/buttons/LogOutButton.vue";
import {BACK_END} from "../../../../config.js";
const userData = ref(null);

async function fetchUserData() {
  try {
    const jwt = getCookie('jwt');
    const response = await axios.get(`${BACK_END}/users/user`, {
      headers: {
        'Authorization': `${jwt}`
      }
    });
    userData.value = response.data;

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
          src="https://icon-library.com/images/person-icon-png-transparent/person-icon-png-transparent-13.jpg"
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