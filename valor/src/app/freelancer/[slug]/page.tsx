"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import {
  Star,
  MapPin,
  Calendar,
  CheckCircle,
  Clock,
  MessageSquare,
  Award,
  Briefcase,
  Users,
  Heart,
} from "lucide-react";

type FreelancerGig = {
  id: string;
  title: string;
  rating: number;
  reviews: number;
  price: number;
  image: string;
};

type FreelancerData = {
  name: string;
  initials: string;
  gradient: string;
  title: string;
  location: string;
  memberSince: string;
  rating: number;
  reviewCount: number;
  isVip: boolean;
  bio: string;
  skills: string[];
  stats: { value: string; label: string };
  statsData: { value: string; label: string; icon: "briefcase" | "star" | "clock" | "users" }[];
  gigs: FreelancerGig[];
};

const freelancerDatabase: Record<string, FreelancerData> = {
  "priya-sharma": {
    name: "Priya Sharma",
    initials: "PS",
    gradient: "from-pink-500 to-rose-500",
    title: "Senior UI/UX Designer & Brand Strategist",
    location: "Mumbai, India",
    memberSince: "2022",
    rating: 4.9,
    reviewCount: 234,
    isVip: true,
    bio: "Creative designer with 5+ years of experience crafting beautiful digital experiences. Specialized in brand identity, UI/UX design, and visual storytelling. Passionate about clean, minimal design that communicates effectively.",
    skills: ["Logo Design", "Brand Identity", "UI/UX Design", "Figma", "Adobe Illustrator", "Photoshop", "Prototyping", "Icon Design"],
    stats: { value: "4.9", label: "Avg. Rating" },
    statsData: [
      { value: "500+", label: "Orders Completed", icon: "briefcase" },
      { value: "4.9", label: "Avg. Rating", icon: "star" },
      { value: "1 hr", label: "Avg. Response", icon: "clock" },
      { value: "98%", label: "Repeat Clients", icon: "users" },
    ],
    gigs: [
      { id: "1", title: "I will design a modern, minimal logo for your brand", rating: 4.9, reviews: 234, price: 2000, image: "/gig-images/design.svg" },
      { id: "7", title: "I will create a complete brand identity package", rating: 4.8, reviews: 89, price: 8000, image: "/gig-images/branding.svg" },
      { id: "5", title: "I will design stunning social media graphics", rating: 4.9, reviews: 156, price: 1500, image: "/gig-images/marketing.svg" },
    ],
  },
  "rahul-verma": {
    name: "Rahul Verma",
    initials: "RV",
    gradient: "from-blue-500 to-cyan-500",
    title: "Full-Stack React & Node.js Developer",
    location: "Bangalore, India",
    memberSince: "2021",
    rating: 4.8,
    reviewCount: 187,
    isVip: true,
    bio: "Full-stack developer with 6+ years building scalable web applications. Expert in React, Next.js, Node.js, and PostgreSQL. I deliver clean, well-documented code and responsive UIs that work on every device.",
    skills: ["React", "Next.js", "Node.js", "TypeScript", "PostgreSQL", "Tailwind CSS", "REST APIs", "AWS"],
    stats: { value: "4.8", label: "Avg. Rating" },
    statsData: [
      { value: "320+", label: "Orders Completed", icon: "briefcase" },
      { value: "4.8", label: "Avg. Rating", icon: "star" },
      { value: "2 hrs", label: "Avg. Response", icon: "clock" },
      { value: "91%", label: "Repeat Clients", icon: "users" },
    ],
    gigs: [
      { id: "2", title: "I will build a modern React or Next.js website for you", rating: 4.8, reviews: 187, price: 15000, image: "/gig-images/webdev.svg" },
      { id: "6", title: "I will develop a full-stack web application with backend", rating: 4.7, reviews: 64, price: 35000, image: "/gig-images/mobile.svg" },
    ],
  },
  "ananya-patel": {
    name: "Ananya Patel",
    initials: "AP",
    gradient: "from-emerald-500 to-teal-500",
    title: "SEO Content Writer & Copywriter",
    location: "Delhi, India",
    memberSince: "2022",
    rating: 4.7,
    reviewCount: 312,
    isVip: false,
    bio: "Versatile content writer with a passion for storytelling and SEO. I have written for 100+ brands across fintech, edtech, and e-commerce. My writing drives traffic, builds trust, and converts readers into customers.",
    skills: ["SEO Writing", "Blog Posts", "Copywriting", "Content Strategy", "WordPress", "Keyword Research", "Email Marketing", "Proofreading"],
    stats: { value: "4.7", label: "Avg. Rating" },
    statsData: [
      { value: "680+", label: "Orders Completed", icon: "briefcase" },
      { value: "4.7", label: "Avg. Rating", icon: "star" },
      { value: "3 hrs", label: "Avg. Response", icon: "clock" },
      { value: "85%", label: "Repeat Clients", icon: "users" },
    ],
    gigs: [
      { id: "3", title: "I will write SEO-optimised blog posts and articles", rating: 4.7, reviews: 312, price: 1000, image: "/gig-images/writing.svg" },
    ],
  },
  "vikram-singh": {
    name: "Vikram Singh",
    initials: "VS",
    gradient: "from-purple-500 to-violet-500",
    title: "Video Editor & Motion Graphics Artist",
    location: "Hyderabad, India",
    memberSince: "2021",
    rating: 4.9,
    reviewCount: 145,
    isVip: true,
    bio: "Professional video editor with 7 years of post-production experience. Skilled in cinematic colour grading, motion graphics, and YouTube content creation. My edits have helped channels grow from 0 to 100k subscribers.",
    skills: ["Video Editing", "Premiere Pro", "After Effects", "DaVinci Resolve", "Motion Graphics", "Colour Grading", "Thumbnail Design", "YouTube SEO"],
    stats: { value: "4.9", label: "Avg. Rating" },
    statsData: [
      { value: "410+", label: "Orders Completed", icon: "briefcase" },
      { value: "4.9", label: "Avg. Rating", icon: "star" },
      { value: "1 hr", label: "Avg. Response", icon: "clock" },
      { value: "94%", label: "Repeat Clients", icon: "users" },
    ],
    gigs: [
      { id: "4", title: "I will edit your YouTube video with cinematic colour grading", rating: 4.9, reviews: 145, price: 3500, image: "/gig-images/video.svg" },
    ],
  },
  "neha-gupta": {
    name: "Neha Gupta",
    initials: "NG",
    gradient: "from-amber-500 to-orange-500",
    title: "Social Media Manager & Growth Strategist",
    location: "Pune, India",
    memberSince: "2022",
    rating: 4.8,
    reviewCount: 98,
    isVip: false,
    bio: "Social media strategist who has managed pages with 500k+ followers. Expert in organic growth, paid campaigns, and analytics. I turn brand accounts into community-driven assets that generate real business results.",
    skills: ["Instagram Growth", "Facebook Ads", "Content Calendar", "Analytics", "Reels & Shorts", "Influencer Outreach", "Canva", "Meta Business Suite"],
    stats: { value: "4.8", label: "Avg. Rating" },
    statsData: [
      { value: "210+", label: "Orders Completed", icon: "briefcase" },
      { value: "4.8", label: "Avg. Rating", icon: "star" },
      { value: "2 hrs", label: "Avg. Response", icon: "clock" },
      { value: "88%", label: "Repeat Clients", icon: "users" },
    ],
    gigs: [
      { id: "5", title: "I will manage and grow your social media presence", rating: 4.8, reviews: 98, price: 5000, image: "/gig-images/marketing.svg" },
    ],
  },
  "arjun-mehta": {
    name: "Arjun Mehta",
    initials: "AM",
    gradient: "from-teal-500 to-green-500",
    title: "Flutter & React Native Mobile Developer",
    location: "Chennai, India",
    memberSince: "2020",
    rating: 4.9,
    reviewCount: 76,
    isVip: true,
    bio: "Mobile-first developer with 8 years of experience building production apps on iOS and Android. My apps have been featured on the Play Store and App Store. I write clean, maintainable code with thorough testing and documentation.",
    skills: ["Flutter", "React Native", "Dart", "Firebase", "iOS Development", "Android Development", "REST APIs", "App Store Submission"],
    stats: { value: "4.9", label: "Avg. Rating" },
    statsData: [
      { value: "155+", label: "Orders Completed", icon: "briefcase" },
      { value: "4.9", label: "Avg. Rating", icon: "star" },
      { value: "1 hr", label: "Avg. Response", icon: "clock" },
      { value: "96%", label: "Repeat Clients", icon: "users" },
    ],
    gigs: [
      { id: "6", title: "I will build a Flutter mobile app for iOS and Android", rating: 4.9, reviews: 76, price: 25000, image: "/gig-images/mobile.svg" },
    ],
  },
  "kavita-desai": {
    name: "Kavita Desai",
    initials: "KD",
    gradient: "from-fuchsia-500 to-purple-500",
    title: "Brand Identity Designer & Packaging Expert",
    location: "Ahmedabad, India",
    memberSince: "2021",
    rating: 4.8,
    reviewCount: 121,
    isVip: false,
    bio: "Brand identity designer with a sharp eye for typography and colour theory. I create comprehensive brand systems that work across print and digital. Clients range from early-stage startups to established retail brands.",
    skills: ["Brand Identity", "Logo Design", "Packaging Design", "Typography", "Adobe InDesign", "Illustrator", "Print Design", "Style Guides"],
    stats: { value: "4.8", label: "Avg. Rating" },
    statsData: [
      { value: "280+", label: "Orders Completed", icon: "briefcase" },
      { value: "4.8", label: "Avg. Rating", icon: "star" },
      { value: "2 hrs", label: "Avg. Response", icon: "clock" },
      { value: "90%", label: "Repeat Clients", icon: "users" },
    ],
    gigs: [
      { id: "7", title: "I will design a complete brand identity for your business", rating: 4.8, reviews: 121, price: 8000, image: "/gig-images/branding.svg" },
    ],
  },
  "sahil-kapoor": {
    name: "Sahil Kapoor",
    initials: "SK",
    gradient: "from-red-500 to-pink-500",
    title: "Music Producer & Sound Designer",
    location: "Jaipur, India",
    memberSince: "2022",
    rating: 4.7,
    reviewCount: 63,
    isVip: false,
    bio: "Composer and sound designer with credits in Bollywood trailers, indie films, and YouTube content. I produce royalty-free background music, cinematic scores, and podcast intros that set the perfect mood for your project.",
    skills: ["Music Production", "FL Studio", "Logic Pro", "Sound Design", "Mixing & Mastering", "Jingles", "Podcast Intros", "Royalty-Free Music"],
    stats: { value: "4.7", label: "Avg. Rating" },
    statsData: [
      { value: "140+", label: "Orders Completed", icon: "briefcase" },
      { value: "4.7", label: "Avg. Rating", icon: "star" },
      { value: "4 hrs", label: "Avg. Response", icon: "clock" },
      { value: "82%", label: "Repeat Clients", icon: "users" },
    ],
    gigs: [
      { id: "8", title: "I will compose original background music for your video or project", rating: 4.7, reviews: 63, price: 4000, image: "/gig-images/music.svg" },
    ],
  },
};

const iconMap = {
  briefcase: Briefcase,
  star: Star,
  clock: Clock,
  users: Users,
};

export default function FreelancerProfilePage() {
  const params = useParams();
  const router = useRouter();
  const slug = typeof params?.slug === "string" ? params.slug : Array.isArray(params?.slug) ? params.slug[0] : "";
  const freelancer = freelancerDatabase[slug] ?? freelancerDatabase["priya-sharma"];
  const [liked, setLiked] = useState(false);

  return (
    <>
      <Header />
      <main className="flex-1 pt-24">
        {/* Profile header */}
        <div className="bg-white border-b border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <AnimatedSection>
              <div className="flex flex-col sm:flex-row items-start gap-6">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className={`w-28 h-28 rounded-3xl bg-gradient-to-br ${freelancer.gradient} flex items-center justify-center text-white text-4xl font-bold shadow-xl`}
                >
                  {freelancer.initials}
                </motion.div>

                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-2xl sm:text-3xl font-bold text-text">
                      {freelancer.name}
                    </h1>
                    <CheckCircle size={22} className="text-primary" fill="currentColor" />
                    {freelancer.isVip && (
                      <span className="px-2.5 py-1 bg-accent/10 text-accent text-xs font-medium rounded-md">
                        VIP Seller
                      </span>
                    )}
                  </div>

                  <p className="text-lg text-text-secondary mb-3">
                    {freelancer.title}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-text-secondary mb-4">
                    <span className="flex items-center gap-1">
                      <MapPin size={14} />
                      {freelancer.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={14} />
                      Member since {freelancer.memberSince}
                    </span>
                    <span className="flex items-center gap-1 text-accent">
                      <Star size={14} fill="currentColor" />
                      {freelancer.rating} ({freelancer.reviewCount} reviews)
                    </span>
                  </div>

                  <div className="flex gap-3">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => router.push("/auth/login")}
                      className="px-6 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-xl font-medium transition-all shadow-md shadow-primary/25 flex items-center gap-2"
                    >
                      <MessageSquare size={16} />
                      Contact Me
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setLiked(!liked)}
                      className="px-4 py-2.5 border border-border hover:border-red-300 rounded-xl transition-colors"
                    >
                      <Heart size={18} className={liked ? "text-red-500 fill-red-500" : "text-text-secondary"} />
                    </motion.button>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left sidebar */}
            <div className="space-y-6">
              {/* Stats */}
              <AnimatedSection>
                <div className="bg-white rounded-2xl border border-border p-6">
                  <div className="grid grid-cols-2 gap-4">
                    {freelancer.statsData.map((stat) => {
                      const Icon = iconMap[stat.icon];
                      return (
                        <div key={stat.label} className="text-center p-3 bg-card rounded-xl">
                          <Icon size={20} className="mx-auto mb-2 text-primary" />
                          <p className="font-bold text-text">{stat.value}</p>
                          <p className="text-xs text-text-secondary mt-0.5">{stat.label}</p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </AnimatedSection>

              {/* About */}
              <AnimatedSection delay={0.1}>
                <div className="bg-white rounded-2xl border border-border p-6">
                  <h3 className="font-semibold text-text mb-3">About</h3>
                  <p className="text-sm text-text-secondary leading-relaxed">
                    {freelancer.bio}
                  </p>
                </div>
              </AnimatedSection>

              {/* Skills */}
              <AnimatedSection delay={0.2}>
                <div className="bg-white rounded-2xl border border-border p-6">
                  <h3 className="font-semibold text-text mb-3">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {freelancer.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1.5 text-sm bg-primary/5 text-primary rounded-lg border border-primary/10"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            </div>

            {/* Main content — Gigs */}
            <div className="lg:col-span-2">
              <AnimatedSection>
                <h2 className="text-xl font-semibold text-text mb-6">My Services</h2>
              </AnimatedSection>

              <div className="grid sm:grid-cols-2 gap-6">
                {freelancer.gigs.map((gig, i) => (
                  <AnimatedSection key={gig.id} delay={i * 0.1}>
                    <motion.div
                      whileHover={{ y: -4 }}
                      className="bg-white rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-all group"
                    >
                      <div className="aspect-[4/3] relative overflow-hidden bg-card">
                        <img
                          src={gig.image}
                          alt={gig.title}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <Link href={`/gig/${gig.id}`}>
                          <h3 className="font-medium text-text hover:text-primary transition-colors mb-3 line-clamp-2">
                            {gig.title}
                          </h3>
                        </Link>
                        <div className="flex items-center gap-2 text-sm mb-3">
                          <Star size={14} className="text-accent" fill="currentColor" />
                          <span className="text-accent font-medium">{gig.rating}</span>
                          <span className="text-text-secondary">({gig.reviews})</span>
                        </div>
                        <div className="pt-3 border-t border-border flex items-center justify-between">
                          <span className="text-xs text-text-secondary">Starting at</span>
                          <span className="font-bold text-text">₹{gig.price.toLocaleString()}</span>
                        </div>
                      </div>
                    </motion.div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
