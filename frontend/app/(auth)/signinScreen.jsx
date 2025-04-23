import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";

export default function SignInpScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const router = useRouter();

  const handleSignIn = () => {
    setEmailError("");
    setPasswordError("");

    let hasError = false;

    if (!email.trim()) {
      setEmailError("Email is required.");
      hasError = true;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Invalid email format.");
      hasError = true;
    }

    if (!password.trim()) {
      setPasswordError("Password is required.");
      hasError = true;
    } else if (password.length < 8 || password.length > 16) {
      setPasswordError("Password must be 8-16 characters long.");
      hasError = true;
    }

    if (!hasError) {
      // In a real app, you would send this data to your authentication service
      console.log("Sign Up Data:", { email, password });
      // Optionally navigate to the next screen
      // navigation.navigate('HomeScreen');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : -100} // Adjust as needed
      >
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "center",
            paddingHorizontal: 24,
          }}
        >
          <Text className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Sign Up
          </Text>
          <View className="mb-4">
            <Text className="text-gray-700 mb-2">Email</Text>
            <TextInput
              className={`bg-white border ${
                emailError ? "border-red-500" : "border-gray-300"
              } rounded-md py-3 px-4 text-gray-800`}
              placeholder="Your Email"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
            {emailError ? (
              <Text className="text-red-500 text-sm mt-1">{emailError}</Text>
            ) : null}
          </View>

          <View className="mb-4">
            <Text className="text-gray-700 mb-2">Password</Text>
            <TextInput
              className={`bg-white border ${
                passwordError ? "border-red-500" : "border-gray-300"
              } rounded-md py-3 px-4 text-gray-800`}
              placeholder="Your Password"
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />
            {passwordError ? (
              <Text className="text-red-500 text-sm mt-1">{passwordError}</Text>
            ) : null}
          </View>

          <TouchableOpacity
            className="bg-blue-500 py-3 rounded-md items-center mt-6"
            onPress={handleSignIn}
          >
            <Text className="text-white text-lg font-bold">Sign Up</Text>
          </TouchableOpacity>

          <View className="flex-row justify-center mt-6">
            <Text className="text-gray-600">Don't have an account? </Text>
            <TouchableOpacity onPress={() => router.back()}>
              <Text className="text-blue-500 font-semibold">Sign Up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
