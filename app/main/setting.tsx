import { SecondaryButton } from "@/components/atoms/buttons/secondaryButton";
import { View, Text, Modal, Pressable, StyleSheet, Alert } from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useLogout } from "@/hooks/useLogout";
import { useState } from "react";
import { PrimaryButton } from "@/components/atoms/buttons/primaryButton";

const Setting = () => {
  const { logout, errorMessage } = useLogout();
  const user = useSelector((state: RootState) => state.user.value);
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View className="gap-y-5 flex-1 mt-3">
      <Text className="border-b text-xl">User Name &gt; {user.name}</Text>
      <Text className="border-b text-xl">Email &gt; {user.email}</Text>
      {errorMessage ? (
        <Text className="color-red-600">{errorMessage}</Text>
      ) : null}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              Are you sure you want to log out?
            </Text>
            <View className="flex-row gap-x-3">
              <PrimaryButton
                onPress={() => {
                  setModalVisible(!modalVisible);
                  logout();
                }}
              >
                Logout
              </PrimaryButton>
              <SecondaryButton onPress={() => setModalVisible(!modalVisible)}>
                Cancel
              </SecondaryButton>
            </View>
          </View>
        </View>
      </Modal>

      <View className="absolute w-full bottom-0">
        <SecondaryButton onPress={() => setModalVisible(true)}>
          Logout
        </SecondaryButton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default Setting;
