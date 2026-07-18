import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Phone, Sprout, Apple, Globe } from "lucide-react";
import Button from "../../components/ui/Button";

export default function Login() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");

  const canContinue = phone.replace(/\D/g, "").length === 10;

  return (
    <div className="min-h-screen flex flex-col bg-surface dark:bg-surfaceDark px-6 pt-14 pb-8 max-w-md mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-14 h-14 rounded-2xl bg-primary flex items-center justify-center shadow-soft mb-8"
      >
        <Sprout size={26} className="text-white" />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
        <h1 className="font-display text-[28px] font-semibold leading-tight">Fresh from the farm,<br />straight to you.</h1>
        <p className="text-ink/55 dark:text-white/55 text-sm mt-2">Enter your mobile number to sign in or create an account.</p>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }} className="mt-10">
        <label htmlFor="phone" className="text-xs font-semibold text-ink/60 dark:text-white/60">Mobile number</label>
        <div className="mt-2 flex items-center gap-2 bg-white dark:bg-cardDark rounded-2xl px-4 py-3.5 shadow-soft border border-black/[0.03] dark:border-white/5 focus-within:ring-2 focus-within:ring-primary/30">
          <Phone size={18} className="text-ink/40 dark:text-white/40" />
          <span className="text-sm font-medium text-ink/60 dark:text-white/60">+91</span>
          <input
            id="phone"
            type="tel"
            inputMode="numeric"
            maxLength={10}
            placeholder="98765 43210"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, ""))}
            className="flex-1 bg-transparent outline-none text-sm font-medium placeholder:text-ink/30"
          />
        </div>

        <Button
          fullWidth
          size="lg"
          className="mt-6"
          disabled={!canContinue}
          onClick={() => navigate("/otp", { state: { phone } })}
        >
          Continue
        </Button>

        <div className="flex items-center gap-3 my-6">
          <div className="h-px bg-black/10 dark:bg-white/10 flex-1" />
          <span className="text-xs text-ink/40 dark:text-white/40">or continue with</span>
          <div className="h-px bg-black/10 dark:bg-white/10 flex-1" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <Button variant="outline" icon={Globe} onClick={() => navigate("/")}>Google</Button>
          <Button variant="outline" icon={Apple} onClick={() => navigate("/")}>Apple</Button>
        </div>
      </motion.div>

      <p className="text-[11px] text-ink/40 dark:text-white/40 text-center mt-auto pt-10">
        By continuing, you agree to FarmConnect's Terms of Service and Privacy Policy.
      </p>
    </div>
  );
}
