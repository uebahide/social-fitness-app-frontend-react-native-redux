import { useLocalSearchParams, useNavigation } from "expo-router";
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import Echo from "laravel-echo";
import { API_URL, Host } from "@/constants";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { MessageInput } from "@/components/atoms/inputs/messageInput";
import { Message } from "@/components/organisms/message";
import Pusher from "pusher-js/react-native";

import type { message } from "@/types/message";

const ChatBox = () => {
  const navigation = useNavigation();
  const [messages, setMessages] = useState<message[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const token = useSelector((state: RootState) => state.token.value);
  const user = useSelector((state: RootState) => state.user.value);
  const [rendered, setRendered] = useState(false);
  const { friend_id } = useLocalSearchParams();
  const user_id = user.id;
  const webSocketChannel =
    parseInt(user_id) < parseInt(friend_id.toString())
      ? `chat.${user_id}_${friend_id}`
      : `chat.${friend_id}_${user_id}`;

  const echoRef = useRef<Echo<"reverb"> | null>(null);

  const getMessages = async () => {
    try {
      const m = await axios.get(`${API_URL}/messages/${friend_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessages(m.data);
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

  const keyboardDidShowListener = Keyboard.addListener(
    "keyboardDidShow",
    () => {
      setKeyboardVisible(true);
    },
  );

  const keyboardDidHideListener = Keyboard.addListener(
    "keyboardDidHide",
    () => {
      setKeyboardVisible(false);
    },
  );

  useEffect(() => {
    const parentNav = navigation.getParent(); // 親のTabNavigatorを取得
    if (parentNav) {
      parentNav.setOptions({ tabBarStyle: { display: "none" } });
    }

    const createChannel = async () => {
      try {
        const res = await axios.get(`${API_URL}/create_channel/${friend_id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(res.data);

        if (!echoRef.current) {
          const PusherClient = new Pusher("sahi8pur39cwfjorwtxq", {
            wsHost: "http://192.168.1.6",
            wsPort: 8080,
            wssPort: 8080,
            forceTLS: false,
            enabledTransports: ["ws", "wss"],
            disableStats: true,
            cluster: "",
          });

          // Create Echo instance
          echoRef.current = new Echo({
            broadcaster: "reverb",
            client: PusherClient,
            auth: {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          });
          console.log(echoRef.current.connector.pusher.connection.state);
          echoRef.current
            .private("chat.1_2")
            .subscribed(() => {
              console.log("Subscribed to chat.1_2");
            })
            .error((error) => {
              console.error("❌ 接続エラー:", error);
            })
            .listen(".MessageSent", (e) => {
              console.log("New message:", e);
            });
          echoRef.current
            .private(webSocketChannel)
            .listen("GotMessage", (e: any) => {
              console.log("Received message:", e);
              getMessages();
            });
        }
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

    createChannel();

    return () => {
      echoRef.current?.disconnect();
      if (parentNav) {
        parentNav.setOptions({ tabBarStyle: {} }); // 戻ったら表示を復活
      }
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, [messages, rendered]);

  if (Platform.OS === "android") {
    return (
      <SafeAreaView className="flex-1">
        <View className="flex-1 bg-blue-100">
          <FlatList
            data={messages}
            renderItem={({ item }) => (
              <Message message={item} user_id={user_id} />
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
        <View>
          <MessageInput
            friend_id={friend_id.toString()}
            setRendered={setRendered}
          />
        </View>
      </SafeAreaView>
    );
  } else if (Platform.OS === "ios") {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <View className="flex-1 bg-blue-100">
          <FlatList
            data={messages}
            renderItem={({ item }) => (
              <Message message={item} user_id={user_id} />
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        </View>
        <View className={isKeyboardVisible ? "h-[120px] bg-white" : ""}>
          <MessageInput
            friend_id={friend_id.toString()}
            setRendered={setRendered}
          />
        </View>
      </KeyboardAvoidingView>
    );
  }
};

export default ChatBox;
