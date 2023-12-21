// Importa el archivo CSS principal para los estilos de la aplicación.
import '/node_modules/primeflex/primeflex.css'
import './assets/main.css'
import './assets/style.css'
import "primevue/resources/themes/lara-light-green/theme.css";
import 'primeicons/primeicons.css'

// Importa funciones y objetos necesarios de Vue.
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { plugin, defaultConfig } from '@formkit/vue'
import config from '../formkit.config'

import PrimeVue from 'primevue/config';


import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog'
import Password from 'primevue/password'
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice'
import Menubar from 'primevue/menubar';



// Importa el componente principal de la aplicación.
import App from './App.vue'

// Importa el enrutador definido en el archivo router.js.
import router from './router'

// Importa el estilo de los mensajes de tostada (toast).
// import "vue-toast-notification/dist/theme-sugar.css"


// Crea una aplicación Vue.
const app = createApp(App)

app.use(ToastService)
app.use(PrimeVue, {
    unstyled: false
});

app.component('DataTable', DataTable)
app.component('Column', Column)
app.component('InputText', InputText)
app.component('Button', Button)
app.component('Dialog', Dialog)
app.component('Password', Password)
app.component('Toast', Toast)
app.component('Menubar', Menubar)


// Usa el sistema de estado global Pinia para manejar el estado de la aplicación.
app.use(createPinia())

// Usa el plugin de @formkit/vue para manejar formularios en la aplicación.
// También se le pasa la configuración predeterminada y la configuración específica de la aplicación (config).
app.use(plugin, defaultConfig(config))

// Usa el enrutador definido en router.js para manejar la navegación de la aplicación.
app.use(router)

// Monta la aplicación en el elemento con el ID 'app' en el DOM.
app.mount('#app')
