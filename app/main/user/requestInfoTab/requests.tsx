import { UserCard } from "@/components/organisms/userCard";

import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { FlatList, Text } from "react-native";
import { useFriend } from "@/hooks/useFriend";

const Requests = () => {
  const { fetchRequestSenders, requestSenders, errorMessage } = useFriend();

  useFocusEffect(
    useCallback(() => {
      fetchRequestSenders();
      console.log("requests.tsx:", requestSenders);
      return () => {};
    }, []),
  );

  if (requestSenders.length == 0) {
    return <Text className="text-center mt-10">No requests</Text>;
  }

  return (
    <FlatList
      data={requestSenders}
      renderItem={({ item }) => <UserCard user={item} />}
      keyExtractor={(item) => item.id}
    />
  );
};

export default Requests;
