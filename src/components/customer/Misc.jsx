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

export function SearchBar({ onClick, placeholder = "Search fresh produce, farmers…", readOnly = true, value, onChange }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-2.5 bg-white dark:bg-cardDark rounded-pill px-4 py-3.5 shadow-soft text-left",
        "border border-black/[0.03] dark:border-white/5"
      )}
    >
      <Search size={18} className="text-ink/40 dark:text-white/40 flex-shrink-0" />
      {readOnly ? (
        <span className="text-sm text-ink/40 dark:text-white/40 flex-1">{placeholder}</span>
      ) : (
        <input
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-ink/40 dark:placeholder:text-white/40"
        />
      )}
      <Mic size={18} className="text-primary flex-shrink-0" />
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
