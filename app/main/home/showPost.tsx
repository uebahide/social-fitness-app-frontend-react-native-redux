import { PrimaryButton } from "@/components/atoms/buttons/primaryButton";
import axios from "axios";
import { useEffect, useState } from "react";
import { View, Text, TextInput, Keyboard } from "react-native";
import { API_URL } from "@/constants";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { useLocalSearchParams, useRouter } from "expo-router";
import { post } from "@/types/post";
import { SecondaryButton } from "@/components/atoms/buttons/secondaryButton";
import { PrimaryModal } from "@/components/organisms/primaryModal";

const showPost = () => {
  const { post_id } = useLocalSearchParams();
  const [title, setTitle] = useState<string>("");
  const [count, setCount] = useState<string>("");
  const [timeHour, setTimeHour] = useState<string>("");
  const [timeMinute, setTimeMinute] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [modalVisible, setModalVisible] = useState(false);
  const token = useSelector((state: RootState) => state.token.value);
  const router = useRouter();

  const onChangeTitle = (s: string) => {
    setTitle(s);
  };
  const onChangecount = (s: string) => {
    setCount(s);
  };
  const onChangeTimeHour = (s: string) => {
    setTimeHour(s);
  };
  const onChangeTimeMin = (s: string) => {
    setTimeMinute(s);
  };

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get<post>(`${API_URL}/posts/${post_id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTitle(res.data.title);
        setCount(res.data.count);
        setTimeHour(res.data.time_hour);
        setTimeMinute(res.data.time_minute);
        setErrorMessage("");
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

    fetchPost();
  }, []);

  const updatePost = async () => {
    try {
      const res = await axios({
        method: "put",
        url: `${API_URL}/posts/${post_id}`,
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

  const deletePost = async () => {
    try {
      const res = await axios({
        method: "delete",
        url: `${API_URL}/posts/${post_id}`,
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
      <Text>Edit Post</Text>
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
        value={timeHour.toString()}
        onChangeText={onChangeTimeHour}
        className="border border-gray-400"
      />
      <TextInput
        placeholder="Time (Minute)"
        keyboardType="numeric"
        value={timeMinute.toString()}
        onChangeText={onChangeTimeMin}
        className="border border-gray-400"
      />
      <PrimaryButton
        onPress={() => {
          Keyboard.dismiss();
          updatePost();
        }}
      >
        Update
      </PrimaryButton>

      <PrimaryModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        onPress={deletePost}
      >
        Delete
      </PrimaryModal>
      <View className="absolute w-full bottom-0">
        <SecondaryButton onPress={() => setModalVisible(true)}>
          Delete this post
        </SecondaryButton>
      </View>
    </View>
  );
};

export default showPost;
