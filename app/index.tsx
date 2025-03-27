import { Text, View } from "react-native";

import "../global.css";
import { router, useFocusEffect } from "expo-router";
import { PrimaryButton } from "@/components/atoms/buttons/primaryButton";
import { fetchUser } from "@/slices/api/userSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./store";
import { useEffect } from "react";

export default function Index() {
  const onPressSignin = () => {
    router.navigate("/auth/signin");
  };
  const onPressSignup = () => {
    router.navigate("/auth/signup");
  };

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  return (
    <View className="flex-1 bg-blue-200">
      <Text className="color-white text-4xl text-center absolute w-full top-20">
        Social Fitness App
      </Text>
      <View className="bg-white h-[250px] absolute bottom-0 w-full rounded-t-lg p-6">
        <Text className="text-center text-2xl mb-5">Welcome!</Text>
        <Text className="text-center text-lg">
          Start with creating your account!
        </Text>
        <View className="flex-1 justify-center gap-y-4 pt-8">
          <PrimaryButton onPress={onPressSignin}>Sign In</PrimaryButton>
          <PrimaryButton onPress={onPressSignup}>Sign Up</PrimaryButton>
        </View>
      </View>
    </View>
  );
}
