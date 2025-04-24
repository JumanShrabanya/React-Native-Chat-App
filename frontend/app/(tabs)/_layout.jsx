import { Tabs } from "expo-router";

import { StatusBar } from "react-native";
export default function TabsLayout() {
  return (
    <>
      <StatusBar
        barStyle={"dark-content"}
        backgroundColor={"white"}
      ></StatusBar>
      <Tabs>
        <Tabs.Screen name="Home" options={{ headerShown: false }}></Tabs.Screen>
      </Tabs>
    </>
  );
}
