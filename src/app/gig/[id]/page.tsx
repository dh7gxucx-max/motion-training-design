"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import {
  Star, Clock, RefreshCw, Check, Heart, Share2, MapPin,
  MessageSquare, ChevronRight, Award, ShieldCheck, Zap,
} from "lucide-react";

const gigDatabase: Record<string, {
  title: string; category: string; categoryHref: string;
  seller: string; sellerInitials: string; sellerSlug: string;
  gradient: string; rating: number; reviewCount: number; location: string;
  images: [string, string, string];
  packages: { name: string; price: number; desc: string; delivery: number; revisions: number; features: string[]; popular?: boolean }[];
  description: string[]; whatYouGet: string[];
  reviews: { name: string; initials: string; rating: number; date: string; text: string; gradient: string }[];
}> = {
  "1": {
    title: "I will design a modern, minimal logo for your brand",
    category: "Graphics & Design", categoryHref: "/catalog?category=Graphics+%26+Design",
    seller: "Priya Sharma", sellerInitials: "PS", sellerSlug: "priya-sharma",
    gradient: "from-pink-500 to-rose-500", rating: 4.9, reviewCount: 234, location: "Mumbai",
    images: ["/gig-images/design.svg", "/gig-images/branding.svg", "/gig-images/design.svg"],
    packages: [
      { name: "Basic", price: 2000, desc: "Simple logo design with 1 concept and 1 revision", delivery: 3, revisions: 1, features: ["1 Logo Concept", "PNG File", "1 Revision"] },
      { name: "Standard", price: 5000, desc: "Professional logo with 3 concepts, vector files and brand guide", delivery: 5, revisions: 3, features: ["3 Logo Concepts", "PNG + SVG + AI Files", "3 Revisions", "Brand Color Palette", "Business Card Design"], popular: true },
      { name: "Premium", price: 12000, desc: "Complete brand identity with unlimited revisions and full brand kit", delivery: 7, revisions: -1, features: ["5 Logo Concepts", "All Source Files", "Unlimited Revisions", "Full Brand Guide", "Business Card", "Letterhead", "Social Media Kit"] },
    ],
    description: [
      "Are you looking for a modern and minimalist logo for your business? With over 5 years of experience in graphic design, I create unique, professional logos that perfectly represent your brand identity.",
      "I specialise in clean, minimal aesthetics that look great across digital and print — from business cards to billboards.",
    ],
    whatYouGet: ["Custom, hand-crafted logo design", "Modern, clean, and professional aesthetic", "100% original artwork", "High-resolution files in all formats", "Full copyright ownership"],
    reviews: [
      { name: "Amit Gupta", initials: "AG", rating: 5, date: "2 weeks ago", text: "Amazing work! Priya understood my vision perfectly and delivered a stunning logo. Communication was excellent throughout.", gradient: "from-blue-500 to-cyan-500" },
      { name: "Sneha Reddy", initials: "SR", rating: 5, date: "1 month ago", text: "Very professional and creative. Delivered ahead of schedule with outstanding quality. Will definitely work with again!", gradient: "from-pink-500 to-rose-500" },
      { name: "Karthik Nair", initials: "KN", rating: 4, date: "1 month ago", text: "Great designer with good attention to detail. Only minor revision needed. Highly recommend for branding work.", gradient: "from-emerald-500 to-teal-500" },
    ],
  },
  "2": {
    title: "I will build a responsive React website with modern UI",
    category: "Web Development", categoryHref: "/catalog?category=Web+Development",
    seller: "Rahul Verma", sellerInitials: "RV", sellerSlug: "rahul-verma",
    gradient: "from-blue-500 to-cyan-500", rating: 5.0, reviewCount: 189, location: "Bangalore",
    images: ["/gig-images/webdev.svg", "/gig-images/mobile.svg", "/gig-images/webdev.svg"],
    packages: [
      { name: "Basic", price: 15000, desc: "Landing page with up to 3 sections, responsive and deployed", delivery: 7, revisions: 2, features: ["Landing Page", "Mobile Responsive", "Contact Form", "2 Revisions", "Deployment"] },
      { name: "Standard", price: 35000, desc: "Multi-page website with CMS, SEO basics and analytics", delivery: 14, revisions: 5, features: ["Up to 8 Pages", "Next.js + Tailwind", "CMS Integration", "SEO Optimised", "Google Analytics", "5 Revisions"], popular: true },
      { name: "Premium", price: 75000, desc: "Full web app with auth, dashboard, payment integration", delivery: 21, revisions: -1, features: ["Full Web Application", "Authentication", "Admin Dashboard", "Payment Gateway", "API Integration", "Unlimited Revisions", "30-day Support"] },
    ],
    description: [
      "I build fast, modern websites and web applications using React, Next.js, and Tailwind CSS. Every project is built mobile-first with clean code and top performance scores.",
      "With 6 years of full-stack experience, I've delivered 150+ projects for startups, SMEs, and enterprises across India and abroad.",
    ],
    whatYouGet: ["Pixel-perfect responsive design", "Clean, maintainable code", "100+ Lighthouse performance score", "SEO-optimised structure", "Free deployment on Vercel/Netlify"],
    reviews: [
      { name: "Rohan Kapoor", initials: "RK", rating: 5, date: "1 week ago", text: "Rahul is absolutely brilliant. Delivered a stunning website ahead of deadline. Code quality is exceptional — best freelancer I've worked with.", gradient: "from-blue-500 to-cyan-500" },
      { name: "Divya Menon", initials: "DM", rating: 5, date: "3 weeks ago", text: "Transformed our outdated site into a modern masterpiece. Communication was seamless and he handled every revision professionally.", gradient: "from-violet-500 to-purple-500" },
      { name: "Sanjay Patel", initials: "SP", rating: 5, date: "2 months ago", text: "Third project with Rahul. He never disappoints. The web app he built for us handles 10k+ daily users without a hitch.", gradient: "from-emerald-500 to-teal-500" },
    ],
  },
  "3": {
    title: "I will write SEO-optimized blog posts and articles",
    category: "Content Writing", categoryHref: "/catalog?category=Content+Writing",
    seller: "Ananya Patel", sellerInitials: "AP", sellerSlug: "ananya-patel",
    gradient: "from-emerald-500 to-teal-500", rating: 4.8, reviewCount: 312, location: "Delhi",
    images: ["/gig-images/writing.svg", "/gig-images/writing.svg", "/gig-images/writing.svg"],
    packages: [
      { name: "Basic", price: 1000, desc: "5 SEO blog posts, 600–800 words each with keyword research", delivery: 4, revisions: 1, features: ["5 Articles", "600–800 Words Each", "Keyword Research", "Meta Descriptions", "1 Revision"] },
      { name: "Standard", price: 2500, desc: "15 SEO articles with Yoast-optimised formatting and internal links", delivery: 10, revisions: 3, features: ["15 Articles", "800–1200 Words Each", "Yoast SEO Format", "Internal Linking", "3 Revisions", "Editorial Calendar"], popular: true },
      { name: "Premium", price: 5000, desc: "30 articles per month — full content marketing package", delivery: 25, revisions: -1, features: ["30 Articles/Month", "Long-form 1500+ Words", "Topic Research", "Image Suggestions", "Unlimited Revisions", "Monthly Report"] },
    ],
    description: [
      "I write clear, engaging, SEO-friendly content that ranks on Google and connects with your audience. Every article is fully researched, plagiarism-free, and written in natural English.",
      "Specialising in tech, finance, health, and e-commerce niches — I've helped 80+ brands grow their organic traffic by 3x in under 6 months.",
    ],
    whatYouGet: ["100% original, plagiarism-free content", "Keyword-optimised headings and meta", "Engaging, human-readable writing", "Delivered in Google Docs or Word", "On-time delivery, always"],
    reviews: [
      { name: "Pradeep Sharma", initials: "PS", rating: 5, date: "3 days ago", text: "Ananya's content is outstanding. Our blog traffic doubled in 2 months. She genuinely understands SEO and writes naturally.", gradient: "from-emerald-500 to-teal-500" },
      { name: "Ritu Agarwal", initials: "RA", rating: 5, date: "2 weeks ago", text: "Best content writer on VALOR. Always delivers ahead of time, no revisions needed. Hired for the Premium package, worth every rupee.", gradient: "from-amber-500 to-orange-500" },
      { name: "Mohit Jain", initials: "MJ", rating: 4, date: "1 month ago", text: "Great quality writing, good communication. Took one revision to nail the tone but final output was excellent.", gradient: "from-blue-500 to-cyan-500" },
    ],
  },
  "4": {
    title: "I will edit your YouTube videos professionally",
    category: "Video & Animation", categoryHref: "/catalog?category=Video+%26+Animation",
    seller: "Vikram Singh", sellerInitials: "VS", sellerSlug: "vikram-singh",
    gradient: "from-purple-500 to-violet-500", rating: 4.9, reviewCount: 156, location: "Hyderabad",
    images: ["/gig-images/video.svg", "/gig-images/video.svg", "/gig-images/video.svg"],
    packages: [
      { name: "Basic", price: 3500, desc: "Up to 10-min video edit with cuts, colour grade, and music", delivery: 3, revisions: 2, features: ["Up to 10 Minutes", "Colour Grading", "Background Music", "Subtitles", "2 Revisions"] },
      { name: "Standard", price: 8000, desc: "Up to 25-min video with motion graphics, custom intro/outro", delivery: 5, revisions: 4, features: ["Up to 25 Minutes", "Motion Graphics", "Custom Intro/Outro", "Sound Design", "Thumbnail Design", "4 Revisions"], popular: true },
      { name: "Premium", price: 18000, desc: "Long-form video up to 1 hour with full post-production", delivery: 10, revisions: -1, features: ["Up to 60 Minutes", "Full Post-Production", "Advanced VFX", "Voiceover Sync", "Multi-format Export", "Unlimited Revisions"] },
    ],
    description: [
      "I transform raw footage into polished, engaging YouTube videos that keep viewers watching. With 7 years in video post-production, I know exactly what makes content perform on YouTube.",
      "Whether it's a vlog, tutorial, documentary, or brand video — I bring professional-level editing with fast turnaround.",
    ],
    whatYouGet: ["Professional colour grading", "Smooth, engaging cuts", "Licensed background music", "Custom lower thirds", "Exported in 1080p/4K"],
    reviews: [
      { name: "Aryan Bose", initials: "AB", rating: 5, date: "5 days ago", text: "Vikram completely transformed my raw footage. My watch time went up 40% after switching to his edits. Absolutely worth it.", gradient: "from-purple-500 to-violet-500" },
      { name: "Tanvi Rao", initials: "TR", rating: 5, date: "2 weeks ago", text: "Super fast, professional, and creative. He added effects I didn't even ask for and they looked amazing. 10/10.", gradient: "from-pink-500 to-rose-500" },
      { name: "Nikhil Joshi", initials: "NJ", rating: 5, date: "3 weeks ago", text: "My channel grew from 2k to 15k subscribers in 3 months after hiring Vikram. His editing makes such a difference.", gradient: "from-blue-500 to-cyan-500" },
    ],
  },
  "5": {
    title: "I will create a complete social media marketing strategy",
    category: "Digital Marketing", categoryHref: "/catalog?category=Digital+Marketing",
    seller: "Neha Gupta", sellerInitials: "NG", sellerSlug: "neha-gupta",
    gradient: "from-amber-500 to-orange-500", rating: 4.7, reviewCount: 98, location: "Pune",
    images: ["/gig-images/marketing.svg", "/gig-images/marketing.svg", "/gig-images/marketing.svg"],
    packages: [
      { name: "Basic", price: 5000, desc: "30-day strategy for 1 platform with content calendar", delivery: 5, revisions: 1, features: ["1 Platform", "30-day Calendar", "10 Content Ideas", "Hashtag Research", "1 Revision"] },
      { name: "Standard", price: 12000, desc: "Full strategy for 3 platforms with competitor analysis", delivery: 7, revisions: 3, features: ["3 Platforms", "60-day Calendar", "Competitor Analysis", "Audience Research", "Ad Budget Plan", "3 Revisions"], popular: true },
      { name: "Premium", price: 25000, desc: "Complete 90-day digital marketing strategy with paid ad setup", delivery: 14, revisions: -1, features: ["All Platforms", "90-day Strategy", "Paid Ad Campaigns", "Influencer List", "KPI Dashboard", "Monthly Review Call", "Unlimited Revisions"] },
    ],
    description: [
      "I design data-driven social media strategies that grow your brand, increase engagement, and convert followers into customers. My clients average 3x follower growth in the first 90 days.",
      "Ex-digital marketing head at a D2C startup that scaled from ₹0 to ₹5 Cr ARR. I bring boardroom strategy to your brand.",
    ],
    whatYouGet: ["Platform-specific content strategy", "Competitor & audience analysis", "Content calendar with post ideas", "Hashtag & SEO recommendations", "Paid ad strategy (if applicable)"],
    reviews: [
      { name: "Kavya Nair", initials: "KN", rating: 5, date: "1 week ago", text: "Neha's strategy was exactly what our brand needed. Instagram grew from 1.2k to 8.5k in 60 days. Incredible!", gradient: "from-amber-500 to-orange-500" },
      { name: "Suresh Iyer", initials: "SI", rating: 5, date: "1 month ago", text: "Very structured and professional. The content calendar was detailed and our team found it easy to execute.", gradient: "from-teal-500 to-green-500" },
      { name: "Pooja Mehta", initials: "PM", rating: 4, date: "2 months ago", text: "Good strategy overall. Took a couple of revisions to align with our brand voice but the final document was excellent.", gradient: "from-pink-500 to-rose-500" },
    ],
  },
  "6": {
    title: "I will develop a cross-platform mobile app using Flutter",
    category: "Mobile Apps", categoryHref: "/catalog?category=Mobile+Apps",
    seller: "Arjun Mehta", sellerInitials: "AM", sellerSlug: "arjun-mehta",
    gradient: "from-teal-500 to-green-500", rating: 4.9, reviewCount: 145, location: "Chennai",
    images: ["/gig-images/mobile.svg", "/gig-images/mobile.svg", "/gig-images/webdev.svg"],
    packages: [
      { name: "Basic", price: 25000, desc: "Simple informational app for iOS & Android (up to 5 screens)", delivery: 14, revisions: 2, features: ["iOS + Android", "Up to 5 Screens", "UI from Figma", "Firebase Integration", "App Store Submission"] },
      { name: "Standard", price: 55000, desc: "Full-featured app with auth, API integration and admin panel", delivery: 21, revisions: 4, features: ["iOS + Android", "Up to 15 Screens", "Authentication", "REST API Integration", "Admin Panel", "Push Notifications", "4 Revisions"], popular: true },
      { name: "Premium", price: 100000, desc: "Complex app with payments, real-time features and 12-month support", delivery: 45, revisions: -1, features: ["Full-Featured App", "Payment Gateway", "Real-Time (Socket.io)", "Analytics Dashboard", "12-month Support", "Unlimited Revisions", "Source Code"] },
    ],
    description: [
      "I build beautiful, high-performance mobile apps using Flutter that work seamlessly on both iOS and Android from a single codebase. Clean architecture, smooth animations, fast performance.",
      "8 years of mobile development experience. 50+ apps published. My apps have collectively 5M+ downloads on the Play Store and App Store.",
    ],
    whatYouGet: ["Single codebase for iOS & Android", "Pixel-perfect UI/UX", "Clean, documented code", "Play Store & App Store submission", "30-day post-launch support"],
    reviews: [
      { name: "Harish Kumar", initials: "HK", rating: 5, date: "2 weeks ago", text: "Arjun built our delivery app from scratch in 3 weeks. Performance is stellar, zero crashes, and the UI looks better than our competitors. Exceptional work.", gradient: "from-teal-500 to-green-500" },
      { name: "Shruti Bangera", initials: "SB", rating: 5, date: "1 month ago", text: "Second app with Arjun. He's my go-to developer on VALOR. Fast, communicative, and the code he writes is genuinely clean.", gradient: "from-violet-500 to-purple-500" },
      { name: "Varun Shetty", initials: "VS", rating: 5, date: "2 months ago", text: "Our app got featured on Google Play in the first month. Arjun's attention to detail and UX sensibility is rare in a developer.", gradient: "from-blue-500 to-cyan-500" },
    ],
  },
  "7": {
    title: "I will create a professional brand identity package",
    category: "Graphics & Design", categoryHref: "/catalog?category=Graphics+%26+Design",
    seller: "Kavita Desai", sellerInitials: "KD", sellerSlug: "kavita-desai",
    gradient: "from-fuchsia-500 to-purple-500", rating: 4.8, reviewCount: 201, location: "Ahmedabad",
    images: ["/gig-images/branding.svg", "/gig-images/design.svg", "/gig-images/branding.svg"],
    packages: [
      { name: "Basic", price: 8000, desc: "Logo + brand colours + typography guide", delivery: 5, revisions: 2, features: ["Logo Design", "Colour Palette", "Typography Guide", "PNG + PDF Files", "2 Revisions"] },
      { name: "Standard", price: 18000, desc: "Full brand identity: logo, guidelines, stationery", delivery: 10, revisions: 4, features: ["Logo + Variations", "Full Brand Guidelines", "Business Card", "Letterhead", "Email Signature", "4 Revisions"], popular: true },
      { name: "Premium", price: 35000, desc: "Complete brand system for startups and scale-ups", delivery: 18, revisions: -1, features: ["Complete Brand System", "Logo + Icon Set", "Brand Style Guide", "All Stationery", "Social Media Templates", "Brand Presentation", "Unlimited Revisions"] },
    ],
    description: [
      "I create cohesive, memorable brand identities that make your business stand out. From logo to full brand guidelines, every element is crafted to communicate your values clearly.",
      "Background in design consulting for 30+ funded startups. My work has been featured in Behance Top-100 and Design Week India.",
    ],
    whatYouGet: ["Strategic brand positioning", "Timeless logo design", "Comprehensive brand guidelines", "All source files (AI, EPS, SVG)", "Printable + digital asset formats"],
    reviews: [
      { name: "Alok Sharma", initials: "AS", rating: 5, date: "1 week ago", text: "Kavita built our entire startup brand from scratch. Investors keep complimenting the branding. Worth every paisa.", gradient: "from-fuchsia-500 to-purple-500" },
      { name: "Nandini Rao", initials: "NR", rating: 5, date: "3 weeks ago", text: "Extremely professional, strategic thinker, not just a designer. She asked the right questions before starting and the result was spot-on.", gradient: "from-pink-500 to-rose-500" },
      { name: "Vivek Tiwari", initials: "VT", rating: 5, date: "2 months ago", text: "Our rebrand doubled our conversion rate. Kavita's work speaks for itself. She's booked out for a reason.", gradient: "from-amber-500 to-orange-500" },
    ],
  },
  "8": {
    title: "I will compose original background music for your content",
    category: "Music & Audio", categoryHref: "/catalog?category=Music+%26+Audio",
    seller: "Sahil Kapoor", sellerInitials: "SK", sellerSlug: "sahil-kapoor",
    gradient: "from-red-500 to-pink-500", rating: 4.6, reviewCount: 67, location: "Jaipur",
    images: ["/gig-images/background-music.svg", "/gig-images/music-mastering.svg", "/gig-images/voiceover.svg"],
    packages: [
      { name: "Basic", price: 4000, desc: "Up to 60-second original music track, 2 genres to choose from", delivery: 4, revisions: 1, features: ["Up to 60 Seconds", "2 Genre Options", "WAV + MP3 Files", "Commercial License", "1 Revision"] },
      { name: "Standard", price: 9000, desc: "Up to 3-minute track with custom arrangement for your brief", delivery: 7, revisions: 3, features: ["Up to 3 Minutes", "Custom Arrangement", "Stems Included", "Sync License", "Loopable Version", "3 Revisions"], popular: true },
      { name: "Premium", price: 20000, desc: "Full original score: up to 5 tracks for a complete project", delivery: 14, revisions: -1, features: ["Up to 5 Tracks", "Full Orchestration", "All Source Files", "Exclusive License", "Unlimited Revisions", "Mixing & Mastering"] },
    ],
    description: [
      "I compose original, royalty-free background music tailored to your brand, video, or app. Every track is produced from scratch — no loops, no stock clips, just pure custom music.",
      "10 years of music production experience. Studied at Swarnabhoomi Academy of Music. Clients include YouTube channels (1M+ subscribers), ad agencies, and mobile game studios.",
    ],
    whatYouGet: ["100% original composition", "Royalty-free commercial license", "High-quality WAV + MP3 files", "Mastered for digital platforms", "On-time delivery"],
    reviews: [
      { name: "Deepika Pillai", initials: "DP", rating: 5, date: "4 days ago", text: "Sahil composed a beautiful intro track for my YouTube channel. It perfectly captures my brand's vibe. Subscribers love it!", gradient: "from-red-500 to-pink-500" },
      { name: "Gaurav Anand", initials: "GA", rating: 5, date: "3 weeks ago", text: "Used his music for our app. The quality is indistinguishable from professional studio work. Great communication and fast delivery.", gradient: "from-blue-500 to-cyan-500" },
      { name: "Isha Verma", initials: "IV", rating: 4, date: "1 month ago", text: "Good quality music, needed 2 revisions to get the right mood. But the final track was exactly what I wanted. Will order again.", gradient: "from-emerald-500 to-teal-500" },
    ],
  },
  "9": {
    title: "I will design eye-catching social media graphics and banners",
    category: "Graphics & Design", categoryHref: "/catalog?category=Graphics+%26+Design",
    seller: "Sneha Iyer", sellerInitials: "SI", sellerSlug: "sneha-iyer",
    gradient: "from-violet-500 to-purple-500", rating: 4.7, reviewCount: 178, location: "Bangalore",
    images: ["/gig-images/social-graphics.svg", "/gig-images/logo-design.svg", "/gig-images/brand-identity.svg"],
    packages: [
      { name: "Basic", price: 1500, desc: "5 social media graphics for 1 platform", delivery: 2, revisions: 1, features: ["5 Graphics", "1 Platform", "PNG Export", "Brand Colors", "1 Revision"] },
      { name: "Standard", price: 4000, desc: "20 graphics for 3 platforms with templates", delivery: 5, revisions: 3, features: ["20 Graphics", "3 Platforms", "Editable Templates", "Story + Post Formats", "3 Revisions"], popular: true },
      { name: "Premium", price: 8000, desc: "Full monthly content kit: 40+ graphics, ads, and stories", delivery: 10, revisions: -1, features: ["40+ Graphics", "All Platforms", "Ad Creatives", "Animated Stories", "Source Files", "Unlimited Revisions"] },
    ],
    description: [
      "I design scroll-stopping social media visuals that build brand recognition and drive engagement. Every graphic is tailored to your brand palette and platform requirements.",
      "4 years creating content for D2C brands, influencers, and agencies. I've produced 5,000+ social graphics that generated over ₹2 Cr in tracked ad revenue.",
    ],
    whatYouGet: ["On-brand, platform-optimised graphics", "Editable source files (Canva/Figma)", "Multiple format exports", "Fast turnaround", "Consistent visual style"],
    reviews: [
      { name: "Priya Nair", initials: "PN", rating: 5, date: "1 week ago", text: "Sneha nailed our brand aesthetic instantly. Our engagement rate jumped 60% after switching to her designs.", gradient: "from-violet-500 to-purple-500" },
      { name: "Rahul Das", initials: "RD", rating: 5, date: "2 weeks ago", text: "Super fast and very professional. The templates she made save us hours every week.", gradient: "from-blue-500 to-cyan-500" },
      { name: "Anita Sharma", initials: "AS", rating: 4, date: "1 month ago", text: "Great quality work. One revision needed to align with our tone, but the final graphics were excellent.", gradient: "from-pink-500 to-rose-500" },
    ],
  },
  "10": {
    title: "I will build a full-stack e-commerce website with payment integration",
    category: "Web Development", categoryHref: "/catalog?category=Web+Development",
    seller: "Ravi Kumar", sellerInitials: "RK", sellerSlug: "ravi-kumar",
    gradient: "from-indigo-500 to-blue-500", rating: 4.8, reviewCount: 142, location: "Kolkata",
    images: ["/gig-images/ecommerce-website.svg", "/gig-images/react-website.svg", "/gig-images/wordpress-website.svg"],
    packages: [
      { name: "Basic", price: 30000, desc: "Up to 20 products, Razorpay integration, mobile responsive", delivery: 14, revisions: 2, features: ["Up to 20 Products", "Razorpay Payment", "Mobile Responsive", "Admin Panel", "2 Revisions"] },
      { name: "Standard", price: 65000, desc: "Full e-commerce store with inventory, coupons and analytics", delivery: 21, revisions: 4, features: ["Unlimited Products", "Inventory Management", "Coupon System", "Analytics Dashboard", "Email Notifications", "4 Revisions"], popular: true },
      { name: "Premium", price: 120000, desc: "Enterprise e-commerce with multi-vendor and custom features", delivery: 45, revisions: -1, features: ["Multi-Vendor Support", "Custom Checkout", "Loyalty Program", "Advanced Analytics", "3-month Support", "Unlimited Revisions"] },
    ],
    description: [
      "I build robust, scalable e-commerce websites that convert visitors into buyers. Every store is built with performance, security, and UX at the forefront.",
      "7 years of e-commerce development. Have built stores that process ₹10 Cr+ in annual transactions. Expert in Next.js, Node.js, and Razorpay.",
    ],
    whatYouGet: ["Fully functional online store", "Secure payment gateway", "Mobile-first design", "SEO-ready structure", "Admin dashboard"],
    reviews: [
      { name: "Meera Joshi", initials: "MJ", rating: 5, date: "2 weeks ago", text: "Our store went live on time and handled the launch surge perfectly. Sales exceeded expectations in month 1.", gradient: "from-indigo-500 to-blue-500" },
      { name: "Suresh Patel", initials: "SP", rating: 5, date: "1 month ago", text: "Ravi built exactly what we needed. Clean code, good documentation, and responsive to feedback.", gradient: "from-emerald-500 to-teal-500" },
      { name: "Lakshmi Rao", initials: "LR", rating: 4, date: "2 months ago", text: "Solid work overall. Took a bit longer than quoted but final delivery was excellent quality.", gradient: "from-amber-500 to-orange-500" },
    ],
  },
  "11": {
    title: "I will create a custom WordPress website with SEO optimization",
    category: "Web Development", categoryHref: "/catalog?category=Web+Development",
    seller: "Rohan Bajaj", sellerInitials: "RB", sellerSlug: "rohan-bajaj",
    gradient: "from-sky-500 to-blue-500", rating: 4.6, reviewCount: 93, location: "Noida",
    images: ["/gig-images/wordpress-website.svg", "/gig-images/react-website.svg", "/gig-images/ecommerce-website.svg"],
    packages: [
      { name: "Basic", price: 8000, desc: "5-page WordPress site with theme customisation and contact form", delivery: 7, revisions: 2, features: ["5 Pages", "Custom Theme", "Contact Form", "Mobile Responsive", "2 Revisions"] },
      { name: "Standard", price: 18000, desc: "Business site with blog, SEO plugins and speed optimisation", delivery: 12, revisions: 4, features: ["Up to 12 Pages", "Blog Setup", "Yoast SEO", "Speed Optimisation", "Google Analytics", "4 Revisions"], popular: true },
      { name: "Premium", price: 35000, desc: "Full business website with WooCommerce and ongoing SEO", delivery: 20, revisions: -1, features: ["Unlimited Pages", "WooCommerce", "Advanced SEO", "Schema Markup", "1-month Support", "Unlimited Revisions"] },
    ],
    description: [
      "I build fast, beautiful WordPress websites optimised for search engines and conversions. Every site scores 90+ on Google PageSpeed and is structured for long-term SEO growth.",
      "5 years of WordPress development. 200+ sites delivered for local businesses, startups, and NGOs.",
    ],
    whatYouGet: ["Custom WordPress design", "SEO-optimised structure", "Fast loading speed", "Mobile responsive", "Training on how to update content"],
    reviews: [
      { name: "Asha Trivedi", initials: "AT", rating: 5, date: "3 days ago", text: "Our website went from page 8 to page 1 on Google in 6 weeks. Rohan's SEO setup really works.", gradient: "from-sky-500 to-blue-500" },
      { name: "Rajesh Gupta", initials: "RG", rating: 4, date: "3 weeks ago", text: "Good work overall, a few revisions needed. Site loads fast and looks professional.", gradient: "from-violet-500 to-purple-500" },
      { name: "Nitu Singh", initials: "NS", rating: 5, date: "2 months ago", text: "Very patient with a non-technical client. Delivered exactly what I needed and explained everything clearly.", gradient: "from-pink-500 to-rose-500" },
    ],
  },
  "12": {
    title: "I will write compelling product descriptions for your e-commerce store",
    category: "Content Writing", categoryHref: "/catalog?category=Content+Writing",
    seller: "Preeti Saxena", sellerInitials: "PS", sellerSlug: "preeti-saxena",
    gradient: "from-lime-500 to-green-500", rating: 4.9, reviewCount: 167, location: "Bhopal",
    images: ["/gig-images/product-descriptions.svg", "/gig-images/blog-writing.svg", "/gig-images/social-captions.svg"],
    packages: [
      { name: "Basic", price: 800, desc: "10 product descriptions, 100–150 words each", delivery: 2, revisions: 1, features: ["10 Descriptions", "100–150 Words Each", "SEO Keywords", "Persuasive Tone", "1 Revision"] },
      { name: "Standard", price: 2000, desc: "30 product descriptions with A/B headline variants", delivery: 5, revisions: 3, features: ["30 Descriptions", "150–200 Words Each", "A/B Headlines", "Benefit-focused Copy", "3 Revisions"], popular: true },
      { name: "Premium", price: 5000, desc: "100 descriptions with full category page copy", delivery: 14, revisions: -1, features: ["100 Descriptions", "Category Page Copy", "Bulk Discount Table", "Tone Guide", "Unlimited Revisions"] },
    ],
    description: [
      "I write product descriptions that sell. My copy is benefit-driven, SEO-friendly, and tailored to your brand voice — turning browsers into buyers.",
      "3 years writing for Meesho, Myntra, and Amazon sellers. My clients consistently report 20–35% conversion rate improvements after switching to my copy.",
    ],
    whatYouGet: ["Conversion-optimised copy", "SEO keywords woven in naturally", "Consistent brand voice", "Delivered in CSV or Google Sheets", "On-time, every time"],
    reviews: [
      { name: "Kritika Verma", initials: "KV", rating: 5, date: "1 week ago", text: "Our Meesho store conversion jumped from 1.8% to 3.2% after Preeti rewrote our descriptions. Amazing ROI.", gradient: "from-lime-500 to-green-500" },
      { name: "Saurabh Tiwari", initials: "ST", rating: 5, date: "2 weeks ago", text: "Delivered 30 descriptions 2 days early. Every single one was publish-ready. Incredibly professional.", gradient: "from-emerald-500 to-teal-500" },
      { name: "Priya Mehta", initials: "PM", rating: 5, date: "1 month ago", text: "No revisions needed — Preeti nailed the tone on the first attempt. Highly recommend.", gradient: "from-blue-500 to-cyan-500" },
    ],
  },
  "13": {
    title: "I will create engaging social media captions and ad copy",
    category: "Content Writing", categoryHref: "/catalog?category=Content+Writing",
    seller: "Tanvi Joshi", sellerInitials: "TJ", sellerSlug: "tanvi-joshi",
    gradient: "from-teal-500 to-emerald-500", rating: 4.7, reviewCount: 88, location: "Nagpur",
    images: ["/gig-images/social-captions.svg", "/gig-images/blog-writing.svg", "/gig-images/product-descriptions.svg"],
    packages: [
      { name: "Basic", price: 1200, desc: "30 captions for Instagram/Facebook with hashtag sets", delivery: 3, revisions: 1, features: ["30 Captions", "Hashtag Sets", "CTA Included", "2 Platforms", "1 Revision"] },
      { name: "Standard", price: 3000, desc: "60 captions + 5 ad copy sets across 3 platforms", delivery: 6, revisions: 3, features: ["60 Captions", "5 Ad Copy Sets", "3 Platforms", "A/B Variants", "Tone Customisation", "3 Revisions"], popular: true },
      { name: "Premium", price: 6000, desc: "Full monthly content copy: captions, ads, email subject lines", delivery: 12, revisions: -1, features: ["120 Captions", "Ad Copy", "Email Subject Lines", "Story Scripts", "Monthly Calendar", "Unlimited Revisions"] },
    ],
    description: [
      "I write captions and ad copy that stop the scroll and spark action. Every word is crafted to match your brand voice while maximising reach and engagement.",
      "Former copywriter at a Mumbai-based digital agency. Hands-on experience with Meta Ads, influencer campaigns, and D2C brand building.",
    ],
    whatYouGet: ["Platform-specific caption styles", "Hashtag research included", "Strong calls-to-action", "Delivered in Google Docs", "Brand voice consistency"],
    reviews: [
      { name: "Divya Kapoor", initials: "DK", rating: 5, date: "4 days ago", text: "Tanvi's captions doubled our reach on Instagram. Her hook-writing is genuinely next level.", gradient: "from-teal-500 to-emerald-500" },
      { name: "Abhishek Nair", initials: "AN", rating: 5, date: "3 weeks ago", text: "Our ad CTR went from 0.9% to 2.4% using Tanvi's copy. Best content investment we've made.", gradient: "from-violet-500 to-purple-500" },
      { name: "Sneha Bansal", initials: "SB", rating: 4, date: "1 month ago", text: "Good work, very responsive. The tone took one revision to perfect but the quality is consistently high.", gradient: "from-amber-500 to-orange-500" },
    ],
  },
  "14": {
    title: "I will create a 2D animated explainer video for your business",
    category: "Video & Animation", categoryHref: "/catalog?category=Video+%26+Animation",
    seller: "Kartik Malhotra", sellerInitials: "KM", sellerSlug: "kartik-malhotra",
    gradient: "from-fuchsia-500 to-pink-500", rating: 4.8, reviewCount: 112, location: "Chandigarh",
    images: ["/gig-images/animated-explainer.svg", "/gig-images/youtube-editing.svg", "/gig-images/product-demo-video.svg"],
    packages: [
      { name: "Basic", price: 7000, desc: "30-second 2D explainer with script and voiceover", delivery: 7, revisions: 2, features: ["30 Seconds", "Script Writing", "Voiceover", "Background Music", "2 Revisions"] },
      { name: "Standard", price: 18000, desc: "60-second animated video with custom characters", delivery: 14, revisions: 3, features: ["60 Seconds", "Custom Characters", "Scene Transitions", "Professional VO", "Sound FX", "3 Revisions"], popular: true },
      { name: "Premium", price: 40000, desc: "2-minute full animated brand story with premium production", delivery: 25, revisions: -1, features: ["Up to 2 Minutes", "Premium Animation", "Character Design", "Full Storyboard", "Multiple Formats", "Unlimited Revisions"] },
    ],
    description: [
      "I create engaging 2D animated explainer videos that simplify complex ideas and help businesses convert more visitors into customers. Clear storytelling meets beautiful animation.",
      "5 years of motion graphics experience. My videos have been used in pitch decks, app store listings, and ad campaigns with 10M+ combined views.",
    ],
    whatYouGet: ["Custom animated video", "Script + storyboard included", "Professional voiceover", "Licensed music", "MP4 + web-optimised formats"],
    reviews: [
      { name: "Vivek Sharma", initials: "VS", rating: 5, date: "1 week ago", text: "Our app's conversion rate on the landing page went from 4% to 11% after adding Kartik's explainer video.", gradient: "from-fuchsia-500 to-pink-500" },
      { name: "Riya Menon", initials: "RM", rating: 5, date: "3 weeks ago", text: "Used this for our investor pitch. The animation quality is phenomenal. Investors loved it.", gradient: "from-blue-500 to-cyan-500" },
      { name: "Arun Pillai", initials: "AP", rating: 5, date: "1 month ago", text: "Third project with Kartik. Consistent quality, creative ideas, and always on time.", gradient: "from-violet-500 to-purple-500" },
    ],
  },
  "15": {
    title: "I will produce a professional product demo and promo video",
    category: "Video & Animation", categoryHref: "/catalog?category=Video+%26+Animation",
    seller: "Divya Nambiar", sellerInitials: "DN", sellerSlug: "divya-nambiar",
    gradient: "from-violet-500 to-indigo-500", rating: 4.7, reviewCount: 74, location: "Chennai",
    images: ["/gig-images/product-demo-video.svg", "/gig-images/youtube-editing.svg", "/gig-images/animated-explainer.svg"],
    packages: [
      { name: "Basic", price: 5000, desc: "30-second product demo with screen recording and narration", delivery: 4, revisions: 2, features: ["30-Second Demo", "Screen Recording", "Narration", "Background Music", "2 Revisions"] },
      { name: "Standard", price: 12000, desc: "60-second promo video with product shots and motion text", delivery: 8, revisions: 3, features: ["60-Second Promo", "Product Photography", "Motion Text", "Colour Grade", "Social Formats", "3 Revisions"], popular: true },
      { name: "Premium", price: 28000, desc: "Full product campaign video up to 90 seconds, all formats", delivery: 18, revisions: -1, features: ["90-Second Video", "Multi-shot Setup", "Drone Footage Option", "Ad Formats", "YouTube + Reels Cut", "Unlimited Revisions"] },
    ],
    description: [
      "I produce polished product demo and promo videos that showcase your product's best features and drive purchase intent. I've worked with e-commerce brands, SaaS companies, and D2C startups.",
      "Cinematography background with 4 years in commercial video production. My videos have been used in Meta Ads campaigns with 8-figure budgets.",
    ],
    whatYouGet: ["Professional-grade video production", "Multiple platform formats", "Colour graded footage", "Licensed music", "Fast revisions"],
    reviews: [
      { name: "Karan Bhatia", initials: "KB", rating: 5, date: "5 days ago", text: "Our product video drove ₹8L in sales in the first week. Divya clearly knows how to sell through video.", gradient: "from-violet-500 to-indigo-500" },
      { name: "Meena Iyer", initials: "MI", rating: 5, date: "2 weeks ago", text: "Exceptional production quality. The video looks like it was made by a big agency — for a fraction of the price.", gradient: "from-pink-500 to-rose-500" },
      { name: "Sanjay Kumar", initials: "SK", rating: 4, date: "1 month ago", text: "Great video overall. Slight delay in delivery but communication was good and the final output was worth it.", gradient: "from-teal-500 to-green-500" },
    ],
  },
  "16": {
    title: "I will run targeted Google Ads campaigns to grow your sales",
    category: "Digital Marketing", categoryHref: "/catalog?category=Digital+Marketing",
    seller: "Manish Agarwal", sellerInitials: "MA", sellerSlug: "manish-agarwal",
    gradient: "from-orange-500 to-red-500", rating: 4.8, reviewCount: 130, location: "Lucknow",
    images: ["/gig-images/google-ads.svg", "/gig-images/social-media-strategy.svg", "/gig-images/instagram-management.svg"],
    packages: [
      { name: "Basic", price: 6000, desc: "Campaign setup + 30-day management for 1 Google Ads campaign", delivery: 3, revisions: 1, features: ["1 Campaign", "Keyword Research", "Ad Copywriting", "Bid Optimisation", "Monthly Report"] },
      { name: "Standard", price: 15000, desc: "3 campaigns (Search + Display + Shopping) with A/B testing", delivery: 5, revisions: 2, features: ["3 Campaigns", "Search + Display + Shopping", "A/B Ad Testing", "Conversion Tracking", "Bi-weekly Reports", "2 Revisions"], popular: true },
      { name: "Premium", price: 30000, desc: "Full Google Ads management: all campaign types, remarketing, monthly strategy call", delivery: 7, revisions: -1, features: ["All Campaign Types", "Remarketing", "YouTube Ads", "Monthly Strategy Call", "Real-time Dashboard", "Unlimited Revisions"] },
    ],
    description: [
      "I set up and manage Google Ads campaigns that generate measurable ROI. No fluff — just data-driven targeting, compelling ad copy, and continuous optimisation.",
      "Google Ads certified. Managed ₹5 Cr+ in ad spend across industries including e-commerce, real estate, ed-tech, and healthcare.",
    ],
    whatYouGet: ["Keyword research & selection", "Ad copy creation", "Campaign structure setup", "Conversion tracking", "Detailed performance reports"],
    reviews: [
      { name: "Aditya Soni", initials: "AS", rating: 5, date: "1 week ago", text: "Our ROAS went from 1.8x to 4.2x in 45 days. Manish knows Google Ads better than anyone I've worked with.", gradient: "from-orange-500 to-red-500" },
      { name: "Priya Rawat", initials: "PR", rating: 5, date: "3 weeks ago", text: "Cut our cost per lead by 62% in the first month. Transparent reporting and very responsive.", gradient: "from-blue-500 to-cyan-500" },
      { name: "Nitin Bose", initials: "NB", rating: 4, date: "1 month ago", text: "Good results, takes a couple of weeks to optimise but well worth it once campaigns are dialled in.", gradient: "from-emerald-500 to-teal-500" },
    ],
  },
  "17": {
    title: "I will manage your Instagram and Facebook pages with daily posts",
    category: "Digital Marketing", categoryHref: "/catalog?category=Digital+Marketing",
    seller: "Ritika Choudhary", sellerInitials: "RC", sellerSlug: "ritika-choudhary",
    gradient: "from-rose-500 to-pink-500", rating: 4.6, reviewCount: 61, location: "Jaipur",
    images: ["/gig-images/instagram-management.svg", "/gig-images/social-media-strategy.svg", "/gig-images/google-ads.svg"],
    packages: [
      { name: "Basic", price: 4000, desc: "15 posts/month for 1 platform with basic graphics", delivery: 5, revisions: 1, features: ["15 Posts/Month", "1 Platform", "Basic Graphics", "Caption Writing", "1 Revision"] },
      { name: "Standard", price: 9000, desc: "Daily posts for 2 platforms + stories + engagement", delivery: 5, revisions: 2, features: ["30 Posts/Month", "2 Platforms", "Custom Graphics", "Daily Stories", "Comment Management", "2 Revisions"], popular: true },
      { name: "Premium", price: 18000, desc: "Full social media management: posts, stories, reels, ads", delivery: 5, revisions: -1, features: ["Daily Posts + Reels", "3 Platforms", "Paid Ad Management", "Influencer Outreach", "Monthly Analytics", "Unlimited Revisions"] },
    ],
    description: [
      "I handle your social media from start to finish — content creation, scheduling, engagement, and growth. You focus on your business, I'll grow your audience.",
      "Managed social media for 20+ brands with combined following of 2M+. Specialize in lifestyle, fashion, food, and home décor niches.",
    ],
    whatYouGet: ["Consistent daily posting", "On-brand visual content", "Caption + hashtag strategy", "Audience engagement", "Monthly performance report"],
    reviews: [
      { name: "Sheetal Verma", initials: "SV", rating: 5, date: "2 weeks ago", text: "Our bakery went from 400 to 3,200 followers in 2 months. Ritika handles everything professionally.", gradient: "from-rose-500 to-pink-500" },
      { name: "Rohit Arora", initials: "RA", rating: 4, date: "1 month ago", text: "Good steady growth. Content quality is consistent and she's responsive to feedback.", gradient: "from-amber-500 to-orange-500" },
      { name: "Anjali Nair", initials: "AN", rating: 5, date: "2 months ago", text: "Best social media manager I've worked with. She genuinely understands our audience and brand.", gradient: "from-violet-500 to-purple-500" },
    ],
  },
  "18": {
    title: "I will build a React Native app for iOS and Android",
    category: "Mobile Apps", categoryHref: "/catalog?category=Mobile+Apps",
    seller: "Deepak Nair", sellerInitials: "DN", sellerSlug: "deepak-nair",
    gradient: "from-cyan-500 to-teal-500", rating: 4.8, reviewCount: 109, location: "Kochi",
    images: ["/gig-images/react-native-app.svg", "/gig-images/flutter-app.svg", "/gig-images/android-app.svg"],
    packages: [
      { name: "Basic", price: 20000, desc: "Simple React Native app for iOS & Android (up to 5 screens)", delivery: 12, revisions: 2, features: ["iOS + Android", "5 Screens", "Navigation", "API Integration", "App Store Submission"] },
      { name: "Standard", price: 45000, desc: "Full-featured app with auth, notifications, and admin panel", delivery: 20, revisions: 3, features: ["iOS + Android", "12 Screens", "Auth (OTP/Social)", "Push Notifications", "Admin Dashboard", "3 Revisions"], popular: true },
      { name: "Premium", price: 90000, desc: "Complex app with payments, real-time features and 6-month support", delivery: 40, revisions: -1, features: ["Full-Featured App", "Payment Gateway", "Real-Time Chat", "Offline Mode", "6-month Support", "Unlimited Revisions"] },
    ],
    description: [
      "I build high-quality cross-platform mobile apps using React Native. One codebase, two platforms — delivering a native-like experience on both iOS and Android.",
      "6 years of React Native development. 35+ apps shipped. My apps have a combined 3M+ downloads and 4.6 average store rating.",
    ],
    whatYouGet: ["Single codebase for iOS & Android", "Native-like performance", "Clean, documented code", "App Store & Play Store submission", "Post-launch support"],
    reviews: [
      { name: "Aniket Patil", initials: "AP", rating: 5, date: "1 week ago", text: "Deepak delivered our marketplace app in 18 days. Performance is smooth and our users love the UI.", gradient: "from-cyan-500 to-teal-500" },
      { name: "Pooja Shetty", initials: "PS", rating: 5, date: "1 month ago", text: "Clean, well-commented code. Easy to maintain. Deepak's communication throughout the project was excellent.", gradient: "from-blue-500 to-cyan-500" },
      { name: "Vishal Rao", initials: "VR", rating: 4, date: "2 months ago", text: "Good quality work. The app needed some performance tuning after delivery but Deepak fixed it quickly.", gradient: "from-violet-500 to-purple-500" },
    ],
  },
  "19": {
    title: "I will develop a native Android app with Material Design UI",
    category: "Mobile Apps", categoryHref: "/catalog?category=Mobile+Apps",
    seller: "Amit Shah", sellerInitials: "AS", sellerSlug: "amit-shah",
    gradient: "from-green-500 to-emerald-500", rating: 4.7, reviewCount: 82, location: "Surat",
    images: ["/gig-images/android-app.svg", "/gig-images/react-native-app.svg", "/gig-images/flutter-app.svg"],
    packages: [
      { name: "Basic", price: 18000, desc: "Native Android app up to 5 screens with Material Design 3", delivery: 10, revisions: 2, features: ["Native Android", "5 Screens", "Material Design 3", "SQLite Storage", "2 Revisions"] },
      { name: "Standard", price: 40000, desc: "Full Android app with Firebase, auth, and notifications", delivery: 18, revisions: 3, features: ["Native Android", "10 Screens", "Firebase Integration", "Auth System", "Push Notifications", "3 Revisions"], popular: true },
      { name: "Premium", price: 80000, desc: "Enterprise Android app with Jetpack Compose and CI/CD", delivery: 35, revisions: -1, features: ["Jetpack Compose UI", "Complex Business Logic", "CI/CD Pipeline", "Unit + UI Tests", "6-month Support", "Unlimited Revisions"] },
    ],
    description: [
      "I build polished, performant native Android applications using Kotlin and Jetpack Compose. Material Design 3 expertise with strong architecture practices.",
      "7 years of Android development. Google Play-featured apps, 2M+ total downloads, and extensive experience in enterprise-grade Android development.",
    ],
    whatYouGet: ["Native Android performance", "Modern Kotlin codebase", "Material Design 3 UI", "Play Store submission", "Clean architecture (MVVM)"],
    reviews: [
      { name: "Himanshu Mishra", initials: "HM", rating: 5, date: "2 weeks ago", text: "The app Amit built got featured by Google Play in its first month. The UI is smooth and very polished.", gradient: "from-green-500 to-emerald-500" },
      { name: "Deepa Rao", initials: "DR", rating: 5, date: "1 month ago", text: "Best Android dev on VALOR. Efficient, communicative, and delivers production-quality code.", gradient: "from-teal-500 to-cyan-500" },
      { name: "Rajiv Sharma", initials: "RS", rating: 4, date: "2 months ago", text: "Great quality but strict on scope changes. If you brief well upfront, the output is excellent.", gradient: "from-blue-500 to-indigo-500" },
    ],
  },
  "20": {
    title: "I will record a professional voiceover in Hindi and English",
    category: "Music & Audio", categoryHref: "/catalog?category=Music+%26+Audio",
    seller: "Pooja Reddy", sellerInitials: "PR", sellerSlug: "pooja-reddy",
    gradient: "from-pink-500 to-fuchsia-500", rating: 4.9, reviewCount: 203, location: "Hyderabad",
    images: ["/gig-images/voiceover.svg", "/gig-images/background-music.svg", "/gig-images/music-mastering.svg"],
    packages: [
      { name: "Basic", price: 2500, desc: "Up to 150-word voiceover in Hindi or English", delivery: 1, revisions: 1, features: ["Up to 150 Words", "Hindi or English", "WAV + MP3", "Noise-Free Studio Quality", "1 Revision"] },
      { name: "Standard", price: 6000, desc: "Up to 500-word bilingual voiceover with music bed", delivery: 3, revisions: 3, features: ["Up to 500 Words", "Hindi + English", "Background Music", "Multiple Reads", "3 Revisions"], popular: true },
      { name: "Premium", price: 15000, desc: "Long-form narration up to 2,000 words for any project", delivery: 5, revisions: -1, features: ["Up to 2,000 Words", "Bilingual", "Custom Music Bed", "Sync with Video", "Broadcast License", "Unlimited Revisions"] },
    ],
    description: [
      "I provide professional, studio-quality voiceover in Hindi and English for ads, explainer videos, e-learning, IVR, and podcasts. Warm, clear, and versatile voice.",
      "Radio presenter background with 6 years of professional voiceover work. Recorded for brands like Flipkart, Swiggy, and multiple OTT platforms.",
    ],
    whatYouGet: ["Studio-quality recording", "Clean, noise-free audio", "WAV + MP3 formats", "Commercial broadcast license", "Fast 24-hour delivery"],
    reviews: [
      { name: "Rahul Trivedi", initials: "RT", rating: 5, date: "3 days ago", text: "Pooja's voice is absolutely perfect for our brand. Delivered in 4 hours and the quality is broadcast-ready.", gradient: "from-pink-500 to-fuchsia-500" },
      { name: "Sunita Kapoor", initials: "SK", rating: 5, date: "1 week ago", text: "Used for our e-learning platform. Students love the narration — clear, warm, and engaging. Will hire again.", gradient: "from-violet-500 to-purple-500" },
      { name: "Manoj Bhatia", initials: "MB", rating: 5, date: "3 weeks ago", text: "Third project with Pooja. She's incredibly professional and her Hindi diction is flawless.", gradient: "from-rose-500 to-pink-500" },
    ],
  },
  "21": {
    title: "I will mix and master your music tracks professionally",
    category: "Music & Audio", categoryHref: "/catalog?category=Music+%26+Audio",
    seller: "Suresh Pillai", sellerInitials: "SP", sellerSlug: "suresh-pillai",
    gradient: "from-fuchsia-500 to-violet-500", rating: 4.8, reviewCount: 91, location: "Thiruvananthapuram",
    images: ["/gig-images/music-mastering.svg", "/gig-images/background-music.svg", "/gig-images/voiceover.svg"],
    packages: [
      { name: "Basic", price: 3000, desc: "Mix + master 1 track up to 5 minutes", delivery: 3, revisions: 2, features: ["1 Track", "Up to 5 Minutes", "Mixing + Mastering", "WAV + MP3 Export", "2 Revisions"] },
      { name: "Standard", price: 7000, desc: "Mix + master EP (up to 5 tracks) with stem exports", delivery: 7, revisions: 3, features: ["Up to 5 Tracks", "Stem Exports", "Loudness Normalised", "Streaming-Ready Master", "3 Revisions"], popular: true },
      { name: "Premium", price: 18000, desc: "Full album mix + master (up to 12 tracks) with Dolby Atmos option", delivery: 18, revisions: -1, features: ["Up to 12 Tracks", "Dolby Atmos Mix", "All Format Exports", "DDP Master", "Vinyl-Ready", "Unlimited Revisions"] },
    ],
    description: [
      "I deliver radio-ready, streaming-optimised mixes and masters that make your music sound professional on any speaker or platform. Precision mixing with analogue warmth.",
      "Trained sound engineer with 8 years of professional mixing. Mixed for independent artists, Bollywood composers, and international labels. My masters consistently hit -14 LUFS for Spotify.",
    ],
    whatYouGet: ["Professional mix balance", "Streaming-loudness mastered", "WAV + MP3 + AAC exports", "Stem returns on request", "Revision until you're satisfied"],
    reviews: [
      { name: "Akash Pillai", initials: "AP", rating: 5, date: "1 week ago", text: "My track went from sounding like a bedroom demo to something that belongs on Spotify's editorial playlists. Incredible transformation.", gradient: "from-fuchsia-500 to-violet-500" },
      { name: "Renu Sharma", initials: "RS", rating: 5, date: "2 weeks ago", text: "Suresh mixed my EP in 5 days. Every track sounds massive. He clearly has golden ears.", gradient: "from-purple-500 to-indigo-500" },
      { name: "Vikram Das", initials: "VD", rating: 5, date: "1 month ago", text: "The Dolby Atmos mix he did for our film's soundtrack got selected for a major OTT release. Exceptional skill.", gradient: "from-pink-500 to-rose-500" },
    ],
  },
};

export default function GigPage() {
  const { id } = useParams();
  const router = useRouter();
  const gig = gigDatabase[id as string] ?? gigDatabase["1"];

  const [selectedPackage, setSelectedPackage] = useState(1);
  const [liked, setLiked] = useState(false);

  return (
    <>
      <Header />
      <main className="flex-1 pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Breadcrumb */}
          <AnimatedSection>
            <nav className="flex items-center gap-2 text-sm text-text-secondary mb-6">
              <Link href="/" className="hover:text-primary transition-colors">Home</Link>
              <ChevronRight size={14} />
              <Link href={gig.categoryHref} className="hover:text-primary transition-colors">{gig.category}</Link>
              <ChevronRight size={14} />
              <span className="text-text truncate max-w-[200px]">{gig.title.slice(0, 30)}…</span>
            </nav>
          </AnimatedSection>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left — Main content */}
            <div className="lg:col-span-2">
              <AnimatedSection>
                <h1 className="text-2xl sm:text-3xl font-bold text-text mb-4">{gig.title}</h1>
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${gig.gradient} flex items-center justify-center text-white font-bold`}>
                    {gig.sellerInitials}
                  </div>
                  <div>
                    <Link href={`/freelancer/${gig.sellerSlug}`} className="font-semibold text-text hover:text-primary transition-colors">
                      {gig.seller}
                    </Link>
                    <div className="flex items-center gap-3 text-sm">
                      <span className="flex items-center gap-1 text-accent">
                        <Star size={14} fill="currentColor" />{gig.rating}
                      </span>
                      <span className="text-text-secondary">({gig.reviewCount} reviews)</span>
                      <span className="text-text-secondary flex items-center gap-1">
                        <MapPin size={12} />{gig.location}
                      </span>
                    </div>
                  </div>
                  <div className="ml-auto flex items-center gap-2">
                    <motion.button whileTap={{ scale: 0.9 }} onClick={() => setLiked(!liked)}
                      className="w-10 h-10 rounded-xl border border-border flex items-center justify-center hover:bg-card transition-colors">
                      <Heart size={18} className={liked ? "text-red-500 fill-red-500" : "text-text-secondary"} />
                    </motion.button>
                    <button className="w-10 h-10 rounded-xl border border-border flex items-center justify-center hover:bg-card transition-colors">
                      <Share2 size={18} className="text-text-secondary" />
                    </button>
                  </div>
                </div>
              </AnimatedSection>

              {/* Portfolio gallery */}
              <AnimatedSection delay={0.1}>
                <div className="grid grid-cols-3 gap-3 mb-8">
                  {gig.images.map((src, i) => (
                    <motion.img key={i} src={src} alt={gig.title} whileHover={{ scale: 1.02 }}
                      className="aspect-[4/3] rounded-2xl object-cover w-full cursor-pointer" />
                  ))}
                </div>
              </AnimatedSection>

              {/* Description */}
              <AnimatedSection delay={0.2}>
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-text mb-4">About This Gig</h2>
                  <div className="prose prose-sm text-text-secondary leading-relaxed space-y-3">
                    {gig.description.map((p, i) => <p key={i}>{p}</p>)}
                    <p><strong className="text-text">What you&apos;ll get:</strong></p>
                    <ul className="space-y-1">
                      {gig.whatYouGet.map((item) => <li key={item}>{item}</li>)}
                    </ul>
                  </div>
                </div>
              </AnimatedSection>

              {/* Reviews */}
              <AnimatedSection delay={0.3}>
                <div>
                  <h2 className="text-xl font-semibold text-text mb-6">
                    Reviews <span className="text-sm font-normal text-text-secondary ml-2">({gig.reviewCount})</span>
                  </h2>
                  <div className="space-y-6">
                    {gig.reviews.map((review, i) => (
                      <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-card rounded-2xl p-5">
                        <div className="flex items-center gap-3 mb-3">
                          <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${review.gradient} flex items-center justify-center text-white text-sm font-bold`}>
                            {review.initials}
                          </div>
                          <div>
                            <p className="font-medium text-text text-sm">{review.name}</p>
                            <div className="flex items-center gap-2">
                              <div className="flex items-center gap-0.5">
                                {Array.from({ length: 5 }).map((_, j) => (
                                  <Star key={j} size={12} className={j < review.rating ? "text-accent" : "text-gray-300"} fill={j < review.rating ? "currentColor" : "none"} />
                                ))}
                              </div>
                              <span className="text-xs text-text-secondary">{review.date}</span>
                            </div>
                          </div>
                        </div>
                        <p className="text-sm text-text-secondary leading-relaxed">{review.text}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            </div>

            {/* Right — Packages sidebar */}
            <div className="lg:col-span-1">
              <AnimatedSection direction="right">
                <div className="sticky top-28 bg-white rounded-2xl border border-border shadow-lg overflow-hidden">
                  <div className="flex border-b border-border">
                    {gig.packages.map((pkg, i) => (
                      <button key={i} onClick={() => setSelectedPackage(i)}
                        className={`flex-1 py-3 text-sm font-medium text-center transition-all relative ${selectedPackage === i ? "text-primary" : "text-text-secondary hover:text-text"}`}>
                        {pkg.name}
                        {pkg.popular && (
                          <span className="absolute -top-0 right-2 px-1.5 py-0.5 bg-accent text-white text-[10px] rounded-b-md">Popular</span>
                        )}
                        {selectedPackage === i && (
                          <motion.div layoutId="packageTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                        )}
                      </button>
                    ))}
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div key={selectedPackage} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-text">{gig.packages[selectedPackage].name}</h3>
                        <p className="text-2xl font-bold text-text">₹{gig.packages[selectedPackage].price.toLocaleString()}</p>
                      </div>
                      <p className="text-sm text-text-secondary mb-4">{gig.packages[selectedPackage].desc}</p>
                      <div className="flex items-center gap-4 text-sm text-text-secondary mb-4">
                        <span className="flex items-center gap-1"><Clock size={14} />{gig.packages[selectedPackage].delivery}-day delivery</span>
                        <span className="flex items-center gap-1"><RefreshCw size={14} />{gig.packages[selectedPackage].revisions === -1 ? "Unlimited" : gig.packages[selectedPackage].revisions} revisions</span>
                      </div>
                      <ul className="space-y-2 mb-6">
                        {gig.packages[selectedPackage].features.map((f) => (
                          <li key={f} className="flex items-center gap-2 text-sm text-text">
                            <Check size={16} className="text-success shrink-0" />{f}
                          </li>
                        ))}
                      </ul>
                      <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                        onClick={() => router.push("/auth/login")}
                        className="w-full py-3.5 bg-accent hover:bg-accent-dark text-white font-semibold rounded-xl transition-all shadow-lg shadow-accent/25">
                        Continue (₹{gig.packages[selectedPackage].price.toLocaleString("en-IN")})
                      </motion.button>
                      <button
                        onClick={() => router.push("/auth/login")}
                        className="w-full mt-3 py-3 text-primary font-medium text-sm hover:bg-primary/5 rounded-xl transition-colors flex items-center justify-center gap-2">
                        <MessageSquare size={16} />Contact Seller
                      </button>
                    </motion.div>
                  </AnimatePresence>

                  <div className="px-6 pb-6 grid grid-cols-3 gap-3">
                    {[{ icon: ShieldCheck, text: "Secure Payment" }, { icon: Zap, text: "Fast Delivery" }, { icon: Award, text: "Top Rated" }].map((badge) => (
                      <div key={badge.text} className="text-center p-2 bg-card rounded-xl">
                        <badge.icon size={18} className="mx-auto mb-1 text-primary" />
                        <p className="text-[10px] text-text-secondary">{badge.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
