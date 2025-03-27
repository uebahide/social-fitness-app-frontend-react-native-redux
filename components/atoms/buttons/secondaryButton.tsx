import { Children, FC } from "react";
import { Pressable, Text } from "react-native";

type ButtonProps = {
  onPress: () => void;
  children: string;
};

export const SecondaryButton: FC<ButtonProps> = ({ children, onPress }) => {
  return (
    <Pressable onPress={onPress}>
      <Text className="rounded-lg bg-red-400 color-white px-10 py-4 text-center font-bold">
        {children}
      </Text>
    </Pressable>
  );
};
