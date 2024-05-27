import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
import { api } from 'boot/axios';

export const useStore = defineStore('main', {
    state: () => ({ 
        dollarOficial: 900,
        dollarBlue: 900,
        fichas: [],
        visitor: {
            name: useStorage('visitorName', ''),
            email: useStorage('visitorEmail', ''),
            date: {
                from: '',
                to: '',
            },
            comments: '',
            country: '',
        }
    }),
    actions: {
        getFichas() {
            api.get('fichas.json')
                .then((response) => {
                    this.$patch({
                        fichas: response.data,
                    });
                })
                .catch(console.error);
        },
        getDollar() {
            api.get('https://dolarapi.com/v1/dolares/blue')
                .then((response) => {
                    if (response?.data?.venta) {
                        this.$patch({ dollarBlue: response?.data?.venta });
                    }
                })
                .catch(console.error);

            api.get('https://dolarapi.com/v1/dolares/oficial')
                .then((response) => {
                    if (response?.data?.venta) {
                        this.$patch({ dollarOficial: response?.data?.venta });
                    }
                })
                .catch(console.error);
        }
    },
});
