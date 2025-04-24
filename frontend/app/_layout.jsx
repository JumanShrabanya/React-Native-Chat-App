import { Stack } from "expo-router";
import "../css/global.css";
import { StatusBar } from "react-native";
import { AuthProvider } from "../contexts/AuthContext";
export default function RootLayout() {
  return (
    <AuthProvider>
      <>
        <StatusBar
          barStyle={"dark-content"}
          backgroundColor={"white"}
        ></StatusBar>
        <Stack>
          <Stack.Screen
            name="index"
            options={{ headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen
            name="(auth)"
            options={{ headerShown: false }}
          ></Stack.Screen>
          <Stack.Screen
            name="(tabs)"
            options={{ headerShown: false }}
          ></Stack.Screen>
        </Stack>
      </>
    </AuthProvider>
  );
}
