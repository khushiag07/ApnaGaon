import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Phone, MessageCircle, Package, CheckCircle2, Bike, Home as HomeIcon } from "lucide-react";
import Button from "../../components/ui/Button";
import Rating from "../../components/ui/Rating";
import { orders, getFarmerById } from "../../data/mockData";

const STEPS = [
  { key: "placed", label: "Order placed", icon: Package },
  { key: "packed", label: "Packed by farmer", icon: CheckCircle2 },
  { key: "out_for_delivery", label: "Out for delivery", icon: Bike },
  { key: "delivered", label: "Delivered", icon: HomeIcon },
];

export default function TrackDelivery() {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const order = orders.find((o) => o.id === orderId) || orders[0];
  const farmer = getFarmerById(order.farmerId);
  const [progress, setProgress] = useState(62);

  useEffect(() => {
    const t = setInterval(() => setProgress((p) => Math.min(92, p + 2)), 1800);
    return () => clearInterval(t);
  }, []);

  const activeIndex = 2;

  return (
    <div className="max-w-2xl mx-auto pb-8">
      {/* Pseudo live map */}
      <div className="relative h-72 md:h-80 md:rounded-card md:mt-6 overflow-hidden bg-gradient-to-br from-primary-100 to-primary-50 dark:from-primary-900/40 dark:to-cardDark">
        <svg className="absolute inset-0 w-full h-full opacity-40" viewBox="0 0 400 300">
          <path d="M0,80 C100,40 150,150 220,120 S 340,60 400,100" stroke="#2E7D32" strokeWidth="4" fill="none" strokeDasharray="2 10" strokeLinecap="round" />
          <path d="M0,220 C120,260 220,180 400,230" stroke="#2E7D32" strokeWidth="3" fill="none" strokeDasharray="2 10" strokeLinecap="round" />
        </svg>
        <motion.div
          className="absolute w-8 h-8 rounded-full bg-primary shadow-lift flex items-center justify-center text-white"
          style={{ left: `${20 + progress * 0.55}%`, top: `${55 - progress * 0.25}%` }}
          animate={{ scale: [1, 1.12, 1] }}
          transition={{ repeat: Infinity, duration: 1.6 }}
        >
          <Bike size={16} />
        </motion.div>
        <div className="absolute" style={{ left: "78%", top: "32%" }}>
          <div className="w-6 h-6 rounded-full bg-ink flex items-center justify-center text-white shadow-lift"><HomeIcon size={12} /></div>
        </div>
        <button onClick={() => navigate(-1)} className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-soft" aria-label="Back">
          <ArrowLeft size={18} />
        </button>
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur rounded-2xl px-4 py-2.5 shadow-soft text-center">
          <p className="text-[10px] text-ink/50">Arriving in</p>
          <p className="text-sm font-bold text-primary">{order.eta || "12 min"}</p>
        </div>
      </div>

      <div className="px-4 md:px-8 -mt-6 relative">
        <div className="bg-white dark:bg-cardDark rounded-card shadow-lift p-5">
          {/* Driver info */}
          {order.deliveryPartner && (
            <div className="flex items-center gap-3 pb-4 border-b border-black/5 dark:border-white/10">
              <img src={order.deliveryPartner.avatar} alt={order.deliveryPartner.name} className="w-12 h-12 rounded-full object-cover" />
              <div className="flex-1">
                <p className="font-semibold text-sm">{order.deliveryPartner.name}</p>
                <p className="text-xs text-ink/45 dark:text-white/45">{order.deliveryPartner.vehicle}</p>
                <Rating value={order.deliveryPartner.rating} showCount={false} size={11} className="mt-0.5" />
              </div>
              <div className="flex gap-2">
                <button className="w-10 h-10 rounded-full bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center" aria-label="Call driver">
                  <Phone size={16} className="text-primary" />
                </button>
                <button className="w-10 h-10 rounded-full bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center" aria-label="Message driver">
                  <MessageCircle size={16} className="text-primary" />
                </button>
              </div>
            </div>
          )}

          {/* Timeline */}
          <div className="py-5">
            {STEPS.map((s, i) => (
              <div key={s.key} className="flex gap-3.5">
                <div className="flex flex-col items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${i <= activeIndex ? "bg-primary text-white" : "bg-black/5 dark:bg-white/10 text-ink/30"}`}>
                    <s.icon size={14} />
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className="w-0.5 flex-1 min-h-[28px] my-0.5 relative overflow-hidden rounded-full bg-black/5 dark:bg-white/10">
                      {i < activeIndex && <motion.div initial={{ height: 0 }} animate={{ height: "100%" }} className="w-full bg-primary absolute top-0" />}
                    </div>
                  )}
                </div>
                <div className={`pb-7 ${i > activeIndex ? "opacity-40" : ""}`}>
                  <p className="text-sm font-semibold">{s.label}</p>
                  {i === activeIndex && <p className="text-xs text-primary mt-0.5">In progress…</p>}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-black/5 dark:border-white/10 pt-4">
            <p className="text-xs font-semibold text-ink/50 dark:text-white/50 mb-2">Order {order.id} · {farmer?.name}</p>
            <Button fullWidth variant="danger" size="sm">Cancel order</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
