import { Text, View } from "react-native";
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { router, useFocusEffect } from "expo-router";

import "../global.css";
import { PrimaryButton } from "@/components/atoms/buttons/primaryButton";
import { fetchUser } from "@/slices/api/userSlice";
import { AppDispatch, RootState } from "./store";
import { status } from "@/types/status";
import { fetchToken } from "@/slices/api/tokenSlice";

export default function Index() {
  const dispatch = useDispatch<AppDispatch>();
  const fetchUserStatus = useSelector((state: RootState) => state.user.status);
  const token = useSelector((state: RootState) => state.token.value);

  const onPressSignin = () => {
    router.navigate("/auth/signin");
  };
  const onPressSignup = () => {
    router.navigate("/auth/signup");
  };

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        await dispatch(fetchToken());
        await dispatch(fetchUser());
        console.log("fetchUserStatus(index.tsx): ", fetchUserStatus);
        console.log("token(index.tsx):", token);
      };
      fetchData();
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [dispatch])
  );

  useEffect(() => {
    console.log("before go to home: ", fetchUserStatus);
    if (fetchUserStatus === status.succeeded) {
      console.log("go to home(index.tsx)");
      router.navigate("/main/home");
    }
  }, [dispatch, fetchUserStatus]);

  if (fetchUserStatus === status.failed) {
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
}
