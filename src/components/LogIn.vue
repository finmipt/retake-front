<script setup>
import {BACK_END
} from "../../config.js";
import MenuUserInfo from "@/components/elements/SideBarElements/MenuUserInfo.vue";

</script>

<template>
  <section class="bg-gray-50">
    <div class="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
      <div class="mx-auto max-w-xl text-center">
        <h1 class="text-3xl text-black font-extrabold sm:text-5xl">
          Understand User Flow.
          <strong class="font-extrabold text-red-700 sm:block"> Increase Conversion. </strong>
        </h1>

        <p class="mt-4 text-black sm:text-xl/relaxed">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt illo tenetur fuga ducimus
          numquam ea!
        </p>

        <div class="mt-8 flex flex-wrap justify-center gap-4">
          <a
              :href="`${BACK_END}/auth/signin`"
              class="block w-full rounded bg-red-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-red-700 focus:outline-none focus:ring active:bg-red-500 sm:w-auto"
          >
            Loggi sisse
          </a>


        </div>
      </div>
    </div>
  </section>
  <MenuUserInfo/>
</template>

<style scoped>

</style>