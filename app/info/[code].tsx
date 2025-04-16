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
                <Text style={{ color: 'white' }}>Viden</Text>
            </View>

            <Separator 
                colors={['black', 'white', 'black']} 
                height={1}
            />
            
            <Text style={styles.title}>Taksonomija</Text>

            <View style={styles.mainInfo}>
                <View style={styles.namePart}>
                    <Text style={styles.textA}>Ime:</Text>
                    <Text style={styles.textB}>{bird?.comNameSI}</Text>
                    <Text style={styles.textA}>(slov.),</Text>
                    <Text style={styles.textB}>{bird?.sciName}</Text>
                    <Text style={styles.textA}>(znan.),</Text>
                    <Text style={styles.textB}>{bird?.comName}</Text>
                    <Text style={styles.textA}>(ang.)</Text>
                </View>
                <View style={styles.namePart}>
                    <Text style={styles.textA}>Domača imena:</Text>
                    <Text style={styles.textB}>/</Text>
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
                    <Text style={{ fontStyle: 'italic', color: 'white' }}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin elementum cursus felis, et condimentum magna condimentum sit amet. Morbi faucibus sit amet sem ac dictum. Sed a arcu odio. Vivamus at justo id metus venenatis cursus quis at urna. Proin pellentesque consequat venenatis. Duis interdum fermentum maximus. 
                    </Text>
                </View>
            </View>

            <Separator 
                colors={['black', 'white']} 
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
                                <Text style={{ color: 'white' }}>Nedavno</Text>
                                <Ionicons name='location-outline' size={24} color="white"></Ionicons>
                            </View> 
                    </TouchableOpacity>


                    <View style={styles.sightingsCon}>
                        <Text style={{ color: 'white' }}>Dodaj</Text>
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
        backgroundColor: 'black'
    },
    image: {
        height: 300,
        width: '100%',
        resizeMode: 'cover'
    },

    sightingsCon: {
        borderWidth: 1,
        borderColor: '#c0c0c0',
        borderRadius: 10,
        padding: 10,
        width: 80,
        justifyContent: 'space-around',
        alignItems: 'center',
    },

    sightings: {
        alignSelf: 'stretch',
        flexDirection: 'row',
        flex: 1,
        justifyContent: 'space-between'
    },

    addKeyButton: {
        backgroundColor: 'orange',
        paddingHorizontal: 10
    },

    manage: {
        flexDirection: 'row',
        gap: 10,
        padding: 10
    },

    mainInfo: {
        backgroundColor: 'black',
        alignSelf: 'stretch',
        padding: 10,
        justifyContent: 'space-between',
        elevation: 5,
    },

    namePart: {
        marginBottom: 10,
        flexDirection: 'row',
        gap: 5,
        alignItems: 'baseline',
        flexWrap: 'wrap'
    },

    liferContainer: {
        position: 'absolute',
        right: 0,
        top: 5,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
        paddingRight: 5,
        backgroundColor: 'black',
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        elevation: 3,
    },

    basicInfo: {
        backgroundColor: 'black',
        padding: 10,
        flexDirection: 'row',
        alignSelf: 'stretch',
        justifyContent: 'space-between',
        elevation: 5
    },
    title: {
        color: 'white', 
        alignSelf: 'stretch',
        fontSize: 16,
        padding: 10,
        fontWeight: 'bold',
        fontStyle: 'italic',
    },

    textA: {
        color: '#c0c0c0',
        fontStyle: 'italic'
    },
    textB: {
        color: 'white',
    },
});