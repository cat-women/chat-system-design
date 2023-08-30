import { config } from "./config";



export const getChats = async () => {
    const axios = config()
    try {
        const res = await axios.get('/chat')
        return res
    } catch (error) {
        console.log(error);
        return null
    }
}
export const createGroupChat = async (data) => {
    const axios = config()
    try {
        const res = await axios.post('/chat/group', data)
        return res
    } catch (error) {
        console.log(error);
        return null
    }
}


export const rename = async (data) => {
    const axios = config()
    try {
        const res = await axios.put('/chat/rename', data)
        console.log("rename group chat", res);
        return res
    } catch (error) {
        console.log(error);
        return null
    }
}


export const addUser = async (data) => {
    const axios = config()
    try {
        const res = await axios.put('/chat/addUser', data)
        console.log("add user group chat", res);
        return res
    } catch (error) {
        console.log(error);
        return null
    }
}

export const removeUser = async (data) => {
    const axios = config()
    try {
        const res = await axios.put('/chat/removeUser', data)
        console.log("remove group chat", res);
        return res
    } catch (error) {
        console.log(error);
        return null
    }
}