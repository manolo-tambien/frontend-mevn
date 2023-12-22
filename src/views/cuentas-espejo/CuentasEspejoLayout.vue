


<template>
    <Toast />
    <DataTable v-model:filters="filters" :value="storeCuentasEspejo.cuentasEspejo" paginator :rows="10" dataKey="_id"
        :loading="loading" showGridlines :rowsPerPageOptions="[5, 10, 25]"
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="Mostrando de {first} a {last} cuentas de un total de {totalRecords} cuentas espejo"
        :globalFilterFields="['gerente', 'cliente', 'linea_transportista', 'salidas', 'url', 'usuario', 'cuentas']">
        <template #header>
            <div class="">
                <span class="p-input-icon-left">
                    <i class="pi pi-search" />
                    <InputText v-model="filters['global'].value" placeholder="Buscar..." />
                </span>
            </div>
        </template>
        <template #empty> No hay cuentas espejo. </template>
        <template #loading> Cargando información. Por favor espere. </template>
        <Column field="gerente" header="Gerente">
            <!-- <template #filter="{ filterModel, filterCallback }">
                    <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter" placeholder="Search by name" />
                </template> -->
        </Column>
        <Column header="Cliente" field="cliente"></Column>

        <Column field="linea_transportista" header="Línea Transportista">
        </Column>
        <Column field="salidas" header="Salidas">
        </Column>
        <Column field="url" header="Url"></Column>
        <Column field="usuario" header="Usuario">
        </Column>
        <!-- <Column field="password" header="Password">
            <template #body="{ data }">
                <Password disabled :feedback="false" v-model.trim="data.password"></Password>
            </template>
        </Column> -->
        <Column field="cuentas" header="Cuentas">
        </Column>
       
        <Column header="Acciones">
            <!-- <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editProduct(slotProps.data)" /> -->
            <template #body="cuentaEspejo">
                <Button icon="pi pi-pencil"  rounded class="mr-2" @click="editarCuentaEspejo(cuentaEspejo.data)" />
                <Button icon="pi pi-trash"  rounded severity="danger"
                    @click="confirmDeleteProduct(cuentaEspejo.data)" />
            </template>
        </Column>
    </DataTable>

    <Dialog v-model:visible="cuentaEspejoDialog" :style="{ width: '450px' }" header="Detalles de Cuenta Espejo"
        :modal="true" class="p-fluid">
        <div class="field">
            <label for="gerente">Gerente</label>
            <InputText id="gerente" v-model.trim="cuentaEspejo.gerente" required="true" autofocus
                :class="{ 'p-invalid': submitted && !cuentaEspejo.gerente }" />
            <small class="p-error" v-if="submitted && !cuentaEspejo.gerente">El gerente es requerido.</small>
        </div>
        <div class="field">
            <label for="cliente">Cliente</label>
            <InputText id="cliente" v-model.trim="cuentaEspejo.cliente" required="true"
                :class="{ 'p-invalid': submitted && !cuentaEspejo.cliente }" />
            <small class="p-error" v-if="submitted && !cuentaEspejo.cliente">El cliente es requerido.</small>
        </div>
        <div class="field">
            <label for="linea_transportista">Linea Transportista</label>
            <InputText id="linea_transportista" v-model.trim="cuentaEspejo.linea_transportista" required="true"
                :class="{ 'p-invalid': submitted && !cuentaEspejo.linea_transportista }" />
            <small class="p-error" v-if="submitted && !cuentaEspejo.linea_transportista">La línea transportista es
                requerida.</small>
        </div>
        <div class="field">
            <label for="salidas">Salidas</label>
            <InputText id="salidas" v-model.trim="cuentaEspejo.salidas" required="true"
                :class="{ 'p-invalid': submitted && !cuentaEspejo.salidas }" />
            <small class="p-error" v-if="submitted && !cuentaEspejo.salidas">Las salidas son requeridas.</small>
        </div>
        <div class="field">
            <label for="url">URL</label>
            <InputText id="url" v-model.trim="cuentaEspejo.url" required="true"
                :class="{ 'p-invalid': submitted && !cuentaEspejo.url }" />
            <small class="p-error" v-if="submitted && !cuentaEspejo.url">La url es requerida.</small>
        </div>
        <div class="field">
            <label for="usuario">Usuario</label>
            <InputText id="usuario" v-model.trim="cuentaEspejo.usuario" required="true"
                :class="{ 'p-invalid': submitted && !cuentaEspejo.usuario }" />
            <small class="p-error" v-if="submitted && !cuentaEspejo.usuario">El usuario es requerido.</small>
        </div>
        <div class="field">
            <label for="description">Contraseña</label>
            <Password id="password" v-model.trim="cuentaEspejo.password"
                :class="{ 'p-invalid': submitted && !cuentaEspejo.password }" disabled />
            <small class="p-error" v-if="submitted && !cuentaEspejo.password">La contraseña es requerida.</small>
        </div>
        <div class="field">
            <label for="cuentas">Cuentas</label>
            <InputText id="cuentas" v-model.trim="cuentaEspejo.cuentas" required="true"
                :class="{ 'p-invalid': submitted && !cuentaEspejo.cuentas }" />
            <small class="p-error" v-if="submitted && !cuentaEspejo.cuentas">La cuenta es requerida</small>
        </div>
        <template #footer>
            <Button label="Cancelar" icon="pi pi-times" text @click="ocultarDialog" />
            <Button label="Guardar" icon="pi pi-check" text @click="guardarCuentaEspejo" />
        </template>
    </Dialog>

    <Dialog v-model:visible="eliminarCuentaEspejoDialog" :style="{ width: '450px' }" header="Confirmar" :modal="true">
        <div class="confirmation-content">
            <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
            <span v-if="cuentaEspejo">¿Estás seguro de eliminar esta cuenta espejo?</span>
        </div>
        <template #footer>
            <Button label="No" icon="pi pi-times" text @click="eliminarCuentaEspejoDialog = false" />
            <Button label="Sí" icon="pi pi-check" text @click="eliminarCuentaEspejo" />
        </template>
    </Dialog>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { FilterMatchMode } from 'primevue/api';
import { useCuentaEspejoStore } from '../../stores/cuentasEspejo'
import { useToast } from 'primevue/usetoast';

const toast = useToast();
const storeCuentasEspejo = useCuentaEspejoStore()
const cuentaEspejoDialog = ref(false);
const eliminarCuentaEspejoDialog = ref(false)
const loading = ref(false);
const cuentaEspejo = ref({})
const submitted = ref(false);
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS }
});

onMounted(() => {
    // CustomerService.getCustomersMedium().then((data) => {
    //         customers.value = getCustomers(data);
    //         loading.value = false;
    //     });
    loading.value = false;
});

const confirmDeleteProduct = (cuentaEspejoSeleccionada) => {
    cuentaEspejo.value = cuentaEspejoSeleccionada;
    eliminarCuentaEspejoDialog.value = true;
};
const eliminarCuentaEspejo = () => {
    eliminarCuentaEspejoDialog.value = false;

    storeCuentasEspejo.deleteCuentaEspejo(cuentaEspejo.value._id)
    cuentaEspejo.value = {};

    toast.add({ severity: 'success', summary: 'Exitoso', detail: 'Cuenta espejo eliminada', life: 9000 });
};
const guardarCuentaEspejo = () => {
    submitted.value = false;

    storeCuentasEspejo.updateCuentaEspejo(cuentaEspejo.value)

    cuentaEspejoDialog.value = false;
    cuentaEspejo.value = {};
    toast.add({ severity: 'success', summary: 'Exitoso', detail: 'Cuenta espejo modificada', life: 9000 });
};
const ocultarDialog = () => {
    cuentaEspejoDialog.value = false;
    submitted.value = false;
};

const editarCuentaEspejo = (cuentaEspejoModificada) => {

    cuentaEspejo.value = cuentaEspejoModificada

    cuentaEspejoDialog.value = true;
};

</script>


