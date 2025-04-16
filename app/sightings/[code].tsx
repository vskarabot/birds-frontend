import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import Mapbox, {MapView, Camera, LocationPuck, PointAnnotation, ShapeSource, FillLayer} from '@rnmapbox/maps';
import { useLocalSearchParams } from "expo-router";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import * as Location from 'expo-location';
import Pin from "@/components/Pin";
import EncryptedStorage from "react-native-encrypted-storage";
import { Ionicons } from "@expo/vector-icons";
import Circle from "@/components/Circle";

const MAPBOX_TOKEN = process.env.EXPO_PUBLIC_MAPBOX_TOKEN || '';
Mapbox.setAccessToken(MAPBOX_TOKEN);

const ZOOM_LEVELS: {[key: number]: number} = {
    10: 9.8,
    30: 8.2,
    50: 7.5,
};

// for now lets only fetch and display Recent nearby observations
export default function Sightings() {

    const [initialized, setInitialized] = useState(false);

    const cameraRef = useRef<Mapbox.Camera>(null);
    const userLocation = useRef({lat: 0, lon: 0});

    const {code} = useLocalSearchParams();

    const [sightings, setSightings] = useState<LocalBirdSights[] | null>(null);
    const [selectedPin, setSelectedPin] = useState<LocalBirdSights>();
    const [token, setToken] = useState('');

    const [daysBack, setDaysBack] = useState(7);
    const [radius, setRadius] = useState(10);
    const [loadingData, setLoadingData] = useState(false);

    const fetchToken = async() => {
        try {
            const t = await EncryptedStorage.getItem('eb-token');
            if (t)
                setToken(t);

        } catch (err) {
            console.log("Napaka pri nalaganju žetona. Poskusite ponovno kasneje.");
        }
    }

    const centerMap = async(lon: number, lat: number, zoom: number) => {
        cameraRef.current?.setCamera({
            centerCoordinate: [lon, lat],
            zoomLevel: zoom,
            animationDuration: 2000
        });
    }

    const getLocation = async() => {
        const location = await Location.getCurrentPositionAsync();
        
        userLocation.current = {
            lon: location.coords.longitude, 
            lat: location.coords.latitude
        };
    };

    const fetchSightings = async() => {
        setLoadingData(true);

        try {
            const response = await axios.get(
                `https://api.ebird.org/v2/data/obs/geo/recent/${code}?lng=${userLocation.current.lon}&lat=${userLocation.current.lat}&dist=${radius}&back=${daysBack}`, {
                    headers: {
                        'X-eBirdApiToken': `${token}`
                    }
                }
            );

            setSightings(response.data.map((bird: LocalBirdSights) => (bird)));
            setLoadingData(false);

        } catch (err: any) {
            // TODO : display status somehow
            setLoadingData(false);
            console.log(err, "napaka pri fetchanju");
        }
    };

    // todo fetch

    useEffect(() => {
        const initialize = async() => {
            await fetchToken();
            await getLocation();    
            await centerMap(userLocation.current.lon, userLocation.current.lat, ZOOM_LEVELS[radius]);
            setInitialized(true);
        };
        initialize();
    }, []);


    useEffect(() => {
        if (initialized)
            fetchSightings();

        centerMap(userLocation.current.lon, userLocation.current.lat, ZOOM_LEVELS[radius]);
    }, [initialized, daysBack, radius]);

    useEffect(() => {
        if (selectedPin) {
            centerMap(selectedPin.lng, selectedPin.lat, 14);
        }
    }, [selectedPin]);

    return (
        <View style={styles.container}>
            <MapView style={styles.map} styleURL="mapbox://styles/mapbox/outdoors-v12">
                <Camera ref={cameraRef} />
                <LocationPuck />
                {sightings && sightings.length > 0 && (
                    sightings.map((sighting: LocalBirdSights, index: number) => (
                        <PointAnnotation
                            key={index+""}
                            id={index+""}
                            coordinate={[sighting.lng, sighting.lat]}
                            onSelected={() => {
                                setSelectedPin(sighting);
                            }}
                        >
                            <Pin sighting={sighting} selected={selectedPin === sighting} />
                        </PointAnnotation>
                    ))
                )}

                <Circle coordinates={userLocation.current} radius={radius} />
                
            </MapView>

            <View style={styles.daysBackContainer}>
                <View style={{ gap: 5, alignItems: 'flex-end'}}>
                    <View style={styles.timeSelector}>
                        <TouchableOpacity style={[styles.tSColor]} onPress={() => setDaysBack(7)}>
                            <Text style={[styles.tSText, daysBack === 7 && styles.boldText]}>7 dni</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.tSColor]} onPress={() => setDaysBack(14)}>
                            <Text style={[styles.tSText, daysBack === 14 && styles.boldText]}>14 dni</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.tSColor]} onPress={() => setDaysBack(30)}>
                            <Text style={[styles.tSText, daysBack === 30 && styles.boldText]}>30 dni</Text>
                        </TouchableOpacity>  
                    </View>
                    <View style={styles.timeSelector}>
                        <TouchableOpacity style={[styles.tSColor]} onPress={() => setRadius(10)}>
                            <Text style={[styles.tSText, radius === 10 && styles.boldText]}>10 km</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.tSColor]} onPress={() => setRadius(30)}>
                            <Text style={[styles.tSText, radius === 30 && styles.boldText]}>30 km</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.tSColor]} onPress={() => setRadius(50)}>
                            <Text style={[styles.tSText, radius === 50 && styles.boldText]}>50 km</Text>
                        </TouchableOpacity>  
                    </View>
                </View>
            </View>

            {sightings && sightings.length && selectedPin?.lng && selectedPin?.lat ? (
                <View style={styles.info}>
                    <View style={styles.chip}>
                        <Text style={{ color: 'white', fontSize: 16 }}>#</Text>
                        <Text style={{ color: 'white' }}>{selectedPin?.howMany}</Text>                    
                    </View>
                    <View style={[styles.chip, { paddingHorizontal: 5 }]}>
                        <Ionicons name="location-outline" color="white" size={16}></Ionicons>
                        <Text style={{ color: 'white' }}>{selectedPin?.locName}</Text>
                    </View>
                    <View style={styles.chip}>
                        <Ionicons name="calendar-number-outline" color="white" size={16}></Ionicons>
                        <Text style={{ color: 'white' }}>{new Date(selectedPin?.obsDt.split(" ")[0]).toLocaleDateString("sl-SI").replaceAll("/", ". ")}</Text>
                    </View>
                    <View style={styles.chip}>
                        <Ionicons name="time-outline" color="white" size={16}></Ionicons>
                        <Text style={{ color: 'white' }}>{selectedPin?.obsDt.split(" ")[1]}</Text>
                    </View>    
                </View>
            ): sightings && sightings.length === 0 && (
                <View style={styles.info}>
                    <Text style={{ color: 'white' }}>Ni nedavnih opažanj</Text>
                </View>
            )}

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    map: {
        width: '100%',
        height: '100%'
    },
    title: {
        fontWeight: '600'
    },

    info: {
        position: 'absolute',
        bottom: 30,
        left: 20,
        right: 20,
        zIndex: 1,
        borderRadius: 20,

        paddingVertical: 10,
        backgroundColor: 'black',
        justifyContent: 'space-evenly',

        flexDirection: 'row',
        gap: 10,
        flexWrap: 'wrap',

        paddingHorizontal: 5
    },
    chip: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        justifyContent: 'center',
    },

    daysBackContainer: {
        position: 'absolute',
        top: 5,
        right: 0,
        zIndex: 1,
        flexDirection: 'row',
        gap: 5,
    },
    timeSelector: {
        flexDirection: 'row',
        backgroundColor: 'black',
        overflow: 'hidden',
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
    },
    tSColor: {
        backgroundColor: 'black',
        padding: 10
    },
    tSText: {
        color: '#c0c0c0'
    },
    boldText: {
        fontWeight: '800',
        color: 'white'
    }
})