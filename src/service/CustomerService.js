import Axios from 'axios';

export async function createAssocieate(data) {
    
    const response = await Axios.post(`/v1/associetes/`, data);
    return response.data;
}
