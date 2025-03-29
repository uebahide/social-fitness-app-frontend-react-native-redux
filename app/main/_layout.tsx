// import "../global.css";
import { router, Tabs } from "expo-router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchUser } from "@/slices/api/userSlice";
import { AppDispatch, RootState } from "../store";
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
        name="setting"
        options={{
          title: "Home",
          tabBarIcon: (focused) => (
            <MaterialIcons name="settings" color="gray" size={24} />
          ),
        }}
      />
    </Tabs>
  );
}
