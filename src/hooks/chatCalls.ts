import { useState } from "react";
import axios from "axios";
import { useChat } from "../context";

export type CreateChat = {
    groupName: string;
    admin: string;
    isGroup: boolean;
    users: string[];
}

export function useChatCalls(){
    const api = process.env.REACT_APP_API_URL;
    const { dispatchChat } = useChat();
    const [loader, setLoader] = useState(false);

    async function createChat(chat:CreateChat){
        setLoader(true)
        try{
            const response = await axios.post(api + "/chat", { chat })
            dispatchChat({type: "CREATE_CHAT", payload: response.data.chat})
            dispatchChat({ type: "ACTIVE_CHAT", payload: response.data.chat })
            setLoader(false);

        }catch(error){
            setLoader(false);
            console.log({error})
        }
    }

    async function deleteChat(chatId:string){
        setLoader(true)
        try{
            await axios.delete(`${api}/chat/${chatId}`)
            dispatchChat({ type: "DELETE_CHAT", payload: chatId });
            setLoader(false);
            dispatchChat({ type: "ACTIVE_CHAT", payload: null });
        }catch(error){
             setLoader(false)
            console.log({error})
        }
    }

    async function leaveGroup(groupId: string){
        setLoader(true);
        try{
            await axios.post(api + "/chat/leave-group", { groupId });
            dispatchChat({ type: "DELETE_CHAT", payload: groupId });
            setLoader(false);
            dispatchChat({ type: "ACTIVE_CHAT", payload: null })
        }catch(error){
            console.log({error})
            setLoader(false);
        }
    }

    async function changeGroupName( groupId: string, updateGroupName: string){
        dispatchChat({type: "CHANGE_GROUPNAME", payload: { groupId, updateGroupName}});
        dispatchChat({ type:"UPDATE_ACTIVECHAT", payload: { groupName: updateGroupName }})
        try{
            await axios.post(api + "/chat/changeGroupName", { groupId, updateGroupName });
        }catch(error){
            console.log(error)
        }
    }

    async function updateGroupPic( groupId: string, updateGroupPic: string){
        dispatchChat({type: "CHANGE_GROUPPIC", payload: { groupId, updateGroupPic }});
        dispatchChat({ type:"UPDATE_ACTIVECHAT", payload: { groupPic: updateGroupPic }})
        try{
            await axios.post(api + "/chat/changeGroupPic", { groupId, updateGroupPic });
        }catch(error){
            console.log(error)
        }
    }

    return { loader, createChat, deleteChat, leaveGroup, changeGroupName, updateGroupPic }
}