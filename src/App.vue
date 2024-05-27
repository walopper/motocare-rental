<template>
    <router-view />
</template>

<style lang="scss">
@tailwind base;
@tailwind components;
@tailwind utilities;

@custom-media -mb (max-width: 480px);

body {
    overflow-x: hidden;
}

.no-scroll::-webkit-scrollbar {
    opacity: 0;
    width: 1px;
}
</style>

<script>
import { defineComponent } from 'vue';
import { setCssVar } from 'quasar';
import { useStore } from 'src/store';

export default defineComponent({
    name: 'App',
    setup() {
        const store = useStore();
        store.getDollar();
        store.getFichas();
        setCssVar('primary', '#f16f00');
        document.body.style.setProperty('--q-primary', '#f16f00');
    },
});
</script>
