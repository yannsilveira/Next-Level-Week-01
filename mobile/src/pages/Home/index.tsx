import React, { useEffect, useState, ChangeEvent } from 'react';
import { View, Text, Image, StyleSheet, ImageBackground, Picker } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';


interface IBGEUFResponse {
    sigla: string;
}

interface IBGECityResponse {
    nome: string;
}

const Home = () => {
    const navigation = useNavigation();
    const [ufs, setUfs] = useState<string[]>([]);
    const [selectedUf, setSelectedUf] = useState('0');
    const [selectedCity, setSelectedCity] = useState('0');
    const [cities, setCities] = useState<string[]>([]);


    useEffect(() => {
        axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
            const ufInitials = response.data.map(uf => uf.sigla);
            setUfs(ufInitials);
        });
    }, []);

    useEffect(() => {
        //carregar as cidade sempre que as ufs mudar
        if (selectedUf === '0')
            return;
        axios.get<IBGECityResponse[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`).then(response => {
            const cityNames = response.data.map(city => city.nome);
            setCities(cityNames);
        });
    }, [selectedUf]);


    function handleNavigationToPoints() {
        navigation.navigate('Points');
    }


    return (
        <ImageBackground source={require('../../assets/home-background.png')} style={styles.container}
            imageStyle={{ width: 274, height: 368 }}>
            <View style={styles.main}>
                <Image style={styles.image} source={require('../../assets/logo.png')} />
                <Text style={styles.title}>Seu marketplace de coleta de resíduos</Text>
                <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de coleta de forma
                eficíente</Text>
            </View>
            <View style={styles.footer}>
                <Picker style={styles.input} selectedValue={selectedUf} onValueChange={(itemValue, itemIndex) => setSelectedUf(itemValue)}>
                    <Picker.Item value="0" label="Selecione uma UF" />
                    {ufs.map(uf => (
                        <Picker.Item key={uf} value={uf} label={uf} />
                    ))}
                </Picker>
                <Picker style={styles.input} selectedValue={selectedCity} onValueChange={(itemValue, itemIndex) => setSelectedCity(itemValue)}>
                    <Picker.Item value="0" label="Selecione uma Cidade" />
                    {cities.map(city => (
                        <Picker.Item key={city} value={city} label={city} />
                    ))}
                </Picker>
            </View>
            <RectButton style={styles.button} onPress={handleNavigationToPoints}>
                <View style={styles.buttonIcon}>
                    <Text style={{ color: '#fff' }}>>></Text>
                </View>
                <Text style={styles.buttonText}>
                    Entrar
                    </Text>
            </RectButton>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 40,
    },

    main: {
        flex: 1,
        justifyContent: 'center',
    },

    image: {
        marginTop: 40
    },

    title: {
        color: '#322153',
        fontSize: 32,
        maxWidth: 260,
        marginTop: 64,
    },

    description: {
        color: '#6C6C80',
        fontSize: 16,
        marginTop: 16,
        maxWidth: 260,
        lineHeight: 24,
    },

    footer: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        marginBottom: 180
    },

    select: {},

    input: {
        height: 15,
        paddingBottom: 30,
        paddingHorizontal: 50,
    },

    button: {
        backgroundColor: '#34CB79',
        height: 60,
        flexDirection: 'row',
        borderRadius: 10,
        overflow: 'hidden',
        alignItems: 'center',
        marginTop: 8,
    },

    buttonIcon: {
        height: 60,
        width: 60,
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonText: {
        flex: 1,
        justifyContent: 'center',
        textAlign: 'center',
        color: '#FFF',
        fontSize: 20,
        fontWeight: '800'
    }
});

export default Home;