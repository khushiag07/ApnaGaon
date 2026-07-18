import { Star } from "lucide-react";
import { cn } from "../../utils/cn";

export default function Rating({ value, reviews, size = 13, showCount = true, className }) {
  return (
    <div className={cn("inline-flex items-center gap-1 text-ink dark:text-white", className)}>
      <Star size={size} className="fill-accent text-accent" strokeWidth={0} />
      <span className="text-sm font-semibold">{value?.toFixed(1)}</span>
      {showCount && reviews != null && (
        <span className="text-xs text-ink/50 dark:text-white/50">({reviews})</span>
      )}
    </div>
  );
}
