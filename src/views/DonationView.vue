<template>
  <div class="flex flex-col items-center justify-center gap-6">
    <div>
      <div class="flex flex-col items-center justify-center gap-6">
        <h1 class="text-4xl font-bold text-center text-violet-600">Donations</h1>
        <p class="text-xl">Total donations: {{ donations?.length }}</p>
      </div>
    </div>
    <div class="flex flex-col items-center justify-center gap-6">
      <input v-model="searchQuery" type="text" placeholder="Search donations..."
        class="block w-full px-4 py-3 mb-1 leading-tight border border-gray-200 rounded appearance-none dark:bg-gray-dark-300 bg-gray-light-200 focus:outline-none focus:border-violet-600" />
    </div>
    <div class="flex flex-col items-center justify-center w-full" v-if="donations">
      <table class="w-full text-left table-auto rtl:text-right">
        <thead class="dark:bg-gray-dark-300 bg-gray-light-300">
          <tr>
            <th class="px-6 py-3">Email</th>
            <th class="px-6 py-3">Name</th>
            <th class="px-6 py-3">Amount</th>
            <th class="px-6 py-3">Description</th>
            <th class="px-6 py-3">To bid?</th>
            <th class="px-6 py-3">Time</th>
          </tr>
        </thead>
        <tbody>
          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700" v-for="donation in paginatedDonations"
            :key="donation.id">
            <td class="px-6 py-4">{{ donation.email }}</td>
            <td class="px-6 py-4">{{ donation.name }}</td>
            <td class="px-6 py-4">{{ currencyFormat(donation.amount) }}</td>
            <td class="w-1/4 px-6 py-4 break-words">{{ donation.description }}</td>
            <td class="px-6 py-4">{{ donation.to_bid ? "✅" : "❌" }}</td>
            <td class="px-6 py-4">{{ new Date(donation.time_mili).toLocaleDateString('es-ES', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
              hour12: false
            }) }}</td>
          </tr>
        </tbody>
      </table>

      <!-- Paginación -->
      <div class="flex items-center justify-center mt-4 space-x-4">
        <button @click="prevPage" :disabled="currentPage === 1"
          class="px-4 py-2 text-white rounded bg-violet-600 disabled:opacity-50">
          Prev
        </button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages"
          class="px-4 py-2 text-white rounded bg-violet-600 disabled:opacity-50">
          Next
        </button>
      </div>
    </div>
    <div v-else>
      Loading donations...
    </div>
  </div>
</template>


<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
import router from '@/router';

import type { APIResponse } from '@/types/api';
import type { DonationWithoutBidDetails } from '@/types/donation';

import { currencyFormat } from '@/utils/strings'
import { apiGetDonations } from '@/api/donation/donation';
import type { Run } from '@/types/run';
import { apiGetRuns } from '@/api/run/run';

const runs = ref<Run[]>([])

const getRuns = async () => {
  try {
    const response: APIResponse<Run[]> = await apiGetRuns("simple")
    runs.value = response.data
  } catch (error) {
    console.error("Failed to get runs:", error);
    // alert("There was an error getting runs. Please try again.");
    // router.push('/donations')
  }
}

const searchQuery = ref("");

const filteredDonations = computed(() => {
  if (!donations.value) return [];
  return donations.value.filter(donation => {
    const lowerCaseQuery = searchQuery.value.toLowerCase();
    return (
      donation.email.toLowerCase().includes(lowerCaseQuery) ||
      donation.name.toLowerCase().includes(lowerCaseQuery) ||
      donation.description.toLowerCase().includes(lowerCaseQuery) ||
      new Date(donation.time_mili).toLocaleDateString('es-ES', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false
      }).toLowerCase().includes(lowerCaseQuery)
    )
  });
});

const donations = ref<DonationWithoutBidDetails[]>()

const handleGetAllDonations = async () => {
  try {

    const response: APIResponse<DonationWithoutBidDetails[]> = await apiGetDonations()
    donations.value = response.data

  } catch (error) {
    console.error("Failed to get donations:", error);
    alert("There was an error getting donations. Please try again.");
  }
}

const currentPage = ref(1);
const itemsPerPage = ref(10); // Puedes ajustar este valor según lo necesites

const paginatedDonations = computed(() => {
  if (!filteredDonations.value) return [];
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredDonations.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(filteredDonations.value.length / itemsPerPage.value);
});

const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

onMounted(() => {
  getRuns()
  handleGetAllDonations()
})
</script>