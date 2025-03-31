import { user } from "@/types/user";
import { FC } from "react";
import { View, Text, Pressable } from "react-native";
import { Link, router } from "expo-router";

type propsType = {
  user: user;
};

export const FriendItem: FC<propsType> = (props) => {
  const { user } = props;
  return (
    <Link
      href={{
        pathname: "/main/chat/chatBox",
        params: {
          friend_id: user.id,
        },
      }}
      asChild
    >
      <Pressable className="flex flex-row w-full mb-6 gap-x-5">
        <View className="rounded-full bg-amber-300 w-[70px] h-[70px]"></View>
        <View className="justify-center gap-y-1">
          <Text className="text-2xl">{user.name}</Text>
          <Text>Hello! Let's talk!</Text>
        </View>
      </Pressable>
    </Link>
  );
};
