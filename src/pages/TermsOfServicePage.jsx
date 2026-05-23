import { motion } from "framer-motion";
import { fadeUp, stagger } from "../animations";
import { Section, SEOHead } from "../components/ui";

const sections = [
  {
    title: "1. Penerimaan Syarat",
    content: [
      "Dengan mengakses dan menggunakan website PT Kawan Baik Bali (kawanbaikbali.com), Anda menyatakan telah membaca, memahami, dan menyetujui Syarat & Ketentuan ini. Jika Anda tidak menyetujui salah satu ketentuan, mohon untuk tidak menggunakan website ini.",
    ],
  },
  {
    title: "2. Layanan yang Kami Sediakan",
    content: [
      "PT Kawan Baik Bali adalah perusahaan supplier hotel amenities dan perlengkapan hospitality yang berbasis di Bali, Indonesia. Melalui website ini, kami menyediakan:",
      "• Informasi produk dan katalog hotel amenities.",
      "• Fasilitas permintaan penawaran harga (enquiry).",
      "• Informasi kontak dan lokasi perusahaan.",
      "• Artikel dan konten edukatif seputar industri perhotelan.",
    ],
  },
  {
    title: "3. Penggunaan Website",
    content: [
      "Anda setuju untuk menggunakan website ini hanya untuk tujuan yang sah dan tidak melanggar hukum. Dilarang keras untuk:",
      "• Menggunakan website untuk tujuan penipuan atau menyesatkan.",
      "• Menyalin, mendistribusikan, atau memodifikasi konten website tanpa izin tertulis dari PT Kawan Baik Bali.",
      "• Melakukan upaya untuk mengakses sistem atau data yang tidak diotorisasi.",
      "• Mengirimkan spam, malware, atau konten berbahaya melalui formulir di website ini.",
    ],
  },
  {
    title: "4. Hak Kekayaan Intelektual",
    content: [
      "Seluruh konten yang terdapat di website ini, termasuk namun tidak terbatas pada teks, gambar, logo, desain, dan merek dagang, adalah milik PT Kawan Baik Bali dan dilindungi oleh hukum kekayaan intelektual yang berlaku di Indonesia.",
      "Anda diperbolehkan untuk menggunakan konten hanya untuk keperluan personal dan non-komersial. Penggunaan komersial tanpa izin tertulis dari kami adalah pelanggaran hukum.",
    ],
  },
  {
    title: "5. Pemesanan dan Transaksi",
    content: [
      "Website ini berfungsi sebagai platform informasi dan penghubung. Transaksi pembelian produk dilakukan secara terpisah melalui komunikasi langsung (telepon, email, atau WhatsApp) dengan tim sales kami.",
      "• Harga yang tertera atau dikutip dapat berubah sewaktu-waktu mengikuti kondisi pasar.",
      "• Semua pesanan tunduk pada ketersediaan stok dan konfirmasi dari tim kami.",
      "• Syarat pembayaran dan pengiriman akan disepakati secara terpisah dalam perjanjian bisnis.",
    ],
  },
  {
    title: "6. Penafian (Disclaimer)",
    content: [
      "Informasi di website ini disediakan 'sebagaimana adanya' tanpa jaminan apapun. PT Kawan Baik Bali tidak bertanggung jawab atas:",
      "• Ketidakakuratan atau ketidaklengkapan informasi yang tersedia di website.",
      "• Kerugian yang timbul akibat penggunaan atau ketidakmampuan menggunakan website.",
      "• Konten dari website pihak ketiga yang ditautkan dari website kami.",
    ],
  },
  {
    title: "7. Batasan Tanggung Jawab",
    content: [
      "Sejauh yang diizinkan oleh hukum yang berlaku, PT Kawan Baik Bali tidak akan bertanggung jawab atas kerugian langsung, tidak langsung, insidental, khusus, atau konsekuensial yang timbul dari penggunaan website ini.",
    ],
  },
  {
    title: "8. Hukum yang Berlaku",
    content: [
      "Syarat & Ketentuan ini diatur dan ditafsirkan sesuai dengan hukum Republik Indonesia. Setiap sengketa yang timbul dari atau terkait dengan Syarat & Ketentuan ini akan diselesaikan melalui jalur musyawarah. Apabila tidak tercapai kesepakatan, penyelesaian akan dilakukan melalui pengadilan yang berwenang di Bali, Indonesia.",
    ],
  },
  {
    title: "9. Perubahan Syarat",
    content: [
      "PT Kawan Baik Bali berhak mengubah Syarat & Ketentuan ini kapan saja tanpa pemberitahuan sebelumnya. Perubahan akan berlaku efektif sejak dipublikasikan di halaman ini. Penggunaan website secara berkelanjutan setelah perubahan tersebut dianggap sebagai persetujuan Anda terhadap syarat yang diperbarui.",
    ],
  },
  {
    title: "10. Hubungi Kami",
    content: [
      "Jika Anda memiliki pertanyaan mengenai Syarat & Ketentuan ini, silakan hubungi kami:",
      "• Email: kawanbaik.bali@gmail.com",
      "• Telepon: +62 8810-3736-6555",
      "• Alamat: Blok A3 No.31, Kerobokan Kaja, Kuta Utara, Kabupaten Badung, Bali 80361",
    ],
  },
];

export default function TermsOfServicePage({ dark }) {
  const text = dark ? "text-white" : "text-[#1a3a5c]";
  const muted = dark ? "text-white/50" : "text-slate-500";
  const cardBg = dark ? "bg-white/5 border-white/10" : "bg-white border-slate-100";

  return (
    <>
      <SEOHead
        title="Terms of Service | PT Kawan Baik Bali"
        description="Syarat & Ketentuan penggunaan website PT Kawan Baik Bali — supplier hotel amenities terpercaya di Bali, Indonesia."
        canonical="https://www.kawanbaikbali.com/terms-of-service"
      />

      <Section className={`pt-28 pb-20 transition-colors duration-300 ${dark ? "bg-[#071526]" : "bg-[#f8f9fc]"}`}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" animate="visible" variants={stagger}>

            {/* Header */}
            <motion.div variants={fadeUp} className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-8 bg-amber-500" />
                <span className="text-amber-600 text-xs font-bold tracking-[0.25em] uppercase">Legal</span>
              </div>
              <h1 className={`text-4xl sm:text-5xl font-black ${text} mb-4`}>Terms of Service</h1>
              <p className={`${muted} text-sm`}>Terakhir diperbarui: Mei 2026</p>
            </motion.div>

            {/* Intro */}
            <motion.div variants={fadeUp} className={`rounded-2xl border p-6 mb-8 ${cardBg}`}>
              <p className={`${muted} text-sm leading-relaxed`}>
                Syarat & Ketentuan ini mengatur penggunaan website <strong className={text}>kawanbaikbali.com</strong> yang dioperasikan oleh PT Kawan Baik Bali. Harap baca dengan seksama sebelum menggunakan layanan kami.
              </p>
            </motion.div>

            {/* Sections */}
            <div className="space-y-6">
              {sections.map((sec, i) => (
                <motion.div key={i} variants={fadeUp} className={`rounded-2xl border p-6 ${cardBg}`}>
                  <h2 className={`text-base font-bold ${text} mb-3`}>{sec.title}</h2>
                  <div className="space-y-2">
                    {sec.content.map((para, j) => (
                      <p key={j} className={`text-sm leading-relaxed ${muted}`}>
                        {para.split("**").map((part, k) =>
                          k % 2 === 1
                            ? <strong key={k} className={text}>{part}</strong>
                            : part
                        )}
                      </p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

          </motion.div>
        </div>
      </Section>
    </>
  );
}
