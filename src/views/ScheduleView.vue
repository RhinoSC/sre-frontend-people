<template>
  <div class="flex flex-col justify-center w-full gap-2 p-6" v-if="oldSchedule">
    <div class="flex flex-col items-center">
      <div class="flex flex-col items-center justify-center gap-6">
        <h1 class="text-4xl font-bold text-center text-indigo-500 uppercase">{{ t("overview") }}</h1>
      </div>
    </div>
    <div class="flex flex-col items-center w-full" v-if="newSchedule">
      <template v-if="runsVisualizer">
        <div class="flex flex-col w-full gap-1 my-8">
          <hr class="w-full bg-gray-200 border-0 h-[2px] m dark:bg-gray-light-400">
        </div>
        <RunsVisualizerComponent :schedule="runsVisualizer">
        </RunsVisualizerComponent>
      </template>
      <template v-else>
        <h1>Schedule editor</h1>
      </template>
    </div>

    <div v-else>
      <p>Loading schedule...</p>
    </div>
  </div>

</template>

<script lang="ts" setup>
import RunsVisualizerComponent from '@/components/schedule/RunsVisualizer.vue'

import { apiGetScheduleByID, apiUpdateSchedule } from '@/api/schedule/schedule';
import type { APIResponse } from '@/types/api';
import type { ManageSchedule, Schedule } from '@/types/schedule';
import { ref, watch, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router'
import type { Run } from '@/types/run';
import { apiUpdateScheduleRuns } from '@/api/run/run';
import type { MyEvent } from '@/types/event';
import { apiGetEvents } from '@/api/event/event';
import { useEventStore } from '@/stores/useEventStore'
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const eventStore = useEventStore()
const { selectedEvent } = storeToRefs(eventStore)


const route = useRoute()
const router = useRouter()

const oldSchedule = ref<Schedule>()
const newSchedule = ref<Schedule>()
const runsVisualizer = ref<ManageSchedule | null>(null)


const events = ref<MyEvent[]>([])

const startDate = ref();
const endDate = ref();
const setupTime = ref({
  hours: new Date().getHours(),
  minutes: new Date().getMinutes()
});
const flow = ref(['year', 'month', 'calendar']);

watch(startDate, (newDate, _) => {
  let dateObject = new Date(newDate)
  if (newSchedule.value) {
    newSchedule.value.start_time_mili = dateObject.getTime()
  }
})

watch(endDate, (newDate, _) => {
  let dateObject = new Date(newDate)
  if (newSchedule.value) {
    newSchedule.value.end_time_mili = dateObject.getTime()
  }
})

watch(setupTime, (newTime, _) => {
  if (newSchedule.value) {
    newSchedule.value.setup_time_mili = (newTime.hours * 3.6e+6 + newTime.minutes * 60000)
  }
})

const handleGetScheduleById = async () => {
  try {
    const id = selectedEvent.value.schedule_id;
    if (!id) throw new Error("Error getting id");

    const response: APIResponse<Schedule> = await apiGetScheduleByID(id)
    oldSchedule.value = response.data
    newSchedule.value = JSON.parse(JSON.stringify(response.data))

    runsVisualizer.value = { ...response.data, rows: [] }

    if (newSchedule.value) {
      const startDateApi = new Date(newSchedule.value.start_time_mili);
      startDate.value = startDateApi.toISOString()

      const endDateApi = new Date(newSchedule.value.end_time_mili);
      endDate.value = endDateApi.toISOString()
    }

  } catch (error) {
    console.error("Failed to create schedule:", error);
    alert("There was an error getting the schedule. Please try again.");
    router.push('/schedule')
  }
}

onMounted(() => {
  handleGetScheduleById()
})

</script>