import { FC } from "react";
import { Pressable, Text } from "react-native";

type ButtonProps = {
  onPress: () => void;
  children: string;
};

export const PrimaryButton: FC<ButtonProps> = ({ children, onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <Text className="rounded-lg bg-green-400 color-white px-10 py-4 text-center font-bold">
        {children}
      </Text>
    </Pressable>
  );
};
