// import "../global.css";
import { router, Tabs } from "expo-router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Text } from "react-native";

import { fetchUser } from "@/slices/api/userSlice";
import { AppDispatch, RootState } from "../store";
import { status } from "@/types/status";

export default function RootLayout() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchUser());
    };
    fetchData();
  }, []);

  return <Tabs></Tabs>;
}
