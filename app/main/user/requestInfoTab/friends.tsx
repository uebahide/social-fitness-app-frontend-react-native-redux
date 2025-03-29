import { RootState } from "@/app/store";
import { UserCard } from "@/components/organisms/userCard";
import { API_URL } from "@/constants";
import { user } from "@/types/user";
import axios from "axios";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { FlatList, Text, View } from "react-native";
import { useSelector } from "react-redux";

const Friends = () => {
  const token = useSelector((state: RootState) => state.token.value);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const [friends, setFriends] = useState<user[]>([]);

  const fetchFriends = async () => {
    try {
      const res = await axios({
        method: "get",
        url: `${API_URL}/friends`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSuccessMessage(res.data.message);
      setFriends(res.data);
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

  useFocusEffect(
    useCallback(() => {
      fetchFriends();
      console.log("friends.tsx: ", friends);
    }, [])
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
