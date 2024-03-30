<script setup >
import { defineProps, ref, onMounted } from 'vue';
import { BACK_END } from '../../../../config.js';
import axios from 'axios';
import {getCookie} from "../../../controllers/cookie.js";

const props = defineProps({
  registration: Object,
})

const isPresent = ref(props.registration.isPresent);

const user = ref({});
async function fetchUser() {
  try {
    const response = await axios.get(`${BACK_END}/users/user_by_id/${props.registration.userId}` );
    user.value = response.data;
  } catch (error) {
    console.error(error);
  }
}

const attendance = ref({
  userId: props.registration.userId,
  registrationId: props.registration.eventId,
  isPresent: props.registration.isPresent,
  comment: ''

});

const updatePresence = async () => {
  try {
    isPresent.value = !isPresent.value;
    const jwt = getCookie('jwt');
    const response = await axios.put(`${BACK_END}/registration/update_presence/${props.registration._id}/${isPresent.value}` , {
      headers: {
        'Authorization': `${jwt}`
      }
    });
    console.log(response.data);
  } catch (error) {
    console.error('Error while updating presence', error);

  }
}

onMounted(() => {
  fetchUser();
});
</script>

<template v-if="user">

    <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{{user.name}}</td>
    <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-700" v-for="group in user.groups" >{{group}}</td>
    <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{registration.subject}}</td>

  <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{registration.work_title}}</td>
  <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{registration.teacherId}}</td>
  <td v-if="isPresent === false" class="whitespace-nowrap px-4 py-2 text-red-700" > Ei ilmunud </td>
  <td v-if="isPresent === true" class="whitespace-nowrap px-4 py-2 text-green-700" > Osales </td>
  <td class="whitespace-nowrap px-4 py-2 text-white">
    <button @click="updatePresence" class="rounded-lg bg-orange-500 p-1"> Muuta </button>
  </td>


</template>

<style scoped>

</style>