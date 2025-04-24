import { useAuth } from "@/contexts/AuthContext";
import { Redirect, useRouter } from "expo-router";
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  const router = useRouter();
  // user session
  const { user, loading } = useAuth();

  if (loading) {
    return null; // or show a loading spinner
  }

  if (user) {
    return <Redirect href="/Home" />;
  }

  return (
    <SafeAreaView className="h-full">
      <View className="flex-1 bg-gray-100">
        <View className="flex-1 justify-center items-center">
          <View className="bg-gray-200 rounded-full w-20 h-20 justify-center items-center mb-5">
            <View className="bg-gray-300 rounded-md w-4 h-4" />
          </View>
          <Text className="text-2xl font-bold text-gray-800 mb-2 font-poppins-medium">
            Welcome to ChatApp
          </Text>
          <Text className="text-base text-gray-600 text-center px-8 font-poppins-regular">
            Connect with friends and family effortlessly. Start chatting today!
          </Text>
        </View>

        <View className="p-5 pb-10">
          <TouchableOpacity
            className="bg-blue-500 py-3 rounded-md items-center"
            onPress={() => {
              router.push("/signupScreen");
            }}
          >
            <Text className="text-white text-lg font-bold font-poppins-medium">
              Continue with Email
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
