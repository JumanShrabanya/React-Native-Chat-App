import { Tabs } from "expo-router";
import { StatusBar } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // For icons

export default function TabsLayout() {
  return (
    <>
      <StatusBar barStyle={"dark-content"} backgroundColor={"white"} />
      <Tabs>
        <Tabs.Screen
          name="Home"
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name={focused ? "home" : "home-outline"}
                size={24}
                color={focused ? "#007AFF" : "#8E8E93"} // Active (blue) and inactive (gray) colors
              />
            ),
          }}
        />
        <Tabs.Screen
          name="Chat"
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name={focused ? "chatbubbles" : "chatbubbles-outline"}
                size={24}
                color={focused ? "#007AFF" : "#8E8E93"} // Active (blue) and inactive (gray) colors
              />
            ),
          }}
        />
        <Tabs.Screen
          name="Profile"
          options={{
            headerShown: false,
            tabBarIcon: ({ focused }) => (
              <Ionicons
                name={focused ? "person" : "person-outline"}
                size={24}
                color={focused ? "#007AFF" : "#8E8E93"} // Active (blue) and inactive (gray) colors
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
