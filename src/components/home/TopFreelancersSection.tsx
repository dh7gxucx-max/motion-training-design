"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import AnimatedSection from "../AnimatedSection";
import { Star, MapPin, ArrowRight, CheckCircle } from "lucide-react";

const freelancers = [
  {
    name: "Priya Sharma",
    initials: "PS",
    title: "UI/UX Designer",
    rating: 4.9,
    reviews: 234,
    location: "Mumbai",
    skills: ["Figma", "UI Design", "Prototyping"],
    price: "₹2,000",
    gradient: "from-pink-500 to-rose-500",
    verified: true,
  },
  {
    name: "Rahul Verma",
    initials: "RV",
    title: "Full-Stack Developer",
    rating: 5.0,
    reviews: 189,
    location: "Bangalore",
    skills: ["React", "Node.js", "MongoDB"],
    price: "₹3,500",
    gradient: "from-blue-500 to-cyan-500",
    verified: true,
  },
  {
    name: "Ananya Patel",
    initials: "AP",
    title: "Content Writer",
    rating: 4.8,
    reviews: 312,
    location: "Delhi",
    skills: ["SEO", "Blog Writing", "Copywriting"],
    price: "₹1,000",
    gradient: "from-emerald-500 to-teal-500",
    verified: true,
  },
  {
    name: "Vikram Singh",
    initials: "VS",
    title: "Video Editor",
    rating: 4.9,
    reviews: 156,
    location: "Hyderabad",
    skills: ["Premiere Pro", "After Effects", "Motion Graphics"],
    price: "₹2,500",
    gradient: "from-purple-500 to-violet-500",
    verified: false,
  },
];

export default function TopFreelancersSection() {
  return (
    <section className="py-20 bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-14 gap-4">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-text mb-2">
              Top Rated Freelancers
            </h2>
            <p className="text-text-secondary text-lg">
              Work with the best talent in India
            </p>
          </div>
          <Link
            href="/catalog"
            className="group flex items-center gap-2 text-primary font-medium hover:text-primary-dark transition-colors"
          >
            View All
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {freelancers.map((f, i) => (
            <AnimatedSection key={f.name} delay={i * 0.1} direction="up">
              <motion.div
                whileHover={{ y: -8 }}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all border border-transparent hover:border-border group"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${f.gradient} flex items-center justify-center text-white font-bold text-lg shrink-0`}
                  >
                    {f.initials}
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-semibold text-text truncate">
                        {f.name}
                      </h3>
                      {f.verified && (
                        <CheckCircle
                          size={14}
                          className="text-primary shrink-0"
                          fill="currentColor"
                        />
                      )}
                    </div>
                    <p className="text-sm text-text-secondary">{f.title}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 mb-4 text-sm">
                  <span className="flex items-center gap-1 text-accent">
                    <Star size={14} fill="currentColor" />
                    {f.rating}
                  </span>
                  <span className="text-text-secondary">
                    ({f.reviews} reviews)
                  </span>
                </div>

                <div className="flex items-center gap-1 text-xs text-text-secondary mb-4">
                  <MapPin size={12} />
                  {f.location}
                </div>

                <div className="flex flex-wrap gap-1.5 mb-5">
                  {f.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 text-xs bg-card text-text-secondary rounded-md"
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div>
                    <p className="text-xs text-text-secondary">Starting at</p>
                    <p className="font-bold text-text">{f.price}</p>
                  </div>
                  <Link
                    href={`/freelancer/${f.name.toLowerCase().replace(" ", "-")}`}
                    className="px-4 py-2 text-sm bg-primary/10 text-primary rounded-xl font-medium hover:bg-primary hover:text-white transition-all"
                  >
                    View Profile
                  </Link>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
