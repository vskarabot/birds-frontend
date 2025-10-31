import { Link, router } from "expo-router";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Image } from 'expo-image';
import Graph from "./Graph";
import HowCommon from "./HowCommon";
import birdImages from "@/constants/Images";
import Separator from "./Separator";

interface BirdI {
    birdProp: BirdInterface;
}

export default function Bird ({birdProp}: BirdI) {
    return (
        <TouchableOpacity onPress={() => router.push({
            pathname: '/info/[code]' as any,
            params: { 
                code: birdProp.speciesCode,
                slovenian: birdProp.comNameSI,
            }
        })}>
            <View style={styles.birdCard}>
                <View style={styles.left}>
                    <View>
                        <Text style={styles.sloName}>{birdProp.comNameSI}</Text>

                        <Separator colors={['#c0c0c0', 'black', 'black']} height={1}/>
                        <View style={{ height: 16 }} />
                        
                        <Text style={styles.latName}>{birdProp.sciName} (sci.)</Text>
                        <Text style={styles.latName}>{birdProp.comName} (eng.)</Text>
                        <Text style={styles.latName}>Družina: {birdProp.familySciName}</Text>
                    </View>
                </View>
                {birdImages[birdProp.speciesCode] && (
                    <View style={styles.imageContainer}>
                        <Image
                            source={{ uri: birdImages[birdProp.speciesCode]}}
                            style={styles.image}
                        />
                    </View>
                )}
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    birdCard: {
        flexDirection: 'row',
        padding: 10,
        height: 120,
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: 10,
        backgroundColor: '#000',
        borderBottomWidth: 1,
        borderBottomColor: '#303030'
    },
    left: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'space-between'
    },

    sloName: {
        fontSize: 14,
        fontWeight: '600',
        color: 'white',
        marginBottom: 4
    },
    latName: {
        fontSize: 12,
        fontStyle: 'italic',
        color: '#707070'
    },
    imageContainer: {
        flex: .6,
        height: '100%',
    },
    image: {
        flex: 1,
        width: '100%',
        borderRadius: 10
    }
});