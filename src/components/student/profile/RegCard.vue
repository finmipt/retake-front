<script setup>
import { defineProps, ref, onMounted} from 'vue';
import { format } from 'date-fns';
import { et } from 'date-fns/locale';
import axios from "axios";
import {BACK_END} from "../../../../config.js";

const props = defineProps({
  registration: {
    type: Object,
    required: true,
  },
});

const event = ref();

async function fetchEvent() {
  try {
    const response = await axios.get(`${BACK_END}/event/get/${props.registration.eventId}`);
    event.value = response.data;
  } catch (error) {
    console.error(error);
  }
}
onMounted(() => {
  fetchEvent();
})

</script>

<template>
  <a v-if="event"
      href=""
      class="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8 m-4"
  >
    <span
        class="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-blue-500 to-purple-600"
    ></span>

    <div class="sm:flex sm:justify-between sm:gap-4">
      <div>
        <h3 class="text-lg font-bold text-gray-900 sm:text-xl">
          {{ registration.subject }}
        </h3>

        <p class="mt-1 text-m font-medium text-gray-600" > {{registration.work_title}} </p>
      </div>

      <div class="hidden sm:block sm:shrink-0">
        <span v-if="registration.place" class="mt-1 text-lg font-medium text-gray-700" > {{registration.place}} </span>
        <img
            alt=""
            src="https://picsum.photos/200"
            class="size-16 rounded-lg object-cover shadow-sm"
        />
      </div>
    </div>
    <span v-if="registration.status === 'pending'" class="whitespace-nowrap rounded-full bg-gray-200 px-2.5 py-0.5 text-sm text-gray-700">
    Menetluses
    </span>
    <span v-if="registration.status === 'canceled'" class="whitespace-nowrap rounded-full bg-red-200 px-2.5 py-0.5 text-sm text-red-700">
            Tühistatud
    </span>
    <span v-if="registration.status === 'notPresent'"  class="whitespace-nowrap rounded-full bg-red-200 px-2.5 py-0.5 text-sm text-red-700">
            Ei ilmunud
    </span>
    <span v-if="registration.status === 'over'"  class="whitespace-nowrap rounded-full bg-orange-200 px-2.5 py-0.5 text-sm text-orange-700">
            Lõpetatud
    </span>

    <div class="mt-4">
      <p class="text-pretty text-sm text-gray-500">
        {{ event.title }}
      </p>
    </div>

    <dl class="mt-6 flex gap-4 sm:gap-6">
      <div class="flex flex-col-reverse">
        <dt class="text-m font-bold text-gray-600">{{format(event.date, 'PPPP', {locale: et})}}</dt>
        <dd class="text-xs text-gray-500">Kuupäev</dd>
      </div>

      <div class="flex flex-col-reverse">
        <dt class="text-m font-bold text-gray-600" > {{format(event.date, 'HH:mm')}} </dt>
        <dd class="text-xs text-gray-500">Aeg</dd>
      </div>
    </dl>
  </a>
</template>

<style scoped>

</style>