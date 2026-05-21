import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, MessageCircle } from "lucide-react";
import { DarkModeToggle } from "./ui";

const NAV_LINKS = [
  { label: "Home",        to: "/" },
  { label: "About Us",    to: "/about" },
  { label: "Products",    to: "/products" },
  { label: "Contact",     to: "/contact" },
];

export default function Header({ dark, setDark }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setOpen(false); }, [location.pathname]);

  const isHome = location.pathname === "/";
  const bgScrolled = dark
    ? "bg-[#0d1f33]/95 backdrop-blur-md shadow-lg shadow-black/30"
    : "bg-white/95 backdrop-blur-md shadow-lg shadow-navy-900/5";

  const isActive = (to) => {
    if (to === "/") return location.pathname === "/";
    return location.pathname.startsWith(to);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || !isHome ? bgScrolled : "bg-transparent"
      }`}
      style={{ willChange: "background-color, box-shadow" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <img src="/logo.png" alt="PT Kawan Baik Bali Logo" className="w-9 h-9 sm:w-10 sm:h-10 object-contain" />
            <div className="text-left">
              <p className={`font-black text-sm sm:text-base leading-none tracking-tight transition-colors ${
                (scrolled || !isHome) ? (dark ? "text-white" : "text-[#1a3a5c]") : "text-white"
              }`}>
                Kawan Baik
              </p>
              <p className={`text-[9px] sm:text-[10px] font-medium tracking-widest uppercase transition-colors ${
                (scrolled || !isHome) ? (dark ? "text-amber-400" : "text-amber-600") : "text-amber-300"
              }`}>
                Bali
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className={`text-sm font-medium transition-colors relative group ${
                  (scrolled || !isHome)
                    ? dark
                      ? (isActive(l.to) ? "text-amber-400" : "text-white/60 hover:text-white")
                      : (isActive(l.to) ? "text-[#1a3a5c]" : "text-slate-500 hover:text-[#1a3a5c]")
                    : (isActive(l.to) ? "text-white" : "text-white/70 hover:text-white")
                }`}
              >
                {l.label}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-amber-500 transition-all duration-300 ${isActive(l.to) ? "w-full" : "w-0 group-hover:w-full"}`} />
              </Link>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-3 xl:gap-4">
            <DarkModeToggle dark={dark} setDark={setDark} />
            <a
              href="https://wa.me/62881037366555?text=Hello%20PT%20Kawan%20Baik%20Bali%2C%20I%20would%20like%20to%20request%20a%20quote."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 xl:px-5 py-2.5 rounded-full bg-gradient-to-r from-amber-500 to-amber-600 text-white text-sm font-bold shadow-md hover:shadow-amber-500/40 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
            >
              <MessageCircle size={14} />
              <span>Request Quote</span>
            </a>
          </div>

          {/* Mobile right */}
          <div className="flex lg:hidden items-center gap-2">
            <DarkModeToggle dark={dark} setDark={setDark} />
            <button
              onClick={() => setOpen(!open)}
              className={`p-2 rounded-lg transition-colors ${
                (scrolled || !isHome)
                  ? dark ? "text-white hover:bg-white/10" : "text-[#1a3a5c] hover:bg-slate-100"
                  : "text-white hover:bg-white/10"
              }`}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`lg:hidden border-t shadow-xl overflow-hidden transition-all duration-300 ease-in-out ${
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0 pointer-events-none"
        } ${dark ? "bg-[#0d1f33] border-white/10" : "bg-white border-slate-100"}`}
      >
        <div className="px-4 py-5 flex flex-col gap-1">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={`text-left px-4 py-3 rounded-xl font-medium transition-colors text-sm ${
                dark ? "text-white hover:bg-white/10" : "text-[#1a3a5c] hover:bg-slate-50"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <a
            href="https://wa.me/62881037366555"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 text-center px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white font-bold text-sm"
          >
            Request Quote
          </a>
        </div>
      </div>
    </header>
  );
}
