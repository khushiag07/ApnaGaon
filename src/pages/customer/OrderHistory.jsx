import { useNavigate } from "react-router-dom";
import { Package, RotateCcw } from "lucide-react";
import Button from "../../components/ui/Button";
import { Badge } from "../../components/ui/Badge";
import { orders, getFarmerById, getProductById } from "../../data/mockData";
import { formatCurrency } from "../../utils/format";

const STATUS_LABEL = {
  out_for_delivery: { label: "Out for delivery", tone: "primary" },
  delivered: { label: "Delivered", tone: "neutral" },
};

export default function OrderHistory() {
  const navigate = useNavigate();

  return (
    <div className="px-4 md:px-8 pt-6 max-w-3xl mx-auto pb-6">
      <h1 className="font-display text-2xl font-semibold mb-1">Your orders</h1>
      <p className="text-sm text-ink/50 dark:text-white/50 mb-6">{orders.length} orders placed</p>

      <div className="space-y-3.5">
        {orders.map((o) => {
          const farmer = getFarmerById(o.farmerId);
          const status = STATUS_LABEL[o.status];
          return (
            <div key={o.id} className="bg-white dark:bg-cardDark rounded-2xl shadow-soft p-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center">
                    <Package size={17} className="text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-sm">{o.id}</p>
                    <p className="text-xs text-ink/45 dark:text-white/45">{farmer?.name} · {new Date(o.placedAt).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}</p>
                  </div>
                </div>
                <Badge tone={status.tone}>{status.label}</Badge>
              </div>

              <div className="flex items-center gap-2 mt-3 overflow-x-auto no-scrollbar">
                {o.items.map((item) => {
                  const p = getProductById(item.productId);
                  return p ? <img key={item.productId} src={p.image} alt={p.name} className="w-11 h-11 rounded-lg object-cover flex-shrink-0" /> : null;
                })}
              </div>

              <div className="flex items-center justify-between mt-3.5 pt-3.5 border-t border-black/5 dark:border-white/10">
                <span className="font-semibold text-sm">{formatCurrency(o.total)}</span>
                <div className="flex gap-2">
                  {o.status === "out_for_delivery" ? (
                    <Button size="sm" onClick={() => navigate(`/track/${o.id}`)}>Track order</Button>
                  ) : (
                    <Button size="sm" variant="outline" icon={RotateCcw}>Reorder</Button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
