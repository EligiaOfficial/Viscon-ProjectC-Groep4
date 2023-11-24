import axios from 'axios';
import {axiosInstance} from '../axiosInstance';

type LoginDto = {
    email: string,
    password: string
}

type SignUpDto = {
    email: string,
    firstName: string,
    lastName: string,
    password: string,
    phone: number,
    company: number,
    role: number,
    department: number,
    language: string
}

export function LoginAxios(data: LoginDto) {
    console.log('Before Axios request');
    return axios.post('api/Auth/Login', data)
        .then(response => {
            console.log('Axios request succeeded:', response);
            return response;
        })
        .catch(error => {
            console.error('Axios request failed:', error);
            throw error;
        });
}

export function SignupAxios(data: SignUpDto) {
    console.log('Before Axios request', data);
    return axios.post('/api/Auth/Add', data)
        .then(response => {
            console.log('Axios request succeeded:', response);
        })
        .catch(error => {
            console.error('Axios request failed:', error);
        });
}

type MessageDto = {
    content: string,
    ticketId: number,
    sender: number
}

type UserIdDto = {
    id: number
}

export function fetchUser(data: UserIdDto) {
    console.log("Fetching User")
    return axios.post('api/Fetch/UserName', data)
}

export function createMessageAxios(data: MessageDto) {
    console.log('Before Axios request', data);
    return axios.post('api/Ticket/AddMessage', data)
        .then(response => {
            console.log('Axios request succeeded:', response);
        })
        .catch(error => {
            console.error('Axios request failed:', error);
        });
}

export function FetchTicketAxios(id: number) {
    return axiosInstance.get(`api/ticket/ticketdata?id=${id}`);
}

export function FetchUserCreationData() {
    return axios.get('api/Fetch/AccountData')
}
