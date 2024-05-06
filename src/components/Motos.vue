<script>
import { defineComponent, computed } from 'vue';
import { useQuasar } from 'quasar';
import Moto from 'src/components/Moto.vue';
import fichas from 'src/data/fichas';

export default defineComponent({
    name: 'Motos',
    components: {
        Moto,
    },
    setup() {
        const $q = useQuasar();

        const isMobile = computed(() => $q.platform.is.mobile);

        return {
            isMobile,
            fichas,
        };
    },
});
</script>

<template>
    <div class="motos">
        <Moto v-for="(ficha, motoId) in fichas" :data="ficha" :moto-id="motoId" :key="ficha.model" />
    </div>
</template>
<style lang="scss">
.motos {
    display: flex;

    @media only screen and (max-width: 480px) {
        flex-direction: column;
    }
}
</style>
