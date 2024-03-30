<script setup >

import RegCard from "@/components/student/profile/RegCard.vue";
import { ref, onMounted } from 'vue';
import axios from 'axios';
import {BACK_END} from "../../../config.js";
import {getCookie} from "../../controllers/cookie.js";
import QrcodeVue  from "qrcode.vue";
import StudentCard from "@/components/student/profile/StudentCard.vue";

const registrations = ref([]);
const userData = ref([]);

const fetchRegistrations = async () => {
  try {
    const jwt = getCookie('jwt');
    const userResponse = await axios.get(`${BACK_END}/users/user`, {
      headers: {
        'Authorization': `${jwt}`
      }
    });
    userData.value = userResponse.data;
    const userId = userResponse.data._id;
    const response = await axios.get(`${BACK_END}/registration/get/${userId}`, {
      headers: {
        'Authorization': `${jwt}`
      }
    });
    registrations.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  fetchRegistrations();
});
</script>

<template>
  <div >
    <StudentCard :user-data="userData" />
    <h1 class="text-2xl font-bold mb-4 mx-4 text-center">Minu registreeringud</h1>
    <div v-if="registrations" class="flex flex-wrap" >
      <RegCard  v-for="registration in registrations" :key="registration._id" :registration="registration" />
    </div>
  </div>


</template>

<style scoped>

</style>