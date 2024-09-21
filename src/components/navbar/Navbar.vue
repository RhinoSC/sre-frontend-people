<template>
  <div class="flex flex-row items-center justify-between w-full h-full gap-2 capitalize">
    <div class="flex flex-row items-start justify-start w-1/4 h-full">
      <a href="/" class="w-full h-full">
        <img src="/src/assets/SRE-X_color.png" alt="" class="object-contain w-[203px] h-full">
      </a>
    </div>
    <div class="flex flex-row items-center w-full text-xl grow">
      <div class="flex flex-row items-center justify-center w-1/5">
        <RouterLink to="/schedule">{{ t("schedule") }}</RouterLink>
      </div>
      <div class="flex flex-row items-center justify-center w-1/5">
        <RouterLink to="/prizes">{{ t("prizes") }}</RouterLink>
      </div>
      <div class="flex flex-row items-center justify-center w-1/5">
        <RouterLink to="/donate" class="px-2 py-1 font-bold uppercase bg-indigo-500 rounded-lg text-white-smoke">{{
          t("donate") }}
        </RouterLink>
      </div>
      <div class="flex flex-row items-center justify-center w-1/5">
        <RouterLink to="/bids">{{ t("bids") }}</RouterLink>
      </div>
      <div class="flex flex-row items-center justify-center w-1/5">
        <RouterLink to="/donations">{{ t("donations") }}</RouterLink>
      </div>
    </div>
    <div class="flex justify-end w-1/4">
      <div class="flex flex-row items-center justify-center">
        <h1> {{ localSelectedEvent.name }}</h1>
        <ThemeToggle />
        <LanguageSwitcher></LanguageSwitcher>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { MyEvent } from '@/types/event';
import ThemeToggle from './ThemeToggle.vue';
import LanguageSwitcher from '@/components/LanguageSwitcher.vue';
import { onMounted, ref, watch } from 'vue';
import { useEventStore } from '@/stores/useEventStore'
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n'
const { t } = useI18n()


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