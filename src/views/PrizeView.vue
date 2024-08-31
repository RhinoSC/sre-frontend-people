<template>
  <div class="flex flex-col items-center justify-center gap-6">
    <div class="">
      <div class="flex flex-col items-center justify-center gap-6">
        <h1 class="text-4xl font-bold text-center text-violet-600">Prizes</h1>
        <p class="text-xl">Total prizes: {{ prizes?.length }}</p>
      </div>
    </div>
    <div class="flex flex-col items-center justify-center gap-6">
      <input v-model="searchQuery" type="text" placeholder="Search prizes..."
        class="block w-full px-4 py-3 mb-1 leading-tight border border-gray-200 rounded appearance-none dark:bg-gray-dark-300 bg-gray-light-200 focus:outline-none focus:border-violet-600" />
    </div>
    <div class="flex flex-col items-center justify-center w-full" v-if="prizes">
      <table class="w-full text-left table-auto rtl:text-right">
        <thead class="dark:bg-gray-dark-300 bg-gray-light-300">
          <tr>
            <th class="px-6 py-3">
              Name
            </th>
            <th class="px-6 py-3">
              Description
            </th>
            <th class="px-6 py-3">
              Image url
            </th>
            <th class="px-6 py-3">
              Min amount
            </th>
            <th class="px-6 py-3">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700" v-for="prize in filteredPrizes"
            :key="prize.id">
            <td class="px-6 py-4">{{ prize.name }}</td>
            <td class="w-1/4 px-6 py-4 break-words">{{ prize.description }}</td>
            <td class="px-6 py-4">
              <a :href="prize.url" target="_blank">
                <img :src="prize.url" :alt="prize.name" class="object-scale-down h-32 w-52">
              </a>
            </td>
            <td class="px-6 py-4">{{ currencyFormat(prize.min_amount) }}</td>
            <td class="">{{ prize.status }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      Loading prizes...
    </div>
  </div>

</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'

import type { APIResponse } from '@/types/api';
import type { Prize } from '@/types/prize';

import { currencyFormat } from '@/utils/strings'
import { apiGetPrizes } from '@/api/prize/prize';

const searchQuery = ref("");

const filteredPrizes = computed(() => {
  if (!prizes.value) return [];
  return prizes.value.filter(prize => {
    const lowerCaseQuery = searchQuery.value.toLowerCase();
    return (
      prize.name.toLowerCase().includes(lowerCaseQuery) ||
      prize.description.toLowerCase().includes(lowerCaseQuery) ||
      prize.status.toLowerCase().includes(lowerCaseQuery)
    )
  });
});

const prizes = ref<Prize[]>()

const handleGetAllPrizes = async () => {
  try {

    const response: APIResponse<Prize[]> = await apiGetPrizes()
    prizes.value = response.data

  } catch (error) {
    console.error("Failed to get prizes:", error);
    alert("There was an error getting the prize. Please try again.");
  }
}

onMounted(async () => {
  await handleGetAllPrizes()
})
</script>