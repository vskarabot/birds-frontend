import { useEffect, useState } from 'react';
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import EncryptedStorage from 'react-native-encrypted-storage';

export default function AboutScreen() {

    const [inputText, setInputText] = useState("");
    const [statusText, setStatusText] = useState("");

    const [canEdit, setCanEdit] = useState(false);
    const [isTokenStored, setIsTokenStored] = useState(false);

    useEffect(() => {
        const checkForToken = async () => {
            try {
                const data = await EncryptedStorage.getItem("eb-token");
                
                if (data) {
                    setInputText(data);
                    setIsTokenStored(true);
                }

            } catch (err) {
                setStatusText("Napaka. Prosimo poskusite kasneje.");
            }
        };
        checkForToken();
    }, []);

    const storeToken = async () => {
        try {
            await EncryptedStorage.setItem(
                "eb-token",
                inputText
            );
            setCanEdit(false);
            setStatusText("Uspešno nastavljen žeton");
        } catch (err) {
            setStatusText("Napaka. Prosimo poskusite kasneje.");
        }
    };

    const removeToken = async () => {
        setInputText('');
        try {
            await EncryptedStorage.removeItem("eb-token");
            setIsTokenStored(false);
            setStatusText("Uspešno odstranjen žeton");
        } catch (err) {
            setStatusText("Napaka. Prosimo poskusite kasneje.");
        }
    }

    return (
        <View>
            <View style={styles.container}>
                <Text style={styles.inTitle}>e-bird žeton</Text>
                <View style={styles.tokenManager}>
                    <TextInput 
                        value={inputText}
                        secureTextEntry 
                        style={[styles.input, { backgroundColor: canEdit ? 'white' : '#c0c0c0'}]} 
                        maxLength={12} 
                        onChangeText={(txt) => setInputText(txt)} 
                        editable={canEdit}>
                    </TextInput>
                    {canEdit && !isTokenStored && inputText && (
                        <TouchableOpacity style={[styles.button, { borderColor: 'blue' }]} onPress={storeToken}>
                            <Text>Nastavi</Text>
                        </TouchableOpacity>
                    )}
                    {canEdit && isTokenStored && (
                        <TouchableOpacity style={[styles.button]} onPress={removeToken}>
                            <Text>Odstrani</Text>
                        </TouchableOpacity>
                    )}
                    <TouchableOpacity onPress={() => setCanEdit(!canEdit)} style={[styles.button]}>
                        {canEdit ? (
                            <Text>Prekliči</Text>
                        ): (
                            <Text>Urejanje</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.status}>
                <Text style={{ color: statusText.startsWith('Napaka') ? 'red' : 'green' }}>{statusText}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 10
    },
    inTitle: {
        fontStyle: 'italic'
    },
    tokenManager: {
        flexDirection: 'row',
        gap: 10
    },
    input: {
        flex: 1,
        borderRadius: 10,
        borderWidth: 1,
        fontSize: 16,
        padding: 10,
        borderColor: '#c0c0c0'
    },
    button: {
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        justifyContent: 'center'
    },
    status: {
        padding: 10,
    }
});
