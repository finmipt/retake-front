<script setup>
import MenuItemMain from "@/components/elements/SideBarElements/MenuItemMain.vue";
import MenuDrop from "@/components/elements/SideBarElements/MenuDrop.vue";
import MenuUserInfo from "@/components/elements/SideBarElements/MenuUserInfo.vue";

import {onMounted, ref} from "vue";
import LogOutButton from "@/components/elements/buttons/LogOutButton.vue";
import axios from "axios";
import {getCookie} from "../controllers/cookie.js";
import {BACK_END} from "../../config.js";
const menuItems = ref([
  { text: 'Item 1', href: '/path1' },
  { text: 'Item 2', href: '/path2' },
  { text: 'Item 2', href: '/path2' },
  { text: 'Item 2', href: '/path2' },
  { text: 'Item 2', href: '/path2' },
  { text: 'Item 2', href: '/path2' },

]);


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
  <div class="flex w-1/5 h-screen flex-col justify-between border-e bg-white">
    <h1 class="text-2xl text-black font-extrabold ">
      Järelevastamise
      <strong class="font-extrabold text-red-700 sm:block"> Portal </strong>
    </h1>
    <div class="px-4 py-6">
    <span class="grid h-16 w-32 place-content-center rounded-2xl bg-black text-xs text-gray-600">
      <img src="https://kutsehariduskeskus.ee/wp-content/uploads/2023/11/iv_logo_bold.png"  class="object-scale-down" alt="IDKHK"/>
    </span>

      <ul class="mt-6 space-y-1">
        <MenuItemMain
            v-for="item in menuItems"
            :key="item.href"
            :text="item.text"
            :href="item.href"
        />



      </ul>

    </div>
    <MenuUserInfo/>
  </div>
</template>

<style scoped>

</style>