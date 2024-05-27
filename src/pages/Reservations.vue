<script>
import { defineComponent, onMounted, computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import useNavigation from 'src/composables/userNavigation';
import { useQuasar } from 'quasar';
import { checkEmail } from 'src/utils/utils';
import { useStore } from 'src/store';
import { storeToRefs } from 'pinia';
import dayjs from 'dayjs';
import { api } from 'boot/axios';

export default defineComponent({
    name: 'Reservations',
    setup() {
        const { gotoHome, gotoReservation } = useNavigation();
        const $q = useQuasar();
        const route = useRoute();
        const store = useStore();
        const { visitor: formData } = storeToRefs(store);
        const showModal = ref(false);
        const showModalCompleted = ref(false);

        const isMobile = computed(() => $q.platform.is.mobile);
        const motoId = route.params.motoId;
        const ficha = computed(() => store.fichas[motoId] || null);

        onMounted(() => {
            if (!ficha.value) {
                gotoHome();
            }
        });

        const isValidEmail = computed(() => {
            return checkEmail(formData.value.email);
        });

        const isValiddateRange = computed(() => {
            return formData.value.date && formData.value.date.from && formData.value.date.to;
        });

        const isValidForm = computed(() => {
            return !!(formData.value.name.length > 2 && isValidEmail.value && isValiddateRange.value);
        });

        const dateFromFormatted = computed(() => dayjs(formData.value.date.from).format('MMMM D, YYYY'));
        const dateToFormatted = computed(() => dayjs(formData.value.date.to).format('MMMM D, YYYY'));
        const bookDays = computed(() => dayjs(formData.value.date.to).diff(formData.value.date.from, 'day'));

        function checkAvailability() {
            const payload = {
                name: formData.value.name,
                email: formData.value.email,
                comments: formData.value.comments || '',
                dateFrom: dayjs(formData.value.date.from).format('DD/MM/YYYY'),
                dateTo: dayjs(formData.value.date.to).format('DD/MM/YYYY'),
                numDays: bookDays.value,
                moto: `${ficha.value.brand} ${ficha.value.model}`,
            };
            api.post(
                'api.php',
                {
                    reservarion: payload,
                },
                {
                    header: {
                        foo: 'bar',
                    },
                },
            )
                .then(() => {
                    showModalCompleted.value = true;
                })
                .catch(console.error);
        }

        return {
            bookDays,
            checkAvailability,
            dateFromFormatted,
            dateToFormatted,
            ficha,
            formData,
            gotoReservation,
            isMobile,
            isValidEmail,
            isValidForm,
            isValiddateRange,
            motoId,
            showModal,
            showModalCompleted,
        };
    },
});
</script>

<template>
    <div class="p-4 row justify-center">
        <div style="width: 400px">
            <div class="ficha">
                <div class="text-center text-h5 text-weight-bold mb-5">{{ ficha.brand }} {{ ficha.model }}</div>
                <div class="photo">
                    <q-img :src="`assets/photos/${ficha.image}`" alt="{{ ficha.brand }} {{ ficha.model }}" :img-style="{ maxWidth: '600px', height: 'auto' }" />
                </div>
            </div>

            <div class="reservation-form mt-8">
                <div class="text-bold text-h6 text-grey-7 mb-1">{{ $t('selectDate') }}</div>
                <q-date class="width100" v-model="formData.date" range color="primary" bordered flat minimal />

                <q-input class="mt-3" bg-color="white" outlined v-model="formData.name" :label="$t('nameAndLast')" />
                <q-input class="mt-3" bg-color="white" outlined v-model="formData.email" :label="$t('email')" type="email" />
            </div>

            <div class="row justify-center py-5">
                <q-btn color="primary" :label="$t('checkAvailability')" :disabled="!isValidForm" unelevated size="lg" @click="showModal = true" />
            </div>
        </div>

        <!-- confirmation dialog -->
        <q-dialog v-model="showModal" persistent>
            <q-card>
                <q-card-section>
                    <div class="row items-center flex-nowrap">
                        <q-avatar icon="mdi-message-text" color="primary" text-color="white" />
                        <span class="text-h6 ml-4">{{ $t('addCommentsToReservation') }}</span>
                    </div>
                    <div class="message mt-4 mb-4">
                        <q-input v-model="formData.comments" type="textarea" class="comment-textarea" outlined autofocus />
                    </div>
                    <div class="reservation-summary">
                        <div class="text-bold text-body">{{ $t('reservation') }}:</div>
                        <div>
                            <strong>{{ bookDays }} {{ bookDays === 1 ? 'día' : 'días' }}</strong
                            >: {{ $t('from') }} {{ dateFromFormatted }} {{ $t('to') }} {{ dateToFormatted }}
                        </div>
                    </div>
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn flat :label="$t('cancel')" color="primary" v-close-popup />
                    <q-btn :label="$t('checkAvailability')" color="primary" v-close-popup unelevated @click="checkAvailability" />
                </q-card-actions>
            </q-card>
        </q-dialog>

        <!-- completed dialog -->
        <q-dialog v-model="showModalCompleted" persistent>
            <q-card>
                <q-card-section class="row items-center flex-nowrap">
                    <q-avatar icon="check" color="positive" text-color="white" />
                    <span class="q-ml-sm" v-html="$t('querySent')"></span>
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn flat :label="$t('close')" color="primary" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </div>
</template>

<style lang="scss">
.width100 {
    width: 100%;
}
.dp-custom-input {
    height: 56px;
    border: 1px solid #bbb;
}
</style>
<style lang="scss" scoped>
.comment-textarea {
    width: 500px;
    @media only screen and (max-width: 480px) {
        width: 100%;
    }
}
.photo {
    display: flex;
    justify-content: center;

    img {
        max-height: 200px;
    }
}

.specs-container {
    margin-top: 20px;
    border: 1px solid $gris;

    .specs-title {
        background: $gris;
    }

    .specs-list {
        .spec {
            border-bottom: 1px solid $gris;
            padding: 8px 10px;

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
