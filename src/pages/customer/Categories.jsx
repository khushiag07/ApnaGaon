import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { categories, products } from "../../data/mockData";

export default function Categories() {
  const navigate = useNavigate();
  return (
    <div className="px-4 md:px-8 pt-6 max-w-5xl mx-auto">
      <h1 className="font-display text-2xl font-semibold mb-1">Categories</h1>
      <p className="text-sm text-ink/50 dark:text-white/50 mb-6">Browse fresh produce by category</p>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((c, i) => {
          const count = products.filter((p) => p.category === c.id).length;
          return (
            <motion.button
              key={c.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              whileHover={{ y: -4 }}
              onClick={() => navigate(`/category/${c.id}`)}
              className="bg-white dark:bg-cardDark rounded-card shadow-soft p-5 flex flex-col items-center gap-2 text-center"
            >
              <div className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl" style={{ backgroundColor: `${c.color}14` }}>
                {c.emoji}
              </div>
              <span className="font-semibold text-sm mt-1">{c.name}</span>
              <span className="text-xs text-ink/45 dark:text-white/45">{count} items</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
