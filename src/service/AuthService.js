import Axios from 'axios';

export async function authToken(data) {
    
    const response = await Axios.post(`auth/token`, data);
    return response.data;
}

export async function authSignup(data) {
    
    const response = await Axios.post(`auth/signup`, data);
    return response.data;
}
export async function authConfirmSignUp(data) {
    
    const response = await Axios.post(`auth/confirmsignup`, data);
    return response.data;
}
export async function authResendconfirmationcode(data) {
    
    const response = await Axios.put(`auth/resendconfirmationcode`, data);
    return response.data;
}