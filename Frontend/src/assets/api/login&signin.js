import api from './axiosInstance'

export async function validateLogin(username, password) {

    try {
        const response = await api.post("auth/login", {
            username,
            password
        });
        return response.data;

    } catch (error) {
        return {
            error: true,
            status: error.response?.status,
            message: "axios: " + error.response?.data?.message
        };
    }
}

export async function signup(name, username, email, password, height, weight, age, goal) {

    try {
        const response = await api.post("auth/signup", {
            name, username, email, password, height, weight, age, goal
        });
        return response.data;

    } catch (error) {
        console.log(error);
        return {
            error: true,
            status: error.response?.status,
            message: "axios: " + error.response?.data?.message
        };
    }
}