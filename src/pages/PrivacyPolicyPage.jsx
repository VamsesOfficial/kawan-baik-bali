import { motion } from "framer-motion";
import { fadeUp, stagger } from "../animations";
import { Section, SEOHead } from "../components/ui";

const sections = [
  {
    title: "1. Informasi yang Kami Kumpulkan",
    content: [
      "Saat Anda menggunakan website PT Kawan Baik Bali, kami dapat mengumpulkan informasi berikut:",
      "• **Informasi Kontak** — nama, alamat email, nomor telepon, dan nama perusahaan yang Anda berikan melalui formulir kontak atau permintaan penawaran.",
      "• **Informasi Teknis** — alamat IP, jenis browser, halaman yang dikunjungi, dan durasi kunjungan, dikumpulkan secara otomatis melalui cookies dan teknologi serupa.",
      "• **Informasi Komunikasi** — pesan, pertanyaan, atau permintaan yang Anda kirimkan kepada kami.",
    ],
  },
  {
    title: "2. Bagaimana Kami Menggunakan Informasi Anda",
    content: [
      "Informasi yang kami kumpulkan digunakan untuk:",
      "• Merespons pertanyaan dan permintaan penawaran produk hotel amenities.",
      "• Mengirimkan informasi produk, katalog, atau update yang Anda minta.",
      "• Meningkatkan kualitas layanan dan pengalaman pengguna di website kami.",
      "• Memenuhi kewajiban hukum dan regulasi yang berlaku di Indonesia.",
      "• Menghubungi Anda untuk keperluan bisnis yang relevan dengan kebutuhan hotel atau resort Anda.",
    ],
  },
  {
    title: "3. Keamanan Data",
    content: [
      "PT Kawan Baik Bali berkomitmen untuk melindungi informasi pribadi Anda. Kami menerapkan langkah-langkah keamanan teknis dan organisasi yang wajar untuk mencegah akses tidak sah, pengungkapan, perubahan, atau penghancuran data Anda.",
      "Meskipun kami berupaya sepenuhnya melindungi data Anda, tidak ada sistem keamanan yang sepenuhnya sempurna. Kami menyarankan Anda untuk tidak mengirimkan informasi yang sangat sensitif melalui formulir web.",
    ],
  },
  {
    title: "4. Berbagi Informasi dengan Pihak Ketiga",
    content: [
      "Kami tidak menjual, memperdagangkan, atau menyewakan informasi pribadi Anda kepada pihak ketiga. Informasi Anda hanya dapat dibagikan dalam kondisi berikut:",
      "• Kepada mitra bisnis terpercaya yang membantu kami dalam operasional (misalnya layanan email atau hosting) dengan kewajiban kerahasiaan.",
      "• Jika diwajibkan oleh hukum atau perintah pengadilan yang berlaku di Indonesia.",
      "• Dengan persetujuan eksplisit dari Anda.",
    ],
  },
  {
    title: "5. Cookies",
    content: [
      "Website kami menggunakan cookies untuk meningkatkan pengalaman pengguna. Cookies adalah file kecil yang disimpan di perangkat Anda yang membantu kami mengingat preferensi Anda dan menganalisis cara Anda menggunakan website.",
      "Anda dapat menonaktifkan cookies melalui pengaturan browser Anda. Namun, menonaktifkan cookies mungkin mempengaruhi fungsionalitas beberapa bagian website kami.",
    ],
  },
  {
    title: "6. Hak Anda",
    content: [
      "Sesuai dengan regulasi perlindungan data yang berlaku, Anda memiliki hak untuk:",
      "• Mengakses informasi pribadi yang kami miliki tentang Anda.",
      "• Meminta koreksi data yang tidak akurat.",
      "• Meminta penghapusan data Anda dari sistem kami.",
      "• Menarik persetujuan Anda untuk pemrosesan data kapan saja.",
      "Untuk menggunakan hak-hak tersebut, silakan hubungi kami melalui email kawanbaik.bali@gmail.com.",
    ],
  },
  {
    title: "7. Perubahan Kebijakan",
    content: [
      "PT Kawan Baik Bali berhak memperbarui Kebijakan Privasi ini sewaktu-waktu. Perubahan akan dipublikasikan di halaman ini dengan tanggal pembaruan terbaru. Kami menyarankan Anda untuk meninjau halaman ini secara berkala.",
    ],
  },
  {
    title: "8. Hubungi Kami",
    content: [
      "Jika Anda memiliki pertanyaan atau kekhawatiran tentang Kebijakan Privasi ini, silakan hubungi kami:",
      "• Email: kawanbaik.bali@gmail.com",
      "• Telepon: +62 8810-3736-6555",
      "• Alamat: Blok A3 No.31, Kerobokan Kaja, Kuta Utara, Kabupaten Badung, Bali 80361",
    ],
  },
];

export default function PrivacyPolicyPage({ dark }) {
  const text = dark ? "text-white" : "text-[#1a3a5c]";
  const muted = dark ? "text-white/50" : "text-slate-500";
  const cardBg = dark ? "bg-white/5 border-white/10" : "bg-white border-slate-100";

  return (
    <>
      <SEOHead
        title="Privacy Policy | PT Kawan Baik Bali"
        description="Kebijakan Privasi PT Kawan Baik Bali — bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi pribadi Anda."
        canonical="https://www.kawanbaikbali.com/privacy-policy"
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
              <h1 className={`text-4xl sm:text-5xl font-black ${text} mb-4`}>Privacy Policy</h1>
              <p className={`${muted} text-sm`}>Terakhir diperbarui: Mei 2026</p>
            </motion.div>

            {/* Intro */}
            <motion.div variants={fadeUp} className={`rounded-2xl border p-6 mb-8 ${cardBg}`}>
              <p className={`${muted} text-sm leading-relaxed`}>
                PT Kawan Baik Bali ("kami", "perusahaan") berkomitmen untuk melindungi privasi Anda. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi pribadi Anda saat mengunjungi website <strong className={text}>kawanbaikbali.com</strong>.
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
