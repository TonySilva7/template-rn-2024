import React from 'react';
import {Text, View, ViewProps, StyleSheet} from 'react-native';

type HeaderProps = ViewProps;

export function Header({...rest}: HeaderProps) {
  return (
    <View style={styles.container} {...rest}>
      <Text>Hello Header</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
