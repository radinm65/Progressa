import api from './axiosInstance'

export async function getNutrients(userID) {

    try {

        const nutrients = await api.get(`/meals/${userID}/nutrients`)

        return nutrients.data

    } catch (e) {
        console.log(e);
    }

}

export async function getMeals(userID) {
    try {
        const meals = await api.get(`/meals/${userID}`)

        return meals.data
    } catch (e) {
        console.log(e);
    }
}

export async function deleteMeal(userID, mealsID) {
    try {
        const meals = await api.delete(`/meals/${userID}/${mealsID}`)
        return meals.data
    } catch (e) {
        console.log(e);
    }
}


export async function updateMeal(userID, mealID, amount) {
    try {
        const response = await api.put(
            `/meals/${userID}/${mealID}`,
            {
                amount
            }
        );

        return response.data;
    } catch (e) {
        console.log(e);
    }
}

export async function addMeal(userID, data) {
    try {
        const addedMeal = await api.post(`/meals/${userID}`, data)
        return addedMeal.data
    } catch (e) {
        console.log(e);
    }
}