<template>
  <div v-if="schedule" class="flex flex-col items-center w-full">
    <div class="flex flex-row flex-wrap w-full gap-6 justify-evenly">
      <div class="flex flex-col items-center justify-center w-full">
        <div class="w-full">
          <table class="w-full text-left shadow-xl table-auto rtl:text-right">
            <thead class="dark:bg-gray-dark-300 bg-gray-light-300">
              <tr>
                <th class="px-6 py-3">
                  Game
                </th>
                <th class="px-6 py-3">
                  Runner/s
                </th>
                <th class="px-6 py-3">
                  Estimate
                </th>
                <th class="px-6 py-3">
                  Start time
                </th>
                <th class="px-6 py-3">
                  Bid Wars
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in scheduleRows" :key="row._id"
                class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <template v-if="isRowDay(row)">
                  <td colspan="5" class="py-4 text-xl font-bold text-center capitalize bg-indigo-500 text-white-smoke"
                    :draggable="!isRowDay(row)">
                    {{ row.dayText }}</td>
                </template>
                <template v-else>
                  <td class="px-6 py-4">{{ row.row.name }}</td>
                  <td class="w-1/4 px-6 py-4 break-words">{{ getRunnerString(row.row) }}</td>
                  <td class="px-6 py-4">{{ MStoStringTime(row.row.estimate_mili) }}</td>
                  <td class="flex flex-row items-center justify-start w-1/2 gap-2 px-6 py-4">
                    {{ new Date(row.row.start_time_mili).toLocaleString('es-ES', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                      hour: 'numeric',
                      minute: 'numeric',
                      hour12: false
                    }) }}
                  </td>
                  <td class="px-6 py-4">{{ row.row.bids !== undefined ? row.row.bids.length > 0 ? "Yes" : "No" : "No" }}
                  </td>
                </template>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import { uuid } from 'vue-uuid';

import { getRunnerString, MStoStringTime } from '@/utils/strings'
import type { ManageScheduleRow, ManageSchedule } from '@/types/schedule';
import type { Run } from '@/types/run';

interface Props {
  schedule: ManageSchedule
}

const props = defineProps<Props>()
let startDate: Date
let startTimeMS: number
let startTime: string
const availableRuns = ref<Run[]>([])
const backupRuns = ref<Run[]>([])
const orderedRuns = ref<Run[]>([])
let scheduleRows = ref<ManageScheduleRow[]>([])
let actualTimeMS: number


function isRowDay(item: ManageScheduleRow) {
  if (item.dayRow) {
    return true
  }
  return false
}

function getDay(item: ManageScheduleRow, firstDay: boolean) {
  let newDate;
  if (firstDay) {
    newDate = new Date(startTimeMS)
  }
  else {
    newDate = new Date(item.row.start_time_mili)
  }
  return newDate.toLocaleDateString('es', { dateStyle: 'full' })
}

function setFirstRow(item: ManageScheduleRow, firstTime: boolean) {
  actualTimeMS = startTimeMS + item.row.estimate_mili + item.row.setup_time_mili

  item.row.start_time_mili = startDate.getTime()
  item.time = startDate.toLocaleString('en-US', { hour12: false, timeStyle: 'short' })

  if (!firstTime) {
    item.newDay = true
    item.dayText = getDay(item, true)
  } else {
    item.newDay = true
    item.dayText = getDay(item, true)
    scheduleRows.value.push({ _id: uuid.v4(), dayRow: true, start: MStoStringTime(item.row.start_time_mili), dayText: item.dayText, } as ManageScheduleRow)
    scheduleRows.value.push(item)
  }
}

function addRun(item: Run, fetching: boolean) {
  item.status = "active"
  const run: ManageScheduleRow = { _id: item.id, start: MStoStringTime(item.start_time_mili), dayRow: false, newDay: false, dayText: "", time: "", row: item }

  if (!fetching) {
    const indexAvailable = availableRuns.value.findIndex((row: Run) => row.id === item.id)
    availableRuns.value.splice(indexAvailable, 1)
  }

  if (scheduleRows.value.length === 0) {
    setFirstRow(run, true)
  } else {
    const runTime = scheduleRows.value[scheduleRows.value.length - 1].row.estimate_mili + scheduleRows.value[scheduleRows.value.length - 1].row.setup_time_mili
    const oldStartDate = new Date(actualTimeMS - runTime)
    const oldEndDate = new Date(actualTimeMS)

    actualTimeMS += run.row.estimate_mili + run.row.setup_time_mili


    run.row.start_time_mili = oldEndDate.getTime()
    run.time = oldEndDate.toLocaleTimeString('en-US', { hour12: false, timeStyle: 'short' })

    if (oldStartDate.getDate() != oldEndDate.getDate()) {
      run.newDay = true
      run.dayText = getDay(run, false)
      scheduleRows.value.push({
        _id: item.id,
        dayRow: true, start: MStoStringTime(run.row.start_time_mili), dayText: run.dayText,
        newDay: false,
        time: MStoStringTime(run.row.estimate_mili),
        row: {} as Run
      })
    }

    run.dayText = getDay(run, false)


    scheduleRows.value.push(run)
  }
}

onMounted(() => {
  const date = new Date(props.schedule.start_time_mili)
  startDate = date
  startTimeMS = date.getTime()
  startTime = date.toLocaleTimeString('en-US', { hour12: false, timeStyle: 'short' })

  if (props.schedule.runs) {
    availableRuns.value = props.schedule.runs
  }
  if (props.schedule.backup_runs) {
    backupRuns.value = props.schedule.backup_runs
  }
  if (props.schedule.ordered_runs) {
    orderedRuns.value = props.schedule.ordered_runs

    if (props.schedule.ordered_runs.length > 0) {

      const sortedRuns = [...props.schedule.ordered_runs].sort((a, b) => {
        return a.start_time_mili - b.start_time_mili;
      });
      sortedRuns.forEach((run: Run) => {
        addRun(run, true)
      });
    }
  }
})
</script>

<style scoped>
.default-row {
  cursor: auto;
}
</style>