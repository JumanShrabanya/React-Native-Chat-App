import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { useAuth } from "../../contexts/AuthContext.jsx"; // Adjust the path based on your project structure

const ProfileScreen = () => {
  const { user } = useAuth(); // Fetch user info from context

  return (
    <View className="flex-1 bg-white p-4">
      {/* Profile Picture */}
      <View className="items-center mb-4">
        <Image
          source={{
            uri:
              user?.profilePicture ||
              "https://www.example.com/default-avatar.jpg",
          }} // Replace with actual image URL from user data
          className="w-24 h-24 rounded-full border-4 border-blue-500 mb-2"
        />
        <TouchableOpacity className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full">
          <FontAwesome name="edit" size={16} color="white" />
        </TouchableOpacity>
      </View>

      {/* User Info */}
      <View className="items-center mb-6">
        <Text className="text-2xl font-bold text-gray-800">
          {user?.name || "John Doe"}
        </Text>
        <Text className="text-lg text-gray-600">
          {user?.email || "johndoe@example.com"}
        </Text>
        <Text className="text-sm text-gray-500 text-center mt-2">
          {user?.bio || "A passionate developer building cool stuff!"}
        </Text>
      </View>

      {/* Edit Profile Button */}
      <TouchableOpacity className="bg-blue-500 py-3 rounded-md items-center mb-4">
        <Text className="text-white text-lg font-semibold">Edit Profile</Text>
      </TouchableOpacity>

      {/* Log Out Button */}
      <TouchableOpacity className="bg-red-500 py-3 rounded-md items-center">
        <Text className="text-white text-lg font-semibold">Log Out</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileScreen;
