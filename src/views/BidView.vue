<template>
  <div class="flex flex-col items-center justify-center gap-6">
    <div class="">
      <div class="flex flex-col items-center justify-center gap-6">
        <h1 class="text-4xl font-bold text-center text-violet-600">Bids</h1>
        <p class="text-xl">Total bids: {{ bids?.length }}</p>
      </div>
    </div>
    <div class="flex flex-col items-center justify-center gap-6">
      <input v-model="searchQuery" type="text" placeholder="Search bids..."
        class="block w-full px-4 py-3 mb-1 leading-tight border border-gray-200 rounded appearance-none dark:bg-gray-dark-300 bg-gray-light-200 focus:outline-none focus:border-violet-600" />
    </div>
    <div class="flex flex-col items-center justify-center w-full" v-if="bids">
      <table class="w-full text-left table-auto rtl:text-right">
        <thead class="dark:bg-gray-dark-300 bg-gray-light-300">
          <tr>
            <th class="px-6 py-3">
              Name
            </th>
            <th class="px-6 py-3">
              Goal
            </th>
            <th class="px-6 py-3">
              Current Amount
            </th>
            <th class="px-6 py-3">
              Description
            </th>
            <th class="px-6 py-3">
              Type
            </th>
            <th class="px-6 py-3">
              Run name
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700" v-for="bid in filteredBids" :key="bid.id">
            <td class="px-6 py-4">{{ bid.bidname }}</td>
            <td class="px-6 py-4">{{ currencyFormat(bid.goal) }}</td>
            <td class="px-6 py-4">{{ currencyFormat(bid.current_amount) }}</td>
            <td class="px-6 py-4">{{ bid.description }}</td>
            <td class="px-6 py-4">{{ bid.type }}</td>
            <td class="w-1/4 px-6 py-4 break-words">{{ getRunName(bid.run_id) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      Loading bids...
    </div>
  </div>

</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
import router from '@/router';

import type { APIResponse } from '@/types/api';
import type { Bid } from '@/types/bid';

import { currencyFormat } from '@/utils/strings'
import { apiGetBids } from '@/api/bid/bid';
import type { Run } from '@/types/run';
import { apiGetRuns } from '@/api/run/run';

const runs = ref<Run[]>([])

const getRuns = async () => {
  try {
    const response: APIResponse<Run[]> = await apiGetRuns("simple")
    runs.value = response.data
  } catch (error) {
    console.error("Failed to get runs:", error);
    alert("There was an error getting runs. Please try again.");
    router.push('/bids')
  }
}

const getRunName = (run_id: string) => {
  const run = runs.value.find(run => run.id === run_id)
  return run?.name
}

const searchQuery = ref("");

const filteredBids = computed(() => {
  if (!bids.value) return [];
  return bids.value.filter(bid => {
    const lowerCaseQuery = searchQuery.value.toLowerCase();
    return (
      bid.bidname.toLowerCase().includes(lowerCaseQuery) ||
      bid.description.toLowerCase().includes(lowerCaseQuery) ||
      bid.description.toLowerCase().includes(lowerCaseQuery) ||
      bid.type.toLowerCase().includes(lowerCaseQuery) ||
      getRunName(bid.run_id)?.toLocaleLowerCase().includes(lowerCaseQuery)
    )
  });
});

const bids = ref<Bid[]>()

const handleGetAllBids = async () => {
  try {

    const response: APIResponse<Bid[]> = await apiGetBids()
    bids.value = response.data

  } catch (error) {
    console.error("Failed to get bids:", error);
    alert("There was an error getting the bid. Please try again.");
  }
}

onMounted(() => {
  getRuns()
  handleGetAllBids()
})
</script>