import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../api/axios';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState({ items: [] });
    const { user } = useAuth();

    const fetchCart = async () => {
        if (user && user.role !== 'ROLE_ADMIN') {
            try {
                const res = await api.get('/cart');
                setCart(res.data);
            } catch (err) {
                console.error("Error fetching cart", err);
            }
        } else {
            setCart({ items: [] });
        }
    };

    useEffect(() => {
        fetchCart();
    }, [user]);

    const addToCart = async (productId, quantity) => {
        if (!user) {
            alert('Please login to add to cart');
            return;
        }
        await api.post(`/cart/items?productId=${productId}&quantity=${quantity}`);
        fetchCart();
    };

    const updateQuantity = async (productId, quantity) => {
        await api.put(`/cart/items/${productId}?quantity=${quantity}`);
        fetchCart();
    };

    const removeFromCart = async (productId) => {
        await api.delete(`/cart/items/${productId}`);
        fetchCart();
    };
    
    const clearCart = () => {
        setCart({ items: [] });
    }

    return (
        <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart, fetchCart }}>
            {children}
        </CartContext.Provider>
    );
};
