import api from "../lib/axios";

export default {
    getAllCuentasEspejo() {
        return api.get('/cuentas-espejo')
    }
}

