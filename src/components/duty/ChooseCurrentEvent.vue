<script setup >
import {onMounted, ref} from "vue";
import axios from "axios";
import {BACK_END} from "/config.js"
import EventCard from "@/components/student/register/chooseEvent/EventCard.vue";
import {format} from "date-fns";
import {et} from "date-fns/locale";

const events = ref([]);
const fetchEvents = async () => {
  try {
    const response = await axios.get(`${BACK_END}/event/get`);
    //Here i need to get all the events that are in the future, not the past ones
    const currentTimestamp = new Date().getTime();

// Проходимся по каждому событию в данных ответа
    for (let i = 0; i < response.data.length; i++) {
      // Создаем объект Date для текущего события
      const eventDate = new Date(response.data[i].date);

      // Вычисляем timestamp для даты события, отняв и добавив 2 дня (в миллисекундах)
      const twoDaysAgo = new Date().getTime() - (10 * 24 * 60 * 60 * 1000); // 2 дня назад
      const inTwoDays = new Date().getTime() + (10 * 24 * 60 * 60 * 1000); // Через 2 дня

      // Проверяем, находится ли дата события в пределах двух дней от текущего момента
      if (eventDate.getTime() >= twoDaysAgo && eventDate.getTime() <= inTwoDays) {
        // Если условие истинно, добавляем событие в массив
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
  <div class="overflow-x-auto rounded-lg border border-gray-200 p-4 m-4">
    <table class="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
      <thead class="ltr:text-left rtl:text-right">
      <tr>
        <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Nimetus</th>
        <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Kuupäev</th>
        <th class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">Kohad</th>
      </tr>
      </thead>

      <tbody class="divide-y divide-gray-500">
      <tr v-for="event in events" >
        <td class="whitespace-nowrap px-4 py-2 font-medium text-gray-900">{{event.title}}</td>
        <td class="whitespace-nowrap px-4 py-2 text-gray-700">{{format(event.date, 'PPPP', {locale: et})}}</td>
        <td class="whitespace-nowrap px-4 py-2">
          <a v-for="location in event.locations[0][0]"
              :key="location.name"
             :href="`/duty/${event._id}/${location.name}`"
              class="inline-block rounded bg-green-700 px-4 py-2 text-xs font-medium text-white hover:bg-orange-700 mx-2"
          >
            {{location.name}}
          </a>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>

</style>