import Axios from 'axios';

const base_url_schedule = process.env.VUE_APP_BASE_SCHEDULE;

export async function createSchedule(data) {
    
    const response = await Axios.post(`${base_url_schedule}/`, data);
    return response.data;
}
