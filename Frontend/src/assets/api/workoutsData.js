import api from './axiosInstance'

export async function getWorkouts(userID) {
    try {
        const getWorkouts = await api.get(`/workouts/${userID}`)

        return getWorkouts.data
    } catch (e) {
        console.log(e);
    }
}

export async function addWorkout(userID, data) {
    try {
        const getWorkouts = await api.post(`/workouts/${userID}`, data)

        return getWorkouts.data
    } catch (e) {
        console.log(e);
    }
}