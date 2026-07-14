import api from './axiosInstance'

export async function getFoods(userID) {

    try {
        const nutrients = await api.get(`/foods/${userID}`)

        return nutrients.data

    } catch (e) {
        console.log(e);
    }

}