import Axios from 'axios';

var base_url = 'https://brasilapi.com.br';


export async function getlistMunicipios(uf) {
    
    const response = await Axios.get(`${base_url}/api/ibge/municipios/v1/${uf}`);

    return response.data;
}
