import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { Filter, SlidersHorizontal, Grid3X3, LayoutGrid, ChevronDown, Search, ArrowRight, Sparkles } from "lucide-react";
import { fetchProducts, setSelectedCategory } from "../redux/productSlice";
import ProductCard from "../components/ProductCard";
import { useSearch } from "../context/SearchContext";

export default function Home() {
    const dispatch = useDispatch();
    const { items = [], status, selectedCategory = "All", error } = useSelector((state) => state.products || {});
    const { search } = useSearch();

    console.log("DEBUG: Home Render", { status, itemsLength: items?.length, error, selectedCategory });

    const [gridCols, setGridCols] = useState(4);
    const [rows, setRows] = useState(2); // default 4x2 = 8 items
    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState("relevance");
    const [isSortOpen, setIsSortOpen] = useState(false);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    // Filters State
    const [priceRange, setPriceRange] = useState([0, 1000]);
    const [selectedBrand, setSelectedBrand] = useState("All");
    const [minRating, setMinRating] = useState(0);

    const sortOptions = [
        { value: "relevance", label: "Relevance" },
        { value: "price-asc", label: "Price: Low to High" },
        { value: "price-desc", label: "Price: High to Low" },
        { value: "popularity", label: "Popularity" },
        { value: "discount", label: "Discount" },
        { value: "rating", label: "Top Rated" }
    ];

    const currentSortLabel = sortOptions.find(opt => opt.value === sortBy)?.label;
    const categories = ["All", "Food", "Clothing", "Kitchen", "Home", "Pets", "Electronics", "Toys", "Beauty", "Health", "Outdoor", "Accessories"];

    // Extract unique brands from items for the filter
    const uniqueBrands = ["All", ...new Set(items.map(item => item.brand).filter(Boolean))].sort();

    /* ---------- FILTERING & SORTING LOGIC ---------- */

    // 1. Filter by Category
    const categoryFiltered = selectedCategory === "All"
        ? items
        : items.filter(item => item?.category?.toLowerCase() === selectedCategory?.toLowerCase());

    // 2. Filter by Search (Improved)
    const searchFiltered = categoryFiltered.filter((product) => {
        const term = (search || "").toLowerCase().trim();
        if (!term) return true;

        const titleMatch = (product.title || "").toLowerCase().includes(term);
        const descMatch = (product.description || "").toLowerCase().includes(term);
        const brandMatch = (product.brand || "").toLowerCase().includes(term);

        return titleMatch || descMatch || brandMatch;
    });

    // 3. Advanced Filters (Price, Brand, Rating)
    const advancedFiltered = searchFiltered.filter(product => {
        const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
        const matchesBrand = selectedBrand === "All" || product.brand === selectedBrand;
        const matchesRating = product.rating >= minRating;
        return matchesPrice && matchesBrand && matchesRating;
    });

    // 4. Sort the results
    const sortedItems = [...advancedFiltered].sort((a, b) => {
        if (sortBy === "price-asc") return a.price - b.price;
        if (sortBy === "price-desc") return b.price - a.price;
        if (sortBy === "popularity") return b.rating - a.rating;
        if (sortBy === "discount") return b.discountPercentage - a.discountPercentage;
        if (sortBy === "rating") return b.rating - a.rating;
        return 0; // relevance or default
    });

    // 5. Pagination
    const isPaginated = rows > 0;
    const itemsPerPage = isPaginated ? rows * gridCols : sortedItems.length;
    const totalPages = isPaginated ? Math.max(1, Math.ceil(sortedItems.length / itemsPerPage)) : 1;

    // Sync page if out of bounds
    useEffect(() => {
        if (currentPage > totalPages && totalPages > 0) {
            setCurrentPage(totalPages);
        }
    }, [totalPages, currentPage]);

    // Fetch products on mount
    useEffect(() => {
        if (status === "idle") {
            dispatch(fetchProducts());
        }
    }, [status, dispatch]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedItems.slice(indexOfFirstItem, indexOfLastItem);

    /* --------------------------------------------- */

    const handleLayoutChange = (cols, numRows) => {
        setGridCols(cols);
        setRows(numRows);
        setCurrentPage(1);
    };

    if (status === "loading") {
        return <Loading />;
    }

    if (status === "failed") {
        return (
            <div className="flex flex-col justify-center items-center h-screen px-4 text-center bg-[var(--bg-primary)]">
                <div className="glass p-10 rounded-[3rem] border-red-500/20 shadow-2xl max-w-lg">
                    <div className="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <AlertCircle className="text-red-500 w-8 h-8" />
                    </div>
                    <h2 className="text-3xl font-black mb-2 text-slate-900 dark:text-white">Connection <span className="text-red-500">Failed.</span></h2>
                    <p className="text-slate-500 font-bold mb-8 tracking-tight">We couldn't synchronize with the neural network. Check your terminal.</p>
                    <div className="font-mono text-xs bg-red-500/5 p-4 rounded-2xl border border-red-500/10 mb-8 text-red-400 break-all">
                        {error || "ERR_CONNECTION_REFUSED"}
                    </div>
                    <button onClick={() => dispatch(fetchProducts())} className="btn-premium w-full !bg-red-600 !shadow-red-500/20">
                        Retry Connection
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-[var(--bg-primary)] min-h-screen pb-20 pt-28 transition-colors duration-300">


            {/* Filter Sidebar (Mobile Drawer / Desktop Sidebar) */}
            <AnimatePresence>
                {isFilterOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-[60]"
                            onClick={() => setIsFilterOpen(false)}
                        />
                        <motion.div
                            initial={{ x: "-100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "-100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed inset-y-0 left-0 z-[70] w-80 glass shadow-2xl overflow-y-auto"
                        >
                            <div className="p-8">
                                <div className="flex justify-between items-center mb-10">
                                    <h2 className="text-3xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                                        <Filter className="text-indigo-600" /> Filters
                                    </h2>
                                    <motion.button
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => setIsFilterOpen(false)}
                                        className="p-3 hover:bg-indigo-50 dark:hover:bg-slate-800 rounded-2xl text-slate-500"
                                    >
                                        <ChevronDown className="rotate-90 w-6 h-6" />
                                    </motion.button>
                                </div>

                                {/* Price Range */}
                                <div className="mb-10">
                                    <label className="block text-sm font-black text-slate-400 uppercase tracking-widest mb-4">Price Range</label>
                                    <div className="flex flex-col gap-4">
                                        <div className="flex items-center gap-4">
                                            <input
                                                type="number"
                                                value={priceRange[0]}
                                                onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                                                className="w-full input-premium py-2 px-4"
                                                placeholder="Min"
                                            />
                                            <span className="text-slate-300">to</span>
                                            <input
                                                type="number"
                                                value={priceRange[1]}
                                                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                                                className="w-full input-premium py-2 px-4"
                                                placeholder="Max"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Brand */}
                                <div className="mb-10">
                                    <label className="block text-sm font-black text-slate-400 uppercase tracking-widest mb-4">Brand</label>
                                    <select
                                        value={selectedBrand}
                                        onChange={(e) => setSelectedBrand(e.target.value)}
                                        className="w-full input-premium py-3 px-4 appearance-none"
                                    >
                                        {uniqueBrands.map(brand => (
                                            <option key={brand} value={brand}>{brand}</option>
                                        ))}
                                    </select>
                                </div>

                                {/* Rating */}
                                <div className="mb-10">
                                    <label className="block text-sm font-black text-slate-400 uppercase tracking-widest mb-4">Rating: {minRating}+ Stars</label>
                                    <input
                                        type="range"
                                        min="0"
                                        max="5"
                                        step="0.5"
                                        value={minRating}
                                        onChange={(e) => setMinRating(Number(e.target.value))}
                                        className="w-full accent-indigo-600 h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
                                    />
                                </div>

                                <button
                                    onClick={() => {
                                        setPriceRange([0, 1000]);
                                        setSelectedBrand("All");
                                        setMinRating(0);
                                    }}
                                    className="w-full py-4 text-indigo-600 font-black text-sm uppercase tracking-widest border border-indigo-100 dark:border-indigo-900/30 rounded-2xl hover:bg-indigo-50 dark:hover:bg-indigo-900/10 transition-colors"
                                >
                                    Reset All
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <div className="flex-1 max-w-7xl mx-auto px-4 w-full">
                {/* Reimagined Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-12"
                >
                    <div className="relative h-[450px] rounded-[3rem] overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 border border-white/5"></div>

                        {/* Abstract background elements */}
                        <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none">
                            <motion.div
                                animate={{
                                    scale: [1, 1.2, 1],
                                    rotate: [0, 90, 0],
                                    opacity: [0.1, 0.2, 0.1]
                                }}
                                transition={{ duration: 20, repeat: Infinity }}
                                className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] bg-indigo-500 rounded-full blur-[120px]"
                            />
                            <motion.div
                                animate={{
                                    scale: [1, 1.3, 1],
                                    rotate: [0, -90, 0],
                                    opacity: [0.1, 0.3, 0.1]
                                }}
                                transition={{ duration: 25, repeat: Infinity }}
                                className="absolute -bottom-1/4 -left-1/4 w-[500px] h-[500px] bg-purple-500 rounded-full blur-[100px]"
                            />
                        </div>

                        <div className="relative h-full flex flex-col justify-center px-6 md:px-20 z-10">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                                className="flex items-center gap-2 mb-6"
                            >
                                <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-indigo-300 text-[10px] md:text-xs font-black uppercase tracking-widest">
                                    Premium Collection 2026
                                </span>
                                <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="text-4xl sm:text-6xl md:text-8xl font-black text-white mb-6 leading-[1.1] md:leading-[0.9] tracking-tight"
                            >
                                Elevate <br /> <span className="text-indigo-400">Your Style.</span>
                            </motion.h1>


                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6 }}
                                className="text-lg md:text-xl text-slate-400 max-w-xl mb-10 font-medium"
                            >
                                Discover the intersection of luxury and technology. Curated products for the modern lifestyle.
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8 }}
                                className="flex flex-wrap gap-4"
                            >
                                <button className="btn-premium px-10 py-5 text-lg">
                                    Shop Now <ArrowRight size={20} />
                                </button>
                                <button className="px-10 py-5 rounded-2xl glass border border-white/10 text-white font-bold hover:bg-white/5 transition-colors">
                                    View Collection
                                </button>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>

                {/* Toolbar */}
                <div className="flex flex-col xl:flex-row justify-between items-center mb-12 gap-6 relative z-30">
                    {/* Categories */}
                    <div className="flex items-center gap-3 overflow-x-auto pb-4 w-full xl:w-auto no-scrollbar">
                        <div className="p-3 rounded-2xl glass-card text-indigo-600">
                            <LayoutGrid size={24} />
                        </div>
                        <div className="flex gap-2">
                            {categories.map((cat) => (
                                <motion.button
                                    key={cat}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => { dispatch(setSelectedCategory(cat)); setCurrentPage(1); }}
                                    className={`whitespace-nowrap px-6 py-3 rounded-2xl text-sm font-black transition-all ${selectedCategory === cat
                                        ? "bg-slate-900 dark:bg-indigo-600 text-white shadow-xl"
                                        : "glass-card text-slate-500 hover:text-indigo-600 border-none"
                                        }`}
                                >
                                    {cat}
                                </motion.button>
                            ))}
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsFilterOpen(true)}
                            className="flex-1 md:flex-none flex items-center justify-center gap-3 px-8 py-4 glass-card text-slate-900 dark:text-white font-black uppercase text-xs tracking-widest hover:border-indigo-500/30"
                        >
                            <SlidersHorizontal size={18} className="text-indigo-500" />
                            Filters
                        </motion.button>

                        {/* Sort Dropdown */}
                        <div className="relative flex-1 md:flex-none">
                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setIsSortOpen(!isSortOpen)}
                                className="w-full flex items-center justify-between gap-4 px-8 py-4 glass-card text-slate-900 dark:text-white font-black uppercase text-xs tracking-widest hover:border-indigo-500/30 min-w-[200px]"
                            >
                                <span>{currentSortLabel || "Sort By"}</span>
                                <ChevronDown className={`w-4 h-4 text-indigo-500 transition-transform ${isSortOpen ? "rotate-180" : ""}`} />
                            </motion.button>

                            <AnimatePresence>
                                {isSortOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="absolute top-full right-0 mt-4 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl p-3 rounded-[2rem] shadow-2xl border border-white/20 dark:border-white/5 min-w-[220px]"
                                    >
                                        <div className="flex flex-col gap-1">
                                            {sortOptions.map((option) => (
                                                <button
                                                    key={option.value}
                                                    onClick={() => {
                                                        setSortBy(option.value);
                                                        setIsSortOpen(false);
                                                        setCurrentPage(1);
                                                    }}
                                                    className={`w-full text-left px-5 py-3 rounded-xl text-sm font-black transition-colors ${sortBy === option.value
                                                        ? "bg-indigo-600 text-white"
                                                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                                                        }`}
                                                >
                                                    {option.label}
                                                </button>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Grid layout Toggle */}
                        <div className="hidden md:flex glass-card p-1.5 gap-1">
                            <button onClick={() => handleLayoutChange(4, 2)} className={`p-2.5 rounded-xl transition-all ${gridCols === 4 ? "bg-slate-900 dark:bg-indigo-600 text-white" : "text-slate-400 hover:text-indigo-500"}`}>
                                <LayoutGrid size={20} />
                            </button>
                            <button onClick={() => handleLayoutChange(3, 3)} className={`p-2.5 rounded-xl transition-all ${gridCols === 3 ? "bg-slate-900 dark:bg-indigo-600 text-white" : "text-slate-400 hover:text-indigo-500"}`}>
                                <Grid3X3 size={20} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Product Grid */}
                {
                    sortedItems.length > 0 ? (
                        <div
                            className={`grid gap-8 mb-16 ${gridCols === 3
                                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                                : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
                                }`}
                        >
                            {currentItems.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-20 text-center">
                            <div className="bg-gray-50 p-6 rounded-full mb-4">
                                <svg className="w-12 h-12 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">No products found</h3>
                            <p className="text-gray-500 max-w-md mx-auto">Try adjusting your search or filters to find what you're looking for.</p>
                            <button
                                onClick={() => {
                                    dispatch(setSelectedCategory("All"));
                                    setPriceRange([0, 10000]);
                                    setSelectedBrand("All");
                                    setMinRating(0);
                                }}
                                className="mt-6 text-indigo-600 font-bold hover:underline"
                            >
                                Clear all filters
                            </button>
                        </div>
                    )
                }

                {/* Pagination */}
                {
                    isPaginated && totalPages > 1 && (
                        <div className="flex justify-center items-center space-x-6 mt-16">
                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={() => { setCurrentPage(p => Math.max(p - 1, 1)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                                disabled={currentPage === 1}
                                className="p-5 rounded-2xl glass-card disabled:opacity-30 text-indigo-600"
                            >
                                <ChevronDown className="rotate-90 w-6 h-6" />
                            </motion.button>

                            <div className="px-8 py-4 rounded-[2rem] glass-card flex items-center gap-4">
                                <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Page</span>
                                <span className="text-2xl font-black text-indigo-600">{currentPage}</span>
                                <span className="text-xs font-black text-slate-400 uppercase tracking-widest">of {totalPages}</span>
                            </div>

                            <motion.button
                                whileTap={{ scale: 0.9 }}
                                onClick={() => { setCurrentPage(p => Math.min(p + 1, totalPages)); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                                disabled={currentPage === totalPages}
                                className="p-5 rounded-2xl glass-card disabled:opacity-30 text-indigo-600"
                            >
                                <ChevronDown className="-rotate-90 w-6 h-6" />
                            </motion.button>
                        </div>
                    )
                }
            </div >
        </div >
    );
}
