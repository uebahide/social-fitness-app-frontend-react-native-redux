import { View, Text } from "react-native";
import { FC, useState } from "react";
import { message } from "@/types/message";

type propsType = {
  message: message;
  user_id: string;
};

export const Message: FC<propsType> = (props) => {
  const { message, user_id } = props;
  return (
    <View
      className={`flex-row mb-5  ${user_id === message.user_id ? "justify-end mr-2" : "justify-start ml-2"}`}
    >
      <View
        className={`flex ${user_id === message.user_id ? "items-end" : "items-start"}`}
      >
        <Text className="color-gray-500">{message.time}</Text>
        <View
          className={`rounded-lg px-5 py-3 max-w-60 ${user_id === message.user_id ? "bg-green-500 " : "bg-white"}`}
        >
          <Text
            className={`${user_id === message.user_id ? "color-white" : ""}`}
          >
            {message.text}
          </Text>
        </View>
      </View>
    </View>
  );
};
