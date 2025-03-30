import { useState } from "react";

import { FlatList, TextInput, View } from "react-native";
import { PrimaryButton } from "@/components/atoms/buttons/primaryButton";
import { UserCard } from "@/components/organisms/userCard";
import { useUser } from "@/hooks/useUser";

const IndexUser = () => {
  const { fetchUsersByName, users } = useUser();
  const [name, setName] = useState<string>("");

  const changeName = (s: string) => {
    setName(s);
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
        <PrimaryButton onPress={() => fetchUsersByName(name)}>
          Search
        </PrimaryButton>
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
