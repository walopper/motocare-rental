<script>
import { defineComponent, onMounted, computed } from 'vue';
import fichas from '../data/fichas';
import { useRoute } from 'vue-router';
import useNavigation from '../composables/userNavigation';

export default defineComponent({
    name: 'DataSheet',
    setup() {
        const { gotoHome, gotoReservation } = useNavigation();
        const route = useRoute();
        const motoId = route.params.motoId;
        const ficha = computed(() => fichas[motoId] || null);

        onMounted(() => {
            if (!ficha.value) {
                gotoHome();
            }
        });

        return {
            ficha,
            gotoReservation,
            motoId,
        };
    },
});
</script>

<template>
    <div class="p-4">
        <div class="ficha">
            <div class="text-center text-h5 text-weight-bold mb-5">{{ ficha.brand }} {{ ficha.model }}</div>
            <div class="photo">
                <img :src="`assets/photos/${ficha.image}`" alt="{{ ficha.brand }} {{ ficha.model }}" :style="{ maxWidth: '600px', height: 'auto' }" />
            </div>
            <div class="specs-container">
                <div class="specs-title text-center text-h6 text-weight-bold py-3">
                    {{ $t('techInfo') }}
                </div>
                <div class="specs-list">
                    <div class="spec">
                        <div class="spec-title">{{ $t('engineType') }}</div>
                        <div class="value">{{ ficha.engineType }}</div>
                    </div>
                    <div class="spec">
                        <div class="spec-title">{{ $t('cil') }}</div>
                        <div class="value">{{ ficha.cil }}</div>
                    </div>
                    <div class="spec">
                        <div class="spec-title">{{ $t('fuelCapacity') }}</div>
                        <div class="value">{{ ficha.fuelCapacity }}</div>
                    </div>
                    <div class="spec">
                        <div class="spec-title">{{ $t('maxPower') }}</div>
                        <div class="value">{{ ficha.power }}</div>
                    </div>
                    <div class="spec">
                        <div class="spec-title">{{ $t('maxSpeed') }}</div>
                        <div class="value">{{ ficha.maxSpeed }}</div>
                    </div>
                    <div class="spec">
                        <div class="spec-title">{{ $t('autonomy') }}</div>
                        <div class="value">{{ ficha.autonomy }}</div>
                    </div>
                    <div class="spec">
                        <div class="spec-title">{{ $t('engineStart') }}</div>
                        <div class="value">{{ ficha.startType }}</div>
                    </div>
                    <div class="spec">
                        <div class="spec-title">{{ $t('trans') }}</div>
                        <div class="value">{{ ficha.speeds }} {{ $t('speeds') }}</div>
                    </div>
                    <div class="spec">
                        <div class="spec-title">{{ $t('finalTrans') }}</div>
                        <div class="value">{{ ficha.transmission }}</div>
                    </div>
                    <div class="spec">
                        <div class="spec-title">{{ $t('size') }}</div>
                        <div class="value">{{ ficha.size }}</div>
                    </div>
                    <div class="spec">
                        <div class="spec-title">{{ $t('seatHeight') }}</div>
                        <div class="value">{{ ficha.seatHeight }}</div>
                    </div>
                    <div class="spec">
                        <div class="spec-title">{{ $t('clearance') }}</div>
                        <div class="value">{{ ficha.clearance }}</div>
                    </div>
                    <div class="spec">
                        <div class="spec-title">{{ $t('frontTire') }}</div>
                        <div class="value">{{ ficha.frontTire }}</div>
                    </div>
                    <div class="spec">
                        <div class="spec-title">{{ $t('rearTyre') }}</div>
                        <div class="value">{{ ficha.rearTire }}</div>
                    </div>
                    <div class="spec">
                        <div class="spec-title">{{ $t('rearSusp') }}</div>
                        <div class="value">{{ ficha.rearSusp }}</div>
                    </div>
                    <div class="spec">
                        <div class="spec-title">{{ $t('frontBreak') }}</div>
                        <div class="value">{{ ficha.frontBreak }}</div>
                    </div>
                    <div class="spec">
                        <div class="spec-title">{{ $t('rearBreak') }}</div>
                        <div class="value">{{ ficha.rearBreak }}</div>
                    </div>
                    <div class="spec">
                        <div class="spec-title">{{ $t('weight') }}</div>
                        <div class="value">{{ ficha.weight }}</div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row justify-center py-5">
            <q-btn color="primary" :label="$t('book')" unelevated @click="gotoReservation(motoId)" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.photo {
    display: flex;
    justify-content: center;

    img {
        width: 100%;
        max-width: 600px;
    }
}

.specs-container {
    margin-top: 20px;
    border: 1px solid $gris;
    display: flex;
    flex-direction: column;
    align-items: center;

    .specs-title {
        background: $gris;
        width: 100%;
        max-width: 800px;
    }

    .specs-list {
        width: 100%;
        max-width: 800px;
        background: rgba(255, 255, 255, 0.8);
        display: flex;
        flex-wrap: wrap;

        .spec {
            border-bottom: 1px solid $gris;
            padding: 8px 10px;
            width: 50%;
            flex-grow: 1;

            @media only screen and (max-width: 480px) {
                width: 100%;
            }

            .spec-title {
                font-size: 0.8em;
                opacity: 0.5;
            }

            .value {
                font-size: 0.92em;
            }
        }
    }
}
</style>
