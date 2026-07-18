import { NavLink } from "react-router-dom";
import { Home, Search, Heart, ShoppingCart, User } from "lucide-react";
import { motion } from "framer-motion";
import { useApp } from "../../context/AppContext";

const TABS = [
  { to: "/", label: "Home", icon: Home, end: true },
  { to: "/search", label: "Search", icon: Search },
  { to: "/wishlist", label: "Saved", icon: Heart },
  { to: "/cart", label: "Cart", icon: ShoppingCart },
  { to: "/profile", label: "Profile", icon: User },
];

export default function BottomNav() {
  const { cartCount } = useApp();
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/90 dark:bg-cardDark/90 backdrop-blur-lg border-t border-black/[0.04] dark:border-white/5 safe-bottom md:hidden"
      aria-label="Primary"
    >
      <ul className="flex items-stretch justify-between px-2">
        {TABS.map(({ to, label, icon: Icon, end }) => (
          <li key={to} className="flex-1">
            <NavLink
              to={to}
              end={end}
              className="relative flex flex-col items-center gap-1 py-2.5 text-[10px] font-medium"
            >
              {({ isActive }) => (
                <>
                  <span className="relative">
                    <Icon
                      size={22}
                      strokeWidth={isActive ? 2.4 : 1.9}
                      className={isActive ? "text-primary" : "text-ink/40 dark:text-white/40"}
                    />
                    {to === "/cart" && cartCount > 0 && (
                      <span className="absolute -top-1.5 -right-2 bg-accent text-ink text-[9px] font-bold rounded-full w-4 h-4 flex items-center justify-center">
                        {cartCount}
                      </span>
                    )}
                  </span>
                  <span className={isActive ? "text-primary" : "text-ink/40 dark:text-white/40"}>{label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="bottomNavIndicator"
                      className="absolute -top-0.5 h-0.5 w-8 rounded-full bg-primary"
                    />
                  )}
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
