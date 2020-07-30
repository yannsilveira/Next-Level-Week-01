import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text, SafeAreaView, Linking } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native'
import { RectButton } from 'react-native-gesture-handler';
import api from '../../services/api';
import * as MailComposer from 'expo-mail-composer'; 
import Icon from 'react-native-vector-icons/FontAwesome';

interface Params {
  point_id: number;
}

interface Data {
  point: {
    image: string;
    image_url: string;
    name: string;
    email: string;
    whatsapp: string;
    city: string;
    uf: string;
  };
  items: {
    title: string;
  }[];
}

const Detail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const routeParams = route.params as Params;
  const [data, setData] = useState<Data>({} as Data);


  useEffect(() => {
    api.get(`points/${routeParams.point_id}`).then(response => {
      setData(response.data);
    });
  }, []);

  function handleNavigateBack() {
    navigation.goBack();
  }

  function handleMailCompose() {
    MailComposer.composeAsync({
      subject: 'Interesse na coleta de resíduos',
      recipients: [data.point.email],
    });
  }

  function handleWhatsApp() {
    Linking.openURL(`whatsapp://send?phone=${data.point.whatsapp}&text=Tenho interesse sobre coleta de resíduos!`);
  }

  if (!data.point) {
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <TouchableOpacity onPress={handleNavigateBack}>
          <Text style={{ color: 'blue', textDecorationLine: 'underline', fontSize: 20 }}>Voltar</Text>
        </TouchableOpacity>
        <Image style={styles.pointImage} source={{ uri: data.point.image_url }} />
        <Text style={styles.pointName}>{data.point.name}</Text>
        <Text style={styles.pointItems}>{data.items.map(item => item.title).join(', ')}</Text>
        <View style={styles.address}>
          <Text style={styles.addressTitle}>Endereço</Text>
          <Text style={styles.addressContent}>{data.point.city}, {data.point.uf}</Text>
        </View>
        <View style={styles.footer}>
          <RectButton style={styles.buttonWhatsapp} onPress={handleWhatsApp}>
            <Icon name="whatsapp" size={30} color="#fff"/>
            <Text style={styles.buttonText}>WhatsApp</Text>
          </RectButton>
          <RectButton style={styles.buttonEmail} onPress={handleMailCompose}>
            <Icon name="envelope-o" size={30} color="#fff" />
            <Text style={styles.buttonText}>E-mail</Text>
          </RectButton>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
    paddingTop: 40,
  },

  pointImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
    borderRadius: 10,
    marginTop: 32,
  },

  pointName: {
    color: '#322153',
    fontSize: 28,
    marginTop: 24,
  },

  pointItems: {
    fontSize: 16,
    lineHeight: 24,
    marginTop: 8,
    color: '#6C6C80'
  },

  address: {
    marginTop: 32,
  },

  addressTitle: {
    color: '#322153',
    fontSize: 16,
  },

  addressContent: {
    lineHeight: 24,
    marginTop: 8,
    color: '#6C6C80'
  },

  footer: {
    borderTopWidth: StyleSheet.hairlineWidth,
    marginTop: 150,
    borderColor: '#000',
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  buttonEmail: {
    width: '48%',
    backgroundColor: 'lightblue',
    borderRadius: 10,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonWhatsapp: {
    width: '48%',
    backgroundColor: '#34CB79',
    borderRadius: 10,
    height: 50,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    marginLeft: 8,
    color: '#FFF',
    fontSize: 16,
    fontWeight: '700'
  },
});

export default Detail;