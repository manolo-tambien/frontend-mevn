<script setup>
    import { inject } from 'vue'
    import { useRouter } from 'vue-router'
    import AuthAPI from '../../api/AuthAPI';
    import { useToast } from 'primevue/usetoast';

    const toast = useToast();
    const router = useRouter()

    const handleSubmit = async (formData) => {
        try {
            const { data: { token } } = await AuthAPI.login(formData)
            localStorage.setItem('AUTH_TOKEN', token)
            router.push({name: 'cuentas-espejo'})
        } catch (error) {
            toast.add({ severity: 'error', summary: 'Alerta', detail: 'Ocurrio un problema', life: 9000 });
        }
    }
</script>

<template>
    <Toast />
    <FormKit
        id="loginForm"
        type="form"
        :actions="false"
        incomplete-message="No se pudo enviar, revisa las notificaciones"
        @submit="handleSubmit"
    >
        <FormKit
            type="email"
            label="Email"
            name="email"
            placeholder="Email de Usuario"
            validation="required|email"
            :validation-messages="{
                required: 'El Email es obligatorio',
                email: 'Email no válido'
            }"
        />

        <FormKit
            type="password"
            label="Password"
            name="password"
            placeholder="Password de Usuario"
            validation="required"
            :validation-messages="{
                required: 'El Password es obligatorio'
            }"
        />

        <FormKit type="submit">Iniciar Sesión</FormKit>
    </FormKit>

</template>
