import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Mic, SlidersHorizontal, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "../../components/customer/ProductCard";
import { EmptyState } from "../../components/ui/Primitives";
import { products } from "../../data/mockData";

const RECENT = ["Tomatoes", "A2 milk", "Organic honey", "Curry leaves"];
const TRENDING = ["Mangoes", "Paneer", "Spinach", "Okra", "Ghee"];
const FILTERS = ["Organic", "Under ₹50", "4★ & above", "Nearby (5km)"];

export default function Search() {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [listening, setListening] = useState(false);
  const [activeFilters, setActiveFilters] = useState([]);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    return products.filter((p) => p.name.toLowerCase().includes(query.toLowerCase()));
  }, [query]);

  const toggleFilter = (f) =>
    setActiveFilters((prev) => (prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]));

  const startVoice = () => {
    setListening(true);
    setTimeout(() => {
      setListening(false);
      setQuery("Tomatoes");
    }, 1500);
  };

  return (
    <div className="px-4 md:px-8 pt-4 max-w-4xl mx-auto">
      <div className="flex items-center gap-2.5 mb-5">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-white dark:bg-cardDark shadow-soft flex items-center justify-center flex-shrink-0 md:hidden" aria-label="Back">
          <ArrowLeft size={18} />
        </button>
        <div className="flex-1 flex items-center gap-2.5 bg-white dark:bg-cardDark rounded-pill px-4 py-3.5 shadow-soft">
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search fresh produce, farmers…"
            className="flex-1 bg-transparent outline-none text-sm"
          />
          {query && (
            <button onClick={() => setQuery("")} aria-label="Clear"><X size={16} className="text-ink/40" /></button>
          )}
          <button onClick={startVoice} aria-label="Voice search" className="relative">
            <Mic size={18} className={listening ? "text-red-500" : "text-primary"} />
            {listening && <motion.span className="absolute -inset-2 rounded-full border-2 border-red-400" animate={{ scale: [1, 1.6], opacity: [0.7, 0] }} transition={{ repeat: Infinity, duration: 1 }} />}
          </button>
        </div>
        <button className="w-10 h-10 rounded-full bg-white dark:bg-cardDark shadow-soft flex items-center justify-center flex-shrink-0" aria-label="Filters">
          <SlidersHorizontal size={16} />
        </button>
      </div>

      {/* Filter chips */}
      <div className="flex gap-2 overflow-x-auto no-scrollbar mb-6">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => toggleFilter(f)}
            className={`flex-shrink-0 text-xs font-semibold px-3.5 py-2 rounded-pill border transition-colors ${
              activeFilters.includes(f)
                ? "bg-primary text-white border-primary"
                : "bg-white dark:bg-cardDark border-black/10 dark:border-white/10 text-ink/60 dark:text-white/60"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {!query ? (
          <motion.div key="suggestions" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <p className="text-xs font-semibold text-ink/50 dark:text-white/50 mb-2.5">Recent searches</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {RECENT.map((r) => (
                <button key={r} onClick={() => setQuery(r)} className="text-sm px-3.5 py-2 rounded-pill bg-black/[0.04] dark:bg-white/5">{r}</button>
              ))}
            </div>
            <p className="text-xs font-semibold text-ink/50 dark:text-white/50 mb-2.5">Trending now</p>
            <div className="flex flex-wrap gap-2">
              {TRENDING.map((r) => (
                <button key={r} onClick={() => setQuery(r)} className="text-sm px-3.5 py-2 rounded-pill bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-200">{r}</button>
              ))}
            </div>
          </motion.div>
        ) : results.length === 0 ? (
          <EmptyState title="No results found" description={`We couldn't find anything for "${query}". Try a different term.`} />
        ) : (
          <motion.div key="results" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-2 md:grid-cols-3 gap-3.5">
            {results.map((p) => <ProductCard key={p.id} product={p} />)}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
