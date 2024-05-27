<script>
import { defineComponent, computed } from 'vue';
import { useQuasar } from 'quasar';
import { useRoute, useRouter } from 'vue-router';
import useNavigation from 'src/composables/userNavigation';
import { i18n } from 'src/boot/i18n';

export default defineComponent({
    name: 'Header',
    setup() {
        const $q = useQuasar();
        const route = useRoute();
        const router = useRouter();
        const { gotoHome } = useNavigation();

        const isMobile = computed(() => $q.platform.is.mobile);
        const headerTitle = computed(() => route.meta.headerTitle || 'Motocare Rental');
        const backButtonLink = computed(() => !!route.meta.backButtonLink || null);
        const currentLocale = computed(() => i18n.global.locale);

        const onBack = function () {
            if (route.meta.backButtonLink === 'back') {
                router.go(-1);
            } else {
                router.push(route.meta.backButtonLink);
            }
        };

        function setLocale(lang = 'es') {
            localStorage.setItem('userLocale', lang);
            i18n.global.locale = lang;
        }

        return {
            isMobile,
            onBack,
            router,
            headerTitle,
            backButtonLink,
            gotoHome,
            setLocale,
            currentLocale,
        };
    },
});
</script>

<template>
    <q-header v-if="!isMobile" class="header-full bg-grey-9 text-white row justify-center flex-nowrap">
        <div class="grow page-max-width header-content flex justify-between align-center">
            <img src="assets/images/main_logo.png" class="logo-image self-center" @click="gotoHome" style="cursor: pointer" />

            <div class="lang-button">
                <q-btn @click="setLocale('en')" v-if="currentLocale === 'es'" flat class="flex-nowrap">
                    <q-icon name="img:assets/en.svg" class="mr-2" /> English
                </q-btn>
                <q-btn @click="setLocale('es')" v-if="currentLocale === 'en'" flat class="flex-nowrap">
                    <q-icon name="img:assets/es.svg" class="mr-2" /> Español
                </q-btn>
            </div>
        </div>
    </q-header>
    <q-header v-else class="header-mobile">
        <q-btn v-if="backButtonLink" flat color="#ffffff" icon="mdi-arrow-left-thick" @click="onBack" />
        <svg v-else id="motologo" data-name="motologo" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 46.1 42.27">
            <path
                class="cls-1"
                fill="#ffffff"
                d="M236.4,249.26l10.5-17.6c.7-1.5,2.1-1.5,3,0l8.5,14.4a16.88,16.88,0,0,0,1.9-3.8l-7.7-12.9c-1.9-3.5-6.3-3.5-8.4,0l-11.1,18.7c1.2.4,2.2.9,3.3,1.2Zm0,0Zm28.3,7.4s3.4-1,2.3-3.1l-5-8.5c-.4-.7-1.2,3.9-3.9,5-2.4,1-5-1.8-8.3-.8-1.7.5-4.5,2.4-6.8,3.8-1.5.8-5.7-.8-7.5-1.3v-.1c-1.2-.4-2.6-.9-3.8-1.4l-5.3,9.1a6.46,6.46,0,0,0-1,3.4,6.23,6.23,0,0,0,6.2,6.2,6.6,6.6,0,0,0,2.7-.6c1-.5,1.3-1,2.6-1h23a4.49,4.49,0,0,1,2.7,1,6.17,6.17,0,1,0,2.8-11.7Zm0,0"
                transform="translate(-225.4 -226.74)"
            />
        </svg>
        <div class="header-title">{{ headerTitle }}</div>
        <div class="lang-button grow text-right">
            <q-btn @click="setLocale('en')" v-if="currentLocale === 'es'" flat class="flex-nowrap">
                <q-icon name="img:assets/en.svg" class="mr-2 rounded" /> <span class="text-xs font-bold">EN</span>
            </q-btn>
            <q-btn @click="setLocale('es')" v-if="currentLocale === 'en'" flat class="flex-nowrap">
                <q-icon name="img:assets/es.svg" class="mr-2 rounded" /> <span class="text-xs font-bold">ES</span>
            </q-btn>
        </div>
    </q-header>
</template>
<style lang="scss" scoped>
.header-mobile {
    align-items: center;
    background-color: $primary;
    color: #fff;
    display: flex;
    font-size: 20px;
    font-weight: 600;
    height: 50px;
    justify-content: flex-start;

    #motologo {
        height: 26px;
        margin: 0 12px 0 12px;
    }
}

.header-full {
    padding: 8px 10px;

    .header-content {
        width: 100%;

        .logo-image {
            height: 38px;

            @media only screen and (max-width: 480px) {
                height: 30px;
            }
        }
    }
}
</style>
