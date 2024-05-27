<script>
import { defineComponent, computed } from 'vue';
import { useQuasar } from 'quasar';
import useNavigation from 'src/composables/userNavigation';
import { useI18n } from 'vue-i18n';

export default defineComponent({
    name: 'Moto',
    props: ['data', 'moto-id'],
    setup(props) {
        const $q = useQuasar();
        const { gotoReservation, gotoDataSheet } = useNavigation();
        const { t } = useI18n();

        const isMobile = computed(() => $q.platform.is.mobile);

        function showPriceHelp() {
            if (!isMobile.value) {
                return;
            }
            $q.dialog({
                message: t('priceNote'),
            });
        }

        return {
            isMobile,
            gotoReservation,
            gotoDataSheet,
            showPriceHelp,
        };
    },
});
</script>

<template>
    <div class="moto grow w-[80vw] sm:w-auto shrink-0">
        <div class="w-full text-center overflow-hidden z-10">
            <img :src="`assets/images/${data.tn}`" :alt="data.brand +' '+ data.model" class="w-full sm:max-w-[240px] mx-auto" />
        </div>
        <div class="model">{{ data.brand }} {{ data.model }}</div>
        <div class="price">
            <div class="plabel" @click="showPriceHelp">
                {{ $t('per_day_price') }} <q-icon name="mdi-help-circle-outline" size="20px" color="primary" class="price-help sm:hidden" />
            </div>
            <div class="prices">
                <div class="price_num">
                    <div class="days">{{ $t('days15_28') }}</div>
                    <div class="amount"><span class="currency">USD</span> {{ data.price1 }}</div>
                </div>
                <div class="price_num">
                    <div class="days">{{ $t('days5_10') }}</div>
                    <div class="amount"><span class="currency">USD</span> {{ data.price2 }}</div>
                </div>
            </div>
        </div>
        <div class="features">
            <div class="feature">
                <q-icon name="mdi-check-circle-outline" size="20px" color="primary" class="mr-1" />
                {{ $t('feature1') }}
            </div>
            <div class="feature">
                <q-icon name="mdi-check-circle-outline" size="20px" color="primary" class="mr-1" />
                {{ $t('feature3') }}
            </div>
            <div class="feature">
                <q-icon name="mdi-check-circle-outline" size="20px" color="primary" class="mr-1" v-if="!data.hideChilePerm" />
                <span v-if="!data.hideChilePerm">
                    {{ $t('feature2') }}
                </span>
            </div>
        </div>
        <div class="extras">
            <div class="km-extras">{{ $t('freeKm') }}</div>
            <div class="text-black">{{ data.includedKm }} {{ $t('perDay') }}</div>
            <div class="km-extras mt-4">{{ $t('extraKm') }}</div>
            <div class="text-black">USD {{ data.extraKmPrice }}</div>
        </div>
        <div class="techspecs-container">
            <q-btn unelevated outline @click="gotoDataSheet(motoId)" color="primary" rounded>{{ $t('viewDataSheet') }}</q-btn>
        </div>
        <div>
            <q-btn unelevated color="primary" class="-mt-4" @click="gotoReservation(motoId)">{{ $t('checkAvailability') }}</q-btn>
        </div>
    </div>
</template>
<style lang="scss" scoped>
// .price-help {
//     display: none;

//     @media only screen and (max-width: 480px) {
//         display: block;
//     }
// }

.moto {
    > * {
        text-align: center;
    }

    .techspecs-container {
        background: $gris;
        padding: 20px 0 40px 0;
    }

    .extras {
        text-align: left;
        background: $gris;
        padding: 0 0 0 30px;
        font-size: 18px;

        > * {
            text-align: left;
        }

        .text-black {
            font-weight: 800;
        }
    }

    .features {
        background: $gris;
        text-align: left;
        padding: 20px 0 20px 30px;

        > div:nth-child(2) {
            margin: 5px 0;
        }

        > * {
            text-align: left;
            font-size: 16px;
            font-weight: 800;
        }

        .feature {
            min-height: 30px;
        }
    }

    .price {
        background: white;

        .plabel {
            width: 100%;
            border-bottom: 1px solid $gris;
            font-size: 14px;
            padding: 7px 0;
        }

        .prices {
            display: flex;

            .price_num {
                flex-grow: 1;
                width: 50%;
                box-sizing: border-box;
                margin: 15px 0;

                > * {
                    font-size: 18px;
                }

                &:nth-child(1) {
                    border-left: 1px solid $gris;
                }

                .amount {
                    font-weight: 800;
                    margin-top: 6px;
                    color: $primary;
                }
            }
        }
    }

    .model {
        background: $gris;
        font-family: raleway;
        font-weight: 300;
        width: 100%;
        padding: 30px 0;
        text-align: center;
        text-transform: uppercase;
        font-size: 21px;
    }
}
</style>
