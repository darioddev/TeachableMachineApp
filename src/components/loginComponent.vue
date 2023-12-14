<script setup>
import { RouterLink } from 'vue-router'
import { useRouter } from 'vue-router'
import { stateUser } from '@/scripts/stateUser.js'
import { stateImage } from '@/scripts/generate-image.js'
import { TeachableMachineApp } from '@/scripts/teachableMachineApp.js'
import { showSuccessMessage, showConfirmationDialog, showErrorMessage } from '@/scripts/alert-function.js'
import { handleSubmit } from '@/scripts/auth.js'

const router = useRouter();

const loginUser = async (user, password, classAlea) => {
    const confirmedExist = await stateUser.userExists(user, password);

    if (confirmedExist) {
        const confirmed = await showConfirmationDialog(
            "Verificación de identidad",
            `<strong>Por favor, coloque su mano en la cámara como se muestra a continuación</strong> : <br><br>
            ${stateImage.changeImage(classAlea).outerHTML}`,
            "Continuar"
        );

        if (confirmed) {
            // Confirmación de identidad
            await TeachableMachineApp.showTeachableMachineModal(classAlea);
            await showSuccessMessage(
                "Identidad confirmada",
                "Bienvenido a la aplicación"
            );
            // Guardamos el usuario en el localStorage
            localStorage.setItem('user', user);
            // Redireccionamos al usuario a la página de inicio
            router.push({ path: '/home' });
        }
    } else {
        await showErrorMessage(
            "Error de autenticación",
            "El usuario o la contraseña son incorrectos"
        );
    }
};

</script>

<template>
    <div class="container">
        <form @submit.prevent="handleSubmit($event,loginUser)" action="#" id="form" class="form" data-action="login">
            <fieldset>
                <legend>Inicio de Sesión</legend>
                <div class="input-group">
                    <input type="text" name="user" id="user" placeholder="usuario" required />
                </div>
                <div class="input-group">
                    <input type="password" id="password" placeholder="Contraseña" required />
                </div>
                <div class="input-group">
                    <input type="submit" value="Iniciar Sesión" />
                </div>
            </fieldset>
            <RouterLink to="/registro" href="" class="registrobtn" data-path="registro">Si no estas registrado, haz click
                aquí
            </RouterLink>
        </form>
    </div>
</template>

<style scoped>
@import '@/assets/css/raiz.css';
</style>