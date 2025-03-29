import { RootState } from "@/app/store";
import { PrimaryButton } from "@/components/atoms/buttons/primaryButton";
import { SecondaryButton } from "@/components/atoms/buttons/secondaryButton";
import { PostCard } from "@/components/organisms/postCard";
import { API_URL } from "@/constants";
import { post } from "@/types/post";
import axios from "axios";
import { useFocusEffect, useLocalSearchParams } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import { View, Text, SafeAreaView, FlatList } from "react-native";
import { useSelector } from "react-redux";

const ShowUser = () => {
  const { user_id, user_name, user_email } = useLocalSearchParams();
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [successMessage, setSuccessMessage] = useState<string>("");
  const token = useSelector((state: RootState) => state.token.value);
  const [requestStatus, setRequestStatus] = useState<string>("");
  const [friendPosts, setFriendPost] = useState<post[]>([]);
  const [clicked, setClicked] = useState<boolean>(false);

  const fetchFriendPosts = async () => {
    try {
      const res = await axios({
        method: "get",
        url: `${API_URL}/posts/friend/${user_id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSuccessMessage(res.data.message);
      console.log("frined post: ", res.data);
      setFriendPost(res.data);
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

  const SendFriendRequest = async () => {
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

  const acceptFriendRequest = async () => {
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

  const rejectFriendRequest = async () => {
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

  const unfriend = async () => {
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

  const fetchRequestStatus = async () => {
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

  useFocusEffect(
    useCallback(() => {
      fetchRequestStatus();
      fetchFriendPosts();
    }, [clicked])
  );

  // useEffect(() => {
  //   fetchRequestStatus();
  //   fetchFriendPosts();
  // }, [clicked]);

  return (
    <>
      {/* {errorMessage ? (
        <Text className="color-red-600">{errorMessage}</Text>
      ) : (
        <></>
      )}
      {successMessage ? (
        <Text className="color-green-600">{successMessage}</Text>
      ) : (
        <></>
      )} */}
      <View className="rounded-lg items-center mb-2 py-10 bg-red-100">
        <Text>Name: {user_name}</Text>
        <Text>email: {user_email}</Text>
      </View>
      {requestStatus === "" || requestStatus === "rejected" ? (
        <PrimaryButton
          onPress={() => {
            SendFriendRequest();
            setClicked(!clicked);
          }}
        >
          Send Friend Request
        </PrimaryButton>
      ) : requestStatus === "pending" ? (
        <PrimaryButton onPress={() => {}}>Waiting response</PrimaryButton>
      ) : requestStatus === "accepted" ? (
        <SecondaryButton
          onPress={() => {
            unfriend();
            setClicked(!clicked);
          }}
        >
          Unfriend
        </SecondaryButton>
      ) : requestStatus === "accept?" ? (
        <>
          <PrimaryButton
            onPress={() => {
              acceptFriendRequest();
              setClicked(!clicked);
            }}
          >
            Accept request
          </PrimaryButton>
          <SecondaryButton
            onPress={() => {
              rejectFriendRequest();
              setClicked(!clicked);
            }}
          >
            Reject request
          </SecondaryButton>
        </>
      ) : null}
      {requestStatus === "accepted" && (
        <>
          <SafeAreaView className="p-2 flex-1 bg-blue-100">
            <Text className="text-center mb-4 font-bold">
              Now you can check friend's post below!
            </Text>
            <FlatList
              data={friendPosts}
              renderItem={({ item }) => (
                <PostCard post={item} permission="uneditable" />
              )}
              keyExtractor={(item) => item.id}
            />
          </SafeAreaView>
        </>
      )}
    </>
  );
};

export default ShowUser;
