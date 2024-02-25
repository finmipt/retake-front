<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import {BACK_END} from "../../../config.js";

const eventData = ref({
  title: '',
  date: '',
  locations: {
    Narva: {
      name: 'Narva',
      rooms: 'fgd',
      isSelected: true
    },
    Johvi: {
      name: 'Jõhvi',
      rooms: 'dfg',
      isSelected: true
    },
    Sillamae: {
      name: 'Sillamäe',
      rooms: 'dfgdf',
      isSelected: true
    }
  },
  description: '',
  registrationOpens: null,
  registrationCloses: null,
  responsivePerson: '',
  createdBy: 'notTracked',
  createdOn: ''
});

const employees = ref([]);

const fetchEmployees = async () => {
  try {
    const response = await axios.get(`${BACK_END}/admin/employees`);
    employees.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

onMounted(() => {
  fetchEmployees();
});

const submitEvent = async () => {
  try {
    const response = await axios.post(`${BACK_END}/event/create`, eventData.value);
    console.log("Event created successfully:", response.data);
    // Обработка успешного создания события, например, показ уведомления или перенаправление
  } catch (error) {
    console.error("Event creation failed:", error);
    // Обработка ошибки создания события
  }
};


</script>

<template>
  <div class="container mx-auto p-4">
    <form @submit.prevent="submitEvent" class="space-y-4">
      <div>
        <label for="name" class="block text-sm font-medium text-gray-700">Nimetus</label>
        <input type="text" id="name" v-model="eventData.title" class="form-input px-4 py-3 rounded-md border-2 border-gray-300 focus:border-blue-500 m-2.5">
      </div>
      <div>
        <label for="date" class="block text-sm font-medium text-gray-700">Kuupäev ja Aeg</label>
        <input type="datetime-local" id="date" v-model="eventData.date" class="form-input px-4 py-3 rounded-md border-2 border-gray-300 focus:border-blue-500 m-2.5">
      </div>
      <div>
        <label for="description" class="block text-sm font-medium text-gray-700">Kirjeldus</label>
        <textarea id="description" v-model="eventData.description" class="form-input px-4 py-3 rounded-md border-2 border-gray-300 focus:border-blue-500 m-2.5"></textarea>
      </div>

      <div >
        <label class="block text-sm font-medium text-gray-700"> Asukohad </label>
        <div class="mt-2 space-y-2">
          <div v-for="location in eventData.locations " :key="location.name" class="">
            <div class="">
              <input type="checkbox" :id="location.name" :value="location.name" v-model="location.isSelected">
              <label :for="location" class="ml-2 text-sm text-gray-600">{{ location.name }}</label>
            </div>
            <input
                type="text"
                :id="location.rooms"
                class="block rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                :placeholder="location.rooms"
                v-model="location.rooms">
          </div>
        </div>
      </div>


      <div>
        <label for="openDays" class="block text-sm font-medium text-gray-700">Registreerimine algab enne</label>
        <input type="number" id="openDays" v-model="eventData.registrationOpens" class="block rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
      </div>
      <div>
        <label for="closeDays" class="block text-sm font-medium text-gray-700">Registreerimine lõpeb enne</label>
        <input type="number" id="closeDays" v-model="eventData.registrationCloses" class="block rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
      </div>
      <div>
        <label for="responsiveTeacher" class="block text-sm font-medium text-gray-900"> Järelevastamise korrapidajad </label>

        <div class="relative mt-1.5">
          <input
              type="text"
              list="HeadlineActArtist"
              id="responsiveTeacher"
              class="block rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Please select"
              v-model="eventData.responsivePerson"
          />

        </div>

        <datalist name="HeadlineAct" id="HeadlineActArtist">
          <option v-for="employee in employees" :key="employee._id" :value="employee.name" >{{ employee.email }}</option>
        </datalist>
      </div>

      <button type="submit" class="inline-block rounded border border-indigo-700 bg-indigo-500 px-12 py-3 text-sm font-medium text-white transition hover:duration-700 hover:bg-transparent hover:text-indigo-500 focus:outline-none focus:ring active:text-red-400">Salvesta</button>
    </form>
  </div>
</template>

<style scoped>

</style>