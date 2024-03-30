<script setup >

import { defineProps, defineEmits, ref, onMounted } from 'vue';
import {QrcodeStream} from 'vue-qrcode-reader';
import axios from "axios";
import {BACK_END} from "../../../../config.js";
import {getCookie} from "../../../controllers/cookie.js";

const props = defineProps({
  eventId: {
    type: String,
    required: true
  }
})

// Определение props

const isOpen = defineModel({
  required: true,
})

const isDetected = ref(false);
const isUpdated = ref(false);

const registrations = ref([]);
const user = ref({});
// Методы
function close() {
  isOpen.value = false;
}

async function onDetect(result) {
  try {
    console.log('QR code detected:', result);
    const userId = result[0].rawValue;
    isDetected.value = true;
    const registrationResponse = await axios.get(`${BACK_END}/registration/get_by_user_and_event/${userId}/${props.eventId}`);
    registrations.value = registrationResponse.data;
    const userResponse = await axios.get(`${BACK_END}/users/user_by_id/${userId}`);
    user.value = userResponse.data;

  } catch (error) {
    console.error('Error while getting registration data', error);

  }}

async function submitPresence() {
  try {
    const jwt = getCookie('jwt');
    // for registration in registrations update isPresent to true
    for (let registration of registrations.value) {
      const response = await axios.put(`${BACK_END}/registration/update_presence/${registration._id}/true`, {
        headers: {
          'Authorization': `${jwt}`
        }
      });
      console.log(response.data);
    }
    isUpdated.value = true;
  } catch (error) {
    console.error('Error while updating presence', error);
  }
}

async function cancel() {
  isDetected.value = false;
  registrations.value = [];
  isUpdated.value = false;
}



</script>

<template>
  <div v-if="isOpen" class="inset-0 bg-black bg-opacity-50 flex  items-center sticky justify-start">
    <div class="bg-white rounded-lg m-4 p-1 md:p-6 space-y-4 max-w-md">
      <div v-if="isDetected && !isUpdated">
        <h1 class="text-2xl font-bold mb-4 mx-4">{{user.name}}</h1>
        <h1 class="text-2xl font-thin mb-4 mx-4" v-for="registration in registrations">{{registration.subject}} <b>{{registration.work_title}}</b></h1>
        <button @click="submitPresence" class="py-2 px-4 bg-green-700 font-bold text-white rounded hover:bg-green-900">Kinnita</button>
        <button @click="cancel" class="py-2 px-4 mx-4 bg-red-500 font-bold text-white rounded hover:bg-red-700"> Kaotada </button>
      </div>
      <div v-if="isUpdated">
        <h1 class="text-2xl font-bold mb-4 mx-4 text-green-900">Registreerimine on edukalt uuendatud</h1>
        <button @click="cancel" class="py-2 px-4 bg-green-500 font-bold text-white rounded hover:bg-green-700">Edasi</button>
      </div>
      <QrcodeStream @detect="onDetect" @init="onInit" v-if="!isDetected"/>
      <button @click="close" class="py-2 px-4 bg-blue-500 font-bold text-white rounded hover:bg-blue-700">Sule</button>
    </div>
  </div>

</template>


<style scoped>

</style>