import React from 'react';

export default function SortSelect({ value, onChange }) {
    return (
        <label className="flex items-center gap-2">
            <span className="sr-only">Sort products</span>
            <select value={value} onChange={e => onChange(e.target.value)} className="rounded-md p-2 border dark:bg-gray-800 dark:border-gray-700">
                <option value="default">Default</option>
                <option value="price_asc">Price: Low → High</option>
                <option value="price_desc">Price: High → Low</option>
                <option value="name_asc">Name: A → Z</option>
                <option value="name_desc">Name: Z → A</option>
            </select>
        </label>
    );
}
