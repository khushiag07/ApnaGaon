import { motion } from "framer-motion";
import { Search, Mic, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "../../utils/cn";

export function CategoryCard({ category }) {
  const navigate = useNavigate();
  return (
    <motion.button
      whileHover={{ y: -3 }}
      whileTap={{ scale: 0.96 }}
      onClick={() => navigate(`/category/${category.id}`)}
      className="flex-shrink-0 flex flex-col items-center gap-2 w-[68px]"
    >
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl shadow-soft"
        style={{ backgroundColor: `${category.color}14` }}
      >
        {category.emoji}
      </div>
      <span className="text-xs font-medium text-center leading-tight">{category.name}</span>
    </motion.button>
  );
}


export function SearchBar({
  placeholder = "Search fresh vegetables, milk, fruits...",
}) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate("/search")}
      className={cn(
        "w-full flex items-center gap-3 bg-white dark:bg-cardDark rounded-full px-5 py-3.5 shadow-soft",
        "border border-black/[0.05] dark:border-white/10"
      )}
    >
      <Search
        size={20}
        className="text-gray-400 dark:text-white/50 flex-shrink-0"
      />

      <span className="flex-1 text-left text-sm text-gray-400 dark:text-white/40">
        {placeholder}
      </span>

      <Mic
        size={20}
        className="text-green-700 dark:text-green-400 flex-shrink-0"
      />
    </button>
  );
}
export function SectionHeader({ title, subtitle, actionLabel = "See all", onAction }) {
  return (
    <div className="flex items-end justify-between mb-3.5">
      <div>
        <h2 className="font-display text-[19px] font-semibold leading-tight">{title}</h2>
        {subtitle && <p className="text-xs text-ink/50 dark:text-white/50 mt-0.5">{subtitle}</p>}
      </div>
      {onAction && (
        <button onClick={onAction} className="flex items-center text-xs font-semibold text-primary gap-0.5">
          {actionLabel} <ChevronRight size={14} />
        </button>
      )}
    </div>
  );
}
