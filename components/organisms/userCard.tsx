import { user } from "@/types/user";
import { Link } from "expo-router";
import { FC } from "react";
import { Pressable, View, Text } from "react-native";

type propsType = {
  user: user;
};

export const UserCard: FC<propsType> = (props) => {
  const { user } = props;
  return (
    <Link
      href={{
        pathname: "/main/user/showUser",
        params: {
          user_id: user.id,
          user_name: user.name,
          user_email: user.email,
        },
      }}
      asChild
    >
      <Pressable className="rounded-lg items-center mb-2 py-10 bg-red-100">
        <Text>Name: {user.name}</Text>
        <Text>email: {user.email}</Text>
      </Pressable>
    </Link>
  );
};
