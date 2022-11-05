
import Axios from 'axios';

export async function getVIACEP(cep) {
    
    const response = await Axios.get(`https://viacep.com.br/ws/${cep}/json/`);

    return response.data;
}
