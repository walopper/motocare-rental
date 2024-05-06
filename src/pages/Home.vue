<script>
import { defineComponent, ref } from 'vue';
// import { useI18n } from 'vue-i18n';
import Motos from 'src/components/Motos.vue';
import { useStore } from 'src/store';

export default defineComponent({
    name: 'Home',
    components: {
        Motos,
    },
    setup() {
        const store = useStore();

        return {
            slide: ref(1),
            store,
            map: {
                center: { lat: -34.540526, lng: -58.4998 },
                marker: {
                    position: {
                        lat: -34.540526,
                        lng: -58.4998,
                    },
                },
            },
        };
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
        <div class="flex justify-center">
            <div class="grow page-max-width home-rental p-8 page-max-width">
                <div class="text-xl md:text-4xl font-black mt-1 mb-3 md:mb-12 text-uppercase text-underline">{{ $t('outFleet') }}</div>
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

        <!-- mapn -->
        <div class="flex justify-center mb-12">
            <div class="grow page-max-width home-rental page-max-width flex">
                <div class="text-xl md:text-4xl font-black mt-1 mb-3 md:mb-12 text-uppercase text-underline">{{ $t('whereWeAre') }}</div>
                <GMapMap :center="map.center" :zoom="15" map-type-id="terrain">
                    <GMapMarker
                        :position="map.marker.position"
                        :clickable="true"
                        :draggable="true"
                        @click="map.center = map.marker.position"
                        icon="https://motocare.com.ar/rental/icons/map_marker.png"
                        :options="{
                            zoomControl: true,
                            mapTypeControl: false,
                            scaleControl: true,
                            streetViewControl: false,
                            rotateControl: false,
                            fullscreenControl: true,
                        }"
                    />
                </GMapMap>
            </div>
        </div>
    </div>
</template>
<style lang="scss">
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
