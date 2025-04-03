// import "../global.css";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="indexChat" options={{ title: "Chat" }} />
      <Stack.Screen name="chatBox" />
    </Stack>
  );
}
