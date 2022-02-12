import { ChatType, User } from "../context/context.types"

export type UpdatedName = {
    name: string;
}

export type UpdatedAbout = {
    about: string;
}

export type UpdatedPic = {
    pic: string
}

export type UpdateGroupName = {
    groupId: string;
    updateGroupName: string
}

export type UpdateGroupPic = {
    groupId: string;
    updateGroupPic: string
}

export type UpdatedUsers = {
    groupId: string;
    users: User[]
}

export type UpdateLatestMessage = {
    chatId: string;
    message: {
        _id: string;
        text: string;
        sender: string;
    }
}

export type CHAT_ACTIONTYPE = 
    | { type: "CHATS_DATA", payload: ChatType[] | null }
    | { type: "ACTIVE_CHAT", payload: ChatType | null }
    | { type: "CREATE_CHAT", payload: ChatType }
    | { type: "DELETE_CHAT", payload: string | undefined }
    | { type: "CHANGE_GROUPNAME", payload: UpdateGroupName }
    | { type: "CHANGE_GROUPPIC", payload: UpdateGroupPic }
    | { type: "UPDATE_LATEST_MESSAGE", payload: UpdateLatestMessage }

export type AUTH_ACTIONTYPE = 
    | { type: "SET_TOKEN", payload: string | null }
    | { type: "SET_LOGIN", payload: boolean }
    | { type: "ADD_USER_DETAILS", payload: User | null } 
    | { type: "UPDATE_PROFILE", payload: UpdatedName | UpdatedAbout | UpdatedPic }
