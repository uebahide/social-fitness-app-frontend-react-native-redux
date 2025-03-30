import axios from "axios";

import { API_URL } from "@/constants";
import { useState } from "react";
import { user } from "@/types/user";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";

export const useFriend = () => {
  const [requestSenders, setRequestSenders] = useState<user[]>([]);
  const [friends, setFriends] = useState<user[]>([]);
  const [requestStatus, setRequestStatus] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const token = useSelector((state: RootState) => state.token.value);

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

  const fetchRequestSenders = async () => {
    try {
      const res = await axios({
        method: "get",
        url: `${API_URL}/requesters`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRequestSenders(res.data);
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

  const SendFriendRequest = async (user_id: string | string[]) => {
    try {
      const res = await axios({
        method: "post",
        url: `${API_URL}/friend/request/${user_id}`,
        data: {},
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSuccessMessage(res.data.message);
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

  const acceptFriendRequest = async (user_id: string | string[]) => {
    try {
      const res = await axios({
        method: "post",
        url: `${API_URL}/friend/accept/${user_id}`,
        data: {},
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSuccessMessage(res.data.message);
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

  const rejectFriendRequest = async (user_id: string | string[]) => {
    try {
      const res = await axios({
        method: "post",
        url: `${API_URL}/friend/reject/${user_id}`,
        data: {},
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSuccessMessage(res.data.message);
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

  const unfriend = async (user_id: string | string[]) => {
    try {
      const res = await axios({
        method: "post",
        url: `${API_URL}/friend/unfriend/${user_id}`,
        data: {},
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSuccessMessage(res.data.message);
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

  const fetchRequestStatus = async (user_id: string | string[]) => {
    try {
      const res = await axios({
        method: "get",
        url: `${API_URL}/friend/status/${user_id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setRequestStatus(res.data.status);
      console.log(res.data);
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
    fetchRequestSenders,
    fetchFriends,
    SendFriendRequest,
    acceptFriendRequest,
    rejectFriendRequest,
    unfriend,
    fetchRequestStatus,
    requestSenders,
    friends,
    requestStatus,
    errorMessage,
    successMessage,
  };
};
