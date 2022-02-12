import React, {
  createContext,
  useState,
  useContext,
  useReducer,
  useEffect,
} from "react";
import { ProviderProps, ChatContextType, ChatType } from "./context.types";
import { chatReducer } from "../reducer/chatReducer";
import { getChats } from "../utils";
import { useAuth } from ".";

const ChatContext = createContext<ChatContextType>({} as ChatContextType);

export const chatInitialState = {
  chats: null as ChatType[] | null | undefined,
  activeChat: null as ChatType | null,
};

export function ChatProvider({ children }: ProviderProps) {
  const [chatState, dispatchChat] = useReducer(chatReducer, chatInitialState);
  const [loader, setLoader] = useState(false);
  const {
    authState: { token },
  } = useAuth();

  useEffect(() => {
    if (token) {
      (async () => {
        setLoader(true);
        try {
          const fetchChats = await getChats();
          if ("userChats" in fetchChats) {
            const { userChats } = fetchChats;
            setLoader(false);
            dispatchChat({ type: "CHATS_DATA", payload: userChats });
          }
        } catch (error) {
          setLoader(false);
          console.log({ error });
        }
      })();
    }
  }, [token]);

  return (
    <ChatContext.Provider value={{ loader, chatState, dispatchChat }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  return useContext(ChatContext);
}
