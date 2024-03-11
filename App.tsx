/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {StatusBar} from 'react-native';
import 'react-native-get-random-values';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {ThemeProvider} from 'styled-components/native';
import {Routes} from './src/routes';
import {api} from './src/services/api';
import {myTheme} from './src/theme';
import BackgroundFetch, {
  BackgroundFetchConfig,
} from 'react-native-background-fetch';

type IEvent = {
  taskId: string;
  timestamp: string;
};

function App(): React.JSX.Element {
  /**
   * Setup Axios
   */
  const signOut = () => null; // implementar logout

  const [events, setEvents] = useState<IEvent[]>([]);

  const initBackgroundFetch = async () => {
    // Manipulador de eventos do BackgroundFetch.
    const onEvent = async (taskId: string) => {
      console.log('[BackgroundFetch] task: ', taskId);
      // Faz o trabalho em segundo plano...
      await addEvent(taskId);
      // É IMPORTANTE sinalizar ao sistema operacional que sua tarefa está completa.
      BackgroundFetch.finish(taskId);
    };

    // Callback de timeout é executado quando sua Tarefa excedeu o tempo de execução permitido.
    // Você deve parar o que está fazendo imediatamente BackgroundFetch.finish(taskId)
    const onTimeout = async (taskId: string) => {
      console.warn('[BackgroundFetch] TIMEOUT task: ', taskId);
      BackgroundFetch.finish(taskId);
    };

    // Inicializa o BackgroundFetch apenas uma vez quando o componente é montado.
    let status = await BackgroundFetch.configure(
      {
        minimumFetchInterval: 15,
        stopOnTerminate: false,
        startOnBoot: true,
        enableHeadless: true,
      } as BackgroundFetchConfig,
      onEvent,
      onTimeout,
    );

    console.log('[BackgroundFetch] configure status: ', status);
  };

  // Adiciona um evento de BackgroundFetch à lista
  const addEvent = (taskId: string) => {
    // Simula uma tarefa possivelmente longa com uma Promise.
    console.log('### MEU EVENTO RODOU COM A TASK ID: ', taskId + ' ###');

    return new Promise((resolve, reject) => {
      setEvents(prevEvents => [
        ...prevEvents,
        {
          taskId: taskId,
          timestamp: new Date().toString(),
        },
      ]);
      resolve('Tudo certo!');
      reject('Erro!');
    });
  };

  useEffect(() => {
    const subscribe = api.registerInterceptTokenManager(signOut);

    return () => {
      subscribe();
    };
  }, []);

  useEffect(() => {
    // Inicializa o BackgroundFetch apenas uma vez quando o componente é montado.
    initBackgroundFetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ThemeProvider theme={myTheme}>
      <SafeAreaProvider>
        <SafeAreaView style={{flex: 1}}>
          <StatusBar
            barStyle="dark-content"
            backgroundColor="transparent"
            translucent
          />
          <Routes />
        </SafeAreaView>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}

export default App;
