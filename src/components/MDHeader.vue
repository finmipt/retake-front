<script setup >
import {onMounted, ref} from "vue";
import {getCookie} from "@/controllers/cookie.js";
import axios from "axios";
import {BACK_END} from "../../config.js";
import LogOutButton from "@/components/elements/buttons/LogOutButton.vue";

const isMenuOpen = ref(false);

const seed = ref(0);
const burgerMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
}

const menuItems = ref([]);

async function fetchMenuItems() {
  try {
    const jwt = getCookie('jwt');
    const response = await axios.get(`${BACK_END}/users/menu-items`, {
      headers: {
        'Authorization': `${jwt}`
      }
    });
    menuItems.value = response.data;
  } catch (error) {
    console.error('Error fetching menu items:', error);
  }
}
onMounted(fetchMenuItems)

</script>

<template>
   <div class="h-16 bg-white w-full flex content-center justify-end">


     <a class="space-y-2 m-2 hover:cursor-pointer object-right-bottom" @click="burgerMenu()" >
       <div class="w-8 h-0.5 bg-gray-600"></div>
       <div class="w-8 h-0.5 bg-gray-600"></div>
       <div class="w-8 h-0.5 bg-gray-600"></div>
     </a>
   </div>
   <div v-if="isMenuOpen" class="bg-white place-items-end">
     <div class="flex flex-col place-items-end">
       <a v-for="item in menuItems" :href="item.href" class="p-2 "> {{item.text}} </a>
       <LogOutButton/>
     </div>
    </div>

</template>

<style scoped>

</style>