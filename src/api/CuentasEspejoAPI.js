import api from "../lib/axios";

export default {
    getAllCuentasEspejo() {
        return api.get('/cuentas-espejo')
    },
    update(id, cuentaEspejoModificada){
        return api.put(`/cuentas-espejo/${id}`,cuentaEspejoModificada)
    },
    deleteCuentaEspejo(id){
        return api.delete(`/cuentas-espejo/${id}`)
    }
}

