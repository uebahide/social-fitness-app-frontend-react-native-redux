import { PrimaryButton } from "@/components/atoms/buttons/primaryButton";

import { useAuth } from "@/hooks/useAuth";
import { Text, View, TextInput } from "react-native";

const Signin = () => {
  const { email, password, setEmail, setPassword, errorMessage, authenticate } =
    useAuth();

  const onChangeEmail = (s: string) => {
    setEmail(s);
  };
  const onChangePassword = (s: string) => {
    setPassword(s);
  };

  return (
    <View>
      <View className="my-4">
        <Text>Enter your email and password!</Text>
      </View>

      {errorMessage ? (
        <Text className="color-red-600">{errorMessage}</Text>
      ) : null}

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={onChangeEmail}
        className="border border-gray-400"
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={onChangePassword}
        className="border border-gray-400"
      />

      <View className="mt-10 items-center">
        <View className="w-64">
          <PrimaryButton onPress={() => authenticate("login")}>
            Sign In
          </PrimaryButton>
        </View>
      </View>
    </View>
  );
};

export default Signin;
