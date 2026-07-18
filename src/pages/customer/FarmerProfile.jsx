import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ShieldCheck, MapPin, QrCode, MessageCircle, Heart } from "lucide-react";
import { motion } from "framer-motion";
import ProductCard from "../../components/customer/ProductCard";
import Rating from "../../components/ui/Rating";
import Button from "../../components/ui/Button";
import { getFarmerById, products } from "../../data/mockData";

export default function FarmerProfile() {
  const { farmerId } = useParams();
  const navigate = useNavigate();
  const farmer = getFarmerById(farmerId);
  const farmerProducts = products.filter((p) => p.farmerId === farmerId);

  if (!farmer) return null;

  return (
    <div className="max-w-4xl mx-auto pb-6">
      <div className="relative h-52 md:h-64">
        <img src={farmer.cover} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <button onClick={() => navigate(-1)} className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-soft" aria-label="Back">
          <ArrowLeft size={18} />
        </button>
        <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow-soft" aria-label="Save farmer">
          <Heart size={17} />
        </button>
      </div>

      <div className="px-4 md:px-8 -mt-10 relative">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-cardDark rounded-card shadow-lift p-5">
          <div className="flex items-start gap-4">
            <img src={farmer.avatar} alt={farmer.name} className="w-16 h-16 rounded-2xl object-cover border-4 border-white dark:border-cardDark -mt-9" />
            <div className="flex-1">
              <div className="flex items-center gap-1.5">
                <h1 className="font-display text-xl font-semibold">{farmer.name}</h1>
                {farmer.verified && <ShieldCheck size={17} className="text-primary" />}
              </div>
              <p className="text-xs text-ink/50 dark:text-white/50">By {farmer.owner} · Since {farmer.since}</p>
              <div className="flex items-center gap-3 mt-1.5">
                <Rating value={farmer.rating} reviews={farmer.reviews} />
                <span className="flex items-center gap-1 text-xs text-ink/50 dark:text-white/50"><MapPin size={12} /> {farmer.location}</span>
              </div>
            </div>
          </div>

          <p className="text-sm text-ink/65 dark:text-white/65 mt-4 leading-relaxed">{farmer.bio}</p>

          <div className="flex flex-wrap gap-2 mt-3">
            {farmer.specialties.map((s) => (
              <span key={s} className="text-xs font-medium px-3 py-1.5 rounded-pill bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:text-primary-200">{s}</span>
            ))}
          </div>

          <div className="flex gap-3 mt-5">
            <Button variant="outline" icon={MessageCircle} className="flex-1">Message</Button>
            <Button variant="secondary" icon={QrCode} className="flex-1">Scan farm QR</Button>
          </div>
        </motion.div>

        <h2 className="font-display text-lg font-semibold mt-7 mb-3.5">Produce from {farmer.name}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3.5">
          {farmerProducts.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </div>
  );
}
