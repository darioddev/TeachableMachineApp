<script setup>
import { initializeUI } from '@/scripts/UI.js';
import { logout } from '@/scripts/auth.js';

const username = localStorage.getItem('user') || 'usuario';


window.addEventListener('DOMContentLoaded', () => {
    initializeUI();
});


</script>
<template>
    <nav class="sidebar close">
        <header>
            <div class="text logo">
                <span class="name">
                    {{ username.toUpperCase()  }}
                </span>
                <span class="rol">
                    FIREBASE JS
                </span>
            </div>
            <i class="bx bx-menu toogle"></i>
        </header>

        <div class="menu-bar">
            <div class="menu">
                <li class="search-box" style="display:none">
                    <i class="bx bx-search icon"></i>
                    <input type="text" name="" id="" placeholder="Buscar..." />
                </li>

                <ul class="menu-links">
                    <li class="nav-link">
                        <a href="?ruta=home">
                            <i class="bx bx-home-alt icon"></i>
                            <span class="text nav-text">Home</span>
                        </a>
                    </li>

                </ul>
            </div>
            <div class="bottom-content">
                <li class="class">
                    <a href="<=borrar&borrar" id="borrarCuenta">
                        <i class="bx bx-message-square-x icon"></i>
                        <span class="text nav-text">Eliminar cuenta </span>
                    </a>
                </li>

                <li class="class">
                    <a href="?ruta=configuracion" id="">
                        <i class="bx bx-cog icon"></i>
                        <span class="text nav-text">Configuracion</span>
                    </a>
                </li>

                <li class="class">
                    <a href="" @click.prevent="logout" id="session">
                        <i class="bx bx-log-out icon"></i>
                        <span class="text nav-text">Cerrar Sesión</span>
                    </a>
                </li>
                <li class="mode">
                    <div class="sun-moon">
                        <i class="bx bx-moon icon moon"></i>
                        <i class="bx bx-sun icon sun"></i>
                    </div>
                    <span class="mode-text text">Modo Oscuro</span>
                    <div class="toogle-switch">
                        <span class="switch"></span>
                    </div>
                </li>
            </div>
        </div>
    </nav>
</template>


<style scoped>
    @import '@/assets/css/navegador.css';
</style>