import { View, Text } from 'react-native'
import { Link } from 'expo-router'

export default function NotFoundScreen() {
    return (
        <View>
            <Link href="/">
                Home
            </Link>
        </View>
    )
}