import { config } from "./config";

export const getAllUser = async () => {
    const axios = config()
    
    const res = await axios.get('/user')
    console.log(res);
    return res
}



