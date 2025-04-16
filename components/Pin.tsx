import { Ionicons } from '@expo/vector-icons';
import {View, StyleSheet} from 'react-native';

export default function Pin({sighting, selected}: {sighting: LocalBirdSights, selected: boolean}){

    return (
        <View 
            key={selected+sighting.toString()}
            style={[styles.pin, selected && styles.selectedPin ]}
        >
            <Ionicons name={sighting.locationPrivate ? 'location' : 'flame'} size={24} color={selected ? 'black' : sighting.locationPrivate ? 'white' : '#ff0000'} />
        </View>
    );  
}

const styles = StyleSheet.create({
    pin: {
        width: 36,
        height: 36,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        backgroundColor: 'black'
    },
    selectedPin: {
        width: 50,
        height: 50,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'magenta'
    }
})