import axios from "axios";
import { useAuth, useChat } from "../context";
import { removeTokenFromLocalStorage } from "../utils/authUtils"
import { UpdatedName,UpdatedAbout, UpdatedPic } from "../reducer/reducer.types";

export function useUserCalls(){
    const { dispatchAuth } = useAuth();
    const { dispatchChat } = useChat();
    const api = process.env.REACT_APP_API_URL;

    async function updateProfileCall (updatedData: UpdatedName | UpdatedAbout | UpdatedPic) {
        dispatchAuth( {type: "UPDATE_PROFILE", payload: updatedData });
        try{
            await axios.post(api + "/user/updateProfile", { updatedData })
        }catch(error){
            console.log(error)
        }
    }

    function logout() {
        dispatchAuth({ type: "SET_TOKEN", payload: null });
        dispatchAuth({ type: "SET_LOGIN", payload: false });
        dispatchAuth({ type: "ADD_USER_DETAILS", payload: null });
        dispatchChat({ type: "ACTIVE_CHAT", payload: null });
        removeTokenFromLocalStorage();
    }

    return {updateProfileCall, logout, }
}