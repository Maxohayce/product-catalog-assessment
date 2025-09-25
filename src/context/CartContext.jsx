import React, { createContext, useContext, useReducer } from 'react';

const CartStateContext = createContext();
const CartDispatchContext = createContext();

function reducer(state, action) {
    switch (action.type) {
        case 'ADD': {
            const existing = state.items.find(i => i.id === action.product.id);
            if (existing) {
                return {
                    ...state,
                    items: state.items.map(i => i.id === action.product.id ? { ...i, qty: i.qty + 1 } : i)
                };
            }
            return { ...state, items: [...state.items, { ...action.product, qty: 1 }] };
        }
        case 'REMOVE':
            return { ...state, items: state.items.filter(i => i.id !== action.id) };
        case 'CLEAR':
            return { ...state, items: [] };
        default:
            throw new Error();
    }
}

export function CartProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, { items: [] });
    return (
        <CartStateContext.Provider value={state}>
            <CartDispatchContext.Provider value={dispatch}>
                {children}
            </CartDispatchContext.Provider>
        </CartStateContext.Provider>
    );
}

export const useCart = () => useContext(CartStateContext);
export const useCartDispatch = () => useContext(CartDispatchContext);
