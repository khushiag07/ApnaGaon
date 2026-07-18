import { NavLink } from "react-router-dom";
import { Home, Search, Heart, ShoppingCart, User, Bell, Settings, LifeBuoy, Sprout } from "lucide-react";
import { useApp } from "../../context/AppContext";

const LINKS = [
  { to: "/", label: "Home", icon: Home, end: true },
  { to: "/search", label: "Search", icon: Search },
  { to: "/wishlist", label: "Saved", icon: Heart },
  { to: "/cart", label: "Cart", icon: ShoppingCart },
  { to: "/orders", label: "Orders", icon: LifeBuoy },
  { to: "/notifications", label: "Notifications", icon: Bell },
  { to: "/profile", label: "Profile", icon: User },
  { to: "/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const { cartCount } = useApp();
  return (
    <aside className="hidden md:flex md:flex-col md:w-64 lg:w-72 md:h-screen md:sticky md:top-0 border-r border-black/[0.04] dark:border-white/5 bg-white dark:bg-cardDark px-4 py-6">
      <div className="flex items-center gap-2 px-2 mb-8">
        <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
          <Sprout size={18} className="text-white" />
        </div>
        <span className="font-display font-semibold text-lg">FarmConnect</span>
      </div>
      <nav className="flex-1 flex flex-col gap-1">
        {LINKS.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `relative flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                isActive
                  ? "bg-primary-50 text-primary-700 dark:bg-primary-900/40 dark:text-primary-200"
                  : "text-ink/60 dark:text-white/60 hover:bg-black/[0.03] dark:hover:bg-white/5"
              }`
            }
          >
            <Icon size={18} strokeWidth={2} />
            {label}
            {to === "/cart" && cartCount > 0 && (
              <span className="ml-auto bg-accent text-ink text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </NavLink>
        ))}
      </nav>
      <div className="rounded-2xl bg-primary-50 dark:bg-primary-900/30 p-4 mt-4">
        <p className="text-xs font-semibold text-primary-700 dark:text-primary-200">Get the app</p>
        <p className="text-[11px] text-ink/50 dark:text-white/50 mt-1">Track deliveries live on iOS & Android.</p>
      </div>
    </aside>
  );
}
