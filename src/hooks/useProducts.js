import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import queryString from "query-string";

const API = "https://fakestoreapi.com/products";

export default function useProducts(initialQuery = {}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // UI state
  const [search, setSearch] = useState(initialQuery.search || "");
  const [category, setCategory] = useState(initialQuery.category || "all");
  const [priceRange, setPriceRange] = useState(
    initialQuery.priceRange || [0, 1000]
  );
  const [sort, setSort] = useState(initialQuery.sort || "default");

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    axios
      .get(API)
      .then((res) => {
        if (cancelled) return;
        setProducts(res.data);
        setError(null);
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category));
    return ["all", ...Array.from(set)];
  }, [products]);

  const priceBounds = useMemo(() => {
    if (!products.length) return [0, 1000];
    const prices = products.map((p) => p.price);
    return [Math.floor(Math.min(...prices)), Math.ceil(Math.max(...prices))];
  }, [products]);

  const filtered = useMemo(() => {
    let list = products.slice();

    // category
    if (category && category !== "all")
      list = list.filter((p) => p.category === category);

    // search (case-insensitive)
    if (search) {
      const q = search.trim().toLowerCase();
      list = list.filter((p) => p.title.toLowerCase().includes(q));
    }

    // price range
    if (priceRange && priceRange.length === 2) {
      const [min, max] = priceRange;
      list = list.filter((p) => p.price >= min && p.price <= max);
    }

    // sorting
    if (sort === "price_asc") list.sort((a, b) => a.price - b.price);
    else if (sort === "price_desc") list.sort((a, b) => b.price - a.price);
    else if (sort === "name_asc")
      list.sort((a, b) => a.title.localeCompare(b.title));
    else if (sort === "name_desc")
      list.sort((a, b) => b.title.localeCompare(a.title));

    return list;
  }, [products, category, search, priceRange, sort]);

  useEffect(() => {
    const qs = queryString.stringify(
      {
        search: search || undefined,
        category: category !== "all" ? category : undefined,
        priceMin: priceRange?.[0] ? priceRange[0] : undefined,
        priceMax: priceRange?.[1] ? priceRange[1] : undefined,
        sort: sort !== "default" ? sort : undefined,
      },
      { skipNull: true, skipEmptyString: true }
    );
    const url = qs ? `?${qs}` : window.location.pathname;
    window.history.replaceState(null, "", url);
  }, [search, category, priceRange, sort]);

  const resetFilters = () => {
    setSearch("");
    setCategory("all");
    setPriceRange([priceBounds[0], priceBounds[1]]);
    setSort("default");
  };

  return {
    products,
    filtered,
    loading,
    error,
    categories,
    priceBounds,
    state: { search, category, priceRange, sort },
    actions: {
      setSearch,
      setCategory,
      setPriceRange,
      setSort,
      resetFilters,
    },
  };
}
