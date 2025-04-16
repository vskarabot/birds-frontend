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
            <View style={styles.container}>
                <View style={styles.birdCard}>
                    <View style={styles.left}>
                        <View>
                            <View style={styles.name}>
                                <Text style={styles.sloName}>{birdProp.comNameSI}</Text>
                                <Text style={styles.latName}>({birdProp.sciName})</Text>
                            </View>
                            <Text style={[styles.latName, { color: 'white' }]}>{birdProp.comName}</Text>
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

                <Separator colors={['white', 'black']} height={1} />

            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        borderBottomWidth: 0.5,
        //borderColor: 'white'
    },
    birdCard: {
        flexDirection: 'row',
        padding: 10,
        height: 120,
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: 10,
        backgroundColor: 'black'
    },
    left: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'space-between'
    },
    name: {
        gap: 5,
        marginBottom: 5,
        flexWrap: 'wrap',
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: .5,
        borderColor: '#c0c0c0'
    },
    sloName: {
        fontSize: 15,
        fontWeight: '600',
        color: 'white'
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