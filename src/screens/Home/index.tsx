import React from 'react';
import {ViewProps} from 'react-native';
import {Header} from '../../components/Header';
import {Container, Title} from './styles';

type HomeProps = ViewProps;

export function Home({...rest}: HomeProps) {
  return (
    <Container {...rest}>
      <Header />
      <Title>Hello Home</Title>
    </Container>
  );
}
