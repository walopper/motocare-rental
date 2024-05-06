<script>
import { defineComponent, computed } from 'vue';
import { useQuasar } from 'quasar';
import { useRoute, useRouter } from 'vue-router';

export default defineComponent({
    name: 'Footer',
    setup() {
        const $q = useQuasar();
        const route = useRoute();
        const router = useRouter();

        const isMobile = computed(() => $q.platform.is.mobile);
        const headerTitle = computed(() => route.meta.headerTitle || 'Motocare Rental');
        const backButtonLink = computed(() => !!route.meta.backButtonLink || null);

        const onBack = function () {
            if (route.meta.backButtonLink === 'back') {
                router.go(-1);
            } else {
                router.push(route.meta.backButtonLink);
            }
        };

        return {
            isMobile,
            onBack,
            router,
            headerTitle,
            backButtonLink,
        };
    },
});
</script>

<template>
    <div class="footer">
        <div class="page-max-width grow">
            <div class="footer-title">
                {{ $t('contact') }}
            </div>
            <div class="footer-data">
                <div class="f-data">
                    <q-icon name="mdi-email" color="primary" :size="isMobile ? '40px' : '60px'"></q-icon>
                    <div class="info">
                        <div>{{ $t('writeUs') }}</div>
                        <div class="data">motocareargentina@gmail.com</div>
                    </div>
                </div>
                <div class="f-data md:mx-5">
                    <q-icon name="mdi-map-marker" color="primary" :size="isMobile ? '40px' : '60px'"></q-icon>
                    <div class="info">
                        <div>{{ $t('findUsInBuenosAires') }}</div>
                        <div class="data">Echeverria 738 (1603). Vicente Lopez.</div>
                    </div>
                </div>
                <div class="f-data">
                    <q-icon name="mdi-phone" color="primary" :size="isMobile ? '40px' : '60px'"></q-icon>
                    <div class="info">
                        <div>{{ $t('ourPhoneNumber') }}</div>
                        <div class="data">+54 (11) 4761-2696</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.footer {
    background-image: url('assets/images/bg-datocontacto.png');
    padding: 20px 30px;
    color: #fff;
    display: flex;
    justify-content: center;

    @media only screen and (max-width: 480px) {
        padding: 15px;
    }

    .footer-title {
        color: #fff;
        font-size: 20px;
        font-weight: 700;
        margin-bottom: 15px 0;
        text-transform: uppercase;
        padding-bottom: 10px;
        border-bottom: 2px double rgba(255, 255, 255, 0.3);
        width: 110px;
        margin-bottom: 20px;

        @media only screen and (max-width: 480px) {
            padding-bottom: 5px;
            border-bottom: 2px double rgba(255, 255, 255, 0.3);
            width: 100%;
        }
    }
    .footer-data {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;

        @media only screen and (max-width: 480px) {
            flex-direction: column;
        }

        * {
            font-family: Raleway;
        }

        .f-data {
            color: #fff;
            font-size: 18px;
            display: flex;
            align-items: flex-start;

            @media only screen and (max-width: 480px) {
                margin: 10px 0;
                font-size: 16px;
            }

            .info {
                margin-left: 7px;

                .data {
                    font-weight: 700;
                    margin-top: -6px;
                }
            }
        }
    }
}
</style>
