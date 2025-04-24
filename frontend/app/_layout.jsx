import { Stack } from "expo-router";
import "../css/global.css";
import { StatusBar } from "react-native";
import { AuthProvider, useAuth } from "../contexts/AuthContext";
import { SocketProvider, SocketContext } from "../contexts/SocketContext";
import React, { useEffect, useContext } from "react";

const EmitUserId = () => {
  const { user, token, loading } = useAuth();
  const { socket } = useContext(SocketContext);

  useEffect(() => {
    if (!loading && token && user?._id && socket) {
      socket.emit("setUser", user._id);
      console.log("Emitted setUser with ID:", user._id);
    }
  }, [loading, token, user?._id, socket]);

  return null;
};

export default function RootLayout() {
  return (
    <SocketProvider>
      <AuthProvider>
        <>
          <StatusBar
            barStyle={"dark-content"}
            backgroundColor={"white"}
          ></StatusBar>
          <EmitUserId />
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
    </SocketProvider>
  );
}
