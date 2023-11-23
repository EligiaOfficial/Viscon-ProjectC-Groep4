import axios from 'axios';

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
    msg: string,
    img: any,
    tick_id: number,
    usr_id: number
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

export function FetchTicketAxios(data: FetchTicketDto) {
    return axios.post('api/Fetch/TicketData', data);
}

export function FetchUserCreationData() {
    return axios.get('api/Fetch/AccountData')
}