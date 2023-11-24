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
    return axiosInstance.post('/api/Auth/Login', data)
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
            if (error.response) {
                console.error('Axios request failed with response data:', error.response.data);
                console.error('Status code:', error.response.status);
            } else if (error.request) {
                console.error('Axios request made but no response received. Check network connection.');
            } else {
                console.error('Error setting up Axios request:', error.message);
            }
        });
}

export function FetchTicketAxios(id: number) {
    console.log('Before Axios request', id);
    return axiosInstance.get(`/api/ticket/ticketdata?id=${id}`)
        .then(response => {
            console.log('Axios request succeeded:', response);
        })
        .catch(error => {
            if (error.response) {
                console.error('Axios request failed with response data:', error.response.data);
                console.error('Status code:', error.response.status);
            } else if (error.request) {
                console.error('Axios request made but no response received. Check network connection.');
            } else {
                console.error('Error setting up Axios request:', error.message);
            }
        });
}

export function FetchUserCreationData() {
    return axiosInstance.get('api/Fetch/AccountData')
}
