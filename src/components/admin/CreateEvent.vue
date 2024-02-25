<script setup >


import DatePicker from "@/components/admin/CreateEvent/DatePicker.vue";
</script>

<template>
  <div class="flex flex-col">
         <div class=" flex items-center flex-row h-28 rounded-lg bg-gray-50 shadow-lg mx-7 mt-5 mb-3">
           <div class="basis-4/5 ml-7">
             <p class="text-lg font-bold text-gray-800"> 1. Palun vali järelevastamise kuupäev </p>
           </div>

           <div class="basis-1/5 ">
             <DatePicker />
           </div>
         </div>

         <div class="flex items-center flex-row h-28 rounded-lg bg-gray-50 shadow-lg mx-7 my-3">
           <div class="basis-2/5 ml-7">
             <p class="text-lg font-bold text-gray-800"> 2. Palun vali järelevastamise kohad </p>
           </div>

           <div class="flex flex-col mr-5">
             <p class="text-lg font-bold text-gray-800"> Jõhvi </p>
             <label
                 for="Johvi"
                 class="relative h-8 w-14 cursor-pointer [-webkit-tap-highlight-color:_transparent]"
             >
               <input type="checkbox" id="Johvi" class="peer sr-only" />

               <span
                   class="absolute inset-0 rounded-full bg-gray-300 transition peer-checked:bg-green-500"
               ></span>

               <span
                   class="absolute inset-y-0 start-0 m-1 h-6 w-6 rounded-full bg-white transition-all peer-checked:start-6"
               ></span>
             </label>
           </div>
           <div class="flex flex-col mr-5">
             <p class="text-lg font-bold text-gray-800"> Narva </p>
             <label
                 for="Narva"
                 class="relative h-8 w-14 cursor-pointer [-webkit-tap-highlight-color:_transparent]"
             >
               <input type="checkbox" id="Narva" class="peer sr-only" />

               <span
                   class="absolute inset-0 rounded-full bg-gray-300 transition peer-checked:bg-green-500"
               ></span>

               <span
                   class="absolute inset-y-0 start-0 m-1 h-6 w-6 rounded-full bg-white transition-all peer-checked:start-6"
               ></span>
             </label>
           </div>
           <div class="flex flex-col mr-5">
             <p class="text-lg font-bold text-gray-800"> Sillamäe</p>
             <label
                 for="Sillamäe"
                 class="relative h-8 w-14 cursor-pointer [-webkit-tap-highlight-color:_transparent]"
             >
               <input type="checkbox" id="Sillamäe" class="peer sr-only" />

               <span
                   class="absolute inset-0 rounded-full bg-green-500 transition peer-checked:bg-gray-700"
               ></span>

               <span
                   class="absolute inset-y-0 start-6 m-1 h-6 w-6 rounded-full bg-white transition-all peer-checked:start-0"
               ></span>
             </label>
           </div>
         </div>

         <div class="flex items-center flex-row h-28 rounded-lg bg-gray-50 shadow-lg mx-7 my-3">
      <div class="basis-2/5 ml-7">
        <p class="text-lg font-bold text-gray-800"> 2. Palun vali järelevastamise kohad </p>
      </div>

      <div class="basis-3/5 mr-5">
        <input type="text"
               name="place"
               id="place"
               autocomplete="address-level1"
               class="block  w-full rounded-md border-0 px-1.5 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>