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
