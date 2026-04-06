"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import {
  Search,
  SlidersHorizontal,
  Star,
  MapPin,
  Clock,
  Heart,
  ChevronDown,
  X,
  Grid3X3,
  List,
} from "lucide-react";

const categories = [
  "All",
  "Graphics & Design",
  "Web Development",
  "Content Writing",
  "Video & Animation",
  "Digital Marketing",
  "Mobile Apps",
  "Music & Audio",
];

const sortOptions = ["Recommended", "Newest", "Price: Low to High", "Price: High to Low", "Best Rated"];

const mockGigs = [
  // Graphics & Design
  {
    id: "1",
    title: "I will design a modern, minimal logo for your brand",
    seller: "Priya Sharma",
    sellerInitials: "PS",
    rating: 4.9,
    reviews: 234,
    price: 2000,
    deliveryDays: 3,
    category: "Graphics & Design",
    location: "Mumbai",
    gradient: "from-pink-500 to-rose-500",
    image: "/gig-images/logo-design.svg",
    featured: true,
  },
  {
    id: "7",
    title: "I will create a professional brand identity package",
    seller: "Kavita Desai",
    sellerInitials: "KD",
    rating: 4.8,
    reviews: 201,
    price: 8000,
    deliveryDays: 5,
    category: "Graphics & Design",
    location: "Ahmedabad",
    gradient: "from-fuchsia-500 to-purple-500",
    image: "/gig-images/brand-identity.svg",
    featured: false,
  },
  {
    id: "9",
    title: "I will design eye-catching social media graphics and banners",
    seller: "Sneha Iyer",
    sellerInitials: "SI",
    rating: 4.7,
    reviews: 178,
    price: 1500,
    deliveryDays: 2,
    category: "Graphics & Design",
    location: "Bangalore",
    gradient: "from-violet-500 to-purple-500",
    image: "/gig-images/social-graphics.svg",
    featured: false,
  },
  // Web Development
  {
    id: "2",
    title: "I will build a responsive React website with modern UI",
    seller: "Rahul Verma",
    sellerInitials: "RV",
    rating: 5.0,
    reviews: 189,
    price: 15000,
    deliveryDays: 7,
    category: "Web Development",
    location: "Bangalore",
    gradient: "from-blue-500 to-cyan-500",
    image: "/gig-images/react-website.svg",
    featured: true,
  },
  {
    id: "10",
    title: "I will build a full-stack e-commerce website with payment integration",
    seller: "Ravi Kumar",
    sellerInitials: "RK",
    rating: 4.8,
    reviews: 142,
    price: 30000,
    deliveryDays: 14,
    category: "Web Development",
    location: "Kolkata",
    gradient: "from-indigo-500 to-blue-500",
    image: "/gig-images/ecommerce-website.svg",
    featured: false,
  },
  {
    id: "11",
    title: "I will create a custom WordPress website with SEO optimization",
    seller: "Rohan Bajaj",
    sellerInitials: "RB",
    rating: 4.6,
    reviews: 93,
    price: 8000,
    deliveryDays: 7,
    category: "Web Development",
    location: "Noida",
    gradient: "from-sky-500 to-blue-500",
    image: "/gig-images/wordpress-website.svg",
    featured: false,
  },
  // Content Writing
  {
    id: "3",
    title: "I will write SEO-optimized blog posts and articles",
    seller: "Ananya Patel",
    sellerInitials: "AP",
    rating: 4.8,
    reviews: 312,
    price: 1000,
    deliveryDays: 2,
    category: "Content Writing",
    location: "Delhi",
    gradient: "from-emerald-500 to-teal-500",
    image: "/gig-images/blog-writing.svg",
    featured: false,
  },
  {
    id: "12",
    title: "I will write compelling product descriptions for your e-commerce store",
    seller: "Preeti Saxena",
    sellerInitials: "PS",
    rating: 4.9,
    reviews: 167,
    price: 800,
    deliveryDays: 1,
    category: "Content Writing",
    location: "Bhopal",
    gradient: "from-lime-500 to-green-500",
    image: "/gig-images/product-descriptions.svg",
    featured: true,
  },
  {
    id: "13",
    title: "I will create engaging social media captions and ad copy",
    seller: "Tanvi Joshi",
    sellerInitials: "TJ",
    rating: 4.7,
    reviews: 88,
    price: 1200,
    deliveryDays: 2,
    category: "Content Writing",
    location: "Nagpur",
    gradient: "from-teal-500 to-emerald-500",
    image: "/gig-images/social-captions.svg",
    featured: false,
  },
  // Video & Animation
  {
    id: "4",
    title: "I will edit your YouTube videos professionally",
    seller: "Vikram Singh",
    sellerInitials: "VS",
    rating: 4.9,
    reviews: 156,
    price: 3500,
    deliveryDays: 4,
    category: "Video & Animation",
    location: "Hyderabad",
    gradient: "from-purple-500 to-violet-500",
    image: "/gig-images/youtube-editing.svg",
    featured: false,
  },
  {
    id: "14",
    title: "I will create a 2D animated explainer video for your business",
    seller: "Kartik Malhotra",
    sellerInitials: "KM",
    rating: 4.8,
    reviews: 112,
    price: 7000,
    deliveryDays: 6,
    category: "Video & Animation",
    location: "Chandigarh",
    gradient: "from-fuchsia-500 to-pink-500",
    image: "/gig-images/animated-explainer.svg",
    featured: true,
  },
  {
    id: "15",
    title: "I will produce a professional product demo and promo video",
    seller: "Divya Nambiar",
    sellerInitials: "DN",
    rating: 4.7,
    reviews: 74,
    price: 5000,
    deliveryDays: 5,
    category: "Video & Animation",
    location: "Chennai",
    gradient: "from-violet-500 to-indigo-500",
    image: "/gig-images/product-demo-video.svg",
    featured: false,
  },
  // Digital Marketing
  {
    id: "5",
    title: "I will create a complete social media marketing strategy",
    seller: "Neha Gupta",
    sellerInitials: "NG",
    rating: 4.7,
    reviews: 98,
    price: 5000,
    deliveryDays: 5,
    category: "Digital Marketing",
    location: "Pune",
    gradient: "from-amber-500 to-orange-500",
    image: "/gig-images/social-media-strategy.svg",
    featured: true,
  },
  {
    id: "16",
    title: "I will run targeted Google Ads campaigns to grow your sales",
    seller: "Manish Agarwal",
    sellerInitials: "MA",
    rating: 4.8,
    reviews: 130,
    price: 6000,
    deliveryDays: 3,
    category: "Digital Marketing",
    location: "Lucknow",
    gradient: "from-orange-500 to-red-500",
    image: "/gig-images/google-ads.svg",
    featured: false,
  },
  {
    id: "17",
    title: "I will manage your Instagram and Facebook pages with daily posts",
    seller: "Ritika Choudhary",
    sellerInitials: "RC",
    rating: 4.6,
    reviews: 61,
    price: 4000,
    deliveryDays: 30,
    category: "Digital Marketing",
    location: "Jaipur",
    gradient: "from-rose-500 to-pink-500",
    image: "/gig-images/instagram-management.svg",
    featured: false,
  },
  // Mobile Apps
  {
    id: "6",
    title: "I will develop a cross-platform mobile app using Flutter",
    seller: "Arjun Mehta",
    sellerInitials: "AM",
    rating: 4.9,
    reviews: 145,
    price: 25000,
    deliveryDays: 14,
    category: "Mobile Apps",
    location: "Chennai",
    gradient: "from-teal-500 to-green-500",
    image: "/gig-images/flutter-app.svg",
    featured: false,
  },
  {
    id: "18",
    title: "I will build a React Native app for iOS and Android",
    seller: "Deepak Nair",
    sellerInitials: "DN",
    rating: 4.8,
    reviews: 109,
    price: 20000,
    deliveryDays: 12,
    category: "Mobile Apps",
    location: "Kochi",
    gradient: "from-cyan-500 to-teal-500",
    image: "/gig-images/react-native-app.svg",
    featured: true,
  },
  {
    id: "19",
    title: "I will develop a native Android app with Material Design UI",
    seller: "Amit Shah",
    sellerInitials: "AS",
    rating: 4.7,
    reviews: 82,
    price: 18000,
    deliveryDays: 10,
    category: "Mobile Apps",
    location: "Surat",
    gradient: "from-green-500 to-emerald-500",
    image: "/gig-images/android-app.svg",
    featured: false,
  },
  // Music & Audio
  {
    id: "8",
    title: "I will compose original background music for your content",
    seller: "Sahil Kapoor",
    sellerInitials: "SK",
    rating: 4.6,
    reviews: 67,
    price: 4000,
    deliveryDays: 6,
    category: "Music & Audio",
    location: "Jaipur",
    gradient: "from-red-500 to-pink-500",
    image: "/gig-images/background-music.svg",
    featured: false,
  },
  {
    id: "20",
    title: "I will record a professional voiceover in Hindi and English",
    seller: "Pooja Reddy",
    sellerInitials: "PR",
    rating: 4.9,
    reviews: 203,
    price: 2500,
    deliveryDays: 2,
    category: "Music & Audio",
    location: "Hyderabad",
    gradient: "from-pink-500 to-fuchsia-500",
    image: "/gig-images/voiceover.svg",
    featured: true,
  },
  {
    id: "21",
    title: "I will mix and master your music tracks professionally",
    seller: "Suresh Pillai",
    sellerInitials: "SP",
    rating: 4.8,
    reviews: 91,
    price: 3000,
    deliveryDays: 4,
    category: "Music & Audio",
    location: "Thiruvananthapuram",
    gradient: "from-fuchsia-500 to-violet-500",
    image: "/gig-images/music-mastering.svg",
    featured: false,
  },
];

export default function CatalogPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sort, setSort] = useState("Recommended");
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);
  const [minRating, setMinRating] = useState(0);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const filteredGigs = mockGigs.filter((gig) => {
    if (selectedCategory !== "All" && gig.category !== selectedCategory)
      return false;
    if (gig.price < priceRange[0] || gig.price > priceRange[1]) return false;
    if (gig.rating < minRating) return false;
    if (search && !gig.title.toLowerCase().includes(search.toLowerCase()))
      return false;
    return true;
  });

  const toggleFavorite = (id: string) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <>
      <Header />
      <main className="flex-1 pt-24">
        {/* Search header */}
        <div className="bg-white border-b border-border sticky top-[72px] z-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center gap-4">
              <div className="flex-1 relative">
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary"
                />
                <input
                  type="text"
                  placeholder="Search services..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-card rounded-xl border border-border focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-all ${
                  showFilters
                    ? "bg-primary text-white border-primary"
                    : "bg-card border-border hover:border-primary text-text-secondary hover:text-primary"
                }`}
              >
                <SlidersHorizontal size={18} />
                <span className="hidden sm:inline">Filters</span>
              </button>
              <div className="hidden sm:flex items-center gap-1 bg-card rounded-xl p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === "grid"
                      ? "bg-white shadow text-primary"
                      : "text-text-secondary hover:text-text"
                  }`}
                >
                  <Grid3X3 size={18} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-all ${
                    viewMode === "list"
                      ? "bg-white shadow text-primary"
                      : "text-text-secondary hover:text-text"
                  }`}
                >
                  <List size={18} />
                </button>
              </div>
            </div>

            {/* Categories row */}
            <div className="flex gap-2 mt-4 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    selectedCategory === cat
                      ? "bg-primary text-white shadow-md shadow-primary/25"
                      : "bg-card text-text-secondary hover:text-primary hover:bg-primary/5"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Filters Panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="bg-white border-b border-border overflow-hidden"
            >
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                <div className="grid sm:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-text mb-2">
                      Price Range (₹)
                    </label>
                    <div className="flex items-center gap-3">
                      <input
                        type="number"
                        value={priceRange[0]}
                        onChange={(e) =>
                          setPriceRange([+e.target.value, priceRange[1]])
                        }
                        className="w-full px-3 py-2 bg-card border border-border rounded-lg text-sm outline-none focus:border-primary"
                        placeholder="Min"
                      />
                      <span className="text-text-secondary">—</span>
                      <input
                        type="number"
                        value={priceRange[1]}
                        onChange={(e) =>
                          setPriceRange([priceRange[0], +e.target.value])
                        }
                        className="w-full px-3 py-2 bg-card border border-border rounded-lg text-sm outline-none focus:border-primary"
                        placeholder="Max"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text mb-2">
                      Minimum Rating
                    </label>
                    <div className="flex gap-2">
                      {[0, 3, 4, 4.5].map((r) => (
                        <button
                          key={r}
                          onClick={() => setMinRating(r)}
                          className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm border transition-all ${
                            minRating === r
                              ? "bg-accent/10 border-accent text-accent"
                              : "bg-card border-border text-text-secondary hover:border-accent"
                          }`}
                        >
                          <Star size={14} fill="currentColor" />
                          {r === 0 ? "Any" : `${r}+`}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text mb-2">
                      Sort By
                    </label>
                    <select
                      value={sort}
                      onChange={(e) => setSort(e.target.value)}
                      className="w-full px-3 py-2 bg-card border border-border rounded-lg text-sm outline-none focus:border-primary"
                    >
                      {sortOptions.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Results */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-6">
            <p className="text-text-secondary">
              <span className="font-semibold text-text">
                {filteredGigs.length}
              </span>{" "}
              services found
            </p>
          </div>

          <div
            className={
              viewMode === "grid"
                ? "grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                : "flex flex-col gap-4"
            }
          >
            {filteredGigs.map((gig, i) => (
              <AnimatedSection key={gig.id} delay={i * 0.05} direction="up">
                <motion.div
                  whileHover={{ y: -4 }}
                  className={`bg-white rounded-2xl border border-border hover:shadow-xl transition-all overflow-hidden group ${
                    viewMode === "list" ? "flex" : ""
                  }`}
                >
                  {/* Thumbnail */}
                  <div
                    className={`relative bg-gradient-to-br ${gig.gradient} overflow-hidden ${
                      viewMode === "list"
                        ? "w-48 shrink-0"
                        : "aspect-[4/3]"
                    }`}
                  >
                    <img
                      src={gig.image}
                      alt={gig.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    {gig.featured && (
                      <span className="absolute top-3 left-3 px-2.5 py-1 bg-accent text-white text-xs font-medium rounded-md">
                        Featured
                      </span>
                    )}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        toggleFavorite(gig.id);
                      }}
                      className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white"
                    >
                      <Heart
                        size={16}
                        className={
                          favorites.has(gig.id)
                            ? "text-red-500 fill-red-500"
                            : "text-text-secondary"
                        }
                      />
                    </button>
                  </div>

                  <div className="p-4 flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <div
                        className={`w-7 h-7 rounded-lg bg-gradient-to-br ${gig.gradient} flex items-center justify-center text-white text-xs font-bold`}
                      >
                        {gig.sellerInitials}
                      </div>
                      <span className="text-sm text-text-secondary">
                        {gig.seller}
                      </span>
                    </div>

                    <Link href={`/gig/${gig.id}`}>
                      <h3 className="font-medium text-text leading-snug mb-3 hover:text-primary transition-colors line-clamp-2">
                        {gig.title}
                      </h3>
                    </Link>

                    <div className="flex items-center gap-3 text-sm mb-3">
                      <span className="flex items-center gap-1 text-accent">
                        <Star size={14} fill="currentColor" />
                        {gig.rating}
                      </span>
                      <span className="text-text-secondary">
                        ({gig.reviews})
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-3 border-t border-border">
                      <span className="flex items-center gap-1 text-xs text-text-secondary">
                        <Clock size={12} />
                        {gig.deliveryDays} days
                      </span>
                      <div className="text-right">
                        <p className="text-xs text-text-secondary">
                          Starting at
                        </p>
                        <p className="font-bold text-text">
                          ₹{gig.price.toLocaleString("en-IN")}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
