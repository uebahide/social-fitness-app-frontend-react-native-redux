import { API_URL} from "@/constants";
import Echo from 'laravel-echo';
import Pusher from 'pusher-js/react-native';
import {useFocusEffect, useLocalSearchParams, useNavigation} from "expo-router";
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform, Pressable,
  SafeAreaView,
  View,
} from "react-native";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import axios from "axios";
import { useEffect, useState, useRef } from "react";
import { MessageInput } from "@/components/atoms/inputs/messageInput";
import { Message } from "@/components/organisms/message";
import type { message } from "@/types/message";
import AntDesign from '@expo/vector-icons/AntDesign';

const ChatBox = () => {
  const navigation = useNavigation();
  const [messages, setMessages] = useState<message[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  const token = useSelector((state: RootState) => state.token.value);
  const user = useSelector((state: RootState) => state.user.value);
  const { friend_id } = useLocalSearchParams();
  const user_id = user.id;
  const chat_id =
    parseInt(user_id) < parseInt(friend_id.toString())
      ? `chat.${user_id}_${friend_id}`
      : `chat.${friend_id}_${user_id}`;

  const echoRef = useRef<Echo<"pusher"> | null>(null);
  const flatListRef = useRef<FlatList>(null); // FlatList の ref を作成

  const connectWebsocket = () => {
      echoRef.current?.channel(chat_id).listen("GotMessage", async () => {
        await getMessages()
        scrollToBottom()
      })
  }

  const getMessages = async () => {
    try {
      const m = await axios.get(`${API_URL}/messages/${chat_id}`, {
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

  const scrollToBottom = () => {
    flatListRef.current?.scrollToEnd({ animated: true });
  };

  useEffect(() => {
    const parentNav = navigation.getParent(); // 親のTabNavigatorを取得
    if (parentNav) {
      parentNav.setOptions({ tabBarStyle: { display: "none" } });
    }
    console.log(process.env.EXPO_PUBLIC_PUSHER_APP_KEY)
    echoRef.current = new Echo({
      broadcaster: 'pusher',
      Pusher,
      key: process.env.EXPO_PUBLIC_PUSHER_APP_KEY,
      cluster: process.env.EXPO_PUBLIC_PUSHER_APP_CLUSTER,
      forceTLS: true
    });
    getMessages();
    connectWebsocket()

    setTimeout(scrollToBottom, 1000)

    return () => {
      echoRef.current?.disconnect();
      if (parentNav) {
        parentNav.setOptions({ tabBarStyle: {} }); // 戻ったら表示を復活
      }
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  useEffect(() => {
    scrollToBottom()
  }, [messages]);


  if (Platform.OS === "android") {
    return (
      <SafeAreaView className="flex-1">
        <View className="flex-1 bg-blue-100">
          <FlatList
            ref={flatListRef}
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
            messages={messages}
            setMessages={setMessages}
          />
        </View>
        <Pressable className="mr-6 absolute left-[50%]" onPress={scrollToBottom}>
          <AntDesign name="caretdown" size={24} color="gray"/>
        </Pressable>
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
            ref={flatListRef}
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
            messages={messages}
            setMessages={setMessages}
          />
        </View>
      </KeyboardAvoidingView>

    );
  }
};

export default ChatBox;
