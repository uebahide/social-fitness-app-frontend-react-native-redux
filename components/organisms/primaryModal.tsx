import { Alert, Modal, View, Text, StyleSheet } from "react-native";
import { SecondaryButton } from "../atoms/buttons/secondaryButton";
import { PrimaryButton } from "../atoms/buttons/primaryButton";
import { FC } from "react";

type PrimaryModalProps = {
  onPress: () => void;
  children: string;
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
};

export const PrimaryModal: FC<PrimaryModalProps> = (props) => {
  const { onPress, children, modalVisible, setModalVisible } = props;

  return (
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
                onPress();
              }}
            >
              {children}
            </PrimaryButton>
            <SecondaryButton onPress={() => setModalVisible(!modalVisible)}>
              Cancel
            </SecondaryButton>
          </View>
        </View>
      </View>
    </Modal>
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
