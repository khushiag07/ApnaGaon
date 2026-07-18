import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronDown, MessageCircle, Phone, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "../../components/ui/Button";

const FAQS = [
  { q: "How do I track my order?", a: "Go to Orders from your profile and tap Track order on any active delivery to see live location and ETA." },
  { q: "What if my produce arrives damaged?", a: "Report it within 24 hours from the order details page and we'll issue a full refund or replacement." },
  { q: "How are farmers verified?", a: "Every farmer completes a farm visit and document check before receiving the verified badge." },
  { q: "Can I schedule recurring deliveries?", a: "Yes — open any product and choose Subscribe to set a daily or weekly delivery schedule." },
];

export default function Support() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(0);

  return (
    <div className="px-4 md:px-8 pt-4 max-w-2xl mx-auto pb-8">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-white dark:bg-cardDark shadow-soft flex items-center justify-center" aria-label="Back">
          <ArrowLeft size={18} />
        </button>
        <h1 className="font-display text-xl font-semibold">Help & support</h1>
      </div>

      <div className="grid grid-cols-3 gap-3 mb-7">
        <button className="flex flex-col items-center gap-2 bg-white dark:bg-cardDark rounded-2xl shadow-soft py-4">
          <MessageCircle size={19} className="text-primary" /><span className="text-xs font-semibold">Chat</span>
        </button>
        <button className="flex flex-col items-center gap-2 bg-white dark:bg-cardDark rounded-2xl shadow-soft py-4">
          <Phone size={19} className="text-primary" /><span className="text-xs font-semibold">Call us</span>
        </button>
        <button className="flex flex-col items-center gap-2 bg-white dark:bg-cardDark rounded-2xl shadow-soft py-4">
          <Mail size={19} className="text-primary" /><span className="text-xs font-semibold">Email</span>
        </button>
      </div>

      <h2 className="text-sm font-semibold mb-3">Frequently asked questions</h2>
      <div className="space-y-2.5 mb-7">
        {FAQS.map((f, i) => (
          <div key={f.q} className="bg-white dark:bg-cardDark rounded-2xl shadow-soft overflow-hidden">
            <button onClick={() => setOpen(open === i ? -1 : i)} className="w-full flex items-center justify-between px-4 py-3.5 text-left">
              <span className="text-sm font-medium pr-3">{f.q}</span>
              <ChevronDown size={16} className={`flex-shrink-0 transition-transform ${open === i ? "rotate-180 text-primary" : "text-ink/40"}`} />
            </button>
            <AnimatePresence>
              {open === i && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                  <p className="text-sm text-ink/55 dark:text-white/55 px-4 pb-4 leading-relaxed">{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      <div className="bg-primary-50 dark:bg-primary-900/30 rounded-card p-5 text-center">
        <p className="text-sm font-semibold mb-3">Still need help?</p>
        <Button size="sm">Start a conversation</Button>
      </div>
    </div>
  );
}
