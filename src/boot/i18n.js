import { boot } from 'quasar/wrappers';
import { createI18n } from 'vue-i18n';
import messages from 'src/i18n';
import { Quasar } from 'quasar';

function getUserLang() {
    const savedLang = localStorage.getItem('userLocale');
    const detectedLang = savedLang || Quasar.lang.getLocale();

    let lang = detectedLang.split('-')[0].toLowerCase();
    console.log('user detected locale ' + Quasar.lang.getLocale());

    if (!['es', 'en'].includes(lang)) {
        lang = 'en';
    }

    return lang;
}

export const i18n = createI18n({
    locale: getUserLang(),
    messages
});

export const t = i18n.global.t;

export default boot(({ app }) => {
    // Set i18n instance on app
    app.use(i18n);
});
