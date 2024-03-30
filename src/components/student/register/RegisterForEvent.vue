<script setup >
import { useRoute} from "vue-router";
import {onMounted, ref} from "vue";
import axios from "axios";
import {BACK_END} from "../../../../config.js";
import {getCookie} from "../../../controllers/cookie.js";
import router from "@/router/router.js";

const route = useRoute();
const eventId = ref(route.params.id);

const employees = ref([]);

const fetchEmployees = async () => {
  try {
    const response = await axios.get(`${BACK_END}/admin/employees`);
    employees.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

const registrationData = ref({
  eventId: eventId.value,
  userId: '',
  place: '',
  teacherId: '',
  registrationDate: new Date().toISOString(),
  subject: '',
  work_title: '',
  status: 'pending',
  isPresent: false
});

const userData = ref([]);
async function fetchUserData() {
  try {
    const jwt = getCookie('jwt');
    const response = await axios.get(`${BACK_END}/users/user`, {
      headers: {
        'Authorization': `${jwt}`
      }
    });
    userData.value = response.data;
    registrationData.value.userId = response.data._id;

  } catch (error) {
    console.error('Error while getting userData', error);
  }

}
const locations = ref([]);

async function fetchLocations() {
  try {
    const response = await axios.get(`${BACK_END}/event/get_locations/${eventId.value}`);
    locations.value = response.data.locations[0][0];
  } catch (error) {
    console.error('Error while getting location data', error);
  }
}

const errorMessage = ref(null);
const submitRegistration = async () => {
  try {
    const response = await axios.post(`${BACK_END}/registration/create`, registrationData.value);
    console.log("Registration created successfully:", response.data);
    // After successful registration, redirect to the event list page
    await router.push({name: 'Profile'});
  } catch (error) {
    console.error("Registration creation failed:", error);
    errorMessage.value = error.response.data.message;

  }
};



onMounted(() => {
  console.log(eventId.value);
  fetchEmployees();
  fetchUserData();
  fetchLocations();


});
</script>

<template>
<div class="container mx-auto p-4">
  <h1 class="text-2xl font-bold">Registreeru sündmusele</h1>
  <h2 class="text-xl font-bold">Nimi: {{userData.name}}</h2>
  <h2 class="text-xl font-bold" v-for="group in userData.groups">Rühm: {{group}}</h2>
  <form @submit.prevent = 'submitRegistration' class="space-y-4">
    <div>
      <label for="place" class="block text sm font-medium text-gray-700">Koht</label>
      <select
          v-model="registrationData.place"
          id="place"
          name="place"
          class="form-input px-4 py-3 rounded-md border-2 border-gray-300 focus:border-blue-500 m-2.5"
      >
      <option class="text-gray-300" value="">Vali õppekoht</option>
      <option v-for="location in locations" :key="location.name" :value="location.name">{{location.name}}</option>
      </select>

    </div>
    <div class="mt-4 pt-4">
      <label for="teacherId" class="block text sm font-medium text-gray-700">Õpetaja</label>
      <input
          type="text"
          v-model="registrationData.teacherId"
          id="teacherId"
          name="teacherId"
          list="teacherIdList"
          placeholder="Vali õpetaja"
          class="form-input px-4 py-3 rounded-md border-2 border-gray-300 focus:border-blue-500 m-2.5"
      />
      <datalist  id="teacherIdList" name="teacherIdList">
        <option v-for="employee in employees" :key="employee._id" :value="employee.name">{{employee.name}}</option>
      </datalist>
    </div>
    <div>
      <label for="subject" class="block text sm font-medium text-gray-700">Aine</label>
      <input
          type="text"
          v-model="registrationData.subject"
          id="subject"
          name="subject"
          class="form-input px-4 py-3 rounded-md border-2 border-gray-300 focus:border-blue-500 m-2.5"
          placeholder="Vali aine"
      />
    </div>
    <div>
      <label for="work_title" class="block text sm font-medium text-gray-700">Töö pealkiri</label>
      <input
          type="text"
          v-model="registrationData.work_title"
          id="work_title"
          name="work_title"
          class="form-input px-4 py-3 rounded-md border-2 border-gray-300 focus:border-blue-500 m-2.5"
          placeholder="Töö pealkiri"
      />
    </div>
    <button type="submit" class="inline-block rounded border border-indigo-700 bg-indigo-500 px-12 py-3 text-sm font-medium text-white transition hover:duration-700 hover:bg-transparent hover:text-indigo-500 focus:outline-none focus:ring active:text-red-400">Registreeru</button>

  </form>
  <div v-if="errorMessage" role="alert" class="rounded pt-4 mt-5 border-s-4 border-red-500 bg-red-50 p-4">
    <strong class="block font-medium text-red-800"> Something went wrong </strong>

    <p class="mt-2 text-sm text-red-700">
      {{
        errorMessage
      }}
    </p>
  </div>


</div>
</template>

<style scoped>

</style>