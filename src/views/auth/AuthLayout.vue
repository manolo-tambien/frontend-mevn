<script setup>

import { RouterView } from 'vue-router'
// const authRoutes = [
//     { name: 'register', text: 'Crear una cuenta' },
//     { name: 'login', text: 'Iniciar Sesión' },
//     { name: 'forgot-password', text: 'Olvide mi password' },
// ]
</script>

<template>
    <RouterView />

    <!-- <nav class="mt-10 flex flex-col items-center space-y-5 lg:flex-row lg:justify-between lg:space-y-0">
            <RouterLink
                v-for="authRoute in authRoutes"
                class="uppercase font-bold text-white"
                :to="{name: authRoute.name}"
                :class="{ 'hidden' : route.name === authRoute.name }"
            >{{ authRoute.text }}</RouterLink>
        </nav> -->
</template>
