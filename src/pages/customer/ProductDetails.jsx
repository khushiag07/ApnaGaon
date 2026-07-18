import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Heart, Minus, Plus, ShieldCheck, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import Rating from "../../components/ui/Rating";
import Button from "../../components/ui/Button";
import { OrganicBadge, FreshnessMeter, DistanceBadge } from "../../components/ui/Badge";
import ProductCard from "../../components/customer/ProductCard";
import { useApp } from "../../context/AppContext";
import { getProductById, getFarmerById, products } from "../../data/mockData";
import { formatCurrency } from "../../utils/format";

const REVIEWS = [
  { id: 1, name: "Priya S.", avatar: "https://i.pravatar.cc/100?img=47", rating: 5, text: "Incredibly fresh, tasted like it was picked this morning. Will reorder.", time: "2 days ago" },
  { id: 2, name: "Arjun K.", avatar: "https://i.pravatar.cc/100?img=14", rating: 4, text: "Great quality, delivery was a little later than expected.", time: "1 week ago" },
];

export default function ProductDetails() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { wishlist, toggleWishlist, addToCart } = useApp();
  const [qty, setQty] = useState(1);
  const product = getProductById(productId);
  const farmer = product ? getFarmerById(product.farmerId) : null;
  const related = products.filter((p) => p.category === product?.category && p.id !== productId).slice(0, 4);

  if (!product) return null;
  const saved = wishlist.includes(product.id);

  return (
    <div className="max-w-4xl mx-auto pb-8">
      <div className="relative aspect-square md:aspect-[16/9] md:rounded-card md:mt-6 overflow-hidden">
        <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        <button onClick={() => navigate(-1)} className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-soft" aria-label="Back">
          <ArrowLeft size={18} />
        </button>
        <button
          onClick={() => toggleWishlist(product.id)}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-soft"
          aria-label="Toggle wishlist"
        >
          <Heart size={18} className={saved ? "fill-red-500 text-red-500" : ""} />
        </button>
        <div className="absolute bottom-4 right-4">
          <FreshnessMeter value={product.freshness} size={44} />
        </div>
      </div>

      <div className="px-4 md:px-8 mt-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h1 className="font-display text-2xl font-semibold">{product.name}</h1>
            <button onClick={() => navigate(`/farmer/${farmer.id}`)} className="text-sm text-ink/55 dark:text-white/55 mt-1 flex items-center gap-1">
              {farmer.name} {farmer.verified && <ShieldCheck size={13} className="text-primary" />}
            </button>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="font-display text-2xl font-semibold text-primary">{formatCurrency(product.price)}</p>
            <p className="text-xs text-ink/45 dark:text-white/45">per {product.unit}</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 mt-3">
          <Rating value={product.rating} reviews={product.reviews} />
          {product.organic && <OrganicBadge />}
          <DistanceBadge km={farmer.distanceKm} className="!bg-black/[0.04] dark:!bg-white/10 !shadow-none" />
        </div>

        <div className="grid grid-cols-2 gap-3 mt-5">
          <div className="bg-white dark:bg-cardDark rounded-2xl p-3.5 shadow-soft flex items-center gap-2.5">
            <Calendar size={16} className="text-primary" />
            <div>
              <p className="text-[10px] text-ink/45 dark:text-white/45">Harvest date</p>
              <p className="text-xs font-semibold">{new Date(product.harvestDate).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</p>
            </div>
          </div>
          <div className="bg-white dark:bg-cardDark rounded-2xl p-3.5 shadow-soft flex items-center gap-2.5">
            <ShieldCheck size={16} className="text-primary" />
            <div>
              <p className="text-[10px] text-ink/45 dark:text-white/45">In stock</p>
              <p className="text-xs font-semibold">{product.stock} {product.unit} available</p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="font-semibold text-sm mb-2">About this product</h2>
          <p className="text-sm text-ink/60 dark:text-white/60 leading-relaxed">
            Grown without synthetic pesticides at {farmer.name}, {farmer.location}. Hand-picked at peak
            ripeness and delivered within hours of harvest to lock in flavor and nutrition.
          </p>
        </div>

        {/* Reviews */}
        <div className="mt-7">
          <h2 className="font-semibold text-sm mb-3">Customer reviews</h2>
          <div className="space-y-3">
            {REVIEWS.map((r) => (
              <div key={r.id} className="bg-white dark:bg-cardDark rounded-2xl p-4 shadow-soft">
                <div className="flex items-center gap-2.5">
                  <img src={r.avatar} alt={r.name} className="w-8 h-8 rounded-full object-cover" />
                  <div>
                    <p className="text-sm font-semibold">{r.name}</p>
                    <Rating value={r.rating} showCount={false} size={11} />
                  </div>
                  <span className="text-[11px] text-ink/40 dark:text-white/40 ml-auto">{r.time}</span>
                </div>
                <p className="text-sm text-ink/60 dark:text-white/60 mt-2.5 leading-relaxed">{r.text}</p>
              </div>
            ))}
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-8">
            <h2 className="font-semibold text-sm mb-3">You may also like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
              {related.map((p) => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        )}
      </div>

      {/* Sticky add-to-cart bar */}
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed bottom-16 md:bottom-6 left-0 right-0 md:left-auto md:right-8 md:w-[380px] px-4 md:px-0 z-30"
      >
        <div className="max-w-4xl mx-auto md:mx-0 bg-white dark:bg-cardDark rounded-2xl shadow-lift p-3 flex items-center gap-3">
          <div className="flex items-center gap-3 bg-black/[0.04] dark:bg-white/5 rounded-pill px-1 py-1">
            <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="w-8 h-8 rounded-full bg-white dark:bg-cardDark shadow-soft flex items-center justify-center" aria-label="Decrease quantity">
              <Minus size={14} />
            </button>
            <span className="w-5 text-center text-sm font-semibold">{qty}</span>
            <button onClick={() => setQty((q) => Math.min(product.stock, q + 1))} className="w-8 h-8 rounded-full bg-white dark:bg-cardDark shadow-soft flex items-center justify-center" aria-label="Increase quantity">
              <Plus size={14} />
            </button>
          </div>
          <Button fullWidth onClick={() => { addToCart(product.id, qty); }}>
            Add to cart · {formatCurrency(product.price * qty)}
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
