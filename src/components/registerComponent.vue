<script setup>
import { onMounted, ref, watch, reactive } from 'vue';
import { RouterLink } from 'vue-router'
import { useRouter } from 'vue-router'
import { loadProvinces, loadCities, loadCountries } from '@/scripts/direccion-functions.js';
import { showConfirmationDialog, showErrorMessage } from '@/scripts/alert-function.js';
import { stateUser } from '@/scripts/stateUser.js';
import { TeachableMachineApp } from '@/scripts/teachableMachineApp';
import { stateImage } from '@/scripts/generate-image.js';
import { handleSubmit } from '@/scripts/auth.js';

const form = reactive({
    provinces: [],
    cities: [],
    countries: [],
});

onMounted(async () => {
    form.countries = await loadCountries();
});

const selectedCountry = ref('');

watch(selectedCountry, async () => {
    form.provinces = await loadProvinces(selectedCountry.value);
    form.cities = await loadCities(selectedCountry.value);
});

const router = useRouter();

const functionRegister = async (user, password, classAlea, direccion) => {
    const confirmedExist = await stateUser.userExists(user, password);
    if (confirmedExist) {
        await showErrorMessage(
            "Error de autenticación",
            "El usuario ya existe"
        );
    } else {
        // Mensaje de confirmación para poder registrarse
        const confirmed = await showConfirmationDialog(
            "Verificación de identidad",
            `<strong>Por favor, coloque su mano en la camara como se muestra a continuación</strong> : <br><br>
              ${stateImage.changeImage(classAlea).outerHTML}`,
            "Continuar"
        );
        if (confirmed) {
            await TeachableMachineApp.showTeachableMachineModal(classAlea);
            await stateUser.saveUser({
                user: user,
                password: password,
                direccion: direccion
            });

            await showConfirmationDialog(
                "Registro exitoso",
                "El usuario se ha registrado correctamente",
                "Continuar"
            );

            router.push({ path: '/login' });
        }
    }
}


</script>

<template>
    <div class="container">
        <form action="#" id="form" class="form" data-action="registro" @submit.prevent="handleSubmit($event,functionRegister)">
            <fieldset>
                <legend>Registro</legend>
                <div class="input-group">
                    <input type="text" name="user" id="user" placeholder="usuario" required />
                </div>
                <div class="input-group">
                    <input type="password" id="password" placeholder="Contraseña" required />
                </div>
            </fieldset>
            <!-- Direccion -->
            <fieldset>
                <legend>Dirección</legend>
                <div class="input-group">
                    <input type="text" name="calle" id="calle" placeholder="Calle" required />
                </div>
                <div class="input-group">
                    <input type="text" name="numero" id="numero" placeholder="Número" required />
                </div>

                <!-- Codigo postal y provincia -->
                <div class="input-group">
                    <input type="text" name="cp" id="cp" placeholder="Código Postal" required />
                </div>
                <div class="input-group">
                    <select name="provincia" id="provincia" required>
                        <option v-for="province in form.provinces" :key="province.name" :value="province.name">
                            {{ province.name }}
                        </option>
                    </select>
                </div>

                <!-- Ciudad y país -->
                <div class="input-group">
                    <select name="ciudad" id="ciudad" required>
                        <option v-for="city in form.cities" :key="city" :value="city">
                            {{ city }}
                        </option>
                    </select>
                </div>
                <div class="input-group">
                    <select name="pais" id="pais" required v-model="selectedCountry">
                        <option v-for="country in form.countries" :key="country.value" :value="country.value">
                            {{ country.text }}
                        </option>
                    </select>
                </div>
            </fieldset>

            <div class="input-group">
                <input type="submit" value="Registrarme" />
            </div>

            <RouterLink to="/login" class="registrobtn" data-path="login">
                Si tienes cuenta, haz click aquí
            </RouterLink>
        </form>
    </div>
</template>
<style scoped>
@import '@/assets/css/raiz.css';

.form a {
    margin: 20px;
}
</style>