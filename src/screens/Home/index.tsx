import {Header} from '../../components/Header';
import React from 'react';
import {Text, View, ViewProps, StyleSheet} from 'react-native';

type HomeProps = ViewProps;

export function Home({...rest}: HomeProps) {
  return (
    <View style={styles.container} {...rest}>
      <Header />
      <Text>Hello Home</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
  },
});
