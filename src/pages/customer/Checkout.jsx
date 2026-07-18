import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Wallet, CreditCard, Banknote, Check } from "lucide-react";
import Button from "../../components/ui/Button";
import { useApp } from "../../context/AppContext";
import { formatCurrency } from "../../utils/format";
import { cn } from "../../utils/cn";

const ADDRESSES = [
  { id: "a1", label: "Home", detail: "12, Kalakshetra Road, Thiruvanmiyur, Chennai 600041" },
  { id: "a2", label: "Work", detail: "4th Floor, Prestige Towers, OMR, Chennai 600096" },
];

const PAYMENTS = [
  { id: "upi", label: "UPI", detail: "Pay via Google Pay, PhonePe, etc.", icon: Wallet },
  { id: "card", label: "Card", detail: "Credit or debit card", icon: CreditCard },
  { id: "cod", label: "Cash on delivery", detail: "Pay when your order arrives", icon: Banknote },
];

export default function Checkout() {
  const navigate = useNavigate();
  const { cartTotal, cart } = useApp();
  const [address, setAddress] = useState("a1");
  const [payment, setPayment] = useState("upi");
  const [placing, setPlacing] = useState(false);

  const deliveryFee = cartTotal > 300 ? 0 : 25;
  const total = cartTotal + deliveryFee;

  const placeOrder = () => {
    setPlacing(true);
    setTimeout(() => navigate("/order-success"), 1200);
  };

  return (
    <div className="px-4 md:px-8 pt-4 max-w-2xl mx-auto pb-8">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-white dark:bg-cardDark shadow-soft flex items-center justify-center" aria-label="Back">
          <ArrowLeft size={18} />
        </button>
        <h1 className="font-display text-xl font-semibold">Checkout</h1>
      </div>

      <h2 className="text-sm font-semibold text-ink/70 dark:text-white/70 mb-2.5">Delivery address</h2>
      <div className="space-y-2.5 mb-6">
        {ADDRESSES.map((a) => (
          <button
            key={a.id}
            onClick={() => setAddress(a.id)}
            className={cn(
              "w-full flex items-start gap-3 text-left rounded-2xl p-4 border-2 transition-colors bg-white dark:bg-cardDark",
              address === a.id ? "border-primary" : "border-transparent shadow-soft"
            )}
          >
            <MapPin size={18} className="text-primary flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-semibold">{a.label}</p>
              <p className="text-xs text-ink/50 dark:text-white/50 mt-0.5">{a.detail}</p>
            </div>
            {address === a.id && <Check size={16} className="text-primary flex-shrink-0" />}
          </button>
        ))}
      </div>

      <h2 className="text-sm font-semibold text-ink/70 dark:text-white/70 mb-2.5">Payment method</h2>
      <div className="space-y-2.5 mb-6">
        {PAYMENTS.map(({ id, label, detail, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setPayment(id)}
            className={cn(
              "w-full flex items-center gap-3 text-left rounded-2xl p-4 border-2 transition-colors bg-white dark:bg-cardDark",
              payment === id ? "border-primary" : "border-transparent shadow-soft"
            )}
          >
            <div className="w-9 h-9 rounded-full bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0">
              <Icon size={16} className="text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold">{label}</p>
              <p className="text-xs text-ink/50 dark:text-white/50 mt-0.5">{detail}</p>
            </div>
            {payment === id && <Check size={16} className="text-primary flex-shrink-0" />}
          </button>
        ))}
      </div>

      <div className="bg-white dark:bg-cardDark rounded-2xl shadow-soft p-4 space-y-2 text-sm mb-6">
        <div className="flex justify-between text-ink/60 dark:text-white/60"><span>Items ({cart.reduce((s, i) => s + i.qty, 0)})</span><span>{formatCurrency(cartTotal)}</span></div>
        <div className="flex justify-between text-ink/60 dark:text-white/60"><span>Delivery fee</span><span>{deliveryFee === 0 ? "Free" : formatCurrency(deliveryFee)}</span></div>
        <div className="h-px bg-black/5 dark:bg-white/10 my-1" />
        <div className="flex justify-between font-semibold text-base"><span>Total</span><span>{formatCurrency(total)}</span></div>
      </div>

      <Button fullWidth size="lg" loading={placing} onClick={placeOrder}>
        {placing ? "Placing order…" : `Place order · ${formatCurrency(total)}`}
      </Button>
    </div>
  );
}
