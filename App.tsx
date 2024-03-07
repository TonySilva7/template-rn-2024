/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';
import {Routes} from './src/routes';
import {ThemeProvider} from 'styled-components/native';
import {myTheme} from './src/theme';

function App(): React.JSX.Element {
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
