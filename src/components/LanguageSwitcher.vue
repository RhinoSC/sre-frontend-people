<template>
  <div class="language-switcher">
    <select @change="switchLanguage($event)" :value="currentLocale"
      class="px-4 py-1 font-sans text-sm leading-tight border border-gray-200 rounded appearance-none py-22 dark:bg-gray-dark-300 bg-gray-light-200 focus:outline-none focus:border-indigo-500">
      <option class="font-sans" v-for="(language, code) in languages" :key="code" :value="code">
        {{ language }}
      </option>
    </select>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();

// Lista de idiomas disponibles
const languages = ref({
  en: 'English',
  es: 'Español',
  // Agrega otros idiomas según sea necesario
})

// Almacena el idioma actual
const currentLocale = locale.value;

// Cambia el idioma cuando el usuario selecciona uno nuevo
const switchLanguage = (event: Event) => {
  const selectedLanguage = (event.target as HTMLSelectElement).value;
  locale.value = selectedLanguage; // Cambia el idioma
  localStorage.setItem('language', selectedLanguage); // Guarda la selección en localStorage
};

</script>

<style scoped>
.active {
  background-color: #6366f1;
  color: white;
}
</style>
