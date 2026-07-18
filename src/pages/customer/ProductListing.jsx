import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpDown } from "lucide-react";
import ProductCard from "../../components/customer/ProductCard";
import { Skeleton, EmptyState } from "../../components/ui/Primitives";
import { categories, products } from "../../data/mockData";

const SORTS = ["Popular", "Price: Low to High", "Price: High to Low", "Rating"];

export default function ProductListing() {
  const { categoryId } = useParams();
  const navigate = useNavigate();
  const category = categories.find((c) => c.id === categoryId);
  const [sort, setSort] = useState("Popular");
  const [sortOpen, setSortOpen] = useState(false);

  const items = useMemo(() => {
    let list = products.filter((p) => p.category === categoryId);
    if (sort === "Price: Low to High") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "Price: High to Low") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "Rating") list = [...list].sort((a, b) => b.rating - a.rating);
    return list;
  }, [categoryId, sort]);

  return (
    <div className="px-4 md:px-8 pt-4 max-w-6xl mx-auto">
      <div className="flex items-center gap-3 mb-5">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-white dark:bg-cardDark shadow-soft flex items-center justify-center" aria-label="Back">
          <ArrowLeft size={18} />
        </button>
        <div>
          <h1 className="font-display text-xl font-semibold">{category?.emoji} {category?.name || "Products"}</h1>
          <p className="text-xs text-ink/50 dark:text-white/50">{items.length} items available</p>
        </div>
        <div className="ml-auto relative">
          <button
            onClick={() => setSortOpen((o) => !o)}
            className="flex items-center gap-1.5 text-xs font-semibold bg-white dark:bg-cardDark shadow-soft rounded-pill px-3.5 py-2.5"
          >
            <ArrowUpDown size={13} /> {sort}
          </button>
          {sortOpen && (
            <div className="absolute right-0 top-11 bg-white dark:bg-cardDark rounded-2xl shadow-lift py-2 w-52 z-20">
              {SORTS.map((s) => (
                <button
                  key={s}
                  onClick={() => { setSort(s); setSortOpen(false); }}
                  className={`w-full text-left text-sm px-4 py-2.5 hover:bg-black/[0.03] dark:hover:bg-white/5 ${s === sort ? "text-primary font-semibold" : ""}`}
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {items.length === 0 ? (
        <EmptyState title="Nothing here yet" description="Check back soon — farmers restock this category daily." />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 pb-6">
          {items.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}
