<script>
import { defineComponent } from 'vue';

import AppHeader from '../components/Header.vue';
import Footer from '../components/Footer.vue';

export default defineComponent({
    name: 'MainLayout',
    components: {
        AppHeader,
        Footer,
    },
});
</script>

<template>
    <q-layout view="hHh lpR fFf" class="main">
        <AppHeader />
        <q-page style="padding-top: 50px">
            <router-view />
            <Footer />
        </q-page>
    </q-layout>
</template>
<style lang="scss" scoped>
.main {
    background-image: url('assets/images/bg-fragmentos.png');
}
.header-class {
    padding: 8px 10px;

    .header-content {
        width: 100%;
        max-width: 940px;

        .logo-image {
            height: 38px;

            @media only screen and (max-width: 480px) {
                height: 30px;
            }
        }
    }
}
</style>
