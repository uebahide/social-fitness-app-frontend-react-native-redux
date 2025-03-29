import { Text, View, TextInput, Keyboard } from "react-native";

import { PrimaryButton } from "@/components/atoms/buttons/primaryButton";
import { useAuth } from "@/hooks/useAuth";

const Signup = () => {
  const {
    authenticate,
    name,
    email,
    password,
    password_confirmation,
    errorMessage,
    setName,
    setEmail,
    setPassword,
    setPasswordConfirmation,
  } = useAuth();

  const onChangeName = (s: string) => {
    setName(s);
  };
  const onChangeEmail = (s: string) => {
    setEmail(s);
  };
  const onChangePassword = (s: string) => {
    setPassword(s);
  };
  const onChangePasswordConfirmation = (s: string) => {
    setPasswordConfirmation(s);
  };

  return (
    <View>
      <View className="my-4">
        <Text>Enter your information!</Text>
      </View>

      {errorMessage ? (
        <Text className="color-red-600">{errorMessage}</Text>
      ) : null}

      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={onChangeName}
        className="border border-gray-400"
      />
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
      <TextInput
        placeholder="Password Confirmation"
        value={password_confirmation}
        onChangeText={onChangePasswordConfirmation}
        className="border border-gray-400"
      />

      <View className="mt-10 items-center">
        <View className="w-64">
          <PrimaryButton
            onPress={() => {
              Keyboard.dismiss();
              authenticate("register");
            }}
          >
            Sign Up
          </PrimaryButton>
        </View>
      </View>
    </View>
  );
};

export default Signup;
