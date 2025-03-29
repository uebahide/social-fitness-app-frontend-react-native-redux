import { SecondaryButton } from "@/components/atoms/buttons/secondaryButton";
import { View, Text } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useLogout } from "@/hooks/useLogout";
import { useState } from "react";
import { PrimaryModal } from "@/components/organisms/primaryModal";

const Setting = () => {
  const { logout, errorMessage } = useLogout();
  const user = useSelector((state: RootState) => state.user.value);
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View className="gap-y-5 flex-1 pt-3  bg-blue-100">
      <Text className="border-b text-xl  color-gray-600">
        User Name &gt; {user.name}
      </Text>
      <Text className="border-b text-xl  color-gray-600">
        Email &gt; {user.email}
      </Text>
      {errorMessage ? (
        <Text className="color-red-600">{errorMessage}</Text>
      ) : null}

      <PrimaryModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        onPress={logout}
      >
        Logout
      </PrimaryModal>
      <View className="absolute w-full bottom-0">
        <SecondaryButton onPress={() => setModalVisible(true)}>
          Logout
        </SecondaryButton>
      </View>
    </View>
  );
};

export default Setting;
