import { FontAwesome } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState, useEffect, useRef } from "react";
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
import io from "socket.io-client";
import { useAuth } from "../../contexts/AuthContext";

// Replace with your backend IP and port
const SOCKET_SERVER_URL = "http://192.168.153.21:3000";

const ChatScreen = () => {
  const { userId } = useLocalSearchParams(); // Get recipient's userId from params
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [recipientName, setRecipientName] = useState("");
  const socketRef = useRef();
  const router = useRouter();
  const { user } = useAuth(); // Get logged-in user's data

  const currentUser = user._id; // logged-in user's ID
  const recipientUser = userId; // recipient user ID from params

  // Fetch recipient's data dynamically
  useEffect(() => {
    fetch(`https://yourapi.com/users/${recipientUser}`) // Replace with your actual API URL
      .then((response) => response.json())
      .then((data) => setRecipientName(data.name)) // Set recipient's name
      .catch((err) => console.error("Error fetching recipient data", err));
  }, [recipientUser]);

  // Setup socket connection and message handling
  useEffect(() => {
    socketRef.current = io(SOCKET_SERVER_URL);

    // Register this user
    socketRef.current.emit("register", currentUser);

    // Listen for incoming messages
    socketRef.current.on("receive_message", ({ message, from }) => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), text: message, sender: from },
      ]);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  // Handle sending a message
  const handleSendMessage = () => {
    if (input.trim()) {
      const msg = {
        id: Date.now().toString(),
        text: input,
        sender: currentUser,
      };

      setMessages((prevMessages) => [...prevMessages, msg]);

      // Send message to the backend
      socketRef.current.emit("send_message", {
        to: recipientUser,
        from: currentUser,
        message: input,
      });

      setInput(""); // Clear the input field
    }
  };

  // Render messages dynamically
  const renderItem = ({ item }) => (
    <View
      className={`px-4 py-2 my-1 rounded-lg max-w-[75%] ${
        item.sender === currentUser
          ? "self-end bg-blue-500"
          : "self-start bg-gray-200"
      }`}
    >
      <Text
        className={`text-[15px] ${
          item.sender === currentUser ? "text-white" : "text-black"
        }`}
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
          <View className="flex-row items-center p-4 border-b border-gray-200 bg-white">
            <TouchableOpacity onPress={() => router.back()} className="mr-4">
              <FontAwesome name="arrow-left" size={20} color="#000" />
            </TouchableOpacity>
            <Text className="text-lg font-bold">
              Chat with {recipientName || "User"}
            </Text>
          </View>

          <FlatList
            className="px-4 flex-1"
            data={messages}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingVertical: 10 }}
          />

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
