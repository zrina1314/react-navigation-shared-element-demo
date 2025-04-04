import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createSharedElementStackNavigator } from "react-navigation-shared-element";
import { ListScreen } from "./screens/ListScreen";
import { DetailScreen } from "./screens/DetailScreen";
import { Text } from "react-native";

const Stack = createSharedElementStackNavigator();
const MainScreen = () => (
  <Stack.Navigator mode="modal" screenOptions={{ headerShown: false }}>
    <Stack.Screen name="List" component={ListScreen} />
    <Stack.Screen
      name="Detail"
      component={DetailScreen}
      sharedElements={(route) => {
        return [route.params.pokemon.name];
      }}
    />
  </Stack.Navigator>
);

export default function App() {
  return (
    <SafeAreaProvider>
      <Text>是</Text>
      <NavigationContainer>
        <MainScreen />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
