import React, {useState} from 'react';
import {
  Alert,
  Button,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  ViewProps,
} from 'react-native';
import {Header} from '../../components/Header';
import {Modal} from '../../components/Modal';
import {Container, Title} from './styles';
import {Controller, useForm} from 'react-hook-form';
import {zodResolver} from '@hookform/resolvers/zod';
import * as zod from 'zod';
import {useMyStore} from '../../store';
import {GAT_API_URL} from '@env';
import Geolocation from '@react-native-community/geolocation';
import {useNetInfo} from '@react-native-community/netinfo';

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

  const netInfo = useNetInfo();

  const isConnected = () => {
    const summaryNet = {
      type: netInfo.type,
      isConnected: netInfo.isConnected,
      isInternetReachable: netInfo.isInternetReachable,
      isWifiEnabled: netInfo.isWifiEnabled,
      details: netInfo.details,
    };

    console.log('Está conectado a internet?', summaryNet);
  };

  const {showData, setMyData} = useMyStore(store => {
    return {
      showData: store.showData,
      setMyData: store.setMyData,
    };
  });

  const submit = (dta: IForm) => {
    setMyData(dta.email, dta.password);
    showData();
    console.log('GAT_API_URL', GAT_API_URL);
  };

  const onSubmit = handleSubmit(submit);

  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const getLocation = async () => {
    setLoading(true);

    const myPromise = new Promise((resolve, reject) => {
      Geolocation.getCurrentPosition(
        (position: any) => {
          console.log('Latitude:', position.coords.latitude);
          console.log('Longitude:', position.coords.longitude);
          resolve(position.coords);
        },
        (error: any) => {
          console.log(error.message);
          reject(error.message);
        },
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
      );
    });

    const coords = await myPromise;
    console.log('Terminou...', coords);
    setLoading(false);
  };

  return (
    <Container {...rest}>
      <Header />
      <Title>Hello Home</Title>
      <View>
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
        <Button title="Enviar Formulário" onPress={onSubmit} />
      </View>
      <View>
        <Button title="Verificar conexão?" onPress={isConnected} />
      </View>

      <Modal
        customColor="transparent"
        modalVisible={modalVisible}
        callback={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Hello World!</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={getLocation}>
              {loading ? (
                <Text>Carregando...</Text>
              ) : (
                <Text style={styles.textStyle}>Pegar localização</Text>
              )}
            </Pressable>
            <Button
              title="Fechar modal"
              onPress={() => setModalVisible(false)}
            />
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>Abrir Modal</Text>
      </Pressable>
    </Container>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    // margin: 20,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    width: '100%',
    height: '100%',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
