import { ref, onMounted, computed, watch } from 'vue'
import { defineStore } from 'pinia'
import { useRouter, useRoute } from 'vue-router'
import AuthAPI from '../api/AuthAPI'

export const useUserStore = defineStore('user', () => {
    const router = useRouter()
    const route = useRoute()
    const user = ref({})
    const loading = ref(true)

    const fetchUser = async () => {
        loading.value = true
        try {
            const { data } = await AuthAPI.auth()
            user.value = data
        } catch (error) {
            console.log(error)
        } finally {
            loading.value = false
        }
    }

    onMounted(fetchUser)

    // Observa los cambios en la ruta
    watch(() => route.path, async () => {
        // Aquí puedes llamar a fetchUser o realizar cualquier otra acción necesaria
        await fetchUser()
    })

    function logout() {
        localStorage.removeItem('AUTH_TOKEN')
        user.value = {}
        router.push({ name: 'login' })
    }

    const getUserName = computed(() => user.value?.name ? user.value?.name : '')

    return {
        user,
        loading,
        logout,
        getUserName
    }
})
