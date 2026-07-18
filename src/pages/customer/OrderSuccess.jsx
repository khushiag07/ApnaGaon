import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Button from "../../components/ui/Button";
import { useApp } from "../../context/AppContext";

export default function OrderSuccess() {
  const navigate = useNavigate();
  const { cartDetailed } = useApp();

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 text-center max-w-sm mx-auto">
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 14 }}
        className="w-24 h-24 rounded-full bg-primary flex items-center justify-center shadow-lift"
      >
        <motion.div initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.3, duration: 0.4 }}>
          <Check size={44} className="text-white" strokeWidth={3} />
        </motion.div>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="font-display text-2xl font-semibold mt-6"
      >
        Order placed!
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="text-sm text-ink/55 dark:text-white/55 mt-2"
      >
        Your fresh produce is being prepared for delivery. You'll get an update the moment it's on the way.
      </motion.p>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }} className="flex flex-col gap-3 w-full mt-8">
        <Button fullWidth size="lg" onClick={() => navigate("/track/ORD-10234")}>Track delivery</Button>
        <Button fullWidth variant="ghost" onClick={() => navigate("/")}>Back to home</Button>
      </motion.div>
    </div>
  );
}
