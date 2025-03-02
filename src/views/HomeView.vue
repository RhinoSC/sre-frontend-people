<template>
  <div class="flex flex-col items-center justify-center gap-16 p-6 mt-12 capitalize">
    <div class="w-1/3 h-1/5">
      <!-- <h1 class="text-4xl font-bold text-center text-violet-600">SpeedrunsEspañol X</h1> -->
      <img src="/src/assets/SRE-X_color.png" alt="" class="object-contain w-full h-1/3">
    </div>
    <div class="flex flex-col items-center justify-center gap-4 text-xl">
      <RouterLink class="h-12 text-center w-96" to="/schedule">
        <div
          class="py-1 border dark:bg-gray-dark-300 bg-gray-light-200 rounded-2xl dark:border-indigo-500 dark:hover:bg-gray-light-400 dark:active:bg-gray-dark-100 border-gray-dark-100 hover:bg-gray-light-300 active:bg-gray-dark-100">
          {{ t("schedule") }}
        </div>
      </RouterLink>
      <RouterLink class="h-12 text-center w-96" to="/prizes">
        <div
          class="py-1 border dark:bg-gray-dark-300 bg-gray-light-200 rounded-2xl dark:border-indigo-500 dark:hover:bg-gray-light-400 dark:active:bg-gray-dark-100 border-gray-dark-100 hover:bg-gray-light-300 active:bg-gray-dark-100">
          {{ t("prizes") }} ({{ infoCount.prizes }})
        </div>
      </RouterLink>
      <RouterLink class="h-12 text-center w-96" to="/bids">
        <div
          class="py-1 border dark:bg-gray-dark-300 bg-gray-light-200 rounded-2xl dark:border-indigo-500 dark:hover:bg-gray-light-400 dark:active:bg-gray-dark-100 border-gray-dark-100 hover:bg-gray-light-300 active:bg-gray-dark-100">
          {{ t("bids") }} ({{ infoCount.bids }})
        </div>
      </RouterLink>
      <RouterLink class="h-12 text-center w-96" to="/donations">
        <div
          class="py-1 border dark:bg-gray-dark-300 bg-gray-light-200 rounded-2xl dark:border-indigo-500 dark:hover:bg-gray-light-400 dark:active:bg-gray-dark-100 border-gray-dark-100 hover:bg-gray-light-300 active:bg-gray-dark-100">
          {{ t("donations") }} ({{ infoCount.donations }})
        </div>
      </RouterLink>
    </div>
  </div>


</template>

<script setup lang="ts">
import { apiGetEventInfo } from '@/api/event/event';
import type { APIResponse } from '@/types/api';
import type { EventInfoCount } from '@/types/event';
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n'
const { t } = useI18n()


const infoCount = ref<EventInfoCount>({} as EventInfoCount)


const handleGetEventInfo = async () => {
  try {

    const response: APIResponse<EventInfoCount> = await apiGetEventInfo()
    infoCount.value = response.data
  } catch (error) {
    console.error("Failed to get event:", error);
    // alert("There was an error getting the user. Please try again.");
  }
}

onMounted(async () => {
  await handleGetEventInfo()
})
</script>
