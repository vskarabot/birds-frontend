import { Link, router } from "expo-router";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Image } from 'expo-image';
import Graph from "./Graph";
import HowCommon from "./HowCommon";
import birdImages from "@/constants/Images";
import Separator from "./Separator";
import latSlo from "@/constants/FamilyNames";

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
                    <Text style={styles.sloName}>{birdProp.comNameSI}</Text>
                    <View>
                        <Text style={styles.latName}>{birdProp.sciName}</Text>
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
        height: 60,
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: 10,
        backgroundColor: '#000',
        borderBottomWidth: 2,
        borderBottomColor: '#303030',
    },
    left: {
        flex: 1,
        alignSelf: 'stretch',
        padding: 10
    },

    sloName: {
        fontSize: 12,
        fontWeight: '600',
        color: 'white',
        borderBottomWidth: 1,
        paddingBottom: 2,
        borderBottomColor: '#303030',
    },
    latName: {
        fontSize: 12,
        fontStyle: 'italic',
        color: '#707070'
    },
    imageContainer: {
        width: 80,
        height: '100%'
    },
    image: {
        flex: 1,
    }
});