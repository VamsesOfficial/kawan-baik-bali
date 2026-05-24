import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { fadeUp, stagger } from "../animations";
import { Section, SEOHead } from "../components/ui";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CLIENTS = [
  { name: "Lv8 Resort Hotel",          location: "Canggu, Bali",        img: "/clients/lv8-resort-hotel-canggu.jpg" },
  { name: "Nadi Hotel",                location: "Legian, Bali",         img: "/clients/nadi-hotel-legian.jpg" },
  { name: "The 101 Hotel",             location: "Fontana Seminyak",     img: "/clients/the-101-hotel-fontana-seminyak.jpg" },
  { name: "The Haven",                 location: "Seminyak, Bali",       img: "/clients/the-haven-suite-hotel-villa-seminyak.jpg" },
  { name: "Metland Seva",              location: "Seminyak, Bali",       img: "/clients/metland-seva-seminyak.jpg" },
  { name: "Nusa Dua Bayview",          location: "Nusa Dua, Bali",       img: "/clients/nusa-dua-bayview-hotel.jpg" },
  { name: "Fourteen Roses",            location: "Boutique Hotel & Spa", img: "/clients/fourteen-roses-boutique-hotel-spa.jpg" },
  { name: "Adi Assri Beach Resort",    location: "Pemuteran, Bali",      img: "/clients/adi-assri-beach-resort-spa-pemuteran.jpg" },
  { name: "The One Legian",            location: "Legian, Bali",         img: "/clients/the-one-legian.jpg" },
  { name: "Elevate Resort",            location: "Munduk, Bali",         img: "/clients/elevate-munduk-bali.jpg" },
  { name: "Golden Tulip Jineng",       location: "Resort Bali",          img: "/clients/golden-tulip-jineng-resort-bali.jpg" },
  { name: "The Grand Villandra",       location: "Resort Bali",          img: "/clients/the-grand-villandra-resort.jpg" },
  { name: "FuramaXclusive Ubud",       location: "Villas & Spa, Ubud",   img: "/clients/furamaxclusive-villas-spa-ubud.jpg" },
  { name: "Tijili Hotel Benoa",        location: "Benoa, Bali",          img: "/clients/tijili-hotel-benoa.jpg" },
  { name: "FuramaXclusive Seminyak",   location: "Ocean Beach",          img: "/clients/furamaxclusive-ocean-beach-seminyak.jpg" },
  { name: "Padma Resort",              location: "Legian, Bali",         img: "/clients/padma-resort-legian.jpg" },
  { name: "Tijili Hotel Seminyak",     location: "Seminyak, Bali",       img: "/clients/tijili-hotel-seminyak.jpg" },
  { name: "Devani Resort",             location: "Sidemen, Bali",        img: "/clients/devani-resort-sidemen.jpg" },
  { name: "The Mavila",                location: "Private Villas",       img: "/clients/the-mavila-private-villas.jpg" },
];

// ─── SLIDESHOW ────────────────────────────────────────────────────────────────
function Slideshow({ dark }) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const total = CLIENTS.length;

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setCurrent(c => (c + 1) % total), 3000);
    return () => clearInterval(t);
  }, [paused, total]);

  const prev = () => setCurrent(c => (c - 1 + total) % total);
  const next = () => setCurrent(c => (c + 1) % total);

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ height: "420px" }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          className="absolute inset-0 flex items-center justify-center"
          style={{ background: dark ? "#0d1f33" : "#f0f4f8" }}
        >
          <img
            src={CLIENTS[current].img}
            alt={CLIENTS[current].name}
            className="max-h-[280px] max-w-[480px] w-full h-full object-contain px-12"
          />
          {/* Overlay bottom gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

          {/* Name + location */}
          <div className="absolute bottom-0 left-0 right-0 p-8 text-center">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-white text-xl sm:text-2xl font-black"
            >
              {CLIENTS[current].name}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-amber-400 text-sm mt-1"
            >
              {CLIENTS[current].location}
            </motion.p>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Prev / Next buttons */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:bg-white/40 transition-all"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center text-white hover:bg-white/40 transition-all"
      >
        <ChevronRight size={20} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
        {CLIENTS.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? "bg-amber-400 w-5 h-1.5"
                : "bg-white/40 w-1.5 h-1.5"
            }`}
          />
        ))}
      </div>

      {/* Counter */}
      <div className="absolute top-4 right-4 z-10 bg-black/30 backdrop-blur-sm rounded-full px-3 py-1 text-white text-xs font-bold">
        {current + 1} / {total}
      </div>
    </div>
  );
}

// ─── CLIENTS PAGE ─────────────────────────────────────────────────────────────
export default function ClientsPage({ dark }) {
  const gridRef = useRef(null);
  const inView = useInView(gridRef, { once: true, margin: "-60px" });

  const text  = dark ? "text-white"    : "text-[#1a3a5c]";
  const muted = dark ? "text-white/50" : "text-slate-500";
  const bg    = dark ? "bg-[#071526]"  : "bg-[#f8f9fc]";
  const card  = dark
    ? "bg-white/5 border-white/10 hover:bg-white/10 hover:border-amber-400/40"
    : "bg-white border-slate-100 hover:border-amber-300 hover:shadow-lg";

  return (
    <>
      <SEOHead
        title="Our Clients | PT Kawan Baik Bali — Trusted by 500+ Hotels in Bali"
        description="PT Kawan Baik Bali dipercaya oleh 500+ hotel dan resort di Bali & Indonesia. Lihat daftar klien kami dari berbagai hotel bintang 3 hingga bintang 5."
        canonical="https://www.kawanbaikbali.com/clients"
      />

      <div className={`min-h-screen pt-20 transition-colors duration-300 ${bg}`}>

        {/* ── SLIDESHOW SECTION ── */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-8 pb-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="text-center mb-6"
          >
            <motion.div variants={fadeUp} className="flex items-center justify-center gap-3 mb-3">
              <div className="h-px w-8 bg-amber-500" />
              <span className="text-amber-600 text-xs font-bold tracking-[0.25em] uppercase">Our Clients</span>
              <div className="h-px w-8 bg-amber-500" />
            </motion.div>
            <motion.h1 variants={fadeUp} className={`text-3xl sm:text-4xl font-black ${text} mb-2`}>
              Klien Kami
            </motion.h1>
            <motion.p variants={fadeUp} className={`${muted} text-sm sm:text-base max-w-lg mx-auto`}>
              Berikut adalah hotel dan resort di Bali yang telah mempercayakan kebutuhan amenities mereka kepada PT Kawan Baik Bali.
            </motion.p>
          </motion.div>

          {/* Slideshow */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className={`rounded-3xl overflow-hidden border shadow-xl ${dark ? "border-white/10" : "border-slate-200"}`}
          >
            <Slideshow dark={dark} />
          </motion.div>
        </div>

        {/* ── STATS ── */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          <div className={`rounded-2xl border px-6 py-5 flex flex-wrap justify-center gap-6 sm:gap-12 ${dark ? "bg-white/5 border-white/10" : "bg-white border-slate-100 shadow-sm"}`}>
            {[
              { num: "500+", label: "Hotel & Resort" },
              { num: "10+",  label: "Tahun Pengalaman" },
              { num: "50K+", label: "Kamar Terlayani" },
              { num: "98%",  label: "Kepuasan Klien" },
            ].map(({ num, label }) => (
              <div key={label} className="text-center">
                <p className="text-2xl sm:text-3xl font-black text-amber-500">{num}</p>
                <p className={`text-xs sm:text-sm ${muted} mt-0.5`}>{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── GRID LOGO ── */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 pb-20">
          <div className="text-center mb-8">
            <h2 className={`text-xl sm:text-2xl font-black ${text}`}>Daftar Klien Kami</h2>
            <p className={`${muted} text-sm mt-1`}>Beberapa hotel & resort yang bekerja sama dengan kami</p>
          </div>

          <motion.div
            ref={gridRef}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            variants={{ visible: { transition: { staggerChildren: 0.05 } } }}
            className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 sm:gap-4"
          >
            {CLIENTS.map((client) => (
              <motion.div
                key={client.name}
                variants={fadeUp}
                className={`group relative border rounded-2xl overflow-hidden transition-all duration-300 ${card}`}
                style={{ aspectRatio: "4/3" }}
              >
                <img
                  src={client.img}
                  alt={client.name}
                  className="w-full h-full object-contain p-4 transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 flex flex-col items-center justify-end pb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-t from-[#0d2137]/85 to-transparent rounded-2xl">
                  <p className="text-white text-[10px] font-bold text-center px-2 leading-tight">{client.name}</p>
                  <p className="text-amber-400 text-[9px] text-center px-2 leading-tight">{client.location}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>
    </>
  );
}
