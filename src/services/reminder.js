
import axios from "axios";

let baseURL = process.env.REACT_APP_API_URL;
let weatherBaseURL = process.env.REACT_APP_WEATHER_BASE;

const service = axios.create({ withCredentials: false, baseURL });
const weatherService = axios.create({ withCredentials: false, baseURL:weatherBaseURL });

const headers = { headers: {'Content-Type': 'application/json'}}
export const reminder = {
    getAll: async () => {
        let dataVal = await service.get("/reminder", headers);
        return dataVal;
    },
    getReminder: async (id) => {
        let dataVal = await service.get(`/reminder?id${id}`, headers);
        return dataVal;
    },
    post: async (data) => {
        let dataVal = await service.post("/reminder", data, headers);
        return dataVal;
    },
    patch: async (id) => {
        let dataVal = await service.patch(`/reminder/${id}`, headers);
        return dataVal;
    },
    delete: async (id) => {
        let dataVal = await service.delete(`/reminder/${id}`,   headers);
        return dataVal;
    },
    getWeatherRep: async (city,date) => {
        let newCity = city.trim()
        let dataVal = await weatherService.get(`${newCity}?key=${process.env.REACT_APP_WEATHER_API_KEY}&contentType=json`, headers);
        return dataVal
    }
}
