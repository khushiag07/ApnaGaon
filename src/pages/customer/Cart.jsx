import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Minus, Plus, Trash2, ShoppingCart, Tag } from "lucide-react";
import { EmptyState } from "../../components/ui/Primitives";
import Button from "../../components/ui/Button";
import { useApp } from "../../context/AppContext";
import { formatCurrency } from "../../utils/format";

export default function Cart() {
  const navigate = useNavigate();
  const { cartDetailed, updateQty, removeFromCart, cartTotal } = useApp();

  const deliveryFee = cartTotal > 300 || cartTotal === 0 ? 0 : 25;
  const total = cartTotal + deliveryFee;

  if (cartDetailed.length === 0) {
    return (
      <div className="px-4 pt-10 max-w-4xl mx-auto">
        <EmptyState
          icon={ShoppingCart}
          title="Your cart is empty"
          description="Add fresh produce from a farmer near you to get started."
          action={<Button onClick={() => navigate("/")}>Browse products</Button>}
        />
      </div>
    );
  }

  return (
    <div className="px-4 md:px-8 pt-6 max-w-4xl mx-auto">
      <h1 className="font-display text-2xl font-semibold mb-5">Your cart</h1>

      <div className="space-y-3">
        <AnimatePresence>
          {cartDetailed.map(({ product, qty }) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40, height: 0, marginBottom: 0 }}
              className="bg-white dark:bg-cardDark rounded-2xl shadow-soft p-3 flex gap-3 items-center"
            >
              <img src={product.image} alt={product.name} className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm line-clamp-1">{product.name}</p>
                <p className="text-xs text-ink/45 dark:text-white/45">{formatCurrency(product.price)} / {product.unit}</p>
                <div className="flex items-center gap-2.5 mt-2 bg-black/[0.04] dark:bg-white/5 rounded-pill w-fit px-1 py-1">
                  <button onClick={() => updateQty(product.id, qty - 1)} className="w-6 h-6 rounded-full bg-white dark:bg-cardDark shadow-soft flex items-center justify-center" aria-label="Decrease">
                    <Minus size={12} />
                  </button>
                  <span className="w-4 text-center text-xs font-semibold">{qty}</span>
                  <button onClick={() => updateQty(product.id, qty + 1)} className="w-6 h-6 rounded-full bg-white dark:bg-cardDark shadow-soft flex items-center justify-center" aria-label="Increase">
                    <Plus size={12} />
                  </button>
                </div>
              </div>
              <div className="text-right flex flex-col items-end gap-2">
                <span className="font-semibold text-sm">{formatCurrency(product.price * qty)}</span>
                <button onClick={() => removeFromCart(product.id)} aria-label="Remove item">
                  <Trash2 size={15} className="text-ink/30 hover:text-red-500" />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <button className="w-full flex items-center gap-2.5 bg-accent-50 rounded-2xl px-4 py-3.5 mt-4 text-sm font-semibold text-accent-600">
        <Tag size={16} /> Apply coupon code
      </button>

      <div className="bg-white dark:bg-cardDark rounded-2xl shadow-soft p-4 mt-4 space-y-2 text-sm">
        <div className="flex justify-between text-ink/60 dark:text-white/60">
          <span>Subtotal</span><span>{formatCurrency(cartTotal)}</span>
        </div>
        <div className="flex justify-between text-ink/60 dark:text-white/60">
          <span>Delivery fee</span><span>{deliveryFee === 0 ? "Free" : formatCurrency(deliveryFee)}</span>
        </div>
        <div className="h-px bg-black/5 dark:bg-white/10 my-1" />
        <div className="flex justify-between font-semibold text-base">
          <span>Total</span><span>{formatCurrency(total)}</span>
        </div>
      </div>

      <Button fullWidth size="lg" className="mt-5 mb-6" onClick={() => navigate("/checkout")}>
        Proceed to checkout
      </Button>
    </div>
  );
}
