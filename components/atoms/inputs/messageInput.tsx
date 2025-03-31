import axios from "axios";
import { FC, useState } from "react";
import { API_URL } from "@/constants";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { Platform, Pressable, Text, TextInput, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";

type propsType = {
  friend_id: string;
  setRendered: Function;
};

export const MessageInput: FC<propsType> = (props) => {
  const { friend_id, setRendered } = props;
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [inputHeight, setInputHeight] = useState(42);
  const token = useSelector((state: RootState) => state.token.value);

  const messageRequest = async (text: string) => {
    try {
      await axios.post(
        `${API_URL}/message/${friend_id}`,
        {
          text,
        },
        { headers: { Authorization: `Bearer ${token}` } },
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.log("Error response status:", error.response.status);
          console.log("Error response data:", error.response.data);
          console.log("Error response headers:", error.response.headers);
          setErrorMessage(error.response.data.message);
        } else if (error.request) {
          console.log("Error request:", error.request);
          setErrorMessage("server error");
        } else {
          console.log("Error message:", error.message);
          setErrorMessage("");
        }
      } else if (error instanceof Error) {
        console.error("General error:", error.message);
        setErrorMessage(error.message);
      } else {
        console.error("Unknown error:", error);
        setErrorMessage("An unexpected error occurred.");
      }
    }
  };

  const sendMessage = () => {
    if (message.trim() === "") {
      alert("Please enter a message!");
      return;
    }

    messageRequest(message);
    setMessage("");
    setInputHeight(60);
    setRendered(false);
  };

  if (Platform.OS === "android") {
    return (
      <View
        className="flex flex-row w-full items-center　py-3 bg-white"
        style={{ height: inputHeight + 12 }}
      >
        <TextInput
          value={message}
          onChangeText={(s: string) => setMessage(s)}
          className="border border-gray-400 rounded-md flex-1 mx-4"
          style={{ height: inputHeight }}
          multiline={true}
          onContentSizeChange={(event) => {
            setInputHeight(event.nativeEvent.contentSize.height);
          }}
        />
        <Pressable onPress={sendMessage} className="mr-6">
          <MaterialIcons name="send" size={30} color="blue" />
        </Pressable>
      </View>
    );
  } else if (Platform.OS === "ios") {
    return (
      <View
        className="flex flex-row w-full items-center　py-3 bg-white"
        style={{ height: 50 }}
      >
        <TextInput
          value={message}
          onChangeText={(s: string) => setMessage(s)}
          className="border border-gray-400 rounded-md flex-1 mx-4"
          style={{ height: 40 }}
          multiline={true}
        />
        <Pressable onPress={sendMessage} className="mr-6">
          <MaterialIcons name="send" size={30} color="blue" />
        </Pressable>
      </View>
    );
  }
};
