import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle, Award, Sparkles, Shield, Leaf, Star, Heart, ChevronRight, Play, Pause, Music2 } from "lucide-react";
import { fadeUp, stagger } from "../animations";
import { Section, SectionLabel, SEOHead } from "../components/ui";
import { WHY_ITEMS, GALLERY_PHOTOS } from "../data";

function VibePlayer({ dark }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) {
      audio.pause();
    } else {
      audio.play();
    }
    setPlaying(!playing);
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (!audio) return;
    setCurrentTime(audio.currentTime);
    setProgress((audio.currentTime / audio.duration) * 100 || 0);
  };

  const handleLoadedMetadata = () => {
    setDuration(audioRef.current?.duration || 0);
  };

  const handleSeek = (e) => {
    const audio = audioRef.current;
    if (!audio) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    audio.currentTime = ratio * audio.duration;
  };

  const fmt = (s) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const card = dark
    ? "bg-white/5 border-white/10"
    : "bg-white border-slate-100 shadow-xl";

  return (
    <div className={`rounded-3xl border p-8 sm:p-10 ${card} max-w-md mx-auto`}>
      <audio
        ref={audioRef}
        src="/kawan-baik-vibe.mp3"
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={() => setPlaying(false)}
      />

      {/* Album cover */}
      <div className="flex justify-center mb-6">
        <div className="relative w-40 h-40 rounded-2xl overflow-hidden shadow-2xl">
          <img
            src="/vibe-cover.jpg"
            alt="Kawan Baik & Morning Glow — Feel The Freshness"
            className={`w-full h-full object-cover transition-all duration-700 ${playing ? "scale-110" : "scale-100"}`}
          />
          {playing && (
            <div className="absolute inset-0 rounded-2xl ring-4 ring-amber-400 ring-opacity-70 animate-pulse" />
          )}
        </div>
      </div>

      {/* Track info */}
      <p className={`font-black text-base sm:text-lg ${dark ? "text-white" : "text-[#1a3a5c]"} mb-0.5`}>
        Feel The Freshness
      </p>
      <p className={`text-sm font-semibold mb-0.5 ${dark ? "text-amber-400" : "text-amber-600"}`}>
        Kawan Baik & Morning Glow
      </p>
      <p className={`text-xs mb-6 ${dark ? "text-white/40" : "text-slate-400"}`}>
        영원히 함께해 ✨
      </p>

      {/* Progress bar */}
      <div
        className={`w-full h-2 rounded-full mb-2 cursor-pointer ${dark ? "bg-white/10" : "bg-slate-100"}`}
        onClick={handleSeek}
      >
        <div
          className="h-full rounded-full bg-amber-500 transition-all duration-100"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className={`flex justify-between text-[10px] mb-8 ${dark ? "text-white/30" : "text-slate-400"}`}>
        <span>{fmt(currentTime)}</span>
        <span>{fmt(duration)}</span>
      </div>

      {/* Play / Pause button */}
      <button
        onClick={toggle}
        className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto transition-all duration-300 hover:scale-110 active:scale-95 shadow-lg ${
          playing
            ? "bg-[#1a3a5c] text-white"
            : "bg-amber-500 text-white"
        }`}
      >
        {playing ? <Pause size={22} /> : <Play size={22} className="translate-x-0.5" />}
      </button>
    </div>
  );
}

export default function AboutPage({ dark }) {
  const [activePhoto, setActivePhoto] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActivePhoto((p) => (p + 1) % GALLERY_PHOTOS.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  const bg = dark ? "bg-[#0d1f33]" : "bg-white";
  const bg2 = dark ? "bg-[#071526]" : "bg-[#f8f9fc]";
  const text = dark ? "text-white" : "text-[#1a3a5c]";
  const muted = dark ? "text-white/60" : "text-slate-600";
  const cardBg = dark ? "bg-white/5 border-white/10" : "bg-slate-50 border-slate-100";

  const WHY_ICONS = [<Award size={24}/>, <Sparkles size={24}/>, <Shield size={24}/>, <Leaf size={24}/>, <Star size={24}/>, <Heart size={24}/>];

  return (
    <>
      <SEOHead
        title="About PT Kawan Baik Bali | Hotel Amenities Supplier Bali Since 2014"
        description="PT Kawan Baik Bali adalah supplier hotel amenities terpercaya di Bali sejak 2014. Melayani 500+ hotel & resort di Bali & Indonesia. HALAL certified, POM certified, ISO quality assured."
        canonical="https://www.kawanbaikbali.com/about"
        ogImage="https://www.kawanbaikbali.com/og-image.jpeg"
      />

      {/* Hero */}
      <div className={`pt-24 sm:pt-28 pb-12 sm:pb-16 ${bg2} transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs mb-6">
            <Link to="/" className={`${muted} hover:text-amber-500 transition-colors`}>Home</Link>
            <ChevronRight size={12} className={muted} />
            <span className="text-amber-500 font-semibold">About Us</span>
          </div>
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.08 } } }}>
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-amber-500" />
              <span className="text-amber-600 text-xs font-bold tracking-[0.25em] uppercase">About PT Kawan Baik Bali</span>
              <div className="h-px w-8 bg-amber-500" />
            </motion.div>
            <motion.h1 variants={fadeUp} className={`text-3xl sm:text-4xl lg:text-5xl font-black ${text} mb-4`}>
              Bali's Most Trusted
              <span className="text-amber-500"> Hotel Amenities Partner</span>
            </motion.h1>
            <motion.p variants={fadeUp} className={`${muted} max-w-2xl text-sm sm:text-base`}>
              Supplying premium hotel amenities to Bali's finest hotels and resorts since 2014. Quality, reliability, and partnership — that's the Kawan Baik promise.
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Story Section */}
      <Section id="story" className={`py-16 sm:py-20 lg:py-24 ${bg} transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">

            {/* Left — Story text */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
            >
              <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
                <div className="h-px w-8 bg-amber-500" />
                <span className="text-amber-600 text-xs font-bold tracking-[0.25em] uppercase">Our Story</span>
              </motion.div>
              <motion.h2 variants={fadeUp} className={`text-2xl sm:text-3xl lg:text-4xl font-black ${text} leading-tight mb-6`}>
                Berawal dari Bali,<br />untuk Industri Hospitality Indonesia
              </motion.h2>
              <motion.div variants={fadeUp} className={`space-y-4 ${muted} leading-relaxed text-sm sm:text-base`}>
                <p>
                  <strong className={text}>PT Kawan Baik Bali</strong> berdiri dengan satu keyakinan sederhana — setiap tamu hotel berhak merasakan sambutan yang tulus. Saat tangan mereka menyentuh botol shampoo pertama di kamar, kualitas amenities yang Anda pilih sudah bercerita tentang siapa Anda.
                </p>
                <p>
                  Berbasis di Bali, jantung industri pariwisata Indonesia, kami memahami betul dinamika unik sektor hospitality. Bisnis kami dibangun di atas pengetahuan lokal yang mendalam, kemitraan kuat dengan produsen terpercaya, dan komitmen yang tidak pernah goyah terhadap klien kami.
                </p>
                <p>
                  Kami melayani berbagai properti di Bali dan Indonesia — dari guesthouse butik yang hangat hingga resort berbintang internasional. Bagi kami, tidak ada klien yang terlalu kecil atau terlalu besar.
                </p>
                <p>
                  Kami percaya amenities yang tepat menyampaikan pesan kepada tamu Anda: <em className="text-amber-500">"Kami peduli."</em> Misi kami adalah membantu setiap properti di Indonesia menyampaikan pesan itu — dengan harga yang terjangkau, pengiriman yang andal, dan produk yang indah.
                </p>
              </motion.div>
            </motion.div>

            {/* Right — Visual cards */}
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
              className="grid grid-cols-2 gap-4"
            >
              {[
                { icon: "🏨", title: "Berbasis di Bali", desc: "Dekat dengan klien, paham kebutuhan lokal sektor hospitality" },
                { icon: "🤝", title: "Kemitraan Jangka Panjang", desc: "Kami bangun relasi, bukan sekadar transaksi jual beli" },
                { icon: "📦", title: "Produk Lengkap", desc: "Dari toiletries, linen, hingga amenity kit dalam satu sumber" },
                { icon: "🚀", title: "Pengiriman Cepat", desc: "Seluruh Bali dan Indonesia dengan jadwal yang bisa diandalkan" },
                { icon: "✅", title: "Kualitas Terjamin", desc: "Setiap produk melewati quality check sebelum sampai ke tangan Anda" },
                { icon: "🌿", title: "Pilihan Eco Material", desc: "Tersedia lini produk ramah lingkungan untuk properti yang peduli bumi" },
              ].map((item) => (
                <motion.div
                  key={item.title}
                  variants={fadeUp}
                  className={`rounded-2xl border p-4 sm:p-5 transition-all duration-300 hover:shadow-md ${cardBg}`}
                >
                  <span className="text-2xl mb-3 block">{item.icon}</span>
                  <p className={`font-bold text-sm ${text} mb-1`}>{item.title}</p>
                  <p className={`text-xs leading-relaxed ${muted}`}>{item.desc}</p>
                </motion.div>
              ))}
            </motion.div>

          </div>
        </div>
      </Section>

      {/* Mission & Vision */}
      <Section id="mission" className={`py-16 sm:py-20 ${bg2} transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-14">
            <SectionLabel text="What We Stand For" />
            <motion.h2 variants={fadeUp} className={`text-3xl sm:text-4xl font-black ${text}`}>
              Mission & Vision
            </motion.h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {[
              {
                label: "Our Mission",
                desc: "To deliver consistently high-quality hospitality products that elevate guest experiences and empower every hotel property in Indonesia to exceed guest expectations."
              },
              {
                label: "Our Vision",
                desc: "To become Indonesia's No.1 most trusted hotel amenities partner by 2030 — known for quality, innovation, and genuine care for our clients and their guests."
              },
              {
                label: "Our Values",
                desc: "Quality without compromise. Honest partnerships. Sustainable practices. Rapid response. Local expertise with a global standard."
              },
            ].map((item) => (
              <motion.div
                key={item.label}
                variants={fadeUp}
                className={`p-6 rounded-2xl ${cardBg} border`}
              >
                <div className="text-3xl mb-4">{item.icon}</div>
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-2 h-2 rounded-full bg-amber-500" />
                  <p className={`font-bold ${text}`}>{item.label}</p>
                </div>
                <p className={`${muted} text-sm leading-relaxed`}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>

      {/* Why Choose Us */}
      <section className="py-16 sm:py-20 lg:py-24 bg-[#1a3a5c] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 sm:w-96 h-64 sm:h-96 rounded-full bg-white/[0.02] -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-48 sm:w-64 h-48 sm:h-64 rounded-full bg-amber-500/5 translate-y-1/2 -translate-x-1/4" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-16">
            <div className="flex items-center gap-3 justify-center mb-4">
              <div className="h-px w-8 bg-amber-400/60" />
              <span className="text-amber-400 text-xs font-bold tracking-[0.25em] uppercase">Why Choose Us</span>
              <div className="h-px w-8 bg-amber-400/60" />
            </div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-3xl lg:text-5xl font-black text-white leading-tight"
            >
              The Kawan Baik
              <span className="text-amber-400"> Difference</span>
            </motion.h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {WHY_ITEMS.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="group p-5 sm:p-6 rounded-xl sm:rounded-2xl bg-white/[0.05] border border-white/10 hover:bg-white/[0.09] hover:border-amber-400/30 transition-all duration-300"
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-amber-500/20 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4 sm:mb-5 group-hover:bg-amber-500/30 transition-colors">
                  {WHY_ICONS[i]}
                </div>
                <h3 className="font-black text-white text-base sm:text-lg mb-2">{item.title}</h3>
                <p className="text-white/50 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats 
      <Section id="stats" className={`py-16 sm:py-20 ${bg} transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
            {[
              { value: "500+", label: "Hotels Served" },
              { value: "10+", label: "Years in Bali" },
              { value: "4", label: "Product Categories" },
              { value: "24h", label: "Response Time" },
            ].map((stat) => (
              <motion.div key={stat.label} variants={fadeUp} className="text-center">
                <p className={`text-4xl sm:text-5xl font-black text-amber-500 mb-2`}>{stat.value}</p>
                <p className={`${muted} text-sm font-medium`}>{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>*/}


      {/* ── OUR VIBE ── */}
      <section className={`py-16 sm:py-20 ${bg2} transition-colors duration-300`}>
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          >
            <motion.div variants={fadeUp} className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-8 bg-amber-500" />
              <span className="text-amber-600 text-xs font-bold tracking-[0.25em] uppercase">Our Vibe</span>
              <div className="h-px w-8 bg-amber-500" />
            </motion.div>
            <motion.h2 variants={fadeUp} className={`text-3xl sm:text-4xl font-black ${text} mb-3`}>
              Feel the Bali Spirit
            </motion.h2>
            <motion.p variants={fadeUp} className={`${muted} text-sm sm:text-base mb-10`}>
              Di balik setiap produk yang kami kirim, ada semangat dan kehangatan tim kami. Santai sejenak, nikmati suasananya.
            </motion.p>

            {/* Music Player */}
            <motion.div variants={fadeUp}>
              <VibePlayer dark={dark} />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <div className={`py-12 sm:py-16 ${bg2} transition-colors duration-300`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className={`text-2xl sm:text-3xl font-black ${text} mb-4`}>
            Ready to Work with Bali's Best Amenities Supplier?
          </h2>
          <p className={`${muted} mb-6 text-sm sm:text-base`}>
            Contact us today and let's discuss how we can elevate your guest experience.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold shadow-md hover:-translate-y-0.5 transition-all text-sm sm:text-base"
            >
              Get In Touch <ArrowRight size={16} />
            </Link>
            <Link
              to="/products"
              className={`inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full border-2 font-bold hover:-translate-y-0.5 transition-all text-sm sm:text-base ${
                dark ? "border-amber-500 text-amber-400 hover:bg-amber-500/10" : "border-[#1a3a5c] text-[#1a3a5c] hover:bg-[#1a3a5c] hover:text-white"
              }`}
            >
              View Products
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

const WHY_ICONS = [<Award size={24}/>, <Sparkles size={24}/>, <Shield size={24}/>, <Leaf size={24}/>, <Star size={24}/>, <Heart size={24}/>];
