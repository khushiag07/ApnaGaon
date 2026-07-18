import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sprout } from "lucide-react";

export default function Splash() {
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => navigate("/login"), 1900);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-primary relative overflow-hidden">
      <motion.div
        className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-white/10"
        animate={{ scale: [1, 1.08, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-28 -left-20 w-80 h-80 rounded-full bg-white/10"
        animate={{ scale: [1, 1.12, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        initial={{ scale: 0.6, opacity: 0, rotate: -8 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 180, damping: 14 }}
        className="w-20 h-20 rounded-3xl bg-white flex items-center justify-center shadow-lift"
      >
        <Sprout size={38} className="text-primary" strokeWidth={2} />
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="font-display text-3xl font-semibold text-white mt-5 tracking-tight"
      >
        FarmConnect
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.55, duration: 0.5 }}
        className="text-primary-50 text-sm mt-2"
      >
        From the farm to your door, today
      </motion.p>
      <motion.div
        className="absolute bottom-16 h-1 w-32 rounded-full bg-white/25 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <motion.div
          className="h-full bg-white rounded-full"
          initial={{ x: "-100%" }}
          animate={{ x: "0%" }}
          transition={{ duration: 1.4, delay: 0.7, ease: "easeInOut" }}
        />
      </motion.div>
    </div>
  );
}
