import axios from 'axios'

export const config = () => {
    axios.defaults.baseURL = 'http://localhost:8000';
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

    const user = JSON.parse(sessionStorage.getItem("user"))
    if (user)
        axios.defaults.headers.common['Authorization'] = user.access_token

    return axios
}
