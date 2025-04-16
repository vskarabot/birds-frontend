import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";

const BLOCK_HEIGHT = 10;

export default function Graph() {

    const mySightings: {[key: string]: number} = {
        januar: 0,
        februar: 1,
        marec: 1,
        april: 0,
        maj: 0,
        junij: 15,
        julij: 30,
        avgust: 2,
        september: 2,
        oktober: 0,
        november: 0,
        december: 0
    };

    const transformData = (val: number) => {
        return Math.sqrt(val);
    };
  
    return (
        <View>
            <View style={styles.container}>
                {Object.entries(mySightings).map(([month, val], _) => (
                    <View style={styles.column}>
                        <Text style={{ fontSize: 10, fontWeight: '600', fontStyle: 'italic', color: 'white' }}>{val}</Text>
                        <LinearGradient 
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                            colors={['white', '#808080']} 
                            style={[styles.block, {height: BLOCK_HEIGHT * transformData(val) + .5 }]}
                        />
                        <Text style={{ fontSize: 10, fontWeight: '600', fontStyle: 'italic', color: 'white' }}>{month.charAt(0).toUpperCase() + month.substring(1, 3)}</Text>
                    </View>
                ))}

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderColor: '#c0c0c0',
        gap: 5,
        alignItems: 'flex-end',
    },
    column: {
        flex: 1,
        alignItems: 'center',
    },
    block: {
        elevation: 4,
        alignSelf: 'stretch', 
        backgroundColor: 'white',
        borderRadius: 2
    }
});