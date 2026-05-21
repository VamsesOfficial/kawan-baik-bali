import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Home } from "lucide-react";
import { SEOHead } from "../components/ui";

export default function NotFoundPage({ dark }) {
  const text = dark ? "text-white" : "text-[#1a3a5c]";
  const muted = dark ? "text-white/50" : "text-slate-500";
  const bg = dark ? "bg-[#071526]" : "bg-[#f8f9fc]";

  return (
    <>
      <SEOHead
        title="Page Not Found | PT Kawan Baik Bali"
        description="Halaman tidak ditemukan. Kembali ke beranda PT Kawan Baik Bali — supplier hotel amenities terpercaya di Bali."
        canonical="https://www.kawanbaikbali.com/404"
      />
      <div className={`min-h-screen flex items-center justify-center ${bg} pt-20 transition-colors duration-300`}>
        <div className="max-w-md mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-7xl sm:text-8xl font-black text-amber-500 mb-4">404</p>
            <h1 className={`text-2xl sm:text-3xl font-black ${text} mb-3`}>Page Not Found</h1>
            <p className={`${muted} mb-8 text-sm sm:text-base`}>
              The page you're looking for doesn't exist or has been moved.
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold hover:-translate-y-0.5 transition-all"
              >
                <Home size={16} /> Go Home
              </Link>
              <Link
                to="/products"
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 font-bold hover:-translate-y-0.5 transition-all ${
                  dark ? "border-white/20 text-white/60 hover:border-white/40" : "border-slate-200 text-slate-600 hover:border-slate-400"
                }`}
              >
                View Products <ArrowRight size={16} />
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
