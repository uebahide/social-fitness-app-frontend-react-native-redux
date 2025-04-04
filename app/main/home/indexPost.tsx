import { Text, Pressable, SafeAreaView, FlatList } from "react-native";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { fetchPosts } from "@/slices/api/postSlice";
import { PostCard } from "@/components/organisms/postCard";

const indexPost = () => {
  const router = useRouter();
  const onPressCreate = () => {
    router.navigate("/main/home/createPost");
  };
  const dispatch = useDispatch<AppDispatch>();
  const posts = useSelector((state: RootState) => state.posts.value);

  useFocusEffect(
    useCallback(() => {
      dispatch(fetchPosts());
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );

  if (posts.length === 0) {
    return (
      <SafeAreaView className="p-2 flex-1 bg-blue-100 items-center justify-center">
        <Text className="color-gray-600">No posts yet</Text>
        <Pressable
          className="rounded-full h-[65px] w-[65px] bg-blue-200 absolute right-8 bottom-8 shadow-xl"
          onPress={onPressCreate}
        >
          <Text className="text-5xl text-center leading-[1.5em] text-gray-600 ">
            +
          </Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="p-2 flex-1 bg-blue-100">
      <FlatList
        data={posts}
        renderItem={({ item }) => (
          <PostCard post={item} permission="editable" />
        )}
        keyExtractor={(item) => item.id}
      />
      <Pressable
        className="rounded-full h-[65px] w-[65px] bg-blue-200 absolute right-8 bottom-8 shadow-xl"
        onPress={onPressCreate}
      >
        <Text className="text-5xl text-center leading-[1.5em] text-gray-600 ">
          +
        </Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default indexPost;
