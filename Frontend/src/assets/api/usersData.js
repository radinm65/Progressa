import api from './axiosInstance'

export async function getUser(username) {

    try {

        const user = await api.get(`/users/${username}`)

        return user.data

    } catch (e) {
        console.log(e);
    }

}

export async function getUserWeights(userID) {
    try {
        const weights = await api.get(`/users/${userID}/weights`)
        return weights.data
    } catch (e) {
        console.log(e);
    }
}

export async function updatePassword(userID, data) {

    try {

        const response = await api.put(
            `/users/${userID}/password`,
            data
        );

        return response.data;

    } catch (e) {
        console.log(e);
    }

}



export async function updateUser(userID, data) {
    try {
        const response = await api.put(
            `/users/${userID}`,
            data
        );

        return response.data;

    } catch (e) {
        console.log(e.response?.data || e.message);
        throw e;
    }
}
