import React from 'react';
import { useCartDispatch } from '../context/CartContext';

export default function ProductCard({ product, onOpen }) {
    const dispatch = useCartDispatch();

    const addToCart = (e) => {
        e.stopPropagation();
        dispatch({ type: 'ADD', product });
    };

    return (
        <article
            role="button"
            onClick={onOpen}
            className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow hover:shadow-md transition cursor-pointer flex flex-col"
        >
            <div className="flex-1 flex items-center justify-center mb-4">
                <img src={product.image} alt={product.title} className="max-h-40 object-contain" />
            </div>
            <h4 className="text-sm font-medium mb-1 line-clamp-2">{product.title}</h4>
            <p className="text-xs text-gray-500 mb-2">{product.category}</p>
            <div className="flex items-center justify-between">
                <div className="text-lg font-semibold">${product.price.toFixed(2)}</div>
                <button onClick={addToCart} className="px-3 py-1 rounded bg-indigo-600 text-white text-sm">Add</button>
            </div>
        </article>
    );
}
