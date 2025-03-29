import { AppDispatch, RootState } from "@/app/store";
import { API_URL } from "@/constants";
import { fetchToken, removeToken } from "@/slices/api/tokenSlice";
import { userData } from "@/types/userData";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

type modeType = "register" | "login" | "logout";

export const useAuth = () => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [password_confirmation, setPasswordConfirmation] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const dispatch = useDispatch<AppDispatch>();

  const authenticate = async (mode: modeType) => {
    const URL =
      mode === "register" ? `${API_URL}/register` : `${API_URL}/login`;
    const payload =
      mode === "register"
        ? { name, email, password, password_confirmation }
        : {
            email,
            password,
          };

    try {
      const res = await axios.post<userData>(URL, payload);
      await AsyncStorage.setItem("token", res.data.token);
      setErrorMessage("");
      dispatch(fetchToken()).then(() => {
        router.navigate("/main/home/indexPost");
      });
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
    }
  };

  return {
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
    setErrorMessage,
  };
};
