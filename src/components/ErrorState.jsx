export default function ErrorState({ message = 'Error loading products.' }) {
    return (
        <div className="py-12 text-center text-red-600">
            <h3 className="text-lg font-semibold">Error</h3>
            <p className="mt-2">{message}</p>
        </div>
    );
}
