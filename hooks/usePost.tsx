import { RootState } from "@/app/store";
import { API_URL } from "@/constants";
import { post } from "@/types/post";
import axios from "axios";
import { router } from "expo-router";
import { FC, useState } from "react";
import { useSelector } from "react-redux";

export const usePost = () => {
  const [title, setTitle] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [timeHour, setTimeHour] = useState<string>("");
  const [timeMinute, setTimeMinute] = useState<string>("");
  const token = useSelector((state: RootState) => state.token.value);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const fetchPost = async (post_id: string | string[]) => {
    try {
      const res = await axios.get<post>(`${API_URL}/posts/${post_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTitle(res.data.title);
      setAmount(res.data.amount);
      setTimeHour(res.data.time_hour);
      setTimeMinute(res.data.time_minute);
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
      return false;
    }
  };

  const createPost = async () => {
    try {
      const res = await axios({
        method: "post",
        url: `${API_URL}/posts`,
        data: {
          title: title,
          amount: amount,
          time_hour: timeHour,
          time_minute: timeMinute,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setErrorMessage("");
      router.back();
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

  const updatePost = async (post_id: string | string[]) => {
    try {
      const res = await axios({
        method: "put",
        url: `${API_URL}/posts/${post_id}`,
        data: {
          title: title,
          amount: amount,
          time_hour: timeHour,
          time_minute: timeMinute,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setErrorMessage("");
      router.back();
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

  const deletePost = async (post_id: string | string[]) => {
    try {
      const res = await axios({
        method: "delete",
        url: `${API_URL}/posts/${post_id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setErrorMessage("");
      router.back();
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

  return {
    createPost,
    updatePost,
    deletePost,
    fetchPost,
    title,
    setTitle,
    amount,
    setAmount,
    timeHour,
    setTimeHour,
    timeMinute,
    setTimeMinute,
    errorMessage,
    setErrorMessage,
  };
};
