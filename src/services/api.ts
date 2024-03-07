import {AppError} from '../utils/app-error';
import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
  AxiosError,
} from 'axios';

type ISignOut = () => void;
type MyCallback = () => void;

type PromiseType = {
  onSuccess: (token: string) => void;
  onFailure: (error: AxiosError) => void;
};

type APIInstanceProps = AxiosInstance & {
  registerInterceptTokenManager: (signOut: ISignOut) => MyCallback;
};

export const api = axios.create({
  baseURL: 'http://arpia.ddns.net:7212/api/v1/',
  timeout: 5000,
}) as APIInstanceProps;

let failedQueued: Array<PromiseType> = [];
let isRefreshing = false;

// !!! Implementar a função de pegar o refresh token
const tonyImplementarGetDoRefresh = async () => ({
  refresh_token: 'token aqui...',
});

// !!! Implementar a função de salvar o token
const tonyImplementarSalvarToken = async ({
  token,
  refresh_token,
}: {
  token: string;
  refresh_token: string;
}) => console.log(token, refresh_token);

api.registerInterceptTokenManager = (signOut: ISignOut) => {
  const interceptResponse = api.interceptors.response.use(
    // caso de sucesso
    (response: AxiosResponse) => response,

    // caso de erro
    async (error: any) => {
      if (error.response?.status === 401) {
        const isTokenError =
          error.response.data?.message === 'token.expired' ||
          error.response.data?.message === 'token.invalid';

        if (isTokenError) {
          const {refresh_token} = await tonyImplementarGetDoRefresh();

          if (!refresh_token) {
            signOut();
            return Promise.reject(error);
          }

          const originalRequestConfig = error.config;

          if (isRefreshing) {
            return new Promise((resolve, reject) => {
              failedQueued.push({
                onSuccess: (token: string) => {
                  originalRequestConfig.headers = {
                    Authorization: `Bearer ${token}`,
                  };
                  resolve(api(originalRequestConfig));
                },
                onFailure: (catchError: AxiosError) => {
                  reject(catchError);
                },
              });
            });
          }

          isRefreshing = true;

          return new Promise((resolve, reject) => {
            api
              .post('/sessions/refresh-token', {refresh_token})
              .then(async ({data}) => {
                // eslint-disable-next-line @typescript-eslint/no-shadow
                const {token, refresh_token} = data;
                await tonyImplementarSalvarToken({token, refresh_token});

                // converte o data de string (row) para objeto
                if (originalRequestConfig.data) {
                  originalRequestConfig.data = JSON.parse(
                    originalRequestConfig.data,
                  );
                }

                originalRequestConfig.headers = {
                  Authorization: `Bearer ${token}`,
                };
                api.defaults.headers.common.Authorization = `Bearer ${token}`;

                failedQueued.forEach(request => {
                  request.onSuccess(token);
                });

                console.log('TOKEN ATUALIZADO');

                resolve(api(originalRequestConfig));
              })
              .catch(catchError => {
                console.log(catchError);

                failedQueued.forEach(request => {
                  request.onFailure(catchError);
                });

                signOut();
                reject(catchError);
              })
              .finally(() => {
                isRefreshing = false;
                failedQueued = [];
              });
          });
        }

        signOut();
      }

      if (error.response && error.response.data) {
        return Promise.reject(
          new AppError(error.response.data.message, error.response.status),
        );
      }

      return Promise.reject(error);
    },
  );

  const interceptRequest = api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      // config.headers.Authorization = 'Bearer your_token_here'
      config.headers['Content-Type'] = 'application/json';
      config.headers.Accept = 'application/json';
      return config;
    },
  );

  return () => {
    api.interceptors.response.eject(interceptResponse);
    api.interceptors.request.eject(interceptRequest);
  };
};

export const utilsService = {
  isAxiosError: axios.isAxiosError,
};
