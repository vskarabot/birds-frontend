import { StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function Separator ({colors, height}: {colors: string[], height: number}) {
    return (
        <LinearGradient 
            colors={colors} 
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            
            style={[styles.separator, { height: height }]}
        />
    );
};

const styles = StyleSheet.create({
    separator: {
        height: .5,
        alignSelf: 'stretch',
    }
});