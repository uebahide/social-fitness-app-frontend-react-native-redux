// import "../global.css";
import "react-native-gesture-handler";
import { Stack } from "expo-router";
import { Provider } from "react-redux";
import { store } from "./store";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function RootLayout() {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <Stack>
          <Stack.Screen name="main" options={{ headerShown: false }} />
          <Stack.Screen name="auth/signin" options={{ title: "Sign In" }} />
          <Stack.Screen name="auth/signup" options={{ title: "Sign Up" }} />
          <Stack.Screen name="index" options={{ headerShown: false }} />
        </Stack>
      </SafeAreaProvider>
    </Provider>
  );
}
