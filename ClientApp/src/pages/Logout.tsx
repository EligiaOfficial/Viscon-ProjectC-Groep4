import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
    const navigateTo = useNavigate();
    useEffect(() => {
        localStorage.removeItem('token');
        navigateTo('/login');
    }, [navigateTo]);
};

export default Logout;
