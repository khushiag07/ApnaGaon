import { MapPin, ChevronDown, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { SearchBar } from "./Misc";

export default function TopBar() {
  const navigate = useNavigate();
  return (
    <header className="hidden md:flex items-center gap-4 px-8 py-5 border-b border-black/[0.04] dark:border-white/5">
      <button className="flex items-center gap-1.5 text-sm font-semibold flex-shrink-0">
        <MapPin size={16} className="text-primary" />
        Thiruvanmiyur, Chennai
        <ChevronDown size={14} className="text-ink/40" />
      </button>
      <div className="max-w-md w-full">
        <SearchBar onClick={() => navigate("/search")} />
      </div>
      <button
        onClick={() => navigate("/notifications")}
        className="ml-auto w-10 h-10 rounded-full bg-black/[0.03] dark:bg-white/5 flex items-center justify-center"
        aria-label="Notifications"
      >
        <Bell size={17} />
      </button>
    </header>
  );
}
