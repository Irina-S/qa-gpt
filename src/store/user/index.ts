import { defineStore } from 'pinia';
import type { UserState } from './types';

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    isAuthorized: false
  }),
  actions: {
    login() {
      this.isAuthorized = true;
    },
    logout() {
      this.isAuthorized = false;
    },
    setIsAuthorized(payload: boolean) {
      this.isAuthorized = payload;
    }
  }
});
