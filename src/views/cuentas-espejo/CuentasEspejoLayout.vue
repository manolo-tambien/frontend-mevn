<script setup>
    import { useUserStore } from '../../stores/user'
    const user = useUserStore()
</script>



<template>
   <h1>
    Cuentas Espejo
   </h1>

    <main>
        <RouterView />
    </main>
</template>

