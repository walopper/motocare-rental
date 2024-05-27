<script setup>
import Moto from 'src/components/Moto.vue';
import { useStore } from 'src/store';

const store = useStore();
</script>

<template>
    <div class="overflow-x-scroll w-screen">
        <div class="no-scrollg flex gap-3 items-start justify-between flex-nowrap px-[10vw] sm:px-8 pb-6">
            <Moto v-for="(ficha, motoId) in store.fichas" :data="ficha" :moto-id="motoId" :key="ficha.model" />
        </div>
    </div>
</template>
