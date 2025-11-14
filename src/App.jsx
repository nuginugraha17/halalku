import React, { useState, useEffect, useRef } from "react";
// Impor ikon dari lucide-react. Saya telah memilih ikon yang relevan untuk layanan sertifikasi.
import {
  ShieldCheck, // Untuk Halal / Sertifikasi
  Award, // Untuk Sertifikasi / Kualitas
  Briefcase, // Untuk Layanan
  User, // Untuk Tentang Saya
  Mail, // Untuk Email
  Phone, // Untuk Telepon
  ArrowRight, // Untuk Tombol
  Store, // Untuk UMKM
  CheckCircle, // Untuk Manfaat
  ClipboardList, // Untuk Proses
  FileText, // Untuk Dokumen
  Rss, // BARU: Untuk Blog
  X, // BARU: Untuk tombol tutup
  Calendar, // BARU: Untuk tanggal
} from "lucide-react";
import profileImage from "./assets/Nugi.png";
import postData from "./posts.json";

/**
 * Data Konfigurasi Halaman P3H
 * Ganti nilai-nilai placeholder di bawah ini dengan informasi Anda.
 */
const p3hData = {
  user: {
    name: "Raden Miftakhurozak Budi Nugraha",
    title: "Pendamping Proses Produk Halal (P3H)",
    certification: "Tersertifikasi oleh LP3H UII",
    regNumber: "2508000230",
    bio: "Membantu pelaku usaha (khususnya UMKM) dalam proses pengajuan Sertifikasi Halal. Saya siap mendampingi Anda dari awal hingga sertifikat terbit.",
    email: "221002609@uii.ac.id",
    phone: "6281357478690",
    profileImage: profileImage,
  },
  services: [
    {
      title: "Konsultasi Awal",
      description:
        "Analisis kebutuhan dan pemeriksaan kelengkapan data usaha Anda.",
      icon: <ClipboardList size={32} />,
    },
    {
      title: "Pendaftaran & Input Data",
      description:
        "Membantu proses pendaftaran dan pengisian data di sistem SIHALAL.",
      icon: <FileText size={32} />,
    },
    {
      title: "Proses Verifikasi",
      description: "Pendampingan selama proses audit dan verifikasi oleh LPH.",
      icon: <ShieldCheck size={32} />,
    },
    {
      title: "Penerbitan Sertifikat",
      description:
        "Mengawal proses hingga Sertifikat Halal Anda diterbitkan oleh BPJPH.",
      icon: <Award size={32} />,
    },
  ],
  benefits: [
    {
      title: "Meningkatkan Kepercayaan",
      description:
        "Konsumen lebih yakin dengan produk yang sudah terjamin kehalalannya.",
      icon: <CheckCircle size={24} />,
    },
    {
      title: "Memperluas Pasar",
      description: "Membuka peluang ekspor dan masuk ke pasar retail modern.",
      icon: <Store size={24} />,
    },
    {
      title: "Memenuhi Regulasi",
      description:
        "Mematuhi kewajiban sertifikasi Halal dari pemerintah (BPJPH).",
      icon: <Briefcase size={24} />,
    },
  ],
};

// Komponen Helper untuk judul bagian
const Section = ({ title, icon, children, id, sectionRef }) => (
  <section ref={sectionRef} id={id} className="mb-16 md:mb-24 scroll-mt-20">
    <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3 justify-center">
      {icon}
      {title}
    </h2>
    {children}
  </section>
);

// Komponen Card untuk Manfaat
const BenefitCard = ({ benefit }) => (
  <div className="bg-slate-800 p-6 rounded-xl border border-slate-700/50 flex items-start gap-4">
    <div className="flex-shrink-0 text-emerald-400 mt-1">{benefit.icon}</div>
    <div>
      <h3 className="text-lg font-semibold text-white mb-1">{benefit.title}</h3>
      <p className="text-slate-400 text-sm">{benefit.description}</p>
    </div>
  </div>
);

// Komponen Card untuk Langkah Layanan
const ServiceStepCard = ({ service }) => (
  <div className="bg-slate-800 p-6 rounded-xl border border-slate-700/50 text-center">
    <div className="flex justify-center mb-4 text-emerald-400">
      {service.icon}
    </div>
    <h3 className="text-lg font-semibold text-white mb-2">{service.title}</h3>
    <p className="text-slate-400 text-sm">{service.description}</p>
  </div>
);

// --- KOMPONEN MODAL BARU ---
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div
        className="bg-slate-800 rounded-lg shadow-2xl max-w-2xl w-full p-6 md:p-8 relative max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()} // Mencegah modal tertutup saat klik di dalam konten
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors"
        >
          <X size={24} />
        </button>
        {children}
      </div>
    </div>
  );
};

// --- KOMPONEN KARTU BLOG BARU ---
const BlogPostCard = ({ post, onReadMore }) => (
  <div className="bg-slate-800 p-6 rounded-xl border border-slate-700/50 flex flex-col h-full">
    <h3 className="text-xl font-bold text-white mb-2">{post.title}</h3>
    <div className="flex items-center gap-2 text-sm text-slate-400 mb-4">
      <Calendar size={16} />
      <span>{post.date}</span>
    </div>
    <p className="text-slate-300 leading-relaxed mb-6 flex-grow">
      {`${post.content.substring(0, 100)}...`}
    </p>
    <button
      onClick={() => onReadMore(post)}
      className="mt-auto px-5 py-2 bg-emerald-600 text-white rounded-lg shadow-lg hover:bg-emerald-700 transition-colors font-medium flex items-center justify-center gap-2 self-start"
    >
      Baca Selengkapnya
    </button>
  </div>
);

// Komponen utama App
export default function App() {
  const { user, services, benefits } = p3hData;
  // const blogRef = (useRef < HTMLDivElement) | (null > null);
  // const layananRef = (useRef < HTMLDivElement) | (null > null);

  const whatsappUrl = `https://wa.me/${user.phone}?text=${encodeURIComponent(
    "Halo, saya ingin konsultasi tentang proses sertifikasi Halal Gratis."
  )}`;

  // --- STATE BARU UNTUK BLOG ---
  const [selectedPost, setSelectedPost] = useState(null);

  // --- MENGGUNAKAN DATA BLOG YANG DIIMPOR ---
  const [posts] = useState(() => {
    const monthMap = {
      Januari: 0,
      Februari: 1,
      Maret: 2,
      April: 3,
      Mei: 4,
      Juni: 5,
      Juli: 6,
      Agustus: 7,
      September: 8,
      Oktober: 9,
      November: 10,
      Desember: 11,
    };

    return postData.sort((a, b) => {
      const dateA = a.date.split(" ");
      const dateB = b.date.split(" ");

      const parsedDateA = new Date(dateA[2], monthMap[dateA[1]], dateA[0]);
      const parsedDateB = new Date(dateB[2], monthMap[dateB[1]], dateB[0]);

      return parsedDateB - parsedDateA;
    });
  });

  // Ref untuk section Blog supaya tombol bisa scroll ke sana
  const blogRef = useRef(null);
  const layananRef = useRef(null);

  // Fungsi scroll yang menghitung posisi dan menggunakan window.scrollTo
  const smoothScrollTo = (ref, offset = 80) => {
    if (!ref?.current) return;
    const top =
      ref.current.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
  };

  // Efek untuk mengunci scroll body saat modal terbuka
  useEffect(() => {
    if (selectedPost) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [selectedPost]);

  const handleReadMore = (post) => {
    setSelectedPost(post);
  };

  const handleCloseModal = () => {
    setSelectedPost(null);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 font-inter p-4 md:p-8 selection:bg-emerald-500 selection:text-white">
      <main className="max-w-6xl mx-auto">
        {/* --- Navbar --- */}
        <nav className="flex justify-between items-center py-4 mb-12 md:mb-20">
          <div className="flex items-center gap-2 text-xl font-bold text-white tracking-tight">
            <ShieldCheck className="text-emerald-400" />
            P3H Raden Miftakhurozak Budi Nugraha
          </div>
          <div className="flex items-center gap-6">
            <button
              type="button"
              onClick={() => smoothScrollTo(blogRef)}
              className="text-slate-300 hover:text-emerald-400 transition-colors text-sm font-medium"
            >
              Blog
            </button>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium bg-emerald-600 text-white rounded-lg shadow-lg hover:bg-emerald-700 transition-colors"
            >
              <Phone size={16} />
              Konsultasi Gratis
            </a>
          </div>
        </nav>

        {/* --- Hero Section --- */}
        <section id="hero" className="text-center mb-20 md:mb-32">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 leading-tight">
            Bantu Usaha Anda Tersertifikasi{" "}
            <span className="text-emerald-400">Halal</span>
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-3xl mx-auto">
            Jasa Pendampingan Proses Produk Halal (P3H)
          </p>
          <p className="text-lg text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Resmi, tepercaya, dan profesional. Saya siap mendampingi UMKM Anda
            mendapatkan Sertifikat Halal sesuai regulasi BPJPH.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 bg-emerald-600 text-white rounded-lg shadow-lg hover:bg-emerald-700 transition-colors font-medium flex items-center justify-center gap-2"
            >
              <Phone size={18} />
              Hubungi via WhatsApp
            </a>
            <button
              href="#layanan"
              className="px-6 py-3 bg-slate-700 text-slate-100 rounded-lg hover:bg-slate-600 transition-colors font-medium"
              onClick={() => smoothScrollTo(layananRef)}
            >
              Lihat Alur Layanan
            </button>
          </div>
        </section>

        {/* --- Benefits Section --- */}
        <Section
          title="Mengapa Sertifikasi Halal Penting?"
          icon={<CheckCircle size={28} />}
          id="manfaat"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <BenefitCard key={index} benefit={benefit} />
            ))}
          </div>
        </Section>

        {/* --- Services Section --- */}
        <Section
          title="Proses Pendampingan"
          icon={<Briefcase size={28} />}
          id="layanan"
          sectionRef={layananRef}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <ServiceStepCard key={index} service={service} />
            ))}
          </div>
        </Section>

        {/* --- About Section --- */}
        <Section
          title="Tentang Pendamping Anda"
          icon={<User size={28} />}
          id="tentang"
        >
          <div className="p-8 bg-slate-800 rounded-2xl border border-slate-700/50 flex flex-col md:flex-row items-center gap-8">
            <img
              src={user.profileImage}
              alt={user.name}
              className="w-48 h-48 rounded-full object-cover border-4 border-emerald-500 flex-shrink-0"
              onError={(e) => {
                e.target.src =
                  "https://placehold.co/400x400/1e293b/94a3b8?text=Foto+Anda";
              }}
            />
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-bold text-white">{user.name}</h3>
              <p className="text-lg font-medium text-emerald-400 mt-1">
                {user.title}
              </p>
              <div className="mt-2 text-sm text-slate-300">
                <span className="font-semibold">{user.certification}</span>
                <br />
                <span className="font-mono bg-slate-700 px-2 py-0.5 rounded text-emerald-300">
                  No. Registrasi: {user.regNumber}
                </span>
                <br />
                <span className="font-mono bg-slate-700 px-2 py-0.5 rounded text-emerald-300">
                  Email Resmi: {user.email}
                </span>
              </div>
              <p className="text-slate-300 leading-relaxed mt-4">{user.bio}</p>
            </div>
          </div>
        </Section>

        {/* --- BAGIAN BLOG YANG DIPERBARUI --- */}
        <Section
          title="Artikel Terbaru"
          icon={<Rss size={28} />}
          id="blog"
          sectionRef={blogRef}
        >
          <div className="relative horizontal-scroll-wrapper">
            <div className="flex gap-6 overflow-x-auto pb-4 -mb-4 horizontal-scroll-container">
              {posts.map((post) => (
                <div key={post.id} className="w-[300px] flex-shrink-0">
                  <BlogPostCard post={post} onReadMore={handleReadMore} />
                </div>
              ))}
            </div>
          </div>
        </Section>

        {/* --- Contact Section --- */}
        <Section
          title="Siap Memulai?"
          icon={<ShieldCheck size={28} />}
          id="kontak"
        >
          <div className="p-8 md:p-12 bg-slate-800 rounded-2xl border border-slate-700/50 text-center">
            <p className="text-slate-300 text-xl mb-8 max-w-2xl mx-auto font-light">
              Mulai konsultasi gratis hari ini. Tanyakan apapun seputar proses
              sertifikasi Halal untuk produk Anda.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6 items-center">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 px-6 py-3 text-lg font-medium bg-emerald-600 text-white rounded-lg shadow-lg hover:bg-emerald-700 transition-colors w-full sm:w-auto"
              >
                <Phone size={20} />
                WhatsApp Saya
              </a>
            </div>
          </div>
        </Section>

        {/* --- Footer --- */}
        <footer className="text-center text-slate-500 py-10 mt-16 border-t border-slate-800">
          <p>
            &copy; {new Date().getFullYear()} {user.name}. Semua Hak Dilindungi.
          </p>
          <p className="text-xs mt-1">
            Layanan Pendampingan Proses Produk Halal (P3H)
          </p>
        </footer>
      </main>

      {/* --- MODAL BLOG YANG DIPERBARUI --- */}
      <Modal isOpen={!!selectedPost} onClose={handleCloseModal}>
        {selectedPost && (
          <>
            <h2 className="text-3xl font-bold text-white mb-2">
              {selectedPost.title}
            </h2>
            <div className="flex items-center gap-2 text-sm text-slate-400 mb-6">
              <Calendar size={16} />
              <span>{selectedPost.date}</span>
            </div>
            <div className="space-y-4 text-slate-300 leading-relaxed">
              {/* Asumsi konten adalah string, pisahkan berdasarkan baris baru jika perlu */}
              {selectedPost.content.split("\n").map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>
          </>
        )}
      </Modal>
    </div>
  );
}
