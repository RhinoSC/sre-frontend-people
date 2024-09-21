<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import Navbar from './components/navbar/Navbar.vue';

// const isDarkMode = ref(localStorage.getItem('theme') === 'dark');
</script>

<template>
  <main
    class="flex flex-col items-center w-full min-h-screen transition dark:bg-gray-dark-400 dark:text-white-smoke text-gray-dark-400 bg-gray-light-100 font-lato">
    <!-- Navbar -->
    <div class="flex flex-row justify-center w-full h-12 px-6 dark:bg-gray-dark-300 bg-gray-light-300">
      <Navbar />
    </div>

    <!-- Contenido principal -->
    <main class="z-10 flex-1 w-full">
      <!-- Aquí irá el contenido de la aplicación -->
      <RouterView />
    </main>

    <!-- Footer -->
    <footer class="p-4 text-xl font-bold text-center">
      <!-- Contenido del Footer -->
      SRE 2024
    </footer>
  </main>
</template>


<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
