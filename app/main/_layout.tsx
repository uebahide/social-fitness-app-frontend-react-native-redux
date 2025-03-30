// import "../global.css";
import { Tabs } from "expo-router";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { fetchUser } from "@/slices/api/userSlice";
import { AppDispatch } from "../store";
import { MaterialIcons } from "@expo/vector-icons";

export default function RootLayout() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchUser());
    };
    fetchData();
  }, []);

  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: (focused) => (
            <MaterialIcons name="home" color="gray" size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          headerShown: false,
          title: "Chat",
          tabBarIcon: (focused) => (
            <MaterialIcons name="chat" color="gray" size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="user"
        options={{
          headerShown: false,
          title: "Users",
          tabBarIcon: (focused) => (
            <MaterialIcons name="group" color="gray" size={24} />
          ),
        }}
      />
      <Tabs.Screen
        name="setting"
        options={{
          title: "Setting",
          tabBarIcon: (focused) => (
            <MaterialIcons name="settings" color="gray" size={24} />
          ),
        }}
      />
    </Tabs>
  );
}
