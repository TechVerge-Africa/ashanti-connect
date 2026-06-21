"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  CalendarDays, Clock, Radio, X, User, MapPin, 
  Share2, Sparkles, CalendarPlus, Check
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { news as initialNews, events as initialEvents } from "@/lib/data";
import { cn, formatDate, relativeTime } from "@/lib/utils";
import type { NewsArticle, GovEvent } from "@/lib/types";

const eventTypeLabels: Record<string, string> = {
  town_hall: "Town Hall",
  launch: "Launch",
  consultation: "Consultation",
  deadline: "Deadline",
};

export default function NewsPage() {
  const [activeTab, setActiveTab] = React.useState<"news" | "events">("news");
  const [newsList] = React.useState<NewsArticle[]>(initialNews);
  const [eventsList, setEventsList] = React.useState<GovEvent[]>(initialEvents);
  const [selectedArticle, setSelectedArticle] = React.useState<NewsArticle | null>(null);
  const [selectedEvent, setSelectedEvent] = React.useState<GovEvent | null>(null);
  
  // Track citizen RSVPs (local state)
  const [rsvpedEvents, setRsvpedEvents] = React.useState<Record<string, boolean>>({});

  const handleRsvp = (eventId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    
    const isCurrentlyRsvped = rsvpedEvents[eventId];
    setRsvpedEvents(prev => ({
      ...prev,
      [eventId]: !isCurrentlyRsvped
    }));

    setEventsList(prev => prev.map(evt => {
      if (evt.id === eventId) {
        const baseCount = evt.registrationCount || 0;
        return {
          ...evt,
          registrationCount: isCurrentlyRsvped ? Math.max(0, baseCount - 1) : baseCount + 1
        };
      }
      return evt;
    }));

    // Sync selected event state if open
    if (selectedEvent && selectedEvent.id === eventId) {
      setSelectedEvent(prev => {
        if (!prev) return null;
        const baseCount = prev.registrationCount || 0;
        return {
          ...prev,
          registrationCount: isCurrentlyRsvped ? Math.max(0, baseCount - 1) : baseCount + 1
        };
      });
    }
  };

  const featured = newsList.find(n => n.featured) || newsList[0];
  const otherNews = newsList.filter(n => n.id !== featured.id);

  return (
    <>
      {/* ── Page Header Banner ── */}
      <div className="relative border-b border-white/[0.06] bg-black/20 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.02] pointer-events-none" />
        <div className="absolute -top-40 right-0 h-96 w-96 rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute -bottom-40 left-0 h-96 w-96 rounded-full bg-gold/5 blur-[120px]" />
        
        <div className="container relative py-12 md:py-16 text-center max-w-4xl space-y-4">
          <span className="text-xs text-primary font-bold uppercase tracking-widest block">Ashanti News Desk</span>
          <h1 className="font-display text-4xl sm:text-5xl font-black text-foreground tracking-tight leading-none">
            What&apos;s happening across the region
          </h1>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Stay informed with official announcements, development progress updates, and upcoming events from the Regional Coordinating Council.
          </p>

          {/* Interactive Toggle Tabs */}
          <div className="pt-6 flex justify-center">
            <div className="relative flex rounded-full border border-white/[0.08] bg-black/40 p-1 backdrop-blur-md">
              <button
                onClick={() => setActiveTab("news")}
                className={cn(
                  "relative rounded-full px-6 py-2 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer",
                  activeTab === "news" ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {activeTab === "news" && (
                  <motion.div 
                    layoutId="active-news-tab" 
                    className="absolute inset-0 rounded-full bg-primary" 
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">News & Announcements</span>
              </button>
              <button
                onClick={() => setActiveTab("events")}
                className={cn(
                  "relative rounded-full px-6 py-2 text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer",
                  activeTab === "events" ? "text-primary-foreground" : "text-muted-foreground hover:text-foreground"
                )}
              >
                {activeTab === "events" && (
                  <motion.div 
                    layoutId="active-news-tab" 
                    className="absolute inset-0 rounded-full bg-primary" 
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">Events Calendar</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-12">
        <AnimatePresence mode="wait">
          {activeTab === "news" ? (
            <motion.div
              key="news-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-10"
            >
              {/* Featured News Hero */}
              {featured && (
                <div 
                  onClick={() => setSelectedArticle(featured)}
                  className="group relative rounded-2xl border border-white/[0.08] bg-card/50 backdrop-blur-md overflow-hidden grid md:grid-cols-[1.2fr_1fr] cursor-pointer hover:border-primary/45 hover:shadow-glow-emerald-sm transition-all duration-300"
                >
                  <div className="relative aspect-video md:aspect-auto min-h-[250px] overflow-hidden">
                    {featured.image ? (
                      <img 
                        src={featured.image} 
                        alt={featured.title}
                        className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-103"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-primary/20 to-gold/15" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-black/85 via-black/30 to-transparent" />
                  </div>
                  <div className="p-6 md:p-8 flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Badge variant="gold" className="bg-primary/20 text-primary border border-primary/20 py-0.5 px-2.5 font-bold text-[10px] uppercase">
                          {featured.category}
                        </Badge>
                        <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">Featured Story</span>
                      </div>
                      <h2 className="font-display text-xl sm:text-2xl md:text-3xl font-black text-foreground tracking-tight leading-tight group-hover:text-primary transition-colors">
                        {featured.title}
                      </h2>
                      <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                        {featured.excerpt}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between border-t border-white/[0.06] pt-4 text-xs">
                      <div className="flex items-center gap-2">
                        <div className="h-7 w-7 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center font-bold text-primary">
                          {featured.author[0]}
                        </div>
                        <div className="text-left">
                          <div className="font-semibold text-foreground">{featured.author}</div>
                          <div className="text-[9px] text-muted-foreground">{formatDate(featured.publishedAt)}</div>
                        </div>
                      </div>
                      <span className="text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5 text-gold shrink-0" /> {featured.readMins} min read
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Other News Grid */}
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {otherNews.map((a) => (
                  <div 
                    key={a.id} 
                    onClick={() => setSelectedArticle(a)}
                    className="group relative rounded-2xl border border-white/[0.08] bg-card/40 backdrop-blur-md overflow-hidden flex flex-col cursor-pointer hover:border-primary/45 hover:shadow-glow-emerald-sm transition-all duration-300"
                  >
                    <div className="relative aspect-video overflow-hidden border-b border-white/[0.06]">
                      {a.image ? (
                        <img 
                          src={a.image} 
                          alt={a.title}
                          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-103"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary/10 to-gold/10" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                      <Badge variant="secondary" className="absolute left-4 bottom-4 backdrop-blur-md bg-black/60 border border-white/10 text-[9px] font-bold uppercase text-white py-0.5 px-2">
                        {a.category}
                      </Badge>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <h3 className="font-display font-bold text-base sm:text-lg leading-snug group-hover:text-primary transition-colors line-clamp-2">
                          {a.title}
                        </h3>
                        <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                          {a.excerpt}
                        </p>
                      </div>
                      
                      <div className="flex items-center justify-between border-t border-white/[0.06] pt-3 text-[10px] text-muted-foreground">
                        <span>{relativeTime(a.publishedAt)}</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3 text-gold" /> {a.readMins} min read
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="events-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {eventsList.map((evt) => {
                const isRsvped = rsvpedEvents[evt.id];
                const regPercent = Math.round(((evt.registrationCount || 0) / (evt.maxCapacity || 1000)) * 100);
                
                return (
                  <div 
                    key={evt.id} 
                    onClick={() => setSelectedEvent(evt)}
                    className="group relative rounded-2xl border border-white/[0.08] bg-card/40 backdrop-blur-md overflow-hidden flex flex-col cursor-pointer hover:border-primary/45 hover:shadow-glow-emerald-sm transition-all duration-300"
                  >
                    {/* Event Banner */}
                    <div className="relative aspect-video overflow-hidden border-b border-white/[0.06]">
                      {evt.image ? (
                        <img 
                          src={evt.image} 
                          alt={evt.title}
                          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-103"
                        />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary/10 to-gold/10" />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent" />
                      
                      {/* Live Blinking Indicator or Event Type */}
                      <div className="absolute left-4 top-4 flex items-center gap-2">
                        {evt.isLive && (
                          <span className="flex h-2.5 w-2.5 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                          </span>
                        )}
                        <Badge variant={evt.isLive ? "destructive" : "outline"} className={cn("backdrop-blur-md bg-black/60 text-[9px] font-bold uppercase py-0.5 px-2", evt.isLive && "bg-red-500/25 border-red-500 text-red-400")}>
                          {evt.isLive && <Radio className="h-3 w-3 mr-1 animate-pulse shrink-0" />}
                          {evt.isLive ? "Live Broadcast" : eventTypeLabels[evt.type]}
                        </Badge>
                      </div>

                      {/* Event Date Block floating right top */}
                      <div className="absolute right-4 top-4 bg-black/60 border border-white/10 backdrop-blur-md rounded-xl p-2 text-center min-w-[50px]">
                        <div className="text-[10px] text-muted-foreground uppercase font-black leading-none">{formatDate(evt.date, { month: "short" })}</div>
                        <div className="text-lg text-primary font-black leading-none mt-1">{formatDate(evt.date, { day: "numeric" })}</div>
                      </div>
                    </div>

                    {/* Event Info Area */}
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <h3 className="font-display font-bold text-base sm:text-lg leading-snug group-hover:text-primary transition-colors line-clamp-2">
                          {evt.title}
                        </h3>
                        <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                          <MapPin className="h-3.5 w-3.5 text-primary shrink-0" />
                          <span className="truncate">{evt.location}</span>
                        </p>
                      </div>

                      {/* Attendee progress */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center text-[9px] font-bold text-muted-foreground uppercase tracking-wider">
                          <span>RSVP Capacity ({regPercent}%)</span>
                          <span>{evt.registrationCount || 0} / {evt.maxCapacity}</span>
                        </div>
                        <Progress value={regPercent} className="h-1 bg-secondary/80" indicatorClassName="bg-primary" />
                      </div>

                      {/* Footer Actions */}
                      <div className="flex items-center justify-between border-t border-white/[0.06] pt-3">
                        <button 
                          onClick={(mouseEvt) => handleRsvp(evt.id, mouseEvt)}
                          className={cn(
                            "text-[10px] font-extrabold uppercase py-1 px-3 rounded-lg border transition-all cursor-pointer",
                            isRsvped 
                              ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                              : "bg-white/[0.03] border-white/[0.08] hover:bg-white/[0.08] text-muted-foreground hover:text-white"
                          )}
                        >
                          {isRsvped ? (
                            <span className="flex items-center gap-1"><Check className="h-3 w-3" /> Registered</span>
                          ) : (
                            <span className="flex items-center gap-1"><CalendarPlus className="h-3 w-3 text-primary" /> RSVP Now</span>
                          )}
                        </button>

                        <button 
                          onClick={() => setSelectedEvent(evt)}
                          className="text-[10px] font-bold text-primary hover:text-white transition-colors"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Interactive News Reader Modal ── */}
      <AnimatePresence>
        {selectedArticle && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
            <div className="absolute inset-0 cursor-default" onClick={() => setSelectedArticle(null)} />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-2xl rounded-2xl border border-white/[0.08] bg-[#0c1310] shadow-2xl overflow-hidden z-10 my-8 max-h-[90vh] flex flex-col"
            >
              <div className="relative aspect-[21/9] w-full shrink-0">
                {selectedArticle.image ? (
                  <img 
                    src={selectedArticle.image} 
                    alt={selectedArticle.title}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary/10 to-gold/10" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c1310] via-black/40 to-transparent" />
                
                {/* Close Button */}
                <button 
                  onClick={() => setSelectedArticle(null)}
                  className="absolute right-4 top-4 h-9 w-9 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-muted-foreground hover:text-white hover:scale-105 transition-all cursor-pointer"
                >
                  <X className="h-4.5 w-4.5" />
                </button>

                {/* Info Overlay */}
                <div className="absolute left-6 bottom-4 space-y-1">
                  <Badge variant="gold" className="bg-primary/20 text-primary border border-primary/20 text-[9px] uppercase font-bold px-2 py-0.5">
                    {selectedArticle.category}
                  </Badge>
                  <h2 className="font-display text-lg sm:text-xl font-bold text-white leading-tight pr-8">
                    {selectedArticle.title}
                  </h2>
                </div>
              </div>

              {/* Scrollable Reader Body */}
              <div className="p-6 overflow-y-auto flex-1 space-y-4 custom-scrollbar text-sm text-muted-foreground leading-relaxed">
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-4 text-xs font-semibold text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <User className="h-3.5 w-3.5 text-primary" />
                    <span>Published by {selectedArticle.author}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span>{formatDate(selectedArticle.publishedAt)}</span>
                    <span className="flex items-center gap-1 text-gold">
                      <Clock className="h-3 w-3" /> {selectedArticle.readMins} min read
                    </span>
                  </div>
                </div>

                <div 
                  className="prose prose-invert max-w-none text-foreground whitespace-pre-line text-sm md:text-base leading-relaxed"
                  style={{ color: "#d1d5db" }}
                >
                  {selectedArticle.content || selectedArticle.excerpt}
                </div>
              </div>

              {/* Reader Footer */}
              <div className="p-5 border-t border-white/[0.06] bg-black/40 flex items-center justify-between text-xs shrink-0">
                <span className="text-muted-foreground flex items-center gap-1.5">
                  <Sparkles className="h-4 w-4 text-primary" /> Verified Regional Press
                </span>
                
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      alert("Article link copied!");
                    }}
                    className="inline-flex items-center gap-1 border border-white/10 hover:border-white/20 bg-white/[0.03] hover:bg-white/[0.08] rounded-lg px-3 py-1.5 font-bold transition-all text-muted-foreground hover:text-white cursor-pointer"
                  >
                    <Share2 className="h-3.5 w-3.5" /> Share
                  </button>
                  <button 
                    onClick={() => setSelectedArticle(null)}
                    className="bg-primary hover:bg-primary/95 text-primary-foreground font-bold rounded-lg px-4 py-1.5 transition-all cursor-pointer shadow-glow-sm"
                  >
                    Close Reader
                  </button>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ── Interactive Event RSVP Modal ── */}
      <AnimatePresence>
        {selectedEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
            <div className="absolute inset-0 cursor-default" onClick={() => setSelectedEvent(null)} />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-2xl rounded-2xl border border-white/[0.08] bg-[#0c1310] shadow-2xl overflow-hidden z-10 my-8 max-h-[90vh] flex flex-col"
            >
              <div className="relative aspect-[21/9] w-full shrink-0">
                {selectedEvent.image ? (
                  <img 
                    src={selectedEvent.image} 
                    alt={selectedEvent.title}
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-primary/10 to-gold/10" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c1310] via-black/45 to-transparent" />
                
                {/* Close Button */}
                <button 
                  onClick={() => setSelectedEvent(null)}
                  className="absolute right-4 top-4 h-9 w-9 rounded-full bg-black/60 border border-white/10 flex items-center justify-center text-muted-foreground hover:text-white hover:scale-105 transition-all cursor-pointer"
                >
                  <X className="h-4.5 w-4.5" />
                </button>

                {/* Header Information */}
                <div className="absolute left-6 bottom-4 space-y-1">
                  <div className="flex items-center gap-2">
                    <Badge variant={selectedEvent.isLive ? "destructive" : "outline"} className={cn("backdrop-blur-md bg-black/60 text-[9px] font-bold uppercase text-white", selectedEvent.isLive && "bg-red-500/25 border-red-500 text-red-400")}>
                      {eventTypeLabels[selectedEvent.type]}
                    </Badge>
                    <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider">Government Event</span>
                  </div>
                  <h2 className="font-display text-lg sm:text-xl font-bold text-white leading-tight pr-8">
                    {selectedEvent.title}
                  </h2>
                </div>
              </div>

              {/* Event Body */}
              <div className="p-6 overflow-y-auto flex-1 space-y-5 custom-scrollbar text-sm">
                
                <div className="grid gap-4 sm:grid-cols-2 text-xs border-b border-white/[0.06] pb-4">
                  <div className="space-y-1">
                    <span className="text-[9px] uppercase tracking-wider font-bold text-muted-foreground block">Event Location</span>
                    <div className="flex items-center gap-1.5 text-foreground font-semibold">
                      <MapPin className="h-4 w-4 text-primary shrink-0" />
                      <span>{selectedEvent.location}</span>
                    </div>
                  </div>
                  <div className="space-y-1">
                    <span className="text-[9px] uppercase tracking-wider font-bold text-muted-foreground block">Date & Time Schedule</span>
                    <div className="flex items-center gap-1.5 text-foreground font-semibold">
                      <CalendarDays className="h-4 w-4 text-gold shrink-0" />
                      <span>{formatDate(selectedEvent.date)} (16:00 GMT)</span>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h4 className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground mb-1.5">Event Details</h4>
                  <p className="text-muted-foreground leading-relaxed text-sm bg-white/[0.01] border border-white/[0.04] p-4 rounded-xl">
                    {selectedEvent.description}
                  </p>
                </div>

                {/* Speakers */}
                {selectedEvent.speakers && selectedEvent.speakers.length > 0 && (
                  <div className="space-y-2.5">
                    <h4 className="text-[10px] uppercase tracking-wider font-bold text-muted-foreground">Featured Speakers & Panelists</h4>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {selectedEvent.speakers.map((sp, idx) => (
                        <div key={idx} className="flex items-center gap-3 border border-white/[0.06] bg-black/20 rounded-xl p-3">
                          <div className="h-8 w-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center font-black text-primary text-xs shrink-0">
                            {sp.name.split(" ").slice(-1)[0][0]}
                          </div>
                          <div>
                            <div className="font-bold text-foreground text-xs">{sp.name}</div>
                            <div className="text-[9px] text-muted-foreground truncate max-w-[170px]">{sp.title}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* RSVP Capacity Progress Bar */}
                <div className="space-y-2 border-t border-white/[0.06] pt-4">
                  <div className="flex justify-between items-center text-[10px] font-bold text-muted-foreground uppercase tracking-wide">
                    <span>Citizen Seat Registrations</span>
                    <span>{selectedEvent.registrationCount || 0} / {selectedEvent.maxCapacity} seats filled</span>
                  </div>
                  <Progress 
                    value={Math.round(((selectedEvent.registrationCount || 0) / (selectedEvent.maxCapacity || 1000)) * 100)} 
                    className="h-2 bg-secondary/80" 
                    indicatorClassName="bg-gradient-to-r from-primary to-gold"
                  />
                </div>

              </div>

              {/* RSVP Footer */}
              <div className="p-5 border-t border-white/[0.06] bg-black/40 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
                <div className="flex items-center gap-3 text-xs">
                  <button 
                    onClick={() => handleRsvp(selectedEvent.id)}
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-lg border px-4 py-2 font-bold transition-all cursor-pointer",
                      rsvpedEvents[selectedEvent.id]
                        ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-400"
                        : "bg-primary hover:bg-primary/95 text-primary-foreground border-transparent"
                    )}
                  >
                    {rsvpedEvents[selectedEvent.id] ? (
                      <>
                        <Check className="h-4 w-4" /> RSVP Confirmed
                      </>
                    ) : (
                      <>
                        <CalendarPlus className="h-4 w-4" /> Register to Attend
                      </>
                    )}
                  </button>
                  {rsvpedEvents[selectedEvent.id] && (
                    <span className="text-emerald-400 font-semibold flex items-center gap-1">
                      <Sparkles className="h-3.5 w-3.5" /> Seat Reserved!
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                  <button 
                    onClick={() => setSelectedEvent(null)}
                    className="bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.08] text-muted-foreground hover:text-white font-bold rounded-lg px-4 py-2 text-xs transition-all cursor-pointer w-full sm:w-auto"
                  >
                    Close
                  </button>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
