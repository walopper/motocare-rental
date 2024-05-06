import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
import { api } from 'boot/axios';

export const useStore = defineStore('counter', {
    state: () => ({ 
        dollarOficial: 270,
        dollarBlue: 510,
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
        getDollar() {
            api.get('api.php?dollar=1', {
                header: {
                    foo: 'bar',
                },
            })
                .then((response) => {
                    const dolarValuesUpdated = {};

                    if (response.data.dsi) {
                        try {
                            dolarValuesUpdated.oficial = response.data.dsi.find(i => i?.casa?.nombre === 'Dolar Oficial')?.casa?.venta;
                            dolarValuesUpdated.blue = response.data.dsi.find(i => i?.casa?.nombre === 'Dolar Blue')?.casa?.venta;
                        } catch (error) { /** */ }
                    }
                    
                    this.$patch({
                        dollarOficial: parseInt(dolarValuesUpdated.oficial) || response.data.oficial || 111,
                        dollarBlue: parseInt(dolarValuesUpdated.blue) || response.data.blue || 206,
                    });
                })
                .catch(console.error);
        }
    },
});
