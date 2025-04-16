import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                tabBarActiveTintColor: 'white',
                tabBarInactiveTintColor: '#c0c0c0',
                headerStyle: {
                    backgroundColor: 'black',
                },
                headerShadowVisible: false,
                headerTintColor: 'white',
                tabBarStyle: {
                    backgroundColor: 'black'
                },
            }}
        >
            <Tabs.Screen 
                name="index" 
                options={{ 
                    title: 'Ptice',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={focused ? 'list' : 'list-outline'} color={color} size={24} />
                    ), 
                }} 
            />
            <Tabs.Screen 
                name="settings" 
                options={{ 
                    title: 'Nastavitve',
                    tabBarIcon: ({ color, focused }) => (
                        <Ionicons name={ focused ? 'settings' : 'settings-outline'} color={color} size={24} />
                    ),
                }} 
            />
        </Tabs>
    )
}