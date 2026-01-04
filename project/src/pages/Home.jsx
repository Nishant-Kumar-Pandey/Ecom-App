import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, setSelectedCategory } from "../redux/productSlice";
import ProductCard from "../components/ProductCard";
import { useSearch } from "../context/SearchContext";

export default function Home() {
    const dispatch = useDispatch();
    const { items = [], status, selectedCategory = "All" } = useSelector((state) => state.products || {});
    const { search } = useSearch();

    const [gridCols, setGridCols] = useState(4);
    const [rows, setRows] = useState(2); // default 4x2 = 8 items
    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState("relevance");
    const [isSortOpen, setIsSortOpen] = useState(false);

    const sortOptions = [
        { value: "relevance", label: "Relevance" },
        { value: "price-asc", label: "Price: Low" },
        { value: "price-desc", label: "Price: High" },
        { value: "popularity", label: "Popularity" },
        { value: "discount", label: "Savings" }
    ];

    const currentSortLabel = sortOptions.find(opt => opt.value === sortBy)?.label;

    const categories = ["All", "Beauty", "Fragrances", "Furniture", "Groceries"];

    /* ---------- FILTERING & SORTING LOGIC ---------- */

    // 1. Filter by Category
    const categoryFiltered = selectedCategory === "All"
        ? items
        : items.filter(item => item?.category?.toLowerCase() === selectedCategory?.toLowerCase());

    // 2. Filter by Search
    const searchFiltered = categoryFiltered.filter((product) =>
        product.title.toLowerCase().includes(search.toLowerCase())
    );

    // 3. Sort the results
    const sortedItems = [...searchFiltered].sort((a, b) => {
        if (sortBy === "price-asc") return a.price - b.price;
        if (sortBy === "price-desc") return b.price - a.price;
        if (sortBy === "popularity") return b.rating - a.rating;
        if (sortBy === "discount") return b.discountPercentage - a.discountPercentage;
        return 0; // relevance or default
    });

    // 4. Pagination
    const isPaginated = rows > 0;
    const itemsPerPage = isPaginated ? rows * gridCols : sortedItems.length;
    const totalPages = isPaginated ? Math.max(1, Math.ceil(sortedItems.length / itemsPerPage)) : 1;

    // Sync page if out of bounds
    useEffect(() => {
        if (currentPage > totalPages && totalPages > 0) {
            setCurrentPage(totalPages);
        }
    }, [totalPages, currentPage]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedItems.slice(indexOfFirstItem, indexOfLastItem);

    /* --------------------------------------------- */

    /* --------------------------------------------- */

    const handleLayoutChange = (cols, numRows) => {
        setGridCols(cols);
        setRows(numRows);
        setCurrentPage(1);
    };

    if (status === "loading") {
        return (
            <div className="flex justify-center items-center h-96">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    return (
        <div className="bg-[#fcfdfe] min-h-screen pb-20 pt-28 selection:bg-indigo-100">
            {/* Hero Section */}
            <div className="max-w-7xl mx-auto px-4 mb-16 animate-in">
                <div className="relative h-[450px] rounded-[3.5rem] overflow-hidden shadow-2xl-indigo group">
                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-700 via-blue-600 to-indigo-900"></div>
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] mix-blend-overlay opacity-30 transform scale-110 group-hover:scale-100 transition-transform duration-1000"></div>

                    <div className="relative h-full flex flex-col justify-center px-10 md:px-20 text-white max-w-3xl">
                        <span className="text-indigo-200 font-black uppercase tracking-[0.3em] text-xs mb-6 block drop-shadow-lg">New Season 2024</span>
                        <h1 className="text-5xl md:text-7xl font-black mb-8 leading-[1.1] text-glow">
                            Elevate Your <br />
                            <span className="bg-gradient-to-r from-white to-indigo-300 bg-clip-text text-transparent">Digital Lifestyle</span>
                        </h1>
                        <p className="text-xl md:text-2xl text-indigo-50/80 mb-10 font-medium leading-relaxed">
                            Discover the future of style and technology. Handpicked premium products, delivered to your door.
                        </p>
                        <div className="flex flex-wrap gap-6">
                            <button className="bg-white text-indigo-900 px-10 py-5 rounded-[1.5rem] font-black text-lg btn-premium shadow-2xl">
                                Explore Store
                            </button>
                            <button className="bg-white/10 backdrop-blur-xl border border-white/20 text-white px-10 py-5 rounded-[1.5rem] font-black text-lg hover:bg-white/20 transition-all active:scale-95">
                                View Lookbook
                            </button>
                        </div>
                    </div>

                    <div className="absolute right-0 bottom-0 p-10 hidden xl:block opacity-20">
                        <svg className="w-80 h-80" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" /></svg>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4">
                <div className="flex flex-col xl:flex-row justify-between items-center mb-12 gap-8 animate-in delay-1 relative z-30">
                    {/* Category Buttons */}
                    <div className="flex flex-wrap items-center gap-3">
                        <div className="flex items-center gap-3 p-2 glass rounded-[1.5rem]">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => { dispatch(setSelectedCategory(cat)); setCurrentPage(1); }}
                                    className={`px-6 py-3 rounded-[1.2rem] text-sm font-black transition-all ${selectedCategory === cat
                                        ? "bg-gray-900 text-white shadow-2xl scale-110"
                                        : "hover:bg-gray-50 text-gray-500 hover:text-gray-900"
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-6">
                        {/* Custom Premium Sort Dropdown */}
                        <div className="relative sort-container glass p-2 rounded-[1.5rem] flex items-center gap-4 z-50">
                            <span className="text-xs font-black uppercase text-gray-400 pl-4 tracking-tighter">Sort by</span>
                            <div className="relative">
                                <button
                                    onClick={() => setIsSortOpen(!isSortOpen)}
                                    className="flex items-center gap-6 bg-gray-50/50 pr-6 pl-6 py-3 rounded-2xl text-sm font-black text-gray-900 cursor-pointer hover:bg-white transition-all active:scale-95 group"
                                >
                                    {currentSortLabel}
                                    <svg
                                        className={`w-4 h-4 text-indigo-600 transition-transform duration-300 ${isSortOpen ? 'rotate-180' : ''}`}
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>

                                {isSortOpen && (
                                    <div className="absolute top-full left-0 right-0 mt-3 glass-dark p-2 rounded-[1.5rem] shadow-2xl z-[100] animate-in overflow-hidden border border-white/10 min-w-[200px]">
                                        <div className="flex flex-col gap-1">
                                            {sortOptions.map((option) => (
                                                <button
                                                    key={option.value}
                                                    onClick={() => {
                                                        setSortBy(option.value);
                                                        setIsSortOpen(false);
                                                        setCurrentPage(1);
                                                    }}
                                                    className={`w-full text-left px-5 py-3 rounded-xl text-sm font-bold transition-all ${sortBy === option.value
                                                        ? "bg-indigo-600 text-white shadow-lg"
                                                        : "text-gray-300 hover:bg-white/10 hover:text-white"
                                                        }`}
                                                >
                                                    {option.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    {/* Grid Icons */}
                    <div className="flex items-center space-x-2 glass p-2 rounded-[1.5rem]">
                        {[
                            { c: 4, r: 2, icon: "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" },
                            { c: 3, r: 3, icon: "M4 5a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM11 5a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1V5zM18 5a1 1 0 011-1h1a1 1 0 011 1v3a1 1 0 01-1 1h-1a1 1 0 01-1-1V5zM4 11a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-3zM11 11a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-3zM18 11a1 1 0 011-1h1a1 1 0 011 1v3a1 1 0 01-1 1h-1a1 1 0 01-1-1v-3z" }
                        ].map((btn, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleLayoutChange(btn.c, btn.r)}
                                className={`p-3 rounded-xl transition-all ${gridCols === btn.c && rows === btn.r ? "bg-gray-900 text-white shadow-xl" : "text-gray-400 hover:text-gray-900"}`}
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d={btn.icon} /></svg>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div
                className={`grid gap-10 mb-16 ${gridCols === 3
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                    : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
                    }`}
            >
                {currentItems.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>

            {isPaginated && totalPages > 1 && (
                <div className="flex justify-center items-center space-x-6 mt-16 animate-in delay-2">
                    <button
                        onClick={() => { setCurrentPage(p => Math.max(p - 1, 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        disabled={currentPage === 1}
                        className="w-14 h-14 glass flex items-center justify-center rounded-2xl disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-900 hover:text-white transition-all duration-300 scale-hover group"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M15 19l-7-7 7-7" /></svg>
                    </button>

                    <div className="glass px-8 py-4 rounded-2xl flex items-center gap-4">
                        <span className="text-sm font-black text-gray-400 uppercase tracking-widest">Page</span>
                        <span className="text-xl font-black text-indigo-600">{currentPage}</span>
                        <span className="text-sm font-black text-gray-400">of {totalPages}</span>
                    </div>

                    <button
                        onClick={() => { setCurrentPage(p => Math.min(p + 1, totalPages)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                        disabled={currentPage === totalPages}
                        className="w-14 h-14 glass flex items-center justify-center rounded-2xl disabled:opacity-30 disabled:cursor-not-allowed hover:bg-gray-900 hover:text-white transition-all duration-300 scale-hover group"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M9 5l7 7-7 7" /></svg>
                    </button>
                </div>
            )}
        </div>
    );
}
