import { useRouter } from 'vue-router';

export default function useNavigation() {
    const router = useRouter();

    function gotoReservation(motoId) {
        router.push({ name: 'reservations', params: { motoId } });
    }
    
    function gotoDataSheet(motoId) {
        router.push({ name: 'dataSheet', params: { motoId } });
    }

    function gotoHome() {
        router.push({ name: 'home' });
    }

    return {
        gotoReservation,
        gotoHome,
        gotoDataSheet,
    };
};
