import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Stack } from "expo-router";

export default function AuthLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="signinScreen"
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name="signupScreen"
        options={{ headerShown: false }}
      ></Stack.Screen>
    </Stack>
  );
}
