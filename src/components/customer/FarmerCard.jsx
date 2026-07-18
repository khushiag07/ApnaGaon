import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Card } from "../ui/Primitives";
import { VerifiedBadge, DistanceBadge } from "../ui/Badge";
import Rating from "../ui/Rating";

export default function FarmerCard({ farmer, compact = false }) {
  const navigate = useNavigate();

  if (compact) {
    return (
      <motion.button
        whileHover={{ y: -3 }}
        onClick={() => navigate(`/farmer/${farmer.id}`)}
        className="flex-shrink-0 w-32 text-left"
      >
        <div className="relative w-32 h-32 rounded-card overflow-hidden shadow-soft">
          <img src={farmer.avatar} alt={farmer.name} className="w-full h-full object-cover" />
          {farmer.verified && <div className="absolute top-2 left-2"><VerifiedBadge /></div>}
        </div>
        <p className="mt-2 text-sm font-semibold line-clamp-1">{farmer.name}</p>
        <Rating value={farmer.rating} reviews={farmer.reviews} size={11} className="mt-0.5" />
      </motion.button>
    );
  }

  return (
    <motion.div whileHover={{ y: -4 }}>
      <Card className="overflow-hidden cursor-pointer" onClick={() => navigate(`/farmer/${farmer.id}`)}>
        <div className="relative h-28">
          <img src={farmer.cover} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <div className="absolute top-3 right-3"><DistanceBadge km={farmer.distanceKm} /></div>
          <img
            src={farmer.avatar}
            alt={farmer.name}
            className="absolute -bottom-6 left-4 w-14 h-14 rounded-full border-4 border-white dark:border-cardDark object-cover"
          />
        </div>
        <div className="pt-9 pb-4 px-4">
          <div className="flex items-center gap-1.5">
            <h3 className="font-semibold text-[15px]">{farmer.name}</h3>
            {farmer.verified && <VerifiedBadge />}
          </div>
          <p className="text-xs text-ink/50 dark:text-white/50 mt-0.5">{farmer.location}</p>
          <div className="flex items-center justify-between mt-2">
            <Rating value={farmer.rating} reviews={farmer.reviews} />
            <span className="text-xs text-ink/45 dark:text-white/45">Since {farmer.since}</span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
