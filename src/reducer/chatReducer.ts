import { CHAT_ACTIONTYPE } from "./reducer.types";
import { chatInitialState } from "../context/ChatProvider";

export const chatReducer = (state: typeof chatInitialState, action: CHAT_ACTIONTYPE) => {
    switch (action.type) {
        case "CHATS_DATA":
            return { ...state, chats: action.payload }
        
        case "ACTIVE_CHAT": 
            return { ...state, activeChat: action.payload }

        case "CREATE_CHAT":
            return { ...state, chats: state.chats && [...state.chats, action.payload] }

        case "DELETE_CHAT":
            return { ...state, chats: state.chats?.filter(chat => chat._id !== action.payload) }
        
        case "CHANGE_GROUPNAME":
            return { ...state, chats: state.chats?.map(chat => chat._id === action.payload.groupId ? { ...chat, groupName: action.payload.updateGroupName } : chat) }
            
        case "CHANGE_GROUPPIC":
            return { ...state, chats: state.chats?.map(chat => chat._id === action.payload.groupId ? { ...chat, groupPic: action.payload.updateGroupPic } : chat) }

        case "UPDATE_LATEST_MESSAGE":
            return { ...state, chats: state.chats?.map(chat => chat._id === action.payload.chatId ? { ...chat, latestMessage: action.payload.message } : chat)}
        default:
            return state;
    }
}