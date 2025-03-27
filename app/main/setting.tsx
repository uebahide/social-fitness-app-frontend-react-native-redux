import { SecondaryButton } from "@/components/atoms/buttons/secondaryButton";
import { View, Text } from "react-native";
import { useAuth } from "@/hooks/useAuth";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useLogout } from "@/hooks/useLogout";

const Setting = () => {
  const { logout, errorMessage } = useLogout();
  const user = useSelector((state: RootState) => state.user.value);
  return (
    <View>
      <Text>{user.name}</Text>
      {errorMessage ? (
        <Text className="color-red-600">{errorMessage}</Text>
      ) : null}

      <SecondaryButton onPress={logout}>Logout</SecondaryButton>
    </View>
  );
};

export default Setting;
