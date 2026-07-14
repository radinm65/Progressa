import api from './axiosInstance'

export async function addWeight(userID, data) {
    try {
        const result = await api.post(`/weights/${userID}`, data)
        return result.data
    } catch (e) {
        console.log(e);
    }
}