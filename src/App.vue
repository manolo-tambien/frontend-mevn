<script setup>
import { RouterView } from 'vue-router'
import {ref} from 'vue'

import { useUserStore } from './stores/user'
const userStore = useUserStore()

const items = ref([
    {
        label: 'Cuentas Espejo',
        icon: 'pi pi-home'
    }
]);

</script>

<template>
  <div v-if="userStore.getUserName" class="card">
    <Menubar :model="items">
      <template #item="{ item, props }">
        <a v-ripple class="flex align-items-center" v-bind="props.action">
          <span :class="item.icon" />
          <span class="ml-2">{{ item.label }}</span>
        </a>
      </template>
      <template #end="{item}">
        <div class="flex align-items-center gap-2">
          <span>{{userStore.getUserName}}</span>
          <Button label="Salir" icon="pi pi-times" iconPos="right" severity="danger" @click="userStore.logout" />
        </div>
      </template>
    </Menubar>
  </div>
  <div class="card">
    <RouterView />
  </div>
</template>

