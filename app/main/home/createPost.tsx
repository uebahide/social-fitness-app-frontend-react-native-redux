import { PrimaryButton } from "@/components/atoms/buttons/primaryButton";
import axios from "axios";
import { useState } from "react";
import { View, Text, TextInput, Keyboard } from "react-native";
import { API_URL } from "@/constants";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { useRouter } from "expo-router";

const createPost = () => {
  const [title, setTitle] = useState<string>("");
  const [count, setcount] = useState<string>("");
  const [timeHour, setTimeHour] = useState<string>("");
  const [timeMinute, setTimeMinute] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const token = useSelector((state: RootState) => state.token.value);
  const router = useRouter();

  const onChangeTitle = (s: string) => {
    setTitle(s);
  };
  const onChangecount = (s: string) => {
    setcount(s);
  };
  const onChangeTimeHour = (s: string) => {
    setTimeHour(s);
  };
  const onChangeTimeMin = (s: string) => {
    setTimeMinute(s);
  };

  const onPressCreate = async () => {
    try {
      const res = await axios({
        method: "post",
        url: `${API_URL}/posts`,
        data: {
          title: title,
          count: count,
          time_hour: timeHour,
          time_minute: timeMinute,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setErrorMessage("");
      router.back();
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
      return false;
    }
  };

  return (
    <View className="flex-1">
      <Text>Create Post</Text>
      {errorMessage ? (
        <Text className="color-red-600">{errorMessage}</Text>
      ) : null}
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={onChangeTitle}
        className="border border-gray-400"
      />
      <TextInput
        placeholder="Count"
        value={count}
        onChangeText={onChangecount}
        className="border border-gray-400"
      />
      <TextInput
        placeholder="Time (Hour)"
        keyboardType="numeric"
        value={timeHour}
        onChangeText={onChangeTimeHour}
        className="border border-gray-400"
      />
      <TextInput
        placeholder="Time (Minute)"
        keyboardType="numeric"
        value={timeMinute}
        onChangeText={onChangeTimeMin}
        className="border border-gray-400"
      />
      <PrimaryButton
        onPress={() => {
          Keyboard.dismiss();
          onPressCreate();
        }}
      >
        Create
      </PrimaryButton>
    </View>
  );
};

export default createPost;
