import React from 'react';
import {Button, Text, TextInput, ViewProps} from 'react-native';
import {Header} from '../../components/Header';
import {Container, Title} from './styles';
import {Controller, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import * as zod from 'zod';

type HomeProps = ViewProps;

const schema = zod.object({
  email: zod.string().email('Email é obrigatório'),
  password: zod.string().min(8, 'Senha deve ter 8 dígitos'),
});

type IForm = zod.infer<typeof schema>;

export function Home({...rest}: HomeProps) {
  const {
    handleSubmit,
    control,
    formState: {errors},
  } = useForm<IForm>({
    resolver: zodResolver(schema),
  });
  const submit = () => {
    console.log('submit');
  };

  const onSubmit = handleSubmit(submit);
  return (
    <Container {...rest}>
      <Header />
      <Title>Hello Home</Title>
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            placeholder="Email"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
        name="email"
      />
      {errors.email && <Text>Email inválido.</Text>}

      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <TextInput
            placeholder="Senha"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            secureTextEntry
          />
        )}
        name="password"
      />
      {errors.password && <Text>Senha inválida.</Text>}
      <Button title="Press me" onPress={onSubmit} />
    </Container>
  );
}
