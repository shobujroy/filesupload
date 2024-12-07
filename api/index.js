import premierService from '~/api/premierTax';
import authService from '@/api/auth';

export default ($axios, store, ctx) => ({
  premierService: premierService($axios, store, ctx),
  authService: authService($axios, store, ctx),
});
