<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import SideBar from "@/components/SideBar.vue";
import Banner from "@/components/test components/Banner.vue";
import LogIn from "@/components/LogIn.vue";
import {BACK_END} from "../config.js";
import {getCookie} from "./controllers/cookie.js";
import MDHeader from "@/components/MDHeader.vue";

const isAuthenticated = ref(false);

// Функция для проверки статуса аутентификации
async function checkAuthStatus() {
  try {
    const jwtToken = getCookie('jwt')
    const response = await axios.get(`${BACK_END}/jwt/check`, {
      headers: {
        'Authorization': `${jwtToken}`
      }
    });

    isAuthenticated.value = response.data.isAuthenticated; //  { isAuthenticated: true/false }
  } catch (error) {
    console.error('Ошибка при проверке аутентификации:', error);
  }
}

onMounted(checkAuthStatus);
</script>

<template>
  <MDHeader v-if="isAuthenticated" class="block md:hidden sticky top-0 mx-auto "/>
  <div class="flex flex-auto">
    <SideBar v-if="isAuthenticated" class="hidden md:block"/>
    <div class="flex md:w-4/5 " v-if="isAuthenticated">
        <RouterView class=""/>
    </div>
    <LogIn v-else />

  </div>



</template>

<style scoped>

</style>
