<script setup >
import { ref, onMounted } from 'vue';
import axios from 'axios';
import {BACK_END} from "../../../config.js";
import router from "@/router/router.js";
import AlertEventCreated from "@/components/admin/AlertEventCreated.vue";
import EventsTable from "@/components/admin/ManageEvents/EventsTable.vue";

// I need to get props from the parent component or if not provided, I need to create default values
const props = defineProps({
  eventCreated: {
    type: Boolean,
    default: false
  },
  eventData: {
    type: Object,
    default: {}
  }
});
//I need to make a request to the server to get the list of all Events
const events = ref([]);
const fetchEvents = async () => {
  try {
    const response = await axios.get(`${BACK_END}/events`);
    events.value = response.data;
  } catch (error) {
    console.error(error);
  }
};



</script>

<template>
  <AlertEventCreated v-if="eventCreated" :eventData="eventData" />
  <EventsTable/>

</template>

<style scoped>

</style>