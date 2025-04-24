import React, { useState } from "react";
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

const messages = [
  { id: "1", text: "Hey!", sender: "me" },
  { id: "2", text: "Yo, what’s up?", sender: "other" },
  { id: "3", text: "All good. You?", sender: "me" },
  { id: "4", text: "Chillin", sender: "other" },
];

const ChatScreen = () => {
  const [input, setInput] = useState("");

  const renderItem = ({ item }) => (
    <View
      className={`px-4 py-2 my-1 rounded-lg max-w-[75%] ${
        item.sender === "me" ? "self-end bg-blue-500" : "self-start bg-gray-200"
      }`}
    >
      <Text className={item.sender === "me" ? "text-white" : "text-black"}>
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
          keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0} // Adjust for tab bar height
        >
          {/* Header */}
          <View className="p-4 border-b border-gray-200 bg-white">
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
            <TouchableOpacity className="ml-2 bg-blue-500 p-3 rounded-full">
              <Text className="text-white font-semibold">Send</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};

export default ChatScreen;
