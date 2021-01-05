import { createStore } from 'vuex';

import coachesModules from './modules/coaches/index.js';
import requestsModules from './modules/requests/index.js';
import authModules from './modules/auth/index.js'

const store = createStore({
  modules: {
    coaches: coachesModules,
    requests: requestsModules,
    auth: authModules
  },
  state() {
    return {
    };
  },
});

export default store;
