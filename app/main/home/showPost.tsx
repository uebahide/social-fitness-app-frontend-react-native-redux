import { PrimaryButton } from "@/components/atoms/buttons/primaryButton";
import { useEffect, useState } from "react";
import { View, Text, TextInput, Keyboard } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { SecondaryButton } from "@/components/atoms/buttons/secondaryButton";
import { PrimaryModal } from "@/components/organisms/primaryModal";
import { usePost } from "@/hooks/usePost";

const showPost = () => {
  const { post_id } = useLocalSearchParams();
  const [modalVisible, setModalVisible] = useState(false);
  const {
    updatePost,
    deletePost,
    fetchPost,
    title,
    count,
    timeHour,
    timeMinute,
    setTitle,
    setCount,
    setTimeHour,
    setTimeMinute,
    errorMessage,
  } = usePost();

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
    fetchPost(post_id);
  }, []);

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
          updatePost(post_id);
        }}
      >
        Update
      </PrimaryButton>

      <PrimaryModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        onPress={() => deletePost(post_id)}
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
