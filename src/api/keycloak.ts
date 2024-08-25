import type { InternalAxiosRequestConfig, AxiosInstance } from 'axios';
import Keycloak, { type KeycloakTokenParsed } from 'keycloak-js';

import { $api } from '@/api/axios';
import { keycloakConfig } from '@/config/keycloak';

interface InitKeycloakResult {
  authentificated: boolean;
}

type OnAuthSubscribeFn = (token: KeycloakTokenParsed) => void;

class KeycloakController {
  private keycloak: Keycloak;

  private logoutSubscriptions: (() => void)[] = [];

  private onAuthSubscribers: OnAuthSubscribeFn[] = [];

  constructor() {
    this.keycloak = new Keycloak(keycloakConfig);

    // this.keycloak.redirectUri = keycloakConfig.redirect_uri;

    this.keycloak.onAuthSuccess = () => {
      this.onAuthSubscribers.forEach((item) => item(this.getParsedToken()));
      this.onAuthSubscribers = [];
    };
  }

  public addOnLogout = (f: () => void) => {
    this.logoutSubscriptions.push(f);
  };

  public async initKeycloak(): Promise<InitKeycloakResult> {
    const result = await this.keycloak
      .init({
        onLoad: 'login-required',
        checkLoginIframe: false,
        redirectUri: keycloakConfig.redirect_uri
      })
      .then<InitKeycloakResult>((authentificated) => {
        if (authentificated) {
          console.log('AUTHETIFICATED, DATE: ', new Date());
          console.log(this.keycloak?.tokenParsed);
          return {
            authentificated,
            keycloak: this.keycloak
          };
        }
        return {
          authentificated
        };
      })
      .catch((err) => {
        console.log('from catch', err);
        return {
          authentificated: false
        };
      });

    if (result.authentificated) {
      this.runAxiosTokenInterceptor();
    }
    return result;
  }

  public getParsedToken(): KeycloakTokenParsed {
    return this.keycloak.tokenParsed as KeycloakTokenParsed;
  }

  public getToken(): string | undefined {
    return this.keycloak.token;
  }

  public logout(): void {
    this.logoutSubscriptions.forEach((f) => f());
    this.keycloak.logout();
  }

  public subscribeOnAuth(fn: OnAuthSubscribeFn): void {
    this.onAuthSubscribers.push(fn);
  }

  private runAxiosTokenInterceptor(): void {
    const instances = [$api];

    const tokenSetter = (
      config: InternalAxiosRequestConfig<unknown>
    ): InternalAxiosRequestConfig<unknown> => {
      const tok = `Bearer ${this.keycloak.token}`;
      const newConfig = { ...config };
      newConfig.headers.Authorization = tok;
      return newConfig;
    };

    const getErrorHandler = (interCeptorNumber: number, instance: AxiosInstance) => {
      const i = instance.interceptors.response.use(
        (res) => res,
        async (err) => {
          console.log(err);
          if (err.response.status !== 401) return Promise.reject(err);

          return this.keycloak.updateToken(30).then((res) => {
            console.log('ON TOKEN EXPIRED WORKS, RESULT: ', res, ' DATE: ', new Date());
            if (res) {
              $api.interceptors.request.eject(interCeptorNumber);
              $api.interceptors.response.eject(i);
              this.runAxiosTokenInterceptor();
              return $api.request(err.config);
            }
            return undefined;
          });
        }
      );
    };

    instances.forEach((item) => {
      const i = item.interceptors.request.use(tokenSetter);
      getErrorHandler(i, item);
    });

    const axiosTokenInterceptor = $api.interceptors.request.use((config) => {
      const tok = `Bearer ${this.keycloak.token}`;
      const newConfig = { ...config };
      newConfig.headers.Authorization = tok;
      return newConfig;
    });

    const axiosAuthErrorInterceptor = $api.interceptors.response.use(
      (res) => res,
      async (err) => {
        console.log(err);
        if (err.response.status !== 401) return Promise.reject(err);

        return this.keycloak.updateToken(30).then((res) => {
          console.log('ON TOKEN EXPIRED WORKS, RESULT: ', res, ' DATE: ', new Date());
          if (res) {
            $api.interceptors.request.eject(axiosTokenInterceptor);
            $api.interceptors.response.eject(axiosAuthErrorInterceptor);
            this.runAxiosTokenInterceptor();
            return $api.request(err.config);
          }
          return undefined;
        });
      }
    );
  }
}

const keycloakController = new KeycloakController();
export default keycloakController;
