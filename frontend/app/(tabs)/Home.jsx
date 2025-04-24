import { Text, View } from "react-native";
import React from "react";
import { useAuth } from "../../contexts/AuthContext";

export default function HomeScreen() {
  const { user } = useAuth();
  console.log(user);

  return (
    <View className="h-full">
      <Text>homeScreen</Text>
    </View>
  );
}
