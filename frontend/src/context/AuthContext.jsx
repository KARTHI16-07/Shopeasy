import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../api/axios';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false);
    }, []);

    const login = async (email, password) => {
        const res = await api.post('/auth/login', { email, password });
        const { token, id, email: resEmail, role } = res.data;
        
        localStorage.setItem('token', token);
        const userData = { id, email: resEmail, role };
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        
        if (role === 'ROLE_ADMIN') {
            navigate('/admin');
        } else {
            navigate('/');
        }
    };

    const register = async (firstName, lastName, email, password) => {
        await api.post('/auth/register', { firstName, lastName, email, password });
        navigate('/login');
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
        navigate('/login');
    };

    return (
        <AuthContext.Provider value={{ user, login, register, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};
