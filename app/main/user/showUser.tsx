import { PrimaryButton } from "@/components/atoms/buttons/primaryButton";
import { SecondaryButton } from "@/components/atoms/buttons/secondaryButton";
import { PostCard } from "@/components/organisms/postCard";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useState } from "react";
import { View, Text, SafeAreaView, FlatList } from "react-native";
import { usePost } from "@/hooks/usePost";
import { useFriend } from "@/hooks/useFriend";

const ShowUser = () => {
  const { user_id, user_name, user_email } = useLocalSearchParams();
  const [clicked, setClicked] = useState<boolean>(false);

  const { fetchFriendPosts, friendPosts } = usePost();
  const {
    SendFriendRequest,
    fetchRequestStatus,
    unfriend,
    acceptFriendRequest,
    rejectFriendRequest,
    requestStatus,
  } = useFriend();

  useFocusEffect(
    useCallback(() => {
      fetchRequestStatus(user_id);
      fetchFriendPosts(user_id);
    }, [clicked]),
  );

  return (
    <>
      <View className="rounded-lg items-center mb-2 py-10 bg-red-100">
        <Text>Name: {user_name}</Text>
        <Text>email: {user_email}</Text>
      </View>
      {requestStatus === "" || requestStatus === "rejected" ? (
        <PrimaryButton
          onPress={() => {
            SendFriendRequest(user_id);
            setClicked(!clicked);
          }}
        >
          Send Friend Request
        </PrimaryButton>
      ) : requestStatus === "pending" ? (
        <PrimaryButton onPress={() => {}}>Waiting response</PrimaryButton>
      ) : requestStatus === "accepted" ? (
        <SecondaryButton
          onPress={() => {
            unfriend(user_id);
            setClicked(!clicked);
          }}
        >
          Unfriend
        </SecondaryButton>
      ) : requestStatus === "accept?" ? (
        <>
          <PrimaryButton
            onPress={() => {
              acceptFriendRequest(user_id);
              setClicked(!clicked);
            }}
          >
            Accept request
          </PrimaryButton>
          <SecondaryButton
            onPress={() => {
              rejectFriendRequest(user_id);
              setClicked(!clicked);
            }}
          >
            Reject request
          </SecondaryButton>
        </>
      ) : null}
      {requestStatus === "accepted" && (
        <>
          <SafeAreaView className="p-2 flex-1 bg-blue-100">
            <Text className="text-center mb-4 font-bold">
              Now you can check friend's post below!
            </Text>
            <FlatList
              data={friendPosts}
              renderItem={({ item }) => (
                <PostCard post={item} permission="uneditable" />
              )}
              keyExtractor={(item) => item.id}
            />
          </SafeAreaView>
        </>
      )}
    </>
  );
};

export default ShowUser;
