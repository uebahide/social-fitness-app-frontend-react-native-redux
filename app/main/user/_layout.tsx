// import "../global.css";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="requestInfoTab"
        options={{ title: "User Managemenet" }}
      />
      <Stack.Screen name="showUser" options={{ title: "User Profile" }} />
    </Stack>
  );
}
