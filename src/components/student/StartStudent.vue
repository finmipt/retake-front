<script setup lang="ts">

import {BACK_END} from "../../../config";
</script>

<template>
  <div class="mx-4 max-w-xl ">
    <h1 class="text-3xl text-black font-extrabold sm:text-5xl">
      Järelevastamise
      <strong class="font-extrabold text-red-700 sm:block"> Portal </strong>
    </h1>
    <div class="mt-8 flex flex-wrap justify-center gap-4">
      <a
          :href="`/student/register`"
          class="block w-full rounded bg-red-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
      >
        Registreeru järelvastamiseks
      </a>
    </div>

  </div>
</template>

<style scoped>

</style>