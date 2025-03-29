import { API_URL } from "@/constants";
import axios from "axios";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";

import type { user } from "@/types/user";
import { FlatList, TextInput, View, Text } from "react-native";
import { PrimaryButton } from "@/components/atoms/buttons/primaryButton";
import { UserCard } from "@/components/organisms/userCard";

const IndexUser = () => {
  const [name, setName] = useState<string>("");
  const [users, setUsers] = useState<user[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const token = useSelector((state: RootState) => state.token.value);

  const changeName = (s: string) => {
    setName(s);
  };

  const fetchUsersByName = async () => {
    try {
      const res = await axios({
        method: "get",
        url: `${API_URL}/users/${name}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers([...res.data]);
      console.log(users);
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
      setUsers([]);
    }
  };

  return (
    <View>
      <View className="flex-row justify-center mt-4 ">
        <TextInput
          placeholder="search user name"
          className="border rounded-lg w-[240px]"
          onChangeText={changeName}
          value={name}
        />
        <PrimaryButton onPress={fetchUsersByName}>Search</PrimaryButton>
      </View>
      <FlatList
        data={users}
        renderItem={({ item }) => <UserCard user={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default IndexUser;
