<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="h-screen">
    <!-- Barra horizontal -->
    <div class="text-white py-4 px-6">
      Barra superior
    </div>

    <!-- Div que contiene el RouterView -->
    <div class="px-10 py-5 min-h-full overflow-y-scroll">
      <RouterView />
    </div>
  </div>
</template>

