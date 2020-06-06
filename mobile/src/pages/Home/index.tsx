import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ImageBackground, KeyboardAvoidingView, Platform } from 'react-native';
import { RectButton, TextInput } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';


const Home = () => {
    const navigation = useNavigation();
    const [uf, setUf] = useState('');
    const [city, setCity] = useState('');

    function handleNavigationToPoints() {
        navigation.navigate('Points', { uf, city });
    }


    return (
        <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <ImageBackground source={require('../../assets/home-background.png')} style={styles.container}
                imageStyle={{ width: 274, height: 368 }}>
                <View style={styles.main}>
                    <Image style={styles.image} source={require('../../assets/logo.png')} />
                    <View>
                        <Text style={styles.title}>Seu marketplace de coleta de resíduos</Text>
                        <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de coleta de forma
                        eficíente</Text>
                    </View>
                </View>
                <View style={styles.footer}>
                    <TextInput style={styles.input} placeholder="Digite uma UF" value={uf} maxLength={2} autoCapitalize="characters" autoCorrect={false} onChangeText={setUf} />
                    <TextInput style={styles.input} placeholder="Digite uma Cidade" value={city} autoCorrect={false} onChangeText={setCity} />
                    <RectButton style={styles.button} onPress={handleNavigationToPoints}>
                        <View style={styles.buttonIcon}>
                            <Text style={{ color: '#fff' }}>>></Text>
                        </View>
                        <Text style={styles.buttonText}>
                            Entrar
                    </Text>
                    </RectButton>
                </View>
            </ImageBackground>
        </KeyboardAvoidingView>
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
        marginBottom: 10
    },

    select: {},

    input: {
        height: 50,
        backgroundColor: 'lightgreen',
        paddingHorizontal: 30,
        marginBottom: 8,
        borderRadius: 8,
        fontSize: 20
    },

    button: {
        backgroundColor: '#34CB79',
        height: 60,
        flexDirection: 'row',
        borderRadius: 10,
        overflow: 'hidden',
        alignItems: 'center',
        marginTop: 10,
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