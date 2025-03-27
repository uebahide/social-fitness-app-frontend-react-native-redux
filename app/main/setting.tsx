import { SecondaryButton } from "@/components/atoms/buttons/secondaryButton";
import { View, Text } from "react-native";
import { useAuth } from "@/hooks/useAuth";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const Setting = () => {
  const { logout, errorMessage } = useAuth();
  const user = useSelector((state: RootState) => state.user.value);
  return (
    <View>
      <Text>{user.name}</Text>
      <SecondaryButton onPress={logout}>Logout</SecondaryButton>
    </View>
  );
};

export default Setting;
