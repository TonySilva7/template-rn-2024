import {create} from 'zustand';
import {api} from '../services/api';
import {Alert} from 'react-native';

export interface PlayerState {
  name: string;
  email: string;
  showData: () => void;
  setMyData: (myName: string, myEmail: string) => void;
  signIn: () => Promise<void>;
}

export const useMyStore = create<PlayerState>((set, get) => {
  return {
    // estado global
    name: '',
    email: '',

    setMyData: (myName, myEmail) => {
      set({name: myName, email: myEmail});
    },

    showData: () => {
      const name = get().name;
      const email = get().email;
      Alert.alert('Nome', `Nome: ${name} | E-mail: ${email} `);
    },

    signIn: async () => {
      const response = await api.get('/courses/1');
      console.log(response.data);

      set({
        name: 'Tony Silva',
        email: '123',
      });
    },
  };
});

export const useMeData = () => {
  return useMyStore(state => {
    const {email, name, showData, signIn} = state;

    return {email, name, showData, signIn};
  });
};
