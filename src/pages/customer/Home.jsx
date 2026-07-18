import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { MapPin, ChevronDown, Bell, Zap } from "lucide-react";
import { SearchBar, SectionHeader, CategoryCard } from "../../components/customer/Misc";
import ProductCard from "../../components/customer/ProductCard";
import FarmerCard from "../../components/customer/FarmerCard";
import { categories, products, farmers, banners } from "../../data/mockData";

export default function Home() {
  const navigate = useNavigate();
  const [bannerIndex, setBannerIndex] = useState(0);
  const banner = banners[bannerIndex];

  const freshPicks = products.filter((p) => p.tag === "Today's Fresh Pick");
  const flashDeals = products.filter((p) => p.tag === "Flash Deal");
  const seasonal = products.filter((p) => p.tag === "Seasonal");
  const organic = products.filter((p) => p.organic);
  const topRated = [...farmers].sort((a, b) => b.rating - a.rating);

  return (
    <div className="px-4 md:px-8 pt-4 md:pt-6 max-w-7xl mx-auto">
      {/* Mobile-only top bar */}
      <div className="flex items-center justify-between mb-4 md:hidden">
        <button className="flex items-center gap-1 text-sm font-semibold">
          <MapPin size={16} className="text-primary" />
          Thiruvanmiyur, Chennai
          <ChevronDown size={14} className="text-ink/40" />
        </button>
        <button onClick={() => navigate("/notifications")} className="w-9 h-9 rounded-full bg-white dark:bg-cardDark shadow-soft flex items-center justify-center" aria-label="Notifications">
          <Bell size={16} />
        </button>
      </div>

      <div className="mb-5 md:hidden">
        <SearchBar onClick={() => navigate("/search")} />
      </div>

      {/* Hero banner */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        key={banner.id}
        className="relative rounded-card overflow-hidden h-44 md:h-64 mb-7"
      >
        <img src={banner.image} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-10 max-w-sm">
          <span className="text-accent text-xs font-bold uppercase tracking-wide mb-1.5">Seasonal banner</span>
          <h2 className="font-display text-white text-2xl md:text-3xl font-semibold leading-tight">{banner.title}</h2>
          <p className="text-white/80 text-sm mt-1.5 mb-4">{banner.subtitle}</p>
          <button
            onClick={() => navigate("/search")}
            className="self-start bg-white text-ink text-sm font-semibold px-5 py-2.5 rounded-pill shadow-lift"
          >
            {banner.cta}
          </button>
        </div>
        <div className="absolute bottom-3 right-4 flex gap-1.5">
          {banners.map((b, i) => (
            <button
              key={b.id}
              onClick={() => setBannerIndex(i)}
              className={`h-1.5 rounded-full transition-all ${i === bannerIndex ? "w-6 bg-white" : "w-1.5 bg-white/50"}`}
              aria-label={`Banner ${i + 1}`}
            />
          ))}
        </div>
      </motion.div>

      {/* Categories */}
      <section className="mb-8">
        <SectionHeader title="Categories" onAction={() => navigate("/categories")} />
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-1">
          {categories.map((c) => <CategoryCard key={c.id} category={c} />)}
        </div>
      </section>

      {/* Flash deals */}
      <section className="mb-8">
        <div className="flex items-center gap-2 mb-3.5">
          <div className="w-7 h-7 rounded-full bg-accent-50 flex items-center justify-center">
            <Zap size={14} className="text-accent-600 fill-accent-600" />
          </div>
          <h2 className="font-display text-[19px] font-semibold">Flash Deals</h2>
          <span className="text-xs font-semibold text-clay ml-1">Ends in 2h 14m</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
          {flashDeals.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Nearby farmers */}
      <section className="mb-8">
        <SectionHeader title="Nearby Farmers" subtitle="Verified growers within 15km" onAction={() => navigate("/search")} />
        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-1">
          {farmers.map((f) => <FarmerCard key={f.id} farmer={f} compact />)}
        </div>
      </section>

      {/* Today's fresh picks */}
      <section className="mb-8">
        <SectionHeader title="Today's Fresh Picks" subtitle="Harvested within 24 hours" onAction={() => navigate("/category/veg")} />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
          {freshPicks.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Seasonal */}
      <section className="mb-8">
        <SectionHeader title="Seasonal Products" onAction={() => navigate("/search")} />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
          {seasonal.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Organic */}
      <section className="mb-8">
        <SectionHeader title="Organic Products" onAction={() => navigate("/search")} />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
          {organic.slice(0, 4).map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Top rated farmers */}
      <section className="mb-8">
        <SectionHeader title="Top Rated Farmers" onAction={() => navigate("/search")} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {topRated.map((f) => <FarmerCard key={f.id} farmer={f} />)}
        </div>
      </section>

      {/* Recommended */}
      <section className="mb-8">
        <SectionHeader title="Recommended For You" subtitle="Picked by our AI based on your taste" onAction={() => navigate("/search")} />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
          {products.slice(0, 4).map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </section>

      {/* Recently viewed */}
      <section className="mb-4">
        <SectionHeader title="Recently Viewed" onAction={() => navigate("/search")} />
        <div className="flex gap-3.5 overflow-x-auto no-scrollbar pb-1">
          {products.slice(2, 6).map((p) => (
            <div key={p.id} className="w-40 flex-shrink-0"><ProductCard product={p} /></div>
          ))}
        </div>
      </section>
    </div>
  );
}
