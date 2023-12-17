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
        <DataTable v-model:filters="filters" :value="storeCuentasEspejo.cuentasEspejo" paginator :rows="10" dataKey="_id"
            filterDisplay="row" :loading="loading"
            :globalFilterFields="['gerente', 'cliente', 'linea_transportista', 'salidas', 'url', 'usuario', 'cuentas', 'estaciones']">
            <template #header>
                <div class="flex justify-content-end">
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
            </Column>
            <Column field="cuentas" header="Cuentas">
            </Column>
            <Column field="estaciones" header="Estaciones"></Column>
            <Column header="Acciones">
                <!-- <Button icon="pi pi-pencil" outlined rounded class="mr-2" @click="editProduct(slotProps.data)" /> -->
                <template #body="data">
                    <Button icon="pi pi-pencil" outlined rounded class="mr-2" />
                    <Button icon="pi pi-trash" outlined rounded severity="danger"/>
                </template>
            </Column>
        </DataTable>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { FilterMatchMode } from 'primevue/api';
//import { CustomerService } from '@/service/CustomerService';

import { useCuentaEspejoStore } from '../../stores/cuentasEspejo'
const storeCuentasEspejo = useCuentaEspejoStore()

const customers = ref();
const filters = ref({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    gerente: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    'country.name': { value: null, matchMode: FilterMatchMode.STARTS_WITH },
    representative: { value: null, matchMode: FilterMatchMode.IN },
    status: { value: null, matchMode: FilterMatchMode.EQUALS },
    verified: { value: null, matchMode: FilterMatchMode.EQUALS }
});


const loading = ref(false);

onMounted(() => {
    // CustomerService.getCustomersMedium().then((data) => {
    //         customers.value = getCustomers(data);
    //         loading.value = false;
    //     });
    loading.value = false;
});

const getCustomers = (data) => {
    return [...(data || [])].map((d) => {
        d.date = new Date(d.date);

        return d;
    });
};
const formatDate = (value) => {
    return value.toLocaleDateString('en-US', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
};
const formatCurrency = (value) => {
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
};
const getSeverity = (status) => {
    switch (status) {
        case 'unqualified':
            return 'danger';

        case 'qualified':
            return 'success';

        case 'new':
            return 'info';

        case 'negotiation':
            return 'warning';

        case 'renewal':
            return null;
    }
}

</script>


