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

            <View style={styles.liferContainer}>
                <Ionicons name="checkmark-circle-outline" size={24} color={"lime"} />
                <Text style={styles.textA}>Lifer</Text>
            </View>

            <Separator 
                colors={['white', 'black']} 
                height={.5}
            />
            
            <View style={styles.mainInfo}>
                <View style={styles.namePart}>
                    <Text style={styles.textA}>Tuje ime:</Text>
                    <Text style={styles.textB}>{bird?.sciName}</Text>
                    <Text style={styles.textA}> / </Text>
                    <Text style={styles.textB}>{bird?.comName}</Text>
                </View>
                <View style={styles.namePart}>
                    <Text style={styles.textA}>Red:</Text>
                    <Text style={styles.textB}>{bird?.order}</Text>
                </View>
                <View style={styles.namePart}>
                    <Text style={styles.textA}>Družina:</Text>
                    <Text style={styles.textB}>{bird?.familyComName}</Text>
                </View>
                <View style={styles.namePart}>
                    <Text style={styles.textA}>Družina (znanstveno):</Text>
                    <Text style={styles.textB}>{bird?.familySciName}</Text>
                </View>               
            </View>

            <Separator 
                colors={['white', 'black']} 
                height={.5}
            />

            <Text style={styles.title}>Osnovne značilnosti</Text>
            <View style={styles.basicInfo}>
                <View style={styles.namePart}>
                    <Text style={{ fontSize: 12, color: '#c0c0c0' }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin elementum cursus felis, et condimentum magna condimentum sit amet. Morbi faucibus sit amet sem ac dictum. Sed a arcu odio. Vivamus at justo id metus venenatis cursus quis at urna. Proin pellentesque consequat venenatis. Duis interdum fermentum maximus. 
                    </Text>
                </View>
            </View>

            <Separator 
                colors={['white', 'black']} 
                height={.5}
            />

            <View style={styles.sightings}>
                <Text style={styles.title}>Opažanja</Text>

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
        backgroundColor: 'black',
    },
    image: {
        height: 300,
        width: '100%',
        resizeMode: 'contain'
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
        justifyContent: 'space-between'
    },

    manage: {
        flexDirection: 'row',
        gap: 10,
        padding: 10
    },

    mainInfo: {
        alignSelf: 'stretch',
        padding: 10,
    },

    namePart: {
        flexDirection: 'row',
        gap: 5,
        alignItems: 'baseline',
        flexWrap: 'wrap'
    },

    liferContainer: {
        position: 'absolute',
        right: 0,
        top: 20,
        gap: 5,
        paddingRight: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'black',
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
    },

    basicInfo: {
        backgroundColor: 'black',
        paddingHorizontal: 10,
        paddingBottom: 10,
        flexDirection: 'row',
        alignSelf: 'stretch',
        justifyContent: 'space-between',
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

    textA: {
        fontSize: 12,
        color: '#c0c0c0',
        fontStyle: 'italic'
    },
    textB: {
        fontSize: 12,
        color: 'white',
    },
});