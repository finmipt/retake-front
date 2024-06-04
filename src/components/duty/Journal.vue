<script setup>
import { useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import axios from "axios";
import {BACK_END} from "../../../config.js";
import {getCookie} from "../../controllers/cookie.js";
import router from "@/router/router.js";
import JournalLine from "@/components/duty/journal/JournalLine.vue";
import ScanerId from "@/components/duty/journal/ScanerId.vue";
import { format } from 'date-fns';
import { et } from 'date-fns/locale';

const route = useRoute();
const eventId = ref(route.params.eventId);
const location = ref(route.params.location);
const registrations = ref([]);

const isScannerIdOpen = ref(false);
const event = ref({});

const openScannerId = () => {
  isScannerIdOpen.value = true;
};

const getScannerId = (data) => {

};

const fetchRegistrationData = async () => {
  try {
    const jwt = getCookie('jwt');
    const response = await axios.get(`${BACK_END}/registration/get_by_event/${eventId.value}/${location.value}`, {
      headers: {
        'Authorization': `${jwt}`
      }
    });
    registrations.value = response.data;
  } catch (error) {
    console.error('Error while getting registration data', error);
  }
};
const fetchEvent = async () => {
  try {
    const jwt = getCookie('jwt');
    const response = await axios.get(`${BACK_END}/event/get/${eventId.value}`, {
      headers: {
        'Authorization': `${jwt}`
      }
    });
    event.value = response.data;
  } catch (error) {
    console.error('Error while getting event data', error);
  }
};

onMounted(() => {
  fetchRegistrationData();
  fetchEvent();
});
</script>

<template>
  <div class="overflow-x-auto rounded-lg border border-gray-200 m-4">
    <div class="modal">
      <ScanerId v-model="isScannerIdOpen" @update="" :eventId="eventId"/>
    </div>
    <div v-if="!isScannerIdOpen">
      <h1 class="text-3xl text-center">Journal {{location}} </h1>
      <h2 class="text-2xl text-center">{{format(event.date, 'PPPP', {locale: et})}}</h2>
      <table class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm" v-if="registrations">
      <thead class="ltr:text-left rtl:text-right">
          <tr>
            <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Nimi</th>
            <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Rühm</th>
            <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Aine</th>
            <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Töö nimi</th>
          </tr>
      </thead>

      <tbody class="divide-y divide-gray-200">
      <tr v-for="registration in registrations" :key="registration._id">
        <JournalLine :registration="registration" :isPresent="true" />
      </tr>
      </tbody>
      </table>
    <button @click="router.push('/duty')" class="text-white rounded-lg bg-green-700 p-2 m-4 hover:bg-green-300">Tagasi</button>
    <button @click="openScannerId" class="text-white rounded-lg bg-green-700 p-2 m-4 hover:bg-green-300">Skanneeri QR-koodiga </button>
    </div>
  </div>
</template>

<style scoped>

</style>