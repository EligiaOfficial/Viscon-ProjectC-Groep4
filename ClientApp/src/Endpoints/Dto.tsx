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

type FetchTicketDto = {
    Id : number
}

export function LoginAxios(data: LoginDto) {
    console.log('Before Axios request');
    return axiosInstance.post('api/Auth/Login', data)
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
    return axiosInstance.post('/api/Auth/Add', data)
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

export function createMessageAxios(data: MessageDto) {
    console.log('Before Axios request', data);
    return axiosInstance.post('/api/Ticket/AddMessage', data)
        .then(response => {
            console.log('Axios request succeeded:', response);
        })
        .catch(error => {
            console.error('Axios request failed:', error);
        });
}

export function FetchTicketAxios(data: FetchTicketDto) {
    return axiosInstance.post('/api/Ticket/TicketData', data);
}

export function FetchUserCreationData() {
    return axiosInstance.get('api/Fetch/AccountData')
}