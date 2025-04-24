import { FontAwesome } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Temporary local storage for messages (you can replace this with backend data fetching)

const ChatScreen = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const router = useRouter();

  // Handle sending a message
  const handleSendMessage = async () => {
    if (input.trim()) {
      const newMessage = {
        id: (messages.length + 1).toString(),
        text: input,
        sender: "me",
      };

      setMessages((prevMessages) => [...prevMessages, newMessage]);

      // Optionally, here you can make an API call to save the message in the backend
      // Example: await sendMessageToBackend(newMessage);

      setInput(""); // Clear the input after sending
    }
  };

  // Render message item
  const renderItem = ({ item }) => (
    <View
      className={`px-4 py-2 my-1 rounded-lg max-w-[75%] ${
        item.sender === "me" ? "self-end bg-blue-500" : "self-start bg-gray-200"
      }`}
    >
      <Text
        className={
          item.sender === "me"
            ? "text-white text-[15px]"
            : "text-black  text-[15px]"
        }
      >
        {item.text}
      </Text>
    </View>
  );

  return (
    <SafeAreaView className="flex-1 bg-white">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          className="flex-1"
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
        >
          {/* Header */}
          <View className="flex-row items-center p-4 border-b border-gray-200 bg-white">
            {/* Back Arrow */}
            <TouchableOpacity onPress={() => router.back()} className="mr-4">
              <FontAwesome name="arrow-left" size={20} color="#000" />
            </TouchableOpacity>

            {/* User Info */}
            <Text className="text-lg font-bold">Alice</Text>
          </View>

          {/* Messages */}
          <FlatList
            className="px-4 flex-1"
            data={messages}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingVertical: 10 }}
          />

          {/* Input box */}
          <View className="flex-row items-center p-3 border-t border-gray-200 bg-white">
            <TextInput
              value={input}
              onChangeText={setInput}
              placeholder="Type a message..."
              className="flex-1 bg-gray-100 px-4 py-2 rounded-full text-base"
            />
            <TouchableOpacity
              onPress={handleSendMessage}
              className="ml-2 bg-blue-500 p-3 rounded-full"
            >
              <Text className="text-white font-semibold">Send</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default ChatScreen;
