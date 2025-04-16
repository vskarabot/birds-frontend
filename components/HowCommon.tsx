import { View, StyleSheet, Text } from "react-native";

export default function HowCommon({abundance}: {abundance: string }) {

    const colors = {
        'C': '#006400',
        'P': '#FFD700',
        'CG': '#556B2F',
        'PG': '#FF7F50',
        'ZG': '#1E90FF',
        '(ZG)': '#ADD8E6',
        'PR': '#8A2BE2',
        'DS': '#4682B4',
        'IRG': '#B76E79',
    };
    const texts = {
        'C': 'Celoletna vrsta',
        'P': 'Poletna vrsta',
        'CG': 'Celoletni gost',
        'PG': 'Poletni gost',
        'ZG': 'Zimski gost',
        '(ZG)': 'Redek zimski gost',
        'PR': 'Preletnik',
        'DS': 'Delni selivec',
        'IRG': 'Izjemno redek gost'
    };

    return (
        <View>
            {texts.hasOwnProperty(abundance) && colors.hasOwnProperty(abundance) && (
                <View style={styles.container}>
                    <View style={[styles.dot, { backgroundColor: colors[abundance as keyof typeof colors]}]}/>
                    <Text>{texts[abundance as keyof typeof texts]}</Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 100,
        marginRight: 5,
        elevation: 5
    }
})