import { Ionicons } from '@expo/vector-icons';
import axios, { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import {Text, View, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import EncryptedStorage from 'react-native-encrypted-storage';

export default function CRUDToken ({getMostRecentToken}: {getMostRecentToken: (zeton: boolean) => void}) {

    const [inputText, setInputText] = useState('');
    // for checking if token is already stored
    const [zeton, setZeton] = useState(false);
    // for status when setting token -> finetuning for border if it fails
    const [status, setStatus] = useState(true);

    useEffect(() => {
        getMostRecentToken(zeton);
    }, [zeton]);

    useEffect(() => {
        const checkForKey = async() => {
            try {
                const token = await EncryptedStorage.getItem('ebirdToken');
                if (token)
                    setZeton(true);
            } catch (err) {
                console.log(err);
            }
        }
        checkForKey();
    }, [])

    const storeToken = async() => {
        try {
            const testCall = await axios.get('https://api.ebird.org/v2/ref/region/info/SI', {
                headers: {
                    'X-eBirdApiToken': inputText
                }
            });
            const res = await EncryptedStorage.setItem('ebirdToken', inputText);
            if (res !== null) {
                setZeton(true);
                setStatus(true);
            }
        } catch (err) {
            setStatus(false);
        }
    }

    const removeToken = async() => {
        try {
            await EncryptedStorage.removeItem('ebirdToken');
            setZeton(false);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.child}>
                {!zeton && (
                    <>
                        <View style={[styles.input, {borderWidth: status ? 0:1, borderColor: status ? '#fff':'red'}]}>
                            <TextInput placeholder='Vnesi ključ' onChangeText={(text) => setInputText(text)} />
                        </View>
                        <TouchableOpacity onPress={storeToken}>
                            <View style={styles.button}>
                                <Text style={{color: '#fff'}}>Shrani</Text>
                            </View>
                        </TouchableOpacity>
                    </>
                )}
                {zeton && (
                    <TouchableOpacity onPress={removeToken}>
                        <View style={styles.button}>
                            <Text style={{color: '#fff'}}>Odstrani žeton</Text>
                        </View>
                    </TouchableOpacity>
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    child: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    button: {
        backgroundColor: '#000',
        borderTopRightRadius: 3,
        borderBottomRightRadius: 3,
        padding: 10
    },
    input: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        paddingHorizontal: 10,
        borderTopLeftRadius: 3,
        borderBottomLeftRadius: 3
    }
});