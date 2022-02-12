import axios, {AxiosError} from "axios";
import { ServerError, ChatType } from "../context/context.types";

export async function getChats():Promise<ChatType[] | ServerError>{
    try{
        const api = process.env.REACT_APP_API_URL + "/chat";
        const response = await axios.get<ChatType[]>(api);
        return response.data;
    }catch(error){
        if (axios.isAxiosError(error)) {
            const serverError = error as AxiosError<ServerError>;
            if (serverError && serverError.response) {
                return serverError.response.data;
            }
        }
        return { message: "something is wrong!" };
    }
}