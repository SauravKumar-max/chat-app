import { ChatType, User } from "../context/context.types";

export const chatUserDetails = (users: User[], userId: string) => {
    return users.filter((user) => user._id !== userId)[0];
}

export const excludeExistedChatUsers = (allUsers: User[] | null, chats:ChatType[] | null | undefined, userId: string) => {
    let existedChatUserIds:string[] = [];
    chats?.forEach(chat => {
        if(!chat.isGroup){
            const existedChatUsers = chat.users.filter(user => user._id !== userId)
            existedChatUserIds = [...existedChatUserIds, existedChatUsers[0]._id]
        }
    });
    
    return allUsers?.filter(user => !existedChatUserIds.includes(user._id));
}


export function searchUser(allUsers: User[] | null, searchInput: string) {
    return allUsers?.filter((user) =>
      user.name.toLowerCase().includes(searchInput.toLowerCase())
    );
  }