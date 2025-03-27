// import "../global.css";
import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { store } from "./store";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="auth/signin" options={{ title: "Sign In" }} />
        <Stack.Screen name="auth/signup" options={{ title: "Sign Up" }} />
        <Stack.Screen name="main" options={{ headerShown: false }} />
      </Stack>
    </Provider>
  );
}
