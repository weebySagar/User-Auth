import axios from "axios";

const BASEURL = !import.meta.env.PROD ? "http://localhost:3000/api/auth" : "/api/auth"


export const registerUser = async (userData) => {
    try {
        const { data } = await axios.post(BASEURL + "/register", userData)
    } catch (error) {
        throw error.response.data.msg
    }
}


export const loginUser = async (userData) => {
    try {
        const { data } = await axios.post(BASEURL + "/login", userData);
        return data;
    } catch (error) {
        throw error.response.data.msg
    }
}