
import Axios from 'axios';

export async function getVIACEP(cep) {
    const response = await Axios.get(`https://brasilapi.com.br/api/cep/v1/${cep}`);

    return response.data;
}
