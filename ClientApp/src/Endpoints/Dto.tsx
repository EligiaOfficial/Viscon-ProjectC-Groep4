import axios from 'axios';

type LoginDto = {
    email: string,
    password: string
}

type SignUpDto = {
    jtw: string,
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

type EditUserDto = {
    jtw: string,
    email: string,
    password: string,
    phone: number,
    language: string
}

export function EditUserAxios(data: EditUserDto) {
    return axios.post('api/Auth/Edit', data)
        .then(res => {
            return res;
    })
        .catch(err => {
            throw err;
        })
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

export function FetchUserCreationData() {
    return axios.get('api/Fetch/AccountData')
}