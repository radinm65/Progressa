import api from './axiosInstance'

export async function getNutrients(userID) {

    try {

        const nutrients = await api.get(`/foods/${userID}/nutrients`)

        return nutrients.data

    } catch (e) {
        console.log(e);
    }

}

export async function getMeals(userID) {
    try {
        const meals = await api.get(`/foods/${userID}/meals`)

        return meals.data
    } catch (e) {
        console.log(e);
    }
}