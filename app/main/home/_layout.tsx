// import "../global.css";
import { Stack } from "expo-router";


export default function RootLayout() {
  return (
    <Stack >
      <Stack.Screen name="indexPost" options={{ title: "Home" }} />
      <Stack.Screen name="createPost" options={{ title: "Creat Post" }} />
    </Stack>
  );
}
