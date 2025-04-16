import { Stack } from "expo-router";

// TODO - routes are now type any
// -> make route type and create own stack navigator, then apply params on it

export default function RootLayout() {
  return (
    <Stack 
      screenOptions={{
        contentStyle: {
          backgroundColor: 'black',
        },
        headerStyle: {
          backgroundColor: 'black'
        },
        headerTintColor: 'white'
      }}
    >
      <Stack.Screen name="(tabs)" options={{ headerShown: false }}/>
      <Stack.Screen name="not-found" options={{ title: 'Ups!' }}/>
      <Stack.Screen name="info/[code]" options={({route}) => ({
        title: route.params?.slovenian || ''
      })} />
      <Stack.Screen name="sightings/[code]" options={({route}) => ({
        title: route.params?.slovenian || ''
      })} />
    </Stack>
  );
}