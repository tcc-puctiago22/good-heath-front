import Axios from 'axios';

export async function authToken(data) {
    
    const response = await Axios.post(`auth/token`, data);
    return response.data;
}
