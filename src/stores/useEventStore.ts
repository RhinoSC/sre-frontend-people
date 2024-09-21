import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import type { MyEvent } from '@/types/event'
import { apiGetEventByID } from '@/api/event/event'

export const useEventStore = defineStore('event', () => {
  // Estado global
  const selectedEvent = ref<MyEvent>({} as MyEvent)

  // Cargar el evento seleccionado desde localStorage si existe
  const loadSelectedEvent = () => {
    const storedEvent = localStorage.getItem('selectedEvent')
    if (storedEvent) {
      selectedEvent.value = JSON.parse(storedEvent)
    }
  }

  // Función para obtener eventos desde la API
  const fetchEventByID = async (id: string) => {
    try {
      const response = await apiGetEventByID(id)
      selectedEvent.value = response.data
    } catch (error) {
      console.error('Error fetching event:', error)
    }
  }

  // Función para seleccionar un evento
  const selectEvent = (event: MyEvent) => {
    selectedEvent.value = event
  }

  // Watch para guardar el evento seleccionado en localStorage cuando cambie
  watch(selectedEvent, (newEvent) => {
    if (newEvent) {
      localStorage.setItem('selectedEvent', JSON.stringify(newEvent))
    } else {
      localStorage.removeItem('selectedEvent')
    }
  })

  // Llamar a la función de cargar el evento al inicio
  loadSelectedEvent()

  return {
    fetchEventByID,
    selectedEvent,
    selectEvent,
  }
})

