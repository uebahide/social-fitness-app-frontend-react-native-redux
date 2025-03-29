import { PrimaryButton } from "@/components/atoms/buttons/primaryButton";
import { View, Text, TextInput, Keyboard } from "react-native";
import { usePost } from "@/hooks/usePost";

const CreatePost = () => {
  const {
    createPost,
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
          createPost();
        }}
      >
        Create
      </PrimaryButton>
    </View>
  );
};

export default CreatePost;
