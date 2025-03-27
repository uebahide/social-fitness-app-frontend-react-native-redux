import { AppDispatch, RootState } from "@/app/store";
import { API_URL } from "@/constants";
import { removeToken } from "@/slices/api/tokenSlice";
import { fetchUser } from "@/slices/api/userSlice";
import axios from "axios";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useLogout = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const token = useSelector((state: RootState) => state.token.value);

  useEffect(() => {
    if (token == "") {
      dispatch(fetchUser());
      console.log("back to index(logout)");
      router.navigate("/");
    }
  }, [token]);

  const logout = async () => {
    try {
      const res = await axios.post(
        `${API_URL}/logout`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      await dispatch(removeToken());
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
      return false;
    }
  };

  return { logout, errorMessage };
};
