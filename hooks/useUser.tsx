import axios from "axios";
import { API_URL } from "@/constants";
import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { user } from "@/types/user";

export const useUser = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [users, setUsers] = useState<user[]>([]);
  const token = useSelector((state: RootState) => state.token.value);

  const fetchUsersByName = async (name: string) => {
    try {
      const res = await axios({
        method: "get",
        url: `${API_URL}/users/search/${name}`,
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

  return { fetchUsersByName, users, errorMessage };
};
