import api from './axiosInstance'

export async function getFoods() {

    try {
        const nutrients = await api.get(`/foods`)

        return nutrients.data

    } catch (e) {
        console.log(e);
    }

}


export async function addFood(data) {
    try {
        const response = await api.post(
            `/foods/addFood`,
            data
        );
        console.log(response);
        return response.data;

    } catch (e) {
        console.log(e);
    }

}

export async function updateFood(foodID, data) {
    try {
        const response = await api.put(
            `/foods/${foodID}`,
            data
        );

        return response.data;

    } catch (e) {
        console.log(e);
    }
}
export async function deleteFood(foodID) {
    try {
        const response = await api.delete(
            `/foods/${foodID}`
        );

        return response.data;

    } catch (e) {
        console.log(e);
    }
}