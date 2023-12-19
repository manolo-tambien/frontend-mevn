<!-- <script setup>
import { ref } from "vue";
import { useUserStore } from '../../stores/user'
import { useCuentaEspejoStore } from '../../stores/cuentasEspejo'
import { FilterMatchMode } from 'primevue/api';


//const user = useUserStore()
const storeCuentasEspejo = useCuentaEspejoStore()

//global: { value: null, matchMode: FilterMatchMode.CONTAINS },
const filters = ref({
    gerente: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    cliente: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    linea_transportista: { value: null, matchMode: FilterMatchMode.IN },
    salidas: { value: null, matchMode: FilterMatchMode.EQUALS },
    url: { value: null, matchMode: FilterMatchMode.EQUALS },
    usuario: { value: null, matchMode: FilterMatchMode.EQUALS },
    password: { value: null, matchMode: FilterMatchMode.EQUALS },
    cuentas: { value: null, matchMode: FilterMatchMode.EQUALS },
    estaciones: { value: null, matchMode: FilterMatchMode.EQUALS }
});



</script> -->



<!-- <template>
    <div class="card">
        <DataTable :value="storeCuentasEspejo.cuentasEspejo" showGridlines stripedRows paginator :rows="10"
            :rowsPerPageOptions="[5, 10, 20, 50]" v-model:filters="filters"
            >
            <Column field="gerente" header="Gerente"></Column>
            <Column field="cliente" header="Cliente"></Column>
            <Column field="linea_transportista" header="Línea Transportista"></Column>
            <Column field="salidas" header="Salidas"></Column>
            <Column field="url" header="Url"></Column>
            <Column field="usuario" header="Usuario"></Column>
            <Column field="password" header="Contraseña"></Column>
            <Column field="cuentas" header="Cuentas"></Column>
            <Column field="estaciones" header="Estaciones"></Column>
        </DataTable>
    </div>
    <main>
        <RouterView />
    </main>
</template> -->


<template>
    <div class="card">
        <Toast />
        <DataTable v-model:filters="filters" :value="storeCuentasEspejo.cuentasEspejo" paginator :rows="10" dataKey="_id"
            :loading="loading" showGridlines :rowsPerPageOptions="[5, 10, 25]"
            paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
            currentPageReportTemplate="Mostrando de {first} a {last} cuentas de un total de {totalRecords} cuentas espejo"
            :globalFilterFields="['gerente', 'cliente', 'linea_transportista', 'salidas', 'url', 'usuario', 'cuentas', 'estaciones']">
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
            <!--  <template #body="{ data }">
                    {{ data.cliente }}
                    <div class="flex align-items-center gap-2">
                        <img :alt="data.representative.name" :src="`https://primefaces.org/cdn/primevue/images/avatar/${data.representative.image}`" style="width: 32px" />
                        <span>{{ data.representative.name }}</span>
                    </div>
                </template> -->
            <!--<template #filter="{ filterModel, filterCallback }">
                     <MultiSelect v-model="filterModel.value" @change="filterCallback()" :options="representatives" optionLabel="name" placeholder="Any" class="p-column-filter" style="min-width: 14rem" :maxSelectedLabels="1">
                        <template #option="slotProps">
                            <div class="flex align-items-center gap-2">
                                <img :alt="slotProps.option.name" :src="`https://primefaces.org/cdn/primevue/images/avatar/${slotProps.option.image}`" style="width: 32px" />
                                <span>{{ slotProps.option.name }}</span>
                            </div>
                        </template>
                    </MultiSelect> 
                </template>-->

            <Column field="linea_transportista" header="Línea Transportista">
                <!--<template #body="{ data }">
                    {{ data.linea_transportista }}
                     <Tag :value="data.status" :severity="getSeverity(data.status)" />
                </template> -->
                <!-- <template #filter="{ filterModel, filterCallback }">
                    <Dropdown v-model="filterModel.value" @change="filterCallback()" :options="statuses" placeholder="Select One" class="p-column-filter" style="min-width: 12rem" :showClear="true">
                        <template #option="slotProps">
                            <Tag :value="slotProps.option" :severity="getSeverity(slotProps.option)" />
                        </template>
                    </Dropdown>
                </template> -->
            </Column>
            <Column field="salidas" header="Salidas">
                <!-- <template #filter="{ filterModel, filterCallback }">
                    <TriStateCheckbox v-model="filterModel.value" @change="filterCallback()" />
                </template> -->
            </Column>
            <Column field="url" header="Url"></Column>
            <Column field="usuario" header="Usuario">
                <!-- <template #body="{ data }">
                    {{ data.url }}
                </template> -->
            </Column>
            <Column field="password" header="Password">
                <template #body="{data}">
                    <Password disabled :feedback="false" v-model.trim="data.password" ></Password>
                </template>
            </Column>
            <Column field="cuentas" header="Cuentas">
            </Column>
            <Column field="estaciones" header="Estaciones"></Column>
            <Column header="Acciones">
                <!-- <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editProduct(slotProps.data)" /> -->
                <template #body="cuentaEspejo">
                    <Button icon="pi pi-pencil" outlined rounded class="mr-2"
                        @click="editarCuentaEspejo(cuentaEspejo.data)" />
                    <Button icon="pi pi-trash" outlined rounded severity="danger"
                    @click="confirmDeleteProduct(cuentaEspejo.data)" />
                </template>
            </Column>
        </DataTable>

        <Dialog v-model:visible="cuentaEspejoDialog" :style="{ width: '450px' }" header="Detalles de Cuenta Espejo"
            :modal="true" class="p-fluid">
            <div class="field">
                <label for="name">Gerente</label>
                <InputText id="gerente" v-model.trim="cuentaEspejo.gerente" required="true" autofocus
                    :class="{ 'p-invalid': submitted && !cuentaEspejo.gerente }" />
                <small class="p-error" v-if="submitted && !cuentaEspejo.gerente">El gerente es requerido.</small>
            </div>
            <div class="field">
                <label for="description">Cliente</label>
                <InputText id="cliente" v-model.trim="cuentaEspejo.cliente" required="true"
                    :class="{ 'p-invalid': submitted && !cuentaEspejo.cliente }" />
                <small class="p-error" v-if="submitted && !cuentaEspejo.cliente">El cliente es requerido.</small>
            </div>
            <div class="field">
                <label for="description">Linea Transportista</label>
                <InputText id="linea_transportista" v-model.trim="cuentaEspejo.linea_transportista" required="true"
                    :class="{ 'p-invalid': submitted && !cuentaEspejo.linea_transportista }" />
                <small class="p-error" v-if="submitted && !cuentaEspejo.linea_transportista">La línea transportista es
                    requerida.</small>
            </div>
            <div class="field">
                <label for="description">Salidas</label>
                <InputText id="salidas" v-model.trim="cuentaEspejo.salidas" required="true"
                    :class="{ 'p-invalid': submitted && !cuentaEspejo.salidas }" />
                <small class="p-error" v-if="submitted && !cuentaEspejo.salidas">Las salidas son requeridas.</small>
            </div>
            <div class="field">
                <label for="description">URL</label>
                <InputText id="url" v-model.trim="cuentaEspejo.url" required="true"
                    :class="{ 'p-invalid': submitted && !cuentaEspejo.url }" />
                <small class="p-error" v-if="submitted && !cuentaEspejo.url">La url es requerida.</small>
            </div>
            <div class="field">
                <label for="description">Usuario</label>
                <InputText id="usuario" v-model.trim="cuentaEspejo.usuario" required="true"
                    :class="{ 'p-invalid': submitted && !cuentaEspejo.usuario }" />
                <small class="p-error" v-if="submitted && !cuentaEspejo.usuario">El usuario es requerido.</small>
            </div>
            <div class="field">
                <label for="description">Contraseña</label>
                <Password id="password" v-model.trim="cuentaEspejo.password"
                    :class="{ 'p-invalid': submitted && !cuentaEspejo.password }" disabled />
                <!-- <InputText id="url" v-model.trim="cuentaEspejo.password" required="true" :class="{'p-invalid': submitted && !cuentaEspejo.password}" /> -->
                <small class="p-error" v-if="submitted && !cuentaEspejo.password">La contraseña es requerida.</small>
            </div>
            <div class="field">
                <label for="description">Cuentas</label>
                <InputText id="cuentas" v-model.trim="cuentaEspejo.cuentas" required="true"
                    :class="{ 'p-invalid': submitted && !cuentaEspejo.cuentas }" />
                <small class="p-error" v-if="submitted && !cuentaEspejo.cuentas">La cuenta es requerida</small>
            </div>
            <div class="field">
                <label for="description">Estaciones</label>
                <InputText id="estaciones" v-model.trim="cuentaEspejo.estaciones" required="true"
                    :class="{ 'p-invalid': submitted && !cuentaEspejo.estaciones }" />
                <small class="p-error" v-if="submitted && !cuentaEspejo.estaciones">Las estaciones son requeridas</small>
            </div>
            <!-- <div class="formgrid grid">
                <div class="field col">
                    <label for="price">Price</label>
                    <InputNumber id="price" v-model="product.price" mode="currency" currency="USD" locale="en-US" />
                </div>
                <div class="field col">
                    <label for="quantity">Quantity</label>
                    <InputNumber id="quantity" v-model="product.quantity" integeronly />
                </div>
            </div> -->
            <template #footer>
                <Button label="Cancelar" icon="pi pi-times" text @click="ocultarDialog" />
                <Button label="Guardar" icon="pi pi-check" text @click="guardarCuentaEspejo" />
            </template>
        </Dialog>

        <Dialog v-model:visible="eliminarCuentaEspejoDialog" :style="{width: '450px'}" header="Confirmar" :modal="true">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                <span v-if="cuentaEspejo">¿Estás seguro de eliminar esta cuenta espejo?</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" text @click="eliminarCuentaEspejoDialog = false"/>
                <Button label="Sí" icon="pi pi-check" text @click="eliminarCuentaEspejo" />
            </template>
        </Dialog>
    </div>
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
    //products.value = products.value.filter(val => val.id !== product.value.id);
    eliminarCuentaEspejoDialog.value = false;
    cuentaEspejo.value = {};
    toast.add({severity:'success', summary: 'Exitoso', detail: 'Cuenta espejo eliminada', life: 9000});
};
const guardarCuentaEspejo = () => {
    submitted.value = true;

    // if (product.value.name.trim()) {
    //     if (product.value.id) {
    //         product.value.inventoryStatus = product.value.inventoryStatus.value ? product.value.inventoryStatus.value : product.value.inventoryStatus;
    //         products.value[findIndexById(product.value.id)] = product.value;
    //         toast.add({severity:'success', summary: 'Successful', detail: 'Product Updated', life: 3000});
    //     }
    //     else {
    //         product.value.id = createId();
    //         product.value.code = createId();
    //         product.value.image = 'product-placeholder.svg';
    //         product.value.inventoryStatus = product.value.inventoryStatus ? product.value.inventoryStatus.value : 'INSTOCK';
    //         products.value.push(product.value);
    //         toast.add({severity:'success', summary: 'Successful', detail: 'Product Created', life: 3000});
    //     }

    //     productDialog.value = false;
    //     product.value = {};
    // }

    cuentaEspejoDialog.value = false;
    cuentaEspejo.value = {};
};
const ocultarDialog = () => {
    cuentaEspejoDialog.value = false;
    submitted.value = false;
};
const editarCuentaEspejo = (cuentaEspejoModificada) => {
    //cuentaEspejo.value = { ...cuentaEspejoSeleccionada };
    // storeCuentasEspejo.editCuentaEspejo(cuentaEspejoModificada)
    
    cuentaEspejoDialog.value = true;
};

</script>


