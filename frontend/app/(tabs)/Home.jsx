import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { FontAwesome } from "@expo/vector-icons";
import getUsers from "../../services/getUsers.js"; // Adjust the path as needed
import { useAuth } from "../../contexts/AuthContext.jsx";
import { useFocusEffect } from "@react-navigation/native"; // Import the useFocusEffect hook

const HomeScreen = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const userId = user._id;
  const router = useRouter();

  // Fetch users when screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      const fetchUsers = async () => {
        setLoading(true); // Start loading when fetching users
        try {
          const result = await getUsers({ userId });
          setUsers(result);
        } catch (error) {
          console.error("Error fetching users:", error);
        } finally {
          setLoading(false); // Stop loading after fetching users
        }
      };

      fetchUsers(); // Call the fetchUsers function

      return () => {
        // Cleanup if needed when screen loses focus
      };
    }, [userId]) // Only refetch if userId changes
  );

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-white px-4 pt-12">
      {/* Header */}
      <Text className="text-2xl font-bold mb-6">Users</Text>

      {/* Chat List */}
      <FlatList
        data={users}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            className="flex-row items-center gap-4 py-4 border-b border-gray-200"
            onPress={() => {
              router.push({
                pathname: "/Chat",
                params: { userId: item._id }, // Directly passing userId
              });
            }}
          >
            {/* Avatar */}
            <View className="w-12 h-12 rounded-full bg-blue-500 justify-center items-center">
              <Text className="text-white text-lg font-bold">
                {item.name?.charAt(0).toUpperCase()}
              </Text>
            </View>

            {/* User Info */}
            <View>
              <Text className="text-lg font-semibold">{item.name}</Text>
              <Text className="text-gray-500">{item.email}</Text>
              {item.conversations?.[0]?.lastMessage?.text && (
                <Text className="text-sm text-gray-400 mt-1">
                  Last: {item.conversations[0].lastMessage.text}
                </Text>
              )}
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default HomeScreen;
