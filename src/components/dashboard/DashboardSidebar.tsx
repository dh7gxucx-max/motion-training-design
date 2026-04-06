"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Briefcase,
  ShoppingBag,
  MessageSquare,
  Wallet,
  Star,
  Users,
  Crown,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Heart,
  Shield,
  FileText,
  BarChart3,
} from "lucide-react";

type NavItem = { href: string; label: string; icon: React.ElementType };

const freelancerNav: NavItem[] = [
  { href: "/dashboard/freelancer", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/freelancer/gigs", label: "My Gigs", icon: Briefcase },
  { href: "/dashboard/freelancer/orders", label: "Orders", icon: ShoppingBag },
  { href: "/dashboard/freelancer/messages", label: "Messages", icon: MessageSquare },
  { href: "/dashboard/freelancer/wallet", label: "Wallet", icon: Wallet },
  { href: "/dashboard/freelancer/reviews", label: "Reviews", icon: Star },
  { href: "/dashboard/freelancer/referrals", label: "Referrals", icon: Users },
  { href: "/dashboard/freelancer/vip", label: "VIP", icon: Crown },
  { href: "/dashboard/freelancer/settings", label: "Settings", icon: Settings },
];

const clientNav: NavItem[] = [
  { href: "/dashboard/client", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/client/orders", label: "My Orders", icon: ShoppingBag },
  { href: "/dashboard/client/messages", label: "Messages", icon: MessageSquare },
  { href: "/dashboard/client/wallet", label: "Wallet", icon: Wallet },
  { href: "/dashboard/client/favorites", label: "Favorites", icon: Heart },
  { href: "/dashboard/client/reviews", label: "My Reviews", icon: Star },
  { href: "/dashboard/client/referrals", label: "Referrals", icon: Users },
  { href: "/dashboard/client/settings", label: "Settings", icon: Settings },
];

const adminNav: NavItem[] = [
  { href: "/dashboard/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/dashboard/admin/users", label: "Users", icon: Users },
  { href: "/dashboard/admin/gigs", label: "Gig Moderation", icon: Briefcase },
  { href: "/dashboard/admin/orders", label: "Orders", icon: ShoppingBag },
  { href: "/dashboard/admin/finance", label: "Finance", icon: BarChart3 },
  { href: "/dashboard/admin/content", label: "Content", icon: FileText },
  { href: "/dashboard/admin/settings", label: "Settings", icon: Settings },
];

const navMap = { freelancer: freelancerNav, client: clientNav, admin: adminNav };

const roleLabel = { freelancer: "Freelancer", client: "Client", admin: "Admin" };
const roleColor = {
  freelancer: "from-primary to-primary-light",
  client: "from-accent to-accent-light",
  admin: "from-purple-600 to-purple-400",
};

interface Props {
  role: "freelancer" | "client" | "admin";
}

export default function DashboardSidebar({ role }: Props) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const nav = navMap[role];

  return (
    <motion.aside
      animate={{ width: collapsed ? 72 : 240 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className="relative flex-shrink-0 bg-white border-r border-border flex flex-col h-full overflow-hidden"
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-border">
        <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${roleColor[role]} flex items-center justify-center shrink-0`}>
          <span className="text-white font-bold text-base">V</span>
        </div>
        <AnimatePresence>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              exit={{ opacity: 0, width: 0 }}
              className="overflow-hidden"
            >
              <p className="font-bold text-text whitespace-nowrap">VALOR</p>
              <p className="text-xs text-text-secondary whitespace-nowrap">{roleLabel[role]} Dashboard</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-2 overflow-y-auto">
        {nav.map((item) => {
          const active = pathname === item.href || (item.href !== `/dashboard/${role}` && pathname.startsWith(item.href));
          return (
            <Link key={item.href} href={item.href}>
              <div
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl mb-1 transition-all group ${
                  active
                    ? "bg-primary/10 text-primary"
                    : "text-text-secondary hover:bg-card hover:text-text"
                }`}
              >
                <item.icon size={20} className="shrink-0" />
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0, width: 0 }}
                      animate={{ opacity: 1, width: "auto" }}
                      exit={{ opacity: 0, width: 0 }}
                      className="text-sm font-medium whitespace-nowrap overflow-hidden"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>
                {active && !collapsed && (
                  <span className="ml-auto w-1.5 h-1.5 bg-primary rounded-full" />
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-2 border-t border-border">
        <button className="flex items-center gap-3 w-full px-3 py-2.5 rounded-xl text-error hover:bg-error/10 transition-all">
          <LogOut size={20} className="shrink-0" />
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: "auto" }}
                exit={{ opacity: 0, width: 0 }}
                className="text-sm font-medium whitespace-nowrap overflow-hidden"
              >
                Sign Out
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-8 w-6 h-6 bg-white border border-border rounded-full flex items-center justify-center shadow-sm hover:bg-card transition-colors z-10"
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>
    </motion.aside>
  );
}
