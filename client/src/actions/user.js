import { config } from "./config";

export const getAllUser = async () => {
    const axios = config()
    try {
        const res = await axios.get('/user')
        console.log(res);
        return res
    } catch (error) {
        console.log(error);
        return null
    }
}


export const searchUsers = async (query) => {
    const axios = config()
    try {
        const res = await axios.get(`/user/search?search=${query}`)
        console.log(res);
        return res
    } catch (error) {
        console.log(error);
        return null
    }
}


export const signUp = async (data) => {
    const axios = config()

    try {
        const resp = await axios.post('user/signup', data)
        return resp.data
    } catch (error) {
        console.log('signup api error', error)
        return error
    }
}

export const signIn = async (data) => {
    const axios = config()

    try {
        const resp = await axios.post('user/signin', data)
        if (resp.data) {
            localStorage.setItem('user', JSON.stringify(resp.data.data))
            sessionStorage.setItem('user', JSON.stringify(resp.data.data))
        }
        return resp.data
    } catch (error) {
        console.log('signin api error', error)
        return error
    }
}


