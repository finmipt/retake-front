<script setup lang="ts">

import {BACK_END} from "../../../config";
</script>

<template>
  <section class="flex-auto bg-gray-50">
    <div class="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
      <div class="mx-auto max-w-xl text-center">
        <h1 class="text-3xl text-black font-extrabold sm:text-5xl">
          Teretulemast!
          <strong class="font-extrabold text-red-700 sm:block"> Alustame! </strong>
        </h1>

        <p class="mt-4 text-black sm:text-xl/relaxed">
          Siin saad sa alustada järalevastamisega
        </p>

        <div class="mt-8 flex flex-wrap justify-center gap-4">
          <a
              href="/admin/create-event"
              class="block w-full rounded bg-red-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
          >
            Luua uut üritust
          </a>


        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>