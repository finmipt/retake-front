<script setup >
import {onMounted, ref} from "vue";
import axios from "axios";
import {BACK_END} from "../../../../config.js";
import EventCard from "@/components/student/register/chooseEvent/EventCard.vue";

const events = ref([]);
const fetchEvents = async () => {
  try {
    const response = await axios.get(`${BACK_END}/event/get`);
    //Here i need to get all the events that are in the future, not the past ones
    const currentTimestamp = new Date().getTime();
    for (let i = 0; i < response.data.length; i++) {
      if (new Date(response.data[i].registrationOpens).getTime() < currentTimestamp && new Date(response.data[i].registrationCloses).getTime() > currentTimestamp)  {
        events.value.push(response.data[i]);
      }
    }
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  fetchEvents();
});
</script>

<template>
<div v-if="events" class="flex-auto w-full">
  <EventCard v-for="event in events" :key="event.id" :event='event' />
</div>
</template>

<style scoped>

</style>