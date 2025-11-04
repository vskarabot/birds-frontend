import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Button } from "react-native";
import { Link, router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import HowCommon from "@/components/HowCommon";
import Graph from "@/components/Graph";
import birdImages from "@/constants/Images";
import { LinearGradient } from "expo-linear-gradient";
import Separator from "@/components/Separator";

export default function Detail() {
// TODO >>
    // refetch > this wont work
    const { code, slovenian } = useLocalSearchParams();
    const [bird, setBird] = useState<BirdInterface>();

    useEffect(() => {

        const getBirdWithCode = async () => {
            const response = await axios.get(`http://${process.env.EXPO_PUBLIC_EXPRESS_IP}/api/birds/${code}`);
            setBird(response.data);
        }

        getBirdWithCode();
    }, [])

    return (
        <ScrollView contentContainerStyle={styles.container}>
            
            {bird && bird.speciesCode && birdImages[bird.speciesCode] && (
                <Image style={styles.image} source={{ uri: birdImages[bird.speciesCode] }}/>
            )}

            <View style={styles.mainInfo}>
                <View style={styles.description}>
                    <Text style={styles.text}>
                        <Text style={{color: '#a0a0a0'}}>Znanstveno ime: </Text>
                        {bird?.sciName}
                    </Text>
                    <Text style={styles.text}>
                        <Text style={{color: '#a0a0a0'}}>Taksonomija: </Text>
                        {bird?.order} → {bird?.familySciName}
                    </Text>
                </View>

                <Separator height={1} colors={['#303030', '#303030']} />

                <Text style={styles.description}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin elementum cursus felis, et condimentum magna condimentum sit amet. Morbi faucibus sit amet sem ac dictum. Sed a arcu odio. Vivamus at justo id metus venenatis cursus quis at urna. Proin pellentesque consequat venenatis. Duis interdum fermentum maximus. 
                </Text>

                <Separator height={1} colors={['#303030', '#303030']} />
            </View>

            <View style={styles.liferContainer}>
                <Ionicons name="checkmark-circle-outline" size={24} color={"lime"} />
                <Text style={styles.text}>Lifer</Text>
            </View>

            <View style={styles.sightings}>
                <Text>Opazanja</Text>

                <View style={styles.manage}>
                    <TouchableOpacity onPress={() => router.push({
                        pathname: '/sightings/[code]' as any,
                        params: { code: code, slovenian: slovenian }
                        })}>
                            <View style={styles.sightingsCon}>
                                <Ionicons name='location-outline' size={24} color="white"></Ionicons>
                            </View> 
                    </TouchableOpacity>


                    <View style={styles.sightingsCon}>
                        <Ionicons name='add-circle-outline' size={24} color="white"></Ionicons>
                    </View> 
                </View>
            </View>

            <View style={{alignSelf: 'stretch', padding: 10}}>
                <Graph />
            </View>

        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        position: 'relative',
    },

    image: {
        height: 250,
        width: '100%',
        resizeMode: 'cover',
    },
    
    sightingsCon: {
        borderWidth: 1,
        borderColor: '#c0c0c0',
        borderRadius: 30,
        padding: 10,
    },

    sightings: {
        alignSelf: 'stretch',
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between',
        padding: 10
    },

    manage: {
        flexDirection: 'row',
        gap: 10,
        padding: 10
    },

    mainInfo: {
        alignSelf: 'stretch',
        gap: 10,
        padding: 10
    },

    liferContainer: {
        position: 'absolute',
        right: 0,
        top: 0,
        gap: 5,
        padding: 2,
        paddingRight: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#303030',
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
    },

    title: {
        color: 'white', 
        alignSelf: 'stretch',
        fontSize: 12,
        fontWeight: '600',
        fontStyle: 'italic',
        paddingHorizontal: 10,
        paddingTop: 5
    },

    text: {
        fontSize: 12,
        color: 'white',
        fontStyle: 'italic'
    },

    description: { 
        fontSize: 12, 
        color: '#c0c0c0', 
        padding: 10, 
        borderWidth: 1,
        borderColor: '#303030',
        borderRadius: 5
    }
});