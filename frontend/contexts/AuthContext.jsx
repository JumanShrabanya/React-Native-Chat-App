import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadStoredData = async () => {
      try {
        const savedToken = await AsyncStorage.getItem("token");
        if (savedToken) {
          setToken(savedToken);
        }
      } catch (err) {
        console.error("Failed to load token:", err);
      } finally {
        setLoading(false);
      }
    };

    loadStoredData();
  }, []);

  const signIn = async ({ user, token }) => {
    try {
      setUser(user);
      setToken(token);
      await AsyncStorage.setItem("token", token);
    } catch (error) {
      console.error("Error saving token:", error);
    }
  };

  const signOut = async () => {
    try {
      setUser(null);
      setToken(null);
      await AsyncStorage.removeItem("token");
    } catch (error) {
      console.error("Error removing token:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
