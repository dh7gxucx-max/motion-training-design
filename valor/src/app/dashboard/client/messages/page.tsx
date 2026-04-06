"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Paperclip, Search } from "lucide-react";

const conversations = [
  { id: 1, name: "Priya S.", preview: "Working on it, will deliver tomorrow!", time: "1h", unread: 1, avatar: "P" },
  { id: 2, name: "Dev K.", preview: "Please review the homepage draft", time: "3h", unread: 2, avatar: "D" },
  { id: 3, name: "Anjali M.", preview: "Articles are ready for review", time: "1d", unread: 0, avatar: "A" },
];

const mockMessages = [
  { id: 1, from: "seller", text: "Hi! Thanks for your order. I have a few quick questions before I start.", time: "09:00" },
  { id: 2, from: "me", text: "Sure, go ahead! We need something modern and minimal.", time: "09:10" },
  { id: 3, from: "seller", text: "Do you have any color preferences or an existing brand style guide?", time: "09:12" },
  { id: 4, from: "me", text: "Blues and oranges. Here's our current website for reference.", time: "09:15" },
  { id: 5, from: "seller", text: "Perfect! I'll start immediately. First draft in 24 hours.", time: "09:16" },
  { id: 6, from: "seller", text: "Working on it, will deliver tomorrow!", time: "14:30" },
];

export default function ClientMessagesPage() {
  const [activeConv, setActiveConv] = useState(conversations[0]);
  const [message, setMessage] = useState("");

  return (
    <div className="flex h-[calc(100vh-0px)] p-6 gap-4">
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
        className="w-72 bg-white rounded-2xl border border-border flex flex-col shrink-0">
        <div className="p-4 border-b border-border">
          <h2 className="font-semibold text-text mb-3">Messages</h2>
          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
            <input placeholder="Search..." className="w-full pl-9 pr-3 py-2 text-sm bg-card rounded-lg outline-none border border-transparent focus:border-primary transition-all" />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {conversations.map((conv) => (
            <button key={conv.id} onClick={() => setActiveConv(conv)}
              className={`w-full flex items-center gap-3 p-4 text-left hover:bg-card transition-colors border-b border-border/50 ${activeConv.id === conv.id ? "bg-accent/5" : ""}`}>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-accent-light flex items-center justify-center text-white font-bold text-sm shrink-0">
                {conv.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium text-text">{conv.name}</p>
                  <p className="text-xs text-text-secondary">{conv.time}</p>
                </div>
                <p className="text-xs text-text-secondary truncate mt-0.5">{conv.preview}</p>
              </div>
              {conv.unread > 0 && (
                <span className="w-5 h-5 bg-accent text-white text-xs rounded-full flex items-center justify-center shrink-0">
                  {conv.unread}
                </span>
              )}
            </button>
          ))}
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}
        className="flex-1 bg-white rounded-2xl border border-border flex flex-col">
        <div className="flex items-center gap-3 p-4 border-b border-border">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent to-accent-light flex items-center justify-center text-white font-bold text-sm">
            {activeConv.avatar}
          </div>
          <div>
            <p className="font-semibold text-text">{activeConv.name}</p>
            <p className="text-xs text-success">Online</p>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {mockMessages.map((msg) => (
            <div key={msg.id} className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}>
              <div className={`max-w-xs lg:max-w-md px-4 py-2.5 rounded-2xl text-sm ${msg.from === "me" ? "bg-accent text-white rounded-br-sm" : "bg-card text-text rounded-bl-sm"}`}>
                {msg.text}
                <p className={`text-xs mt-1 ${msg.from === "me" ? "text-white/60" : "text-text-secondary"}`}>{msg.time}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="p-4 border-t border-border flex items-center gap-3">
          <button className="p-2 rounded-lg hover:bg-card transition-colors text-text-secondary">
            <Paperclip size={18} />
          </button>
          <input value={message} onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 px-4 py-2.5 bg-card rounded-xl outline-none text-sm focus:ring-2 focus:ring-accent/20 transition-all"
            onKeyDown={(e) => e.key === "Enter" && setMessage("")} />
          <button onClick={() => setMessage("")} className="p-2.5 bg-accent hover:bg-accent-dark text-white rounded-xl transition-all">
            <Send size={18} />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
