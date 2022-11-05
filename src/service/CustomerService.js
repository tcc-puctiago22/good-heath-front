import Axios from 'axios';

const base_url_customer = process.env.VUE_APP_BASE_CUSTOMER;// | 'http://localhost:8080/customers/v1';

export async function createAssocieate(data) {
    
    const response = await Axios.post(`${base_url_customer}/associetes`, data);
    return response.data;
}

export async function getAssocieateByAccountUuid(accountUuid) {

    console.log(base_url_customer)
    
    const response = await Axios.get(`${base_url_customer}/associetes?accountUuid=${accountUuid}`);
    return response.data;
}

export async function getOccupationalList(type) {
    
    const response = await Axios.get(`${base_url_customer}/providers/occupational?type=${type}`,);
    return response.data;
}