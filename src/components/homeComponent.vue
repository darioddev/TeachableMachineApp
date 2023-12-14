<script setup>
import navegadorComponent from '@/components/navegadorComponent.vue';
const username = localStorage.getItem('user') || 'usuario';
</script>

<template>
    <navegadorComponent />
    <div class="home">
        <p class="text">BIENVENIDO DE NUEVO , {{ username.toUpperCase() }} ! </p>
    </div>
</template>



<style scoped>
@import '@/assets/css/navegador.css';
</style>