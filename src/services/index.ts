import {AxiosResponse} from 'axios';
import {api} from './api';

const userService = {
  signIn: async (): Promise<AxiosResponse> => {
    const response = await api.post('/users');
    return response;
  },
};

export {userService};
