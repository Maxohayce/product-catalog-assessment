export default function EmptyState({ title = 'No results', description = 'No products found.' }) {
    return (
        <div className="py-12 text-center text-gray-500">
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="mt-2">{description}</p>
        </div>
    );
}
