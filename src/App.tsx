import React, { useState, useRef } from "react";
import { SERVICES, ServiceItem } from "./config";
import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { ServiceCard } from "./components/ServiceCard";
import { ServiceDetailModal } from "./components/ServiceDetailModal";
import { WorkspaceModal } from "./components/WorkspaceModal";
import { HowItWorks } from "./components/HowItWorks";
import { Footer } from "./components/Footer";
import { Search, Sparkles } from "lucide-react";

export default function App() {
  // Navigation & Modal state
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [activeWorkspaceService, setActiveWorkspaceService] = useState<ServiceItem | null>(null);
  
  // Filter & Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const servicesRef = useRef<HTMLDivElement>(null);

  const categories = [
    "All",
    "Career & Productivity",
    "Writing",
    "Academic",
    "Student Essentials",
    "Communication",
    "Social Media",
    "Startup & Marketing",
    "Design Tools"
  ];

  const handleScrollToServices = () => {
    servicesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Filtered services list based on search and category
  const filteredServices = SERVICES.filter((service) => {
    const matchesSearch =
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.tagline.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory =
      selectedCategory === "All" || service.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#FFF8FB] text-[#2B2B2B] flex flex-col font-sans selection:bg-[#FFD1DC] selection:text-[#FF5C8A]">
      {/* Top Navbar */}
      <Navbar
        onScrollToServices={handleScrollToServices}
      />

      {/* Hero Section */}
      <Hero onExploreClick={handleScrollToServices} />

      {/* Main Services Grid Container */}
      <main ref={servicesRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#FFD1DC]/60 border border-[#FF80AB]/30 text-xs font-bold text-[#FF5C8A] mb-3">
            <Sparkles className="w-3.5 h-3.5 fill-[#FF5C8A]" />
            <span>10 Ready-to-Use Micro Services</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-extrabold text-[#2B2B2B] tracking-tight">
            Select Your <span className="pink-gradient-text">Task</span>
          </h2>

          <p className="mt-3 text-sm sm:text-base text-[#2B2B2B]/75 font-medium max-w-xl mx-auto">
            Click any service to view details and open its dedicated AI solution workspace for ₹5.
          </p>
        </div>

        {/* Filter Controls Bar */}
        <div className="mb-10 flex flex-col md:flex-row items-center justify-between gap-4 bg-white/70 backdrop-blur-xl p-4 rounded-3xl border border-[#FFD1DC]/60 shadow-sm">
          {/* Search Input */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2B2B2B]/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search services (e.g. Resume, Grammar)..."
              className="w-full pl-10 pr-4 py-2.5 text-xs font-medium bg-[#FFF8FB] rounded-2xl border border-[#FFD1DC] focus:outline-none focus:border-[#FF5C8A] focus:ring-2 focus:ring-[#FF5C8A]/20 transition-all"
            />
          </div>

          {/* Category Pills Slider */}
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 custom-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-gradient-to-r from-[#FF5C8A] to-[#FF80AB] text-white shadow-sm shadow-[#FF5C8A]/20"
                    : "bg-[#FFF8FB] text-[#2B2B2B]/70 hover:text-[#FF5C8A] hover:bg-[#FFD1DC]/30 border border-[#FFD1DC]/40"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Services Floating Cards Grid */}
        {filteredServices.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredServices.map((service, index) => (
              <ServiceCard
                key={service.id}
                service={service}
                onSelect={(srv) => setSelectedService(srv)}
                index={index}
              />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center bg-white/60 rounded-3xl border border-dashed border-[#FF80AB]/40 p-8">
            <p className="text-sm font-bold text-[#2B2B2B]">No services found matching your search.</p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All");
              }}
              className="mt-3 text-xs font-bold text-[#FF5C8A] underline cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </main>

      {/* How It Works Section */}
      <HowItWorks />

      {/* Footer */}
      <Footer />

      {/* Service Details Modal */}
      <ServiceDetailModal
        service={selectedService}
        onClose={() => setSelectedService(null)}
        onOpenWorkspace={(srv) => {
          setSelectedService(null);
          setActiveWorkspaceService(srv);
        }}
      />

      {/* Workspace Modal */}
      <WorkspaceModal
        service={activeWorkspaceService}
        onClose={() => setActiveWorkspaceService(null)}
        onSelectOtherService={() => {
          setActiveWorkspaceService(null);
          handleScrollToServices();
        }}
      />
    </div>
  );
}
