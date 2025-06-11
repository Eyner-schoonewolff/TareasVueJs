<template>
  <div class="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-50">
    <header class="bg-white shadow-md">
      <div class="container mx-auto py-4 px-6">
        <h1 class="text-primary-700 text-3xl font-bold mb-0">MetNet Prueba Técnica</h1>
      </div>
    </header>
    <main class="container mx-auto py-8 px-6">
      <router-view />
    </main>
    <footer class="bg-white shadow-inner py-4 mt-12">
      <div class="container mx-auto px-6 text-center text-gray-500">
        &copy; {{ new Date().getFullYear() }} MetNet - Todos los derechos reservados
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
// Composition API setup
</script> 