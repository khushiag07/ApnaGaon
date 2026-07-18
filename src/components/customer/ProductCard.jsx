import { motion } from "framer-motion";
import { Heart, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card } from "../ui/Primitives";
import { FreshnessMeter, OrganicBadge, Badge } from "../ui/Badge";
import Rating from "../ui/Rating";
import { useApp } from "../../context/AppContext";
import { getFarmerById } from "../../data/mockData";
import { formatCurrency } from "../../utils/format";
import { cn } from "../../utils/cn";

export default function ProductCard({ product, className }) {
  const navigate = useNavigate();
  const { wishlist, toggleWishlist, addToCart } = useApp();
  const farmer = getFarmerById(product.farmerId);
  const saved = wishlist.includes(product.id);

  return (
    <motion.div whileHover={{ y: -4 }} transition={{ type: "spring", stiffness: 300, damping: 22 }}>
      <Card
        className={cn("overflow-hidden cursor-pointer group", className)}
        onClick={() => navigate(`/product/${product.id}`)}
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <button
            aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
            onClick={(e) => { e.stopPropagation(); toggleWishlist(product.id); }}
            className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-soft"
          >
            <Heart size={15} className={saved ? "fill-red-500 text-red-500" : "text-ink/60"} />
          </button>
          <div className="absolute top-2.5 left-2.5">
            <Badge tone="white">{product.tag}</Badge>
          </div>
          <div className="absolute bottom-2.5 right-2.5">
            <FreshnessMeter value={product.freshness} size={30} />
          </div>
        </div>
        <div className="p-3.5">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-semibold text-[15px] leading-snug line-clamp-1">{product.name}</h3>
          </div>
          <p className="text-xs text-ink/50 dark:text-white/50 mt-0.5 line-clamp-1">{farmer?.name}</p>
          <div className="flex items-center justify-between mt-2">
            <Rating value={product.rating} reviews={product.reviews} showCount={false} />
            {product.organic && <OrganicBadge />}
          </div>
          <div className="flex items-center justify-between mt-3">
            <div>
              <span className="font-display font-semibold text-[17px]">{formatCurrency(product.price)}</span>
              <span className="text-xs text-ink/45 dark:text-white/45"> /{product.unit}</span>
            </div>
            <motion.button
              whileTap={{ scale: 0.9 }}
              aria-label="Add to cart"
              onClick={(e) => { e.stopPropagation(); addToCart(product.id); }}
              className="w-9 h-9 rounded-full bg-primary text-white flex items-center justify-center shadow-soft"
            >
              <Plus size={18} strokeWidth={2.5} />
            </motion.button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
