<script setup >
// I need to make a request to the server to get the list of all Events
import { ref, onMounted } from 'vue';
import axios from 'axios';
import {BACK_END} from "../../../../config.js";

const events = ref([]);
const fetchEvents = async () => {
  try {
    const response = await axios.get(`${BACK_END}/event/get`);
    events.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  fetchEvents();
});

</script>

<template>

  <div class="overflow-x-auto">
    <table class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
      <thead class="ltr:text-left rtl:text-right">
      <tr>
        <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Title</th>
        <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Date</th>
        <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Created on</th>


        <th class="px-4 py-2"></th>
      </tr>
      </thead>

      <tbody class="divide-y divide-gray-200">
      <tr v-for="event in events">
        <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{{event.title}}</td>
        <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{event.date}}</td>
        <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{event.createdOn}}</td>
        <td class="whitespace-nowrap px-4 py-2">
          <a
              href="#"
              class="inline-block rounded bg-indigo-600 px-4 py-2 text-xs font-medium text-white hover:bg-indigo-700"
          >
            View
          </a>
        </td>
      </tr>


      </tbody>
    </table>
  </div>
</template>

<style scoped>

</style>