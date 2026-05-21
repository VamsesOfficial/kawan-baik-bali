import { useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, MessageCircle, ChevronRight } from "lucide-react";
import { fadeUp, stagger } from "../animations";
import { Section, SEOHead, ProductImage, ProductModal } from "../components/ui";
import { PRODUCTS, PRODUCT_CATEGORIES } from "../data";

export default function CategoryPage({ dark }) {
  const { slug } = useParams();
  const [selectedProduct, setSelectedProduct] = useState(null);

  const category = PRODUCT_CATEGORIES.find((c) => c.slug === slug);
  if (!category) return <Navigate to="/products" replace />;

  const products = PRODUCTS.filter((p) => p.categorySlug === slug);

  const text = dark ? "text-white" : "text-[#1a3a5c]";
  const muted = dark ? "text-white/50" : "text-slate-500";
  const cardBg = dark ? "bg-[#071526] border-white/10" : "bg-white border-slate-100";
  const tagBg = dark ? "bg-amber-400/20 text-amber-300" : "bg-white/90 text-[#1a3a5c]";

  return (
    <>
      <SEOHead
        title={category.seo.title}
        description={category.seo.description}
        canonical={`https://www.kawanbaikbali.com/products/${slug}`}
        ogImage="https://www.kawanbaikbali.com/og-image.jpeg"
      />

      {/* Page Hero */}
      <div
        className="relative pt-24 sm:pt-28 pb-16 sm:pb-20 overflow-hidden transition-colors duration-300"
        style={{ background: dark ? "#071526" : "#f8f9fc" }}
      >
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={category.image}
            alt={category.name}
            className="w-full h-full object-cover opacity-10"
            loading="eager"
          />
          <div className="absolute inset-0" style={{ background: dark ? "rgba(7,21,38,0.9)" : "rgba(248,249,252,0.92)" }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs mb-6">
            <Link to="/" className={`${muted} hover:text-amber-500 transition-colors`}>Home</Link>
            <ChevronRight size={12} className={muted} />
            <Link to="/products" className={`${muted} hover:text-amber-500 transition-colors`}>Products</Link>
            <ChevronRight size={12} className={muted} />
            <span className="text-amber-500 font-semibold">{category.name}</span>
          </div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          >
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-amber-500" />
              <span className="text-amber-600 text-xs font-bold tracking-[0.25em] uppercase">Product Category</span>
              <div className="h-px w-8 bg-amber-500" />
            </motion.div>
            <motion.h1 variants={fadeUp} className={`text-3xl sm:text-4xl lg:text-5xl font-black ${text} mb-4`}>
              {category.name}
            </motion.h1>
            <motion.p variants={fadeUp} className={`${muted} max-w-2xl text-sm sm:text-base mb-6`}>
              {category.description}
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-2">
              {category.items.map((item) => (
                <span
                  key={item}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-full ${
                    dark ? "bg-white/10 text-white/70" : "bg-white text-slate-600 border border-slate-200"
                  }`}
                >
                  {item}
                </span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Products Grid */}
      <Section id="category-products" className={`py-12 sm:py-16 ${dark ? "bg-[#0d1f33]" : "bg-white"} transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {products.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6">
              {products.map((product) => (
                <div
                  key={product.id}
                  className={`group rounded-2xl sm:rounded-3xl overflow-hidden ${cardBg} border shadow-sm hover:shadow-lg hover:-translate-y-1 transition-[transform,box-shadow] duration-200 cursor-pointer`}
                  onClick={() => setSelectedProduct(product)}
                >
                  <div className="relative h-40 sm:h-52 overflow-hidden" style={{ background: dark ? "#0a1828" : "#e8eef4" }}>
                    <ProductImage src={product.image} alt={product.name} dark={dark} className="w-full h-full group-hover:scale-105 transition-transform duration-300" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-200 flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 text-white text-[10px] sm:text-xs font-bold tracking-wider uppercase px-3 py-1.5 rounded-full bg-black/50 border border-white/20">
                        View Details
                      </span>
                    </div>
                  </div>
                  <div className="p-3 sm:p-4">
                    <h2 className={`font-bold ${text} text-sm mb-1 leading-tight`}>{product.name}</h2>
                    <p className={`${muted} text-xs leading-relaxed mb-2 sm:mb-3 line-clamp-2`}>{product.description}</p>
                    <button
                      onClick={(e) => { e.stopPropagation(); setSelectedProduct(product); }}
                      className="text-xs font-bold text-amber-600 hover:text-amber-500 flex items-center gap-1 group/link"
                    >
                      Enquire Now <ArrowRight size={11} className="transition-transform group-hover/link:translate-x-1" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <motion.div variants={fadeUp} className="text-center py-16">
              <p className={`${muted} text-lg mb-4`}>Products coming soon for this category.</p>
              <a
                href="https://wa.me/62881037366555"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-amber-500 text-white font-bold hover:-translate-y-0.5 transition-all"
              >
                <MessageCircle size={16} /> Ask Us Directly
              </a>
            </motion.div>
          )}

          {/* CTA */}
          <motion.div variants={fadeUp} className="mt-10 sm:mt-12 text-center">
            <p className={`${muted} text-sm mb-4`}>Looking for a specific product or custom packaging?</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <a
                href={`https://wa.me/62881037366555?text=Hello,%20I%20am%20interested%20in%20${encodeURIComponent(category.name)}%20products.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold shadow-md hover:-translate-y-0.5 transition-all text-sm"
              >
                <MessageCircle size={16} /> Request Quote
              </a>
              <Link
                to="/products"
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 font-bold hover:-translate-y-0.5 transition-all text-sm ${
                  dark ? "border-white/20 text-white/60 hover:border-white/40" : "border-slate-200 text-slate-600 hover:border-slate-400"
                }`}
              >
                All Products
              </Link>
            </div>
          </motion.div>
        </div>
      </Section>

      {/* Other Categories */}
      <div className={`py-12 ${dark ? "bg-[#071526]" : "bg-[#f8f9fc]"} transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className={`text-xs font-bold tracking-[0.2em] uppercase ${muted} mb-6`}>Other Categories</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {PRODUCT_CATEGORIES.filter((c) => c.slug !== slug).map((cat) => (
              <Link
                key={cat.slug}
                to={`/products/${cat.slug}`}
                className={`group flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 hover:-translate-y-0.5 ${
                  dark ? "bg-[#0d1f33] border-white/10 hover:border-amber-500/40" : "bg-white border-slate-100 hover:border-amber-300"
                }`}
              >
                <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0">
                  <img src={cat.image} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                </div>
                <div>
                  <p className={`font-bold text-sm ${text}`}>{cat.name}</p>
                  <p className={`text-xs ${muted}`}>{cat.items.length} products</p>
                </div>
                <ChevronRight size={14} className={`ml-auto ${muted} group-hover:text-amber-500 transition-colors`} />
              </Link>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedProduct && (
          <ProductModal product={selectedProduct} dark={dark} onClose={() => setSelectedProduct(null)} />
        )}
      </AnimatePresence>
    </>
  );
}
