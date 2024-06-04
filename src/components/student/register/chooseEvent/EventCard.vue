<script setup>
import { defineProps } from 'vue';
import { format } from 'date-fns';
import { et } from 'date-fns/locale';

defineProps({
  event: {
    type: Object,
    required: true,
  },
});



</script>

<template>
  <a
      :href="`/student/register/${event._id}`"
      class="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8 m-4"
  >
    <span
        class="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-blue-500 to-purple-600"
    ></span>

    <div class="sm:flex sm:justify-between sm:gap-4">
      <div>
        <h3 class="text-lg font-bold text-gray-900 sm:text-xl">
          {{ event.title }} sdsds
        </h3>
        <span  class="whitespace-nowrap rounded-full bg-green-200 px-2.5 py-0.5 text-sm text-green-700">
            Registreerimine on avatud
        </span>
        <div v-for="location in event.locations[0][0]" >
          <p class="mt-1 text-xs font-medium text-gray-600" v-if="location.isSelected" > {{location.name}}  {{location.rooms}} </p>
        </div>


      </div>

      <div class="hidden sm:block sm:shrink-0">
        <img
            alt=""
            src="https://picsum.photos/200"
            class="size-16 rounded-lg object-cover shadow-sm"
        />
      </div>
    </div>

    <div class="mt-4">
      <p class="text-pretty text-sm text-gray-500">
        {{ event.description }}
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