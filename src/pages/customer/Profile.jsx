import { useNavigate } from "react-router-dom";
import { ChevronRight, Package, Heart, MapPin, Bell, Settings, LifeBuoy, LogOut, Sprout } from "lucide-react";
import { useApp } from "../../context/AppContext";

const MENU = [
  { icon: Package, label: "My orders", to: "/orders" },
  { icon: Heart, label: "Saved items", to: "/wishlist" },
  { icon: MapPin, label: "Saved addresses", to: "/settings" },
  { icon: Bell, label: "Notifications", to: "/notifications" },
  { icon: Settings, label: "Settings", to: "/settings" },
  { icon: LifeBuoy, label: "Help & support", to: "/support" },
];

export default function Profile() {
  const navigate = useNavigate();
  const { darkMode, setDarkMode } = useApp();

  return (
    <div className="px-4 md:px-8 pt-6 max-w-2xl mx-auto pb-6">
      <div className="flex items-center gap-4 bg-white dark:bg-cardDark rounded-card shadow-soft p-5 mb-6">
        <img src="https://i.pravatar.cc/150?img=68" alt="Profile" className="w-16 h-16 rounded-full object-cover" />
        <div className="flex-1">
          <h1 className="font-display text-lg font-semibold">Ananya Rao</h1>
          <p className="text-xs text-ink/50 dark:text-white/50">+91 98765 43210</p>
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-primary-700 bg-primary-50 dark:bg-primary-900/30 dark:text-primary-200 rounded-pill px-2.5 py-1 mt-2">
            <Sprout size={11} /> FarmConnect Plus member
          </span>
        </div>
      </div>

      <div className="bg-white dark:bg-cardDark rounded-card shadow-soft overflow-hidden mb-6">
        {MENU.map(({ icon: Icon, label, to }, i) => (
          <button
            key={label}
            onClick={() => navigate(to)}
            className={`w-full flex items-center gap-3 px-5 py-4 text-left ${i !== MENU.length - 1 ? "border-b border-black/5 dark:border-white/10" : ""}`}
          >
            <Icon size={18} className="text-primary" />
            <span className="flex-1 text-sm font-medium">{label}</span>
            <ChevronRight size={16} className="text-ink/30" />
          </button>
        ))}
      </div>

      <div className="bg-white dark:bg-cardDark rounded-card shadow-soft flex items-center justify-between px-5 py-4 mb-6">
        <span className="text-sm font-medium">Dark mode</span>
        <button
          onClick={() => setDarkMode(!darkMode)}
          className={`w-11 h-6 rounded-full transition-colors relative ${darkMode ? "bg-primary" : "bg-black/10"}`}
          aria-label="Toggle dark mode"
        >
          <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${darkMode ? "translate-x-5" : "translate-x-0.5"}`} />
        </button>
      </div>

      <button className="w-full flex items-center justify-center gap-2 text-sm font-semibold text-red-500 py-3">
        <LogOut size={16} /> Log out
      </button>
    </div>
  );
}
