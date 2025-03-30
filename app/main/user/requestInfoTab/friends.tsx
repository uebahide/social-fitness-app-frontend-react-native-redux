import { RootState } from "@/app/store";
import { UserCard } from "@/components/organisms/userCard";
import { API_URL } from "@/constants";
import { user } from "@/types/user";
import axios from "axios";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { useSelector } from "react-redux";
import { useFriend } from "@/hooks/useFriend";

const Friends = () => {
  const { fetchFriends, friends, errorMessage, successMessage } = useFriend();
  useFocusEffect(
    useCallback(() => {
      fetchFriends();
      console.log("friends.tsx: ", friends);
    }, []),
  );

  if (friends.length == 0) {
    return <Text className="text-center mt-10">No friends yet</Text>;
  }

  return (
    <FlatList
      data={friends}
      renderItem={({ item }) => <UserCard user={item} />}
      keyExtractor={(item) => item.id}
    />
  );
};

export default Friends;
