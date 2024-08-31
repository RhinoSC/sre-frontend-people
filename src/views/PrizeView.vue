<template>
  <div class="flex flex-col items-center justify-center gap-6">
    <div class="">
      <div class="flex flex-col items-center justify-center gap-6">
        <h1 class="text-4xl font-bold text-center text-violet-600">Prizes</h1>
        <p class="text-xl">Total prizes: {{ prizes?.length }}</p>
        <RouterLink class="h-12 text-center w-60" to="/prizes/new">
          <div
            class="py-1 border rounded-lg dark:bg-gray-dark-300 bg-gray-light-200 dark:border-violet-600 dark:hover:bg-gray-light-400 dark:active:bg-gray-dark-100 border-gray-dark-100 hover:bg-gray-light-300 active:bg-gray-dark-100">
            Add new Prize
          </div>
        </RouterLink>
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
            <th class="px-6 py-3">
              Actions
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
            <td class="px-6 py-4">
              <div class="flex flex-row items-center justify-center gap-2">
                <RouterLink :to="`/prizes/edit/${prize.id}`">
                  <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path fill-rule="evenodd"
                      d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z"
                      clip-rule="evenodd" />
                    <path fill-rule="evenodd"
                      d="M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.02.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z"
                      clip-rule="evenodd" />
                  </svg>
                </RouterLink>
                <button @click="openDeleteModal(prize)">
                  <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path fill-rule="evenodd"
                      d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z"
                      clip-rule="evenodd" />
                  </svg>
                </button>
              </div>
            </td>
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
import { apiDeletePrize, apiGetPrizes } from '@/api/prize/prize';

const isModalOpened = ref(false);
const selectedPrizeToDelete = ref<Prize>()

const openDeleteModal = (prize: Prize) => {
  selectedPrizeToDelete.value = prize
  isModalOpened.value = true;
};
const closeDeleteModal = () => {
  isModalOpened.value = false;
  selectedPrizeToDelete.value = undefined
};

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

const handleDeletePrize = async () => {
  try {
    if (!selectedPrizeToDelete.value) {
      throw new Error("there is no prize");
    }
    const response: APIResponse<Prize[]> = await apiDeletePrize(selectedPrizeToDelete.value.id)
    prizes.value = response.data
    closeDeleteModal()
    window.location.reload();
  } catch (error) {
    console.error("Failed to delete prize:", error);
    alert("There was an error deleting the prize. Please try again.");
  }
}

// const prizes = [{ "event_id": "event1", "name": "event 1 name", "prizes": [], "start_time_mili": "12:00 - 22-09-2024", "end_time_mili": "12:00 - 22-09-2024" }]
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