import React, { useMemo, useState } from 'react';
import useProducts from '../hooks/useProducts';
import SearchBar from '../components/SearchBar';
import FiltersPanel from '../components/FiltersPanel';
import SortSelect from '../components/SortSelect';
import ProductGrid from '../components/ProductGrid';
import Loader from '../components/Loader';
import EmptyState from '../components/EmptyState';
import ErrorState from '../components/ErrorState';
import ProductModal from '../components/ProductModal';
import queryString from 'query-string';

export default function CatalogPage() {
    // parse initial query from URL
    const initialQuery = useMemo(() => queryString.parse(window.location.search, { parseNumbers: true }), []);
    const { filtered, loading, error, categories, priceBounds, state, actions } = useProducts(initialQuery);

    // product modal state
    const [selected, setSelected] = useState(null);

    // active filters for UI
    const activeFilters = useMemo(() => {
        const list = [];
        if (state.search) list.push({ key: 'search', label: `Search: "${state.search}"` });
        if (state.category && state.category !== 'all') list.push({ key: 'cat', label: `Category: ${state.category}` });
        if (state.priceRange) list.push({ key: 'price', label: `Price: ${state.priceRange[0]}–${state.priceRange[1]}` });
        if (state.sort && state.sort !== 'default') list.push({ key: 'sort', label: `Sort: ${state.sort}` });
        return list;
    }, [state]);

    const onClear = () => actions.resetFilters();

    return (
        <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-6">
            <FiltersPanel
                categories={categories}
                selectedCategory={state.category}
                onCategoryChange={actions.setCategory}
                priceBounds={priceBounds}
                priceRange={state.priceRange.length ? state.priceRange : priceBounds}
                onPriceChange={actions.setPriceRange}
                activeFilters={activeFilters}
                onClear={onClear}
            />

            <section>
                <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="sm:flex-1">
                        <SearchBar value={state.search} onChange={actions.setSearch} />
                    </div>
                    <div className="flex items-center gap-3">
                        <SortSelect value={state.sort} onChange={actions.setSort} />
                        <button onClick={onClear} className="hidden sm:inline text-sm underline">Clear</button>
                    </div>
                </div>

                {loading && <Loader />}
                {error && <ErrorState message={error.message} />}

                {!loading && !error && filtered.length === 0 && (
                    <EmptyState title="No products found" description="Try changing search or filters." />
                )}

                {!loading && !error && filtered.length > 0 && (
                    <ProductGrid products={filtered} onOpen={setSelected} />
                )}
            </section>

            <ProductModal product={selected} onClose={() => setSelected(null)} />
        </div>
    );
}
