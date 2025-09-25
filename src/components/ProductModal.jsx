import React from 'react';

export default function ProductModal({ product, onClose }) {
    if (!product) return null;
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/40" onClick={onClose} />
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg max-w-2xl w-full p-6 z-10">
                <div className="flex gap-4">
                    <img src={product.image} alt={product.title} className="w-40 h-40 object-contain" />
                    <div>
                        <h3 className="text-xl font-bold">{product.title}</h3>
                        <p className="text-sm text-gray-500">{product.category}</p>
                        <p className="mt-2 text-lg font-semibold">${product.price.toFixed(2)}</p>
                        <p className="mt-4 text-sm">{product.description}</p>
                        <div className="mt-4 flex gap-2">
                            <button onClick={onClose} className="px-3 py-2 rounded border">Close</button>
                            <a href="#" className="px-3 py-2 rounded bg-indigo-600 text-white">Buy</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
