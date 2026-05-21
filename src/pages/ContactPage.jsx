import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Phone, Mail, Globe, MapPin, Send, CheckCircle, MessageCircle, ChevronRight } from "lucide-react";
import { fadeUp } from "../animations";
import { Section, SectionLabel, SEOHead } from "../components/ui";
import { CONTACT_INFO } from "../data";

export default function ContactPage({ dark }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", hotel: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const msg = `Hello PT Kawan Baik Bali,%0AName: ${form.name}%0AEmail: ${form.email}%0APhone: ${form.phone}%0AHotel/Property: ${form.hotel}%0AMessage: ${form.message}`;
    window.open(`https://wa.me/62881037366555?text=${msg}`, "_blank");
    setSent(true);
    setTimeout(() => setSent(false), 5000);
  };

  const bg = dark ? "bg-[#071526]" : "bg-[#f8f9fc]";
  const bg2 = dark ? "bg-[#0d1f33]" : "bg-white";
  const text = dark ? "text-white" : "text-[#1a3a5c]";
  const muted = dark ? "text-white/50" : "text-slate-500";
  const cardBg = dark ? "bg-[#0d1f33] border-white/10" : "bg-white border-slate-100";
  const inputStyle = dark
    ? "bg-[#071526] border-white/15 text-white placeholder:text-white/25 focus:border-amber-400 focus:ring-amber-400/10"
    : "bg-white border-slate-200 text-slate-800 placeholder:text-slate-300 focus:border-[#1a3a5c] focus:ring-[#1a3a5c]/10";
  const labelStyle = dark ? "text-white/50" : "text-slate-600";

  const ICONS = { Phone: <Phone size={18}/>, Email: <Mail size={18}/>, Website: <Globe size={18}/>, Address: <MapPin size={18}/> };

  return (
    <>
      <SEOHead
        title="Contact PT Kawan Baik Bali | Hotel Amenities Supplier Bali | WhatsApp & Email"
        description="Hubungi PT Kawan Baik Bali — supplier hotel amenities terpercaya di Bali. WhatsApp: +62 8810-3736-6555. Email: kawanbaik.bali@gmail.com. Lokasi: Kerobokan, Kuta Utara, Badung, Bali."
        canonical="https://www.kawanbaikbali.com/contact"
        ogImage="https://www.kawanbaikbali.com/og-image.jpeg"
      />

      {/* Hero */}
      <div className={`pt-24 sm:pt-28 pb-12 sm:pb-16 ${bg} transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 text-xs mb-6">
            <Link to="/" className={`${muted} hover:text-amber-500 transition-colors`}>Home</Link>
            <ChevronRight size={12} className={muted} />
            <span className="text-amber-500 font-semibold">Contact</span>
          </div>
          <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.08 } } }}>
            <motion.div variants={fadeUp} className="flex items-center gap-3 mb-4">
              <div className="h-px w-8 bg-amber-500" />
              <span className="text-amber-600 text-xs font-bold tracking-[0.25em] uppercase">Get In Touch</span>
              <div className="h-px w-8 bg-amber-500" />
            </motion.div>
            <motion.h1 variants={fadeUp} className={`text-3xl sm:text-4xl lg:text-5xl font-black ${text} mb-4`}>
              Contact Us
            </motion.h1>
            <motion.p variants={fadeUp} className={`${muted} max-w-2xl text-sm sm:text-base`}>
              Ready to elevate your guest experience? Our team responds within 24 hours. Reach us via WhatsApp for the fastest response.
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* Contact Content */}
      <Section id="contact-content" className={`py-12 sm:py-16 ${bg2} transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-start">
            {/* Info */}
            <div>
              <motion.div variants={fadeUp} className="grid grid-cols-1 gap-3 sm:gap-4 mb-6 sm:mb-8">
                {CONTACT_INFO.map((c) => (
                  <a
                    key={c.label}
                    href={c.href}
                    className={`flex items-start gap-3 sm:gap-4 p-4 sm:p-5 rounded-xl sm:rounded-2xl ${cardBg} border shadow-sm hover:shadow-md hover:border-amber-200 transition-all group`}
                  >
                    <div className={`w-9 h-9 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                      dark ? "bg-white/5 text-amber-400 group-hover:bg-amber-500/20" : "bg-[#1a3a5c]/5 text-[#1a3a5c] group-hover:bg-amber-50 group-hover:text-amber-600"
                    }`}>
                      {ICONS[c.label]}
                    </div>
                    <div>
                      <p className={`text-xs font-semibold ${muted} uppercase tracking-wide`}>{c.label}</p>
                      <p className={`font-semibold ${text} text-sm mt-0.5`}>{c.value}</p>
                    </div>
                  </a>
                ))}
              </motion.div>

              {/* WhatsApp CTA */}
              <motion.div variants={fadeUp} className="mb-6 sm:mb-8">
                <a
                  href="https://wa.me/62881037366555?text=Hello%20PT%20Kawan%20Baik%20Bali%2C%20I%20would%20like%20to%20request%20a%20quote."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 sm:p-5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg hover:shadow-green-500/30 hover:-translate-y-0.5 transition-all"
                >
                  <MessageCircle size={22} />
                  <div>
                    <p className="font-black text-sm">Chat on WhatsApp</p>
                    <p className="text-white/75 text-xs">Fastest response — usually within 1 hour</p>
                  </div>
                </a>
              </motion.div>

              {/* Map */}
              <motion.div variants={fadeUp} className="rounded-xl sm:rounded-2xl overflow-hidden shadow-md h-48 sm:h-56 bg-slate-200">
                <iframe
                  title="PT Kawan Baik Bali Location — Hotel Amenities Supplier Bali"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63113.85610286814!2d115.09525772167969!3d-8.632811999999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2dd239002f2a6e75%3A0xbc7b96b8221e62de!2sKawan%20Baik%20Bali!5e0!3m2!1sid!2sid!4v1779019519297!5m2!1sid!2sid"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </motion.div>
            </div>

            {/* Form */}
            <motion.div variants={fadeUp} className={`${dark ? "bg-[#0d1f33]" : "bg-white"} rounded-2xl sm:rounded-3xl shadow-xl p-5 sm:p-8`}>
              <h2 className={`font-black ${text} text-lg sm:text-xl mb-5 sm:mb-6`}>Send Us a Message</h2>

              {sent && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-5 flex items-center gap-3 p-4 rounded-xl bg-green-50 border border-green-200 text-green-700 text-xs sm:text-sm font-medium"
                >
                  <CheckCircle size={16} /> Message sent! We'll get back to you soon.
                </motion.div>
              )}

              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                {[
                  { name: "name",  label: "Full Name",            placeholder: "John Smith",              type: "text" },
                  { name: "email", label: "Email Address",         placeholder: "john@hotel.com",          type: "email" },
                  { name: "phone", label: "Phone Number",          placeholder: "+62 812-xxxx-xxxx",       type: "tel" },
                  { name: "hotel", label: "Hotel / Property Name", placeholder: "The Grand Bali Resort",   type: "text" },
                ].map((field) => (
                  <div key={field.name}>
                    <label className={`block text-xs font-semibold ${labelStyle} mb-1.5 uppercase tracking-wide`}>{field.label}</label>
                    <input
                      type={field.type}
                      name={field.name}
                      placeholder={field.placeholder}
                      value={form[field.name]}
                      onChange={handleChange}
                      required={field.name === "name" || field.name === "email"}
                      className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border text-xs sm:text-sm focus:outline-none focus:ring-2 transition-all ${inputStyle}`}
                    />
                  </div>
                ))}
                <div>
                  <label className={`block text-xs font-semibold ${labelStyle} mb-1.5 uppercase tracking-wide`}>Message</label>
                  <textarea
                    name="message"
                    rows={4}
                    placeholder="Tell us about your amenity requirements..."
                    value={form.message}
                    onChange={handleChange}
                    className={`w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl border text-xs sm:text-sm focus:outline-none focus:ring-2 transition-all resize-none ${inputStyle}`}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-5 sm:px-6 py-3 sm:py-3.5 rounded-xl bg-gradient-to-r from-[#1a3a5c] to-[#2c6e8a] text-white font-bold shadow-lg shadow-[#1a3a5c]/30 hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 text-sm"
                >
                  <Send size={14} />
                  Send via WhatsApp
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </Section>
    </>
  );
}
