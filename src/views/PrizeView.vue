<template>
  <div class="flex flex-col items-center justify-center gap-6 p-6 capitalize">
    <div class="">
      <div class="flex flex-col items-center justify-center gap-6">
        <h1 class="text-4xl font-bold text-center text-indigo-500">{{ t("prizes") }}</h1>
        <p class="text-xl">{{ t("total") }} {{ t("prizes") }}: {{ prizes?.length }}</p>
      </div>
    </div>
    <div class="flex flex-col items-center justify-center gap-6">
      <input v-model="searchQuery" type="text" :placeholder="t('prizes') + '...'"
        class="block w-full px-4 py-3 mb-1 leading-tight border border-gray-200 rounded appearance-none dark:bg-gray-dark-300 bg-gray-light-200 focus:outline-none focus:border-indigo-500" />
    </div>
    <div class="flex flex-col items-center justify-center w-full" v-if="prizes">
      <table class="w-full text-left table-auto rtl:text-right">
        <thead class="dark:bg-gray-dark-300 bg-gray-light-300">
          <tr>
            <th class="px-6 py-3">
              {{ t("name") }}
            </th>
            <th class="px-6 py-3">
              {{ t("description") }}
            </th>
            <th class="px-6 py-3">
              {{ t("image url") }}
            </th>
            <th class="px-6 py-3">
              {{ t("min amount") }}
            </th>
            <th class="px-6 py-3">
              {{ t("status") }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700" v-for="prize in paginatedPrizes"
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
      <!-- Paginación -->
      <div class="flex items-center justify-center mt-4 space-x-4">
        <button @click="prevPage" :disabled="currentPage === 1"
          class="px-4 py-2 text-white bg-indigo-500 rounded disabled:opacity-50">
          {{ t("prev") }}
        </button>
        <span>{{ t("page") }} {{ currentPage }} {{ t("of") }} {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages"
          class="px-4 py-2 text-white bg-indigo-500 rounded disabled:opacity-50">
          {{ t("next") }}
        </button>
      </div>
    </div>
    <div v-else>
      {{ t("loading prizes") }}...
    </div>
  </div>

</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'

import type { APIResponse } from '@/types/api';
import type { Prize } from '@/types/prize';

import { currencyFormat } from '@/utils/strings'
import { apiGetPrizes } from '@/api/prize/prize';
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

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

const currentPage = ref(1);
const itemsPerPage = ref(10); // Puedes ajustar este valor según lo necesites

const paginatedPrizes = computed(() => {
  if (!filteredPrizes.value) return [];
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return filteredPrizes.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(filteredPrizes.value.length / itemsPerPage.value);
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

onMounted(async () => {
  await handleGetAllPrizes()
})
</script>