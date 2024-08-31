<template>
  <div class="flex flex-col items-center justify-center gap-6">
    <div class="">
      <div class="flex flex-col items-center justify-center gap-6">
        <h1 class="text-4xl font-bold text-center text-violet-600">Schedules</h1>
        <p class="text-xl">Total schedules: {{ schedules?.length }}</p>
        <RouterLink class="h-12 text-center w-60" to="/schedules/new">
          <div
            class="py-1 border rounded-lg dark:bg-gray-dark-300 bg-gray-light-200 dark:border-violet-600 dark:hover:bg-gray-light-400 dark:active:bg-gray-dark-100 border-gray-dark-100 hover:bg-gray-light-300 active:bg-gray-dark-100">
            Add new Schedule
          </div>
        </RouterLink>
      </div>
    </div>
    <div class="flex flex-col items-center justify-center w-full" v-if="schedules">
      <table class="w-full text-left table-auto rtl:text-right">
        <thead class="dark:bg-gray-dark-300 bg-gray-light-300">
          <tr>
            <th class="px-6 py-3">Event</th>
            <th class="px-6 py-3">Name</th>
            <th class="px-6 py-3"># Runs</th>
            <th class="px-6 py-3">Start / End</th>
            <th class="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700" v-for="schedule in schedules"
            :key="schedule.id">
            <td class="px-6 py-4">{{ schedule.event_id }}</td>
            <td class="px-6 py-4">{{ schedule.name }}</td>
            <td class="px-6 py-4">{{ schedule.runs ? schedule.runs.length : 0 }}</td>
            <td class="px-6 py-4"><span class="pr-2">{{ new Date(schedule.start_time_mili).toLocaleString('es-ES', {
              day: '2-digit',
              month: 'short',
              year: 'numeric',
              hour: 'numeric',
              minute: 'numeric',
              hour12: false
            }) }}</span> -
              <span class="pl-2">{{
                new Date(schedule.end_time_mili).toLocaleString('es-ES', {
                  day: '2-digit',
                  month: 'short',
                  year: 'numeric',
                  hour: 'numeric',
                  minute: 'numeric',
                  hour12: false
                }) }}</span>
            </td>
            <td class="flex flex-row items-center justify-start gap-2 px-6 py-4">
              <RouterLink :to="`/schedules/edit/${schedule.id}`">
                <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                  width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd"
                    d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z"
                    clip-rule="evenodd" />
                  <path fill-rule="evenodd"
                    d="M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.02.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z"
                    clip-rule="evenodd" />
                </svg>
              </RouterLink>
              <button @click="openDeleteModal(schedule)">
                <svg class="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                  width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                  <path fill-rule="evenodd"
                    d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z"
                    clip-rule="evenodd" />
                </svg>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else>
      Loading schedules...
    </div>
  </div>

</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'

import type { APIResponse } from '@/types/api';
import type { Schedule } from '@/types/schedule';
import { apiDeleteSchedule, apiGetSchedules } from '@/api/schedule/schedule';
import router from '@/router';

const isModalOpened = ref(false);
const selectedScheduleToDelete = ref<Schedule>()

const openDeleteModal = (schedule: Schedule) => {
  selectedScheduleToDelete.value = schedule
  isModalOpened.value = true;
};
const closeDeleteModal = () => {
  isModalOpened.value = false;
  selectedScheduleToDelete.value = undefined
};

const handleDeleteSchedule = async () => {
  try {
    if (!selectedScheduleToDelete.value) {
      throw new Error("there is no schedule");
    }
    const response: APIResponse<Schedule[]> = await apiDeleteSchedule(selectedScheduleToDelete.value.id)
    schedules.value = response.data
    closeDeleteModal()
    window.location.reload();
  } catch (error) {
    console.error("Failed to delete schedule:", error);
    alert("There was an error deleting the schedule. Please try again.");
  }
}

// const schedules = [{ "event_id": "event1", "name": "event 1 name", "runs": [], "start_time_mili": "12:00 - 22-09-2024", "end_time_mili": "12:00 - 22-09-2024" }]
const schedules = ref<Schedule[]>()

const handleGetAllSchedules = async () => {
  try {

    const response: APIResponse<Schedule[]> = await apiGetSchedules()
    schedules.value = response.data

  } catch (error) {
    console.error("Failed to get schedules:", error);
    alert("There was an error getting the schedule. Please try again.");
  }
}

onMounted(async () => {
  await handleGetAllSchedules()
})
</script>