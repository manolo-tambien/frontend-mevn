import { defineStore } from "pinia";
import { ref } from "vue";

export const useCounterStore = defineStore("counter", () => {
  // State
  const counter = ref(0);

  // Mutations
  function increment() {
    counter.value++;
  }

  function decrement() {
    counter.value--;
  }

  // Public interface
  return {
    counter,
    increment,
    decrement,
  };
});
