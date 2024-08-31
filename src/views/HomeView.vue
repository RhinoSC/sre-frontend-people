<template>
  <div class="flex flex-col items-center justify-center gap-16 mt-12">
    <div class="w-1/3 h-1/5">
      <!-- <h1 class="text-4xl font-bold text-center text-violet-600">SpeedrunsEspañol X</h1> -->
      <img src="/src/assets/SRE-X_color.png" alt="" class="object-contain w-full h-1/3">
    </div>
    <div class="flex flex-col items-center justify-center gap-4 text-xl">
      <RouterLink class="h-12 text-center w-96" to="/schedules">
        <div
          class="py-1 border dark:bg-gray-dark-300 bg-gray-light-200 rounded-2xl dark:border-violet-600 dark:hover:bg-gray-light-400 dark:active:bg-gray-dark-100 border-gray-dark-100 hover:bg-gray-light-300 active:bg-gray-dark-100">
          Schedule
        </div>
      </RouterLink>
      <RouterLink class="h-12 text-center w-96" to="/prizes">
        <div
          class="py-1 border dark:bg-gray-dark-300 bg-gray-light-200 rounded-2xl dark:border-violet-600 dark:hover:bg-gray-light-400 dark:active:bg-gray-dark-100 border-gray-dark-100 hover:bg-gray-light-300 active:bg-gray-dark-100">
          Prizes ({{ infoCount.prizes }})
        </div>
      </RouterLink>
      <RouterLink class="h-12 text-center w-96" to="/bids">
        <div
          class="py-1 border dark:bg-gray-dark-300 bg-gray-light-200 rounded-2xl dark:border-violet-600 dark:hover:bg-gray-light-400 dark:active:bg-gray-dark-100 border-gray-dark-100 hover:bg-gray-light-300 active:bg-gray-dark-100">
          Bids ({{ infoCount.bids }})
        </div>
      </RouterLink>
      <RouterLink class="h-12 text-center w-96" to="/donations">
        <div
          class="py-1 border dark:bg-gray-dark-300 bg-gray-light-200 rounded-2xl dark:border-violet-600 dark:hover:bg-gray-light-400 dark:active:bg-gray-dark-100 border-gray-dark-100 hover:bg-gray-light-300 active:bg-gray-dark-100">
          Donations ({{ infoCount.donations }})
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


const infoCount = ref<EventInfoCount>({} as EventInfoCount)


const handleGetEventInfo = async () => {
  try {

    const response: APIResponse<EventInfoCount> = await apiGetEventInfo()
    console.log("GOLAAAA ", response)
    infoCount.value = response.data
  } catch (error) {
    console.error("Failed to get users:", error);
    alert("There was an error getting the user. Please try again.");
  }
}

onMounted(() => {
  handleGetEventInfo()
})
</script>
