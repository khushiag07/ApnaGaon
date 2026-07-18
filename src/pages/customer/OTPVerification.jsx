import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Button from "../../components/ui/Button";

export default function OTPVerification() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const phone = state?.phone || "98765 43210";
  const [digits, setDigits] = useState(["", "", "", ""]);
  const [seconds, setSeconds] = useState(30);
  const refs = useRef([]);

  useEffect(() => {
    if (seconds <= 0) return;
    const t = setInterval(() => setSeconds((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [seconds]);

  const handleChange = (i, val) => {
    if (!/^\d?$/.test(val)) return;
    const next = [...digits];
    next[i] = val;
    setDigits(next);
    if (val && i < 3) refs.current[i + 1]?.focus();
    if (next.every((d) => d) && i === 3) {
      setTimeout(() => navigate("/"), 400);
    }
  };

  const handleKeyDown = (i, e) => {
    if (e.key === "Backspace" && !digits[i] && i > 0) refs.current[i - 1]?.focus();
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface dark:bg-surfaceDark px-6 pt-6 pb-8 max-w-md mx-auto">
      <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-white dark:bg-cardDark shadow-soft flex items-center justify-center" aria-label="Back">
        <ArrowLeft size={18} />
      </button>

      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-10">
        <h1 className="font-display text-2xl font-semibold">Verify your number</h1>
        <p className="text-ink/55 dark:text-white/55 text-sm mt-2">
          We've sent a 4-digit code to <span className="font-semibold text-ink dark:text-white">+91 {phone}</span>
        </p>

        <div className="flex gap-3 mt-8">
          {digits.map((d, i) => (
            <input
              key={i}
              ref={(el) => (refs.current[i] = el)}
              value={d}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              inputMode="numeric"
              maxLength={1}
              className="w-14 h-16 text-center text-2xl font-semibold rounded-2xl bg-white dark:bg-cardDark shadow-soft border-2 border-transparent focus:border-primary outline-none"
              aria-label={`Digit ${i + 1}`}
            />
          ))}
        </div>

        <div className="mt-6 text-sm">
          {seconds > 0 ? (
            <span className="text-ink/45 dark:text-white/45">Resend code in 0:{seconds.toString().padStart(2, "0")}</span>
          ) : (
            <button onClick={() => setSeconds(30)} className="text-primary font-semibold">Resend code</button>
          )}
        </div>

        <Button fullWidth size="lg" className="mt-10" onClick={() => navigate("/")}>Verify & continue</Button>
      </motion.div>
    </div>
  );
}
