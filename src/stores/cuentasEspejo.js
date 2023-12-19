import { ref, onMounted, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import AuthAPI from '../api/AuthAPI'
// import AppointmentAPI from '../api/AppointmentAPI'
import CuentasEspejoAPI from "../api/CuentasEspejoAPI";

export const useCuentaEspejoStore = defineStore('cuenta-espejo', () => {

    const router = useRouter()
    
    const user = ref({})
    //const userAppointments = ref([])
    const cuentasEspejo = ref([])
    


    onMounted(async () => {
        try {
            const { data } = await AuthAPI.auth()
            user.value = data
            await getAllCuentasEspejo()
        } catch (error) {
            console.log(error)
        } finally {
            
        }
    })

    // async function getUserAppointments() {
    //     const { data } = await AppointmentAPI.getUserAppointments(user.value._id)
    //     userAppointments.value = data
    // }

    // async function getAllCuentasEspejo(){
    //     const data  = await CuentasEspejoAPI.getAllCuentasEspejo()
    //     console.log(cuentasEspejo)
    //     cuentasEspejo.value = data
    // }

 
    async function editCuentaEspejo(cuentaEspejoModificada){
        // const {data} await CuentasEspejoAPI.editCuentaEspejo(cuentaEspejoModificada)
        // cuentasEspejo.value = data
    }

    async function getAllCuentasEspejo(){
        const {data} = await CuentasEspejoAPI.getAllCuentasEspejo()
        cuentasEspejo.value = data
    }
    

    function logout() {
        localStorage.removeItem('AUTH_TOKEN')
        user.value = {}
        router.push({name : 'login'})
    }

    const getUserName = computed(() => user.value?.name ? user.value?.name : '')

    return {
        user,
        logout,
        cuentasEspejo,
        getAllCuentasEspejo,

        getUserName,
        editCuentaEspejo

    }
})