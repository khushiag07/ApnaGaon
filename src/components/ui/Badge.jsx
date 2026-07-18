import { Leaf, ShieldCheck, MapPin } from "lucide-react";
import { cn } from "../../utils/cn";
import { formatDistance } from "../../utils/format";

/** Generic pill badge. */
export function Badge({ children, tone = "neutral", className }) {
  const tones = {
    neutral: "bg-black/5 text-ink dark:bg-white/10 dark:text-white",
    primary: "bg-primary-50 text-primary-700 dark:bg-primary-900/50 dark:text-primary-200",
    accent: "bg-accent-50 text-accent-600",
    white: "bg-white/90 text-ink shadow-soft backdrop-blur",
  };
  return (
    <span className={cn("inline-flex items-center gap-1 rounded-pill px-2.5 py-1 text-[11px] font-semibold", tones[tone], className)}>
      {children}
    </span>
  );
}

export function OrganicBadge({ className }) {
  return (
    <Badge tone="primary" className={className}>
      <Leaf size={12} strokeWidth={2.5} /> Organic
    </Badge>
  );
}

export function VerifiedBadge({ className }) {
  return (
    <Badge tone="primary" className={className}>
      <ShieldCheck size={12} strokeWidth={2.5} /> Verified
    </Badge>
  );
}

export function DistanceBadge({ km, className }) {
  return (
    <Badge tone="white" className={className}>
      <MapPin size={12} strokeWidth={2.5} /> {formatDistance(km)}
    </Badge>
  );
}

/**
 * Freshness Meter — FarmConnect's signature element.
 * A small radial gauge showing how recently a product was harvested,
 * rendered as a ring so it reads at a glance across dense grids.
 */
export function FreshnessMeter({ value = 90, size = 34 }) {
  const radius = (size - 4) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  const color = value >= 90 ? "#2E7D32" : value >= 75 ? "#FFC107" : "#B5622C";

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }} role="img" aria-label={`Freshness ${value} percent`}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="white" fillOpacity={0.9} stroke="#E7EFE6" strokeWidth="3" />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 700ms ease" }}
        />
      </svg>
      <span className="absolute text-[9px] font-bold" style={{ color }}>{value}</span>
    </div>
  );
}
