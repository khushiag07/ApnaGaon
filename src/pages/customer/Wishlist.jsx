import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import ProductCard from "../../components/customer/ProductCard";
import { EmptyState } from "../../components/ui/Primitives";
import Button from "../../components/ui/Button";
import { useApp } from "../../context/AppContext";
import { products } from "../../data/mockData";

export default function Wishlist() {
  const navigate = useNavigate();
  const { wishlist } = useApp();
  const items = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="px-4 md:px-8 pt-6 max-w-6xl mx-auto">
      <h1 className="font-display text-2xl font-semibold mb-1">Saved items</h1>
      <p className="text-sm text-ink/50 dark:text-white/50 mb-6">{items.length} items you're keeping an eye on</p>

      {items.length === 0 ? (
        <EmptyState
          icon={Heart}
          title="Nothing saved yet"
          description="Tap the heart icon on any product to save it here for later."
          action={<Button onClick={() => navigate("/")}>Explore products</Button>}
        />
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5 pb-6">
          {items.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </div>
  );
}
