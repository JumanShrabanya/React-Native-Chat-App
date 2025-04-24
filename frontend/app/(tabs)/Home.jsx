import React from "react";
import { View, Text, FlatList, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const chats = [
  { id: "1", name: "Alice", lastMessage: "Hey there!" },
  { id: "2", name: "Bob", lastMessage: "What's up?" },
  { id: "3", name: "Charlie", lastMessage: "Call me when free." },
];

const HomeScreen = () => {
  return (
    <View className="flex-1 bg-white px-4 pt-12">
      {/* Header */}
      <Text className="text-2xl font-bold mb-6">Users</Text>

      {/* Chat List */}
      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity className="py-4 border-b border-gray-200">
            <Text className="text-lg font-semibold">{item.name}</Text>
            <Text className="text-gray-500">{item.lastMessage}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Floating Button */}
      <TouchableOpacity className="absolute bottom-6 right-6 bg-blue-500 p-4 rounded-full shadow-lg">
        <FontAwesome name="plus" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
