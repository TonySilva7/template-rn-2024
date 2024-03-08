/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import 'react-native-get-random-values';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {ThemeProvider} from 'styled-components/native';
import {Routes} from './src/routes';
import {api} from './src/services/api';
import {myTheme} from './src/theme';

function App(): React.JSX.Element {
  /**
   * Setup Axios
   */
  const signOut = () => null; // implementar logout
  useEffect(() => {
    const subscribe = api.registerInterceptTokenManager(signOut);

    return () => {
      subscribe();
    };
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
