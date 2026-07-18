import { MapPin, ChevronDown, Bell, User } from "lucide-react";
import { SearchBar } from "./Misc";
import { useNavigate, useLocation } from "react-router-dom";

export default function TopBar({ onLogin, onSignup }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header className="hidden md:flex items-center gap-4 px-8 py-5 border-b border-black/[0.04] dark:border-white/5">

      {/* Location */}
      <button className="flex items-center gap-1.5 text-sm font-semibold flex-shrink-0">
        <MapPin size={16} className="text-primary" />
        Thiruvanmiyur, Chennai
        <ChevronDown size={14} className="text-ink/40" />
      </button>

      {/* Search */}
      {location.pathname !== "/search" && (
        <div className="max-w-md w-full">
          <SearchBar onClick={() => navigate("/search")} />
        </div>
      )}

      {/* Right Side */}
      <div className="ml-auto flex items-center gap-3">

        {/* Login */}
        <button
          onClick={onLogin}
          className="rounded-xl border border-green-700 px-5 py-2 text-sm font-medium text-green-700 hover:bg-green-50 transition"
        >
          Login
        </button>

        {/* Signup */}
        <button
          onClick={onSignup}
          className="rounded-xl bg-green-700 px-5 py-2 text-sm font-medium text-white hover:bg-green-800 transition"
        >
          Sign Up
        </button>

        {/* Notification */}
        <button
          onClick={() => navigate("/notifications")}
          className="w-10 h-10 rounded-full bg-black/[0.03] dark:bg-white/5 flex items-center justify-center"
          aria-label="Notifications"
        >
          <Bell size={17} />
        </button>

      </div>
    </header>
  );
}