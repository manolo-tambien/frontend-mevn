import api from "../lib/axios";

export default {
    getAllCuentasEspejo() {
        return api.get('/cuentas-espejo')
    },
    editCuentaEspejo(cuentaEspejoModificada){
        return api.put('/edit-cuenta-espejo',cuentaEspejoModificada)
    }
}

