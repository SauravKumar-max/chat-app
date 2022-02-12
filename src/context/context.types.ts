import { ReactNode} from "react";
import { CHAT_ACTIONTYPE, AUTH_ACTIONTYPE } from "../reducer/reducer.types";
import { chatInitialState } from "./ChatProvider";

export type ProviderProps = {
    children: ReactNode
}

export type AuthContextType = {
    authState: AuthInitialState;
    dispatchAuth: (action: AUTH_ACTIONTYPE) => void;
    loginUserWithCredentials: (email: string, password: string) => void;
    spinner: boolean;
    errorMessage: string | null;
    allUsers: User[] | null
}

export type AuthInitialState = {
    token: string | null;
    login: boolean;
    userDetails: User | null

}

export type UserToken = {
    token: string
}

export type ServerError = {
    message: string;
};

export type User = {
    _id: string;
    name: string;
    pic: string;
    about: string
}

export type ChatContextType = {
    loader: boolean;
    chatState: typeof chatInitialState;
    dispatchChat: (action: CHAT_ACTIONTYPE) => void;
}

export type ChatType = {
    _id: string;
    groupName: string;
    users: User[];
    isGroup: boolean;
    admin: string;
    groupPic: string;
    latestMessage: LatestMessage | null
}

export type LatestMessage = {
        _id: string;
        text: string;
        sender: string
}