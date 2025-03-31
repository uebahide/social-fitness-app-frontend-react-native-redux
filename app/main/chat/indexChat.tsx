import { useCallback, useState } from "react";
import { useFriend } from "@/hooks/useFriend";
import { useFocusEffect } from "expo-router";
import { FlatList, SafeAreaView } from "react-native";
import { FriendItem } from "@/components/molecules/friendItem";

const IndexChat = () => {
  const { fetchFriends, friends } = useFriend();

  useFocusEffect(
    useCallback(() => {
      fetchFriends();
    }, []),
  );

  return (
    <SafeAreaView className="mx-5 mt-5">
      <FlatList
        data={friends}
        renderItem={({ item }) => <FriendItem user={item} />}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

export default IndexChat;
