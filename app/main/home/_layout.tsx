// import "../global.css";
import { Stack } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="indexPost" options={{ title: "Home" }} />
      <Stack.Screen name="createPost" options={{ title: "Creat Post" }} />
      <Stack.Screen name="showPost" options={{ title: "Edit Post" }} />
    </Stack>
  );
}
