import { ref, onMounted, computed } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import CuentasEspejoAPI from "../api/CuentasEspejoAPI";


export const useCuentaEspejoStore = defineStore('cuenta-espejo', () => {

    const router = useRouter()
    const cuentasEspejo = ref([])

    onMounted(async () => {
        try {
            await getAllCuentasEspejo()
        } catch (error) {
            console.log(error)
        } finally {

        }
    })


    async function updateCuentaEspejo(cuentaEspejoModificada) {
        await CuentasEspejoAPI.update(cuentaEspejoModificada._id, cuentaEspejoModificada)
    }


    async function getAllCuentasEspejo() {
        const { data } = await CuentasEspejoAPI.getAllCuentasEspejo()

        cuentasEspejo.value = data
    }

    async function deleteCuentaEspejo(idCuentaEspejo) {
        const { data } = await CuentasEspejoAPI.deleteCuentaEspejo(idCuentaEspejo)
        cuentasEspejo.value = cuentasEspejo.value.filter(cuentaEspejo => cuentaEspejo._id !== idCuentaEspejo);
    }

    return {
        cuentasEspejo,
        getAllCuentasEspejo,
        deleteCuentaEspejo,
        updateCuentaEspejo

    }
})