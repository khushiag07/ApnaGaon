import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, MapPin, Bell, Lock, Globe, Trash2, Plus } from "lucide-react";
import { useApp } from "../../context/AppContext";

function Toggle({ checked, onChange }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`w-11 h-6 rounded-full transition-colors relative flex-shrink-0 ${checked ? "bg-primary" : "bg-black/10 dark:bg-white/10"}`}
      aria-checked={checked}
      role="switch"
    >
      <span className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform ${checked ? "translate-x-5" : "translate-x-0.5"}`} />
    </button>
  );
}

export default function Settings() {
  const navigate = useNavigate();
  const { darkMode, setDarkMode } = useApp();
  const [pushEnabled, setPushEnabled] = useState(true);
  const [dealAlerts, setDealAlerts] = useState(true);
  const [orderUpdates, setOrderUpdates] = useState(true);

  return (
    <div className="px-4 md:px-8 pt-4 max-w-2xl mx-auto pb-6">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full bg-white dark:bg-cardDark shadow-soft flex items-center justify-center" aria-label="Back">
          <ArrowLeft size={18} />
        </button>
        <h1 className="font-display text-xl font-semibold">Settings</h1>
      </div>

      <h2 className="text-xs font-semibold uppercase tracking-wide text-ink/40 dark:text-white/40 mb-2.5">Addresses</h2>
      <div className="bg-white dark:bg-cardDark rounded-card shadow-soft mb-6 overflow-hidden">
        {["Home · 12, Kalakshetra Road, Thiruvanmiyur", "Work · Prestige Towers, OMR"].map((a, i) => (
          <div key={a} className={`flex items-center gap-3 px-5 py-4 ${i === 0 ? "border-b border-black/5 dark:border-white/10" : ""}`}>
            <MapPin size={17} className="text-primary" />
            <span className="flex-1 text-sm">{a}</span>
          </div>
        ))}
        <button className="flex items-center gap-2 px-5 py-4 text-sm font-semibold text-primary border-t border-black/5 dark:border-white/10 w-full">
          <Plus size={16} /> Add new address
        </button>
      </div>

      <h2 className="text-xs font-semibold uppercase tracking-wide text-ink/40 dark:text-white/40 mb-2.5">Preferences</h2>
      <div className="bg-white dark:bg-cardDark rounded-card shadow-soft mb-6 divide-y divide-black/5 dark:divide-white/10">
        <div className="flex items-center gap-3 px-5 py-4">
          <Globe size={17} className="text-primary" />
          <span className="flex-1 text-sm font-medium">Dark mode</span>
          <Toggle checked={darkMode} onChange={setDarkMode} />
        </div>
        <div className="flex items-center gap-3 px-5 py-4">
          <Bell size={17} className="text-primary" />
          <span className="flex-1 text-sm font-medium">Push notifications</span>
          <Toggle checked={pushEnabled} onChange={setPushEnabled} />
        </div>
        <div className="flex items-center gap-3 px-5 py-4">
          <Bell size={17} className="text-primary" />
          <span className="flex-1 text-sm font-medium">Deal alerts</span>
          <Toggle checked={dealAlerts} onChange={setDealAlerts} />
        </div>
        <div className="flex items-center gap-3 px-5 py-4">
          <Bell size={17} className="text-primary" />
          <span className="flex-1 text-sm font-medium">Order updates</span>
          <Toggle checked={orderUpdates} onChange={setOrderUpdates} />
        </div>
      </div>

      <h2 className="text-xs font-semibold uppercase tracking-wide text-ink/40 dark:text-white/40 mb-2.5">Security</h2>
      <div className="bg-white dark:bg-cardDark rounded-card shadow-soft mb-6">
        <button className="flex items-center gap-3 px-5 py-4 w-full text-left">
          <Lock size={17} className="text-primary" />
          <span className="flex-1 text-sm font-medium">Change PIN</span>
        </button>
      </div>

      <button className="flex items-center gap-2 text-sm font-semibold text-red-500 px-1">
        <Trash2 size={16} /> Delete account
      </button>
    </div>
  );
}
