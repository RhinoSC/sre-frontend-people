<template>
  <div class="flex flex-row items-center justify-between gap-2 w-full h-full">
    <div class="w-1/3 h-full flex flex-row justify-start items-start">
      <img src="/src/assets/SRE-X_color.png" alt="" class="object-contain w-1/3 h-full">
    </div>
    <div class="flex flex-row items-center justify-between flex-grow w-1/3 text-xl">
      <div>
        <RouterLink to="/schedule">Schedule</RouterLink>
      </div>
      <div>
        <RouterLink to="/prizes">Prizes</RouterLink>
      </div>
      <div>
        <RouterLink to="/donate" class="bg-violet-600 py-1 px-2 rounded-lg font-bold">DONATE</RouterLink>
      </div>
      <div>
        <RouterLink to="/bids">Bids</RouterLink>
      </div>
      <div>
        <RouterLink to="/donations">Donations</RouterLink>
      </div>
    </div>
    <div class="flex justify-end w-1/3">
      <div class="flex flex-row items-center justify-center">
        <h1> {{ localSelectedEvent.name }}</h1>
        <ThemeToggle />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MyEvent } from '@/types/event';
import ThemeToggle from './ThemeToggle.vue';
import { onMounted, ref, watch } from 'vue';
import { useEventStore } from '@/stores/useEventStore'
import { storeToRefs } from 'pinia';

const eventStore = useEventStore()
const { selectedEvent } = storeToRefs(eventStore)

const localEvents = ref<MyEvent[]>([])
const localSelectedEvent = ref<MyEvent>({} as MyEvent)

watch(localSelectedEvent, (newEvent) => {
  if (newEvent) {
    eventStore.selectEvent(newEvent)
  }
})

onMounted(async () => {
  await eventStore.fetchEventByID(import.meta.env.VITE_EVENT_ID)

  // Revisar si selectedEvent ya está definido después de cargar los eventos
  if (selectedEvent.value) {
    localSelectedEvent.value = {
      id: selectedEvent.value.id,
      name: selectedEvent.value.name,
      start_time_mili: selectedEvent.value.start_time_mili,
      end_time_mili: selectedEvent.value.end_time_mili,
      schedule_id: selectedEvent.value.schedule_id
    }
  }
})


</script>