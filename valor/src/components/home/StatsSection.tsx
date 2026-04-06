"use client";

import AnimatedSection from "../AnimatedSection";
import CountUp from "../CountUp";
import { Users, Briefcase, Star, IndianRupee } from "lucide-react";

const stats = [
  {
    icon: Users,
    value: 50000,
    suffix: "+",
    label: "Active Users",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: Briefcase,
    value: 120000,
    suffix: "+",
    label: "Projects Completed",
    color: "text-success",
    bg: "bg-success/10",
  },
  {
    icon: Star,
    value: 98,
    suffix: "%",
    label: "Client Satisfaction",
    color: "text-accent",
    bg: "bg-accent/10",
  },
  {
    icon: IndianRupee,
    value: 25,
    suffix: "Cr+",
    label: "Paid to Freelancers",
    color: "text-emerald-600",
    bg: "bg-emerald-100",
  },
];

export default function StatsSection() {
  return (
    <section className="py-16 bg-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <AnimatedSection key={stat.label} delay={i * 0.1} direction="up">
              <div className="bg-white rounded-2xl p-6 text-center shadow-sm hover:shadow-md transition-shadow">
                <div
                  className={`w-14 h-14 mx-auto mb-4 rounded-2xl ${stat.bg} flex items-center justify-center ${stat.color}`}
                >
                  <stat.icon size={24} />
                </div>
                <p className="text-3xl sm:text-4xl font-bold text-text mb-1">
                  <CountUp end={stat.value} suffix={stat.suffix} />
                </p>
                <p className="text-sm text-text-secondary">{stat.label}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
