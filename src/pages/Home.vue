<script setup>
import { ref, computed } from 'vue';
import Motos from 'src/components/Motos.vue';
import { useStore } from 'src/store';
import VLazyImage from 'v-lazy-image';

const galeria = ref([
    '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
    '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40',
    '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60',
    '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '80',
    '81', '82', '83', '84', '85', '86', '87', '88', '89', '90', '91', '92', '93', '94', '95', '96', '97', '98', '99', '100',
    '101', '102', '103', '104', '105', '106', '107', '108', '109', '110', '111', '112', '113', '114', '115', '116', '117', '118'
]);

const store = useStore();
const slide = ref(1);
const viewImage = ref();
// const map = {
//     center: { lat: -34.540526, lng: -58.4998 },
//     marker: {
//         position: {
//             lat: -34.540526,
//             lng: -58.4998,
//         },
//     },
// };

const viewImageDialog = computed({
    get: () => !!viewImage.value,
    set: (val) => {
        if (!val) {
            viewImage.value = null;
        }
    },
});

</script>

<template>
    <div class="home">
        <div class="header-into">
            <div class="text-content p-8 md:py-[80px]">
                <div class="text-lg md:text-4xl font-light tracking-tighter">{{ $t('welcomeText1') }}</div>
                <div class="text-xl md:text-4xl font-black -mt-1">{{ $t('welcomeText2') }}</div>
                <div class="text-body-1 text-weight-medium pt-8">{{ $t('welcomeText') }}</div>
            </div>
        </div>

        <!-- flota -->
        <div class="">
            <div class="grow page-max-width home-rental page-max-width pb-8">
                <div class="text-xl md:text-4xl font-black p-8 mt-1 mb-3 md:mb-12 text-uppercase text-underline">{{ $t('outFleet') }}</div>
                <Motos />
            </div>
        </div>

        <!-- aclaracion de precio -->
        <div class="flex justify-center">
            <div class="priceHelp page-max-width" v-html="$t('priceNote')"></div>
        </div>

        <!-- detalles del alquiler -->
        <div class="flex justify-center">
            <div class="grow page-max-width home-rental p-8 page-max-width">
                <div class="text-xl md:text-4xl font-black mt-1 mb-3 md:mb-12 text-uppercase text-underline">{{ $t('rentalDetails') }}</div>
                <div class="text-body1" v-html="$t('rentalDetailsText1')"></div>

                <q-carousel
                    v-model="slide"
                    transition-prev="jump-right"
                    transition-next="jump-left"
                    swipeable
                    animated
                    control-color="primary"
                    navigation-icon="mdi-radiobox-marked"
                    prev-icon="mdi-chevron-left"
                    next-icon="mdi-chevron-right"
                    navigation
                    padding
                    arrows
                    height="308px"
                    class="transparent my-10 home-carousel"
                >
                    <q-carousel-slide :name="1" class="row justify-center">
                        <div class="carousel-image">
                            <q-img src="assets/images/car1.jpg" />
                        </div>
                    </q-carousel-slide>
                    <q-carousel-slide :name="2" class="row justify-center">
                        <div class="carousel-image">
                            <q-img src="assets/images/car2.jpg" />
                        </div>
                    </q-carousel-slide>
                    <q-carousel-slide :name="3" class="row justify-center">
                        <div class="carousel-image">
                            <q-img src="assets/images/car3.jpg" />
                        </div>
                    </q-carousel-slide>
                    <q-carousel-slide :name="4" class="row justify-center">
                        <div class="carousel-image">
                            <q-img src="assets/images/car4.jpg" />
                        </div>
                    </q-carousel-slide>
                    <q-carousel-slide :name="5" class="row justify-center">
                        <div class="carousel-image">
                            <q-img src="assets/images/car5.jpg" />
                        </div>
                    </q-carousel-slide>
                    <q-carousel-slide :name="6" class="row justify-center">
                        <div class="carousel-image">
                            <q-img src="assets/images/car6.jpg" />
                        </div>
                    </q-carousel-slide>
                </q-carousel>

                <div class="text-body1" v-html="$t('rentalDetailsText2')"></div>
            </div>
        </div>

        <!-- equipo y accesorios -->
        <div class="flex justify-center mb-12">
            <div class="equipo grow page-max-width home-rental p-8 page-max-width">
                <div class="text-xl md:text-4xl font-black mt-1 mb-3 md:mb-12 text-uppercase text-underline">{{ $t('equipmentAndAccesories') }}</div>
                <div class="mt-6 text-body-2" v-html="$t('equipmentAndAccesoriesText')"></div>
            </div>
        </div>

        <!-- mas informacion -->
        <div class="flex justify-center mb-12">
            <div class="moreinfo grow page-max-width home-rental page-max-width flex">
                <div class="grow w-1/2 moreinfo-image xs:hidden"></div>
                <div class="grow sm:w-1/2 text-body-2 bg-orange-600 text-white p-8">
                    <div class="text-4xl font-light tracking-tighter text-white pb-12">{{ $t('moreInfo') }}</div>
                    <div class="text1" v-html="$t('moreinfoText1')"></div>
                    <div class="text1 mt-12" v-html="$t('moreinfoText2', { dollarOficial: store.dollarOficial, dollarBlue: store.dollarBlue })"></div>
                </div>
            </div>
        </div>

        <masonry-wall :items="galeria" :column-width="250" :gap="9" class="galeria" :min-columns="2">
            <template #default="{ item }">
                <VLazyImage 
                    :src="`assets/galeria/${item}.jpg`"
                    :src-placeholder="`assets/galeria/${item}.webp`"
                    class="w-full"
                    alt=""
                    @click="viewImage = item"
                /> 
            </template>
        </masonry-wall>

        <a 
            class="flex justify-center items-end w-full overflow-hidden h-[300px] mb-12 bg-cover bg-no-repeat bg-center" 
            style="background-image: url(assets/images/mapa.png);" 
            href="https://www.google.com/maps/place/Motocare/@-34.5415741,-58.506262,15.15z/data=!4m6!3m5!1s0x95bcb6d0660157bb:0xa2d2cf81d04b2e46!8m2!3d-34.5405319!4d-58.4995644!16s%2Fg%2F1thy0_8l?entry=ttu"
        >
        </a>
        
        <q-dialog v-model="viewImageDialog" backdrop-filter="blur(4px) sepia(40%)">
            <q-card>
                <q-card-section>
                    <img :src="`assets/galeria/${viewImage}.jpg`" alt="" /> 
                </q-card-section>
            </q-card>
        </q-dialog>
    </div>
</template>
<style lang="scss">
.galeria {
    @apply px-2 sm:px-7 mb-12;

    img {
        // width: 100%;
        // height: auto;
        @apply rounded-md cursor-pointer;
    }
}

.vue-map-container {
    height: 300px;
    width: 100%;
}
.moreinfo {
    .moreinfo-image {
        background-image: url('assets/images/moreinfo.jpg');
        background-position: center center;
        background-size: cover;
    }
}

.header-into {
    background: #b2391a;
    display: flex;
    justify-content: center;
    background-image: url('assets/images/bg-inicio.jpg');
    background-size: auto 140%;
    background-position: center top;
    background-repeat: no-repeat;

    .text-content {
        color: #fff;
        font-family: raleway, roboto, helvetica;
        max-width: 900px;
    }
}
.equipo {
    background: $gris;
    padding: 25px;
    font-size: 16px;
}
.priceHelp {
    padding: 30px 60px 60px 60px;
    font-size: 16px;

    strong {
        font-weight: 800;
    }

    @media only screen and (max-width: 480px) {
        display: none;
    }
}
.home-carousel {
    @media only screen and (max-width: 1000px) {
        display: none;
    }

    .carousel-image {
        height: 308px;
        width: 968px;

        @media only screen and (max-width: 480px) {
            width: 100%;
        }
    }
}
</style>
