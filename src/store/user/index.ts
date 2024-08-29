import { defineStore } from 'pinia';

import { getUserProfile } from '@/services/user';

import type { UserState } from './types';

export const useUserStore = defineStore('user', {
  state: (): UserState => ({
    isAuthorized: false,
    profile: {
      id: undefined,
      login: undefined,
      isAdmin: false
    },
    isAdminMode: false,
    isLoading: false
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
    },
    async initProfile() {
      try {
        this.isLoading = true;

        const { data } = await getUserProfile();
        const { userDto, isAdmin } = data;

        this.profile = {
          ...userDto,
          isAdmin
        };
        // eslint-disable-next-line no-useless-catch
      } catch (error) {
        throw error;
      } finally {
        this.isLoading = false;
      }
    }
  }
});
