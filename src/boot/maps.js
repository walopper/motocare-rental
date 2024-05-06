import { boot } from 'quasar/wrappers';
import VueGoogleMaps from '@fawmi/vue-google-maps';

export default boot(({ app }) => {
    app.use(VueGoogleMaps, {
        load: {
            key: 'AIzaSyDg5HeTmaQq_R_6X9oETjhmdO4L5VNjbsI',
        },
    });
});
