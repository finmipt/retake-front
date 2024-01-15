<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import {getCookie} from "../../../../controllers/cookie.js";
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
          src="https://cdn.discordapp.com/attachments/1049814335762993154/1196086088410873916/DALLE_2024-01-14_15.38.18_-_An_abstract_visually_appealing_design_suitable_for_a_profile_picture._The_image_should_be_vibrant_and_colorful_with_a_combination_of_geometric_shape.png?ex=65b658f9&is=65a3e3f9&hm=348f16c4050ca9a2e416dd2c1b60ba3320e866f2affb5787d8b4e947105f19d5&"
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