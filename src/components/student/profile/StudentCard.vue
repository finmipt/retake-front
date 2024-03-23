<script setup >
import { defineProps } from 'vue';
import QrcodeVue from 'qrcode.vue';

defineProps({
  userData: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="rounded-lg border border-b-gray-500 p-4 m-4" >
    <h1 class="text-2xl font-bold mb-4">Mina</h1>
    <div v-if="userData" class="flex items-center gap-2 p-4 hover:bg-gray-50">
     <div class="flex-auto columns-2">
        <div>
          <h3 class="text-lg font-bold text-gray-900 sm:text-xl">
            {{ userData.name }}
          </h3>
          <p class="mt-1 text-m font-medium text-gray-600" > {{userData.email}} </p>
          <h2 class="text-xl font-bold" v-for="group in userData.groups" > {{ group }}</h2>
          <QrcodeVue :value="userData._id" />
        </div>



      </div>
    </div>
  </div>
</template>

<style scoped>

</style>