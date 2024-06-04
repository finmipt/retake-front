<script setup>
import {BACK_END
} from "../../config.js";
import MenuUserInfo from "@/components/elements/SideBarElements/MenuUserInfo.vue";

</script>

<template>
  <section class="bg-white">
            <span class="grid h-16 w-32 justify-self-center place-content-center rounded-2xl bg-black text-xs text-gray-600">
              <img src="https://kutsehariduskeskus.ee/wp-content/uploads/2023/11/iv_logo_bold.png"  class="object-scale-down" alt="IDKHK"/>
            </span>
    <div class="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
      <div class="mx-auto max-w-xl text-center">
        <h1 class="text-3xl text-black font-extrabold sm:text-5xl">
          Järelevastamise
          <strong class="font-extrabold text-red-700 sm:block"> Portaal </strong>
        </h1>

        <p class="mt-4 text-black sm:text-xl/relaxed">
              Et alustada, logi sisse kooli Microsofti kontoga.
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
</template>

<style scoped>

</style>