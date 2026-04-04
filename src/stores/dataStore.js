import { reactive } from 'vue';

export const CURRENT_USER = reactive({
  name: "Budi Santoso",
  role: "Konsumen",
  ipk: "3.75",
  major: "Manajemen Bisnis",
  email: "budi.santoso@mhs.unimed.ac.id",
  phone: "0812-3456-7890",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Budi&backgroundColor=00A651",
  joined: "Agustus 2024"
});

// Data Dummy Tutor yang sudah diperbanyak
export const MOCK_TUTORS = reactive([
  {
    id: 1,
    name: "Siti Khofifah Hanif",
    major: "Ilmu Ekonomi",
    ipk: 3.90,
    rate: 50000,
    rating: 4.9,
    reviews: 120,
    distance: 1.2,
    location: "Medan Estate (Dekat Kampus)",
    learningMode: ["Online", "Offline"],
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Siti&backgroundColor=00A651",
    desc: "Mahasiswa berprestasi dengan pengalaman mengajar akuntansi dasar hingga menengah. Telah tersertifikasi oleh BNSP.",
    skills: [
      { name: "Akuntansi", type: "Hard Skill", level: "Intermediate", certified: true },
      { name: "Ekonomi Mikro", type: "Hard Skill", level: "Beginner", certified: false },
      { name: "Public Speaking", type: "Soft Skill", level: "Advanced", certified: false }
    ],
    reviewsList: [{ user: "Andi R.", rating: 5, comment: "Sangat sabar mengajar akuntansi dari nol!" }],
    availableSchedules: ["Senin, 14:00", "Rabu, 10:00"]
  },
  {
    id: 2,
    name: "Andrian",
    major: "Bisnis Digital",
    ipk: 3.85,
    rate: 45000,
    rating: 4.8,
    reviews: 85,
    distance: 3.5,
    location: "Medan Tembung",
    learningMode: ["Online"],
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Andrian&backgroundColor=FDB913",
    desc: "Praktisi bisnis digital yang aktif mengelola kampanye nyata.",
    skills: [
      { name: "Digital Marketing", type: "Hard Skill", level: "Advanced", certified: true },
      { name: "Copywriting", type: "Hard Skill", level: "Beginner", certified: false }
    ],
    reviewsList: [{ user: "Dinda K.", rating: 4, comment: "Insight full banget buat nambah skill sosmed." }],
    availableSchedules: ["Selasa, 19:00", "Sabtu, 13:00"]
  },
  {
    id: 3,
    name: "Riyan Dinata",
    major: "Pendidikan TIK",
    ipk: 3.95,
    rate: 60000,
    rating: 5.0,
    reviews: 200,
    distance: 0.8,
    location: "Kost Sekitar UNIMED",
    learningMode: ["Online", "Offline"],
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Riyan&backgroundColor=00539C",
    desc: "Fokus pada pengembangan Web (Frontend) dengan pendekatan praktikal project-based.",
    skills: [
      { name: "VueJS & React", type: "Hard Skill", level: "Advanced", certified: true },
      { name: "UI/UX Design", type: "Hard Skill", level: "Intermediate", certified: true }
    ],
    reviewsList: [{ user: "Fajar H.", rating: 5, comment: "Tutor coding terbaik di UNIMED!" }],
    availableSchedules: ["Kamis, 15:00", "Minggu, 10:00"]
  },
  {
    id: 4,
    name: "Laurent Damai S.",
    major: "Statistika Terapan",
    ipk: 3.88,
    rate: 55000,
    rating: 4.7,
    reviews: 45,
    distance: 5.2,
    location: "Medan Petisah",
    learningMode: ["Online"],
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Laurent&backgroundColor=e2e8f0",
    desc: "Data Analis muda yang siap membantu Anda membedah data skripsi atau tugas akhir menggunakan SPSS dan Python.",
    skills: [
      { name: "Data Analysis", type: "Hard Skill", level: "Advanced", certified: true },
      { name: "SPSS", type: "Hard Skill", level: "Intermediate", certified: true }
    ],
    reviewsList: [{ user: "Bimo", rating: 5, comment: "Sangat membantu revisi bab 4 saya." }],
    availableSchedules: ["Senin, 09:00", "Jumat, 14:00"]
  },
  {
    id: 5,
    name: "Muammar El Zaidan",
    major: "Ilmu Ekonomi",
    ipk: 3.92,
    rate: 48000,
    rating: 4.9,
    reviews: 110,
    distance: 2.1,
    location: "Medan Perjuangan",
    learningMode: ["Online", "Offline"],
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Muammar&backgroundColor=00A651",
    desc: "Riset dan penulisan karya ilmiah. Siap membimbing PKM dan KTI mahasiswa.",
    skills: [
      { name: "Academic Writing", type: "Hard Skill", level: "Advanced", certified: true },
      { name: "Metodologi Riset", type: "Hard Skill", level: "Intermediate", certified: true }
    ],
    reviewsList: [{ user: "Sari", rating: 5, comment: "Bimbingan PKM nya juara!" }],
    availableSchedules: ["Selasa, 10:00", "Rabu, 15:00"]
  },
  {
    id: 6,
    name: "Dwi Cahyani",
    major: "Pendidikan Bahasa Inggris",
    ipk: 3.80,
    rate: 40000,
    rating: 4.6,
    reviews: 65,
    distance: 4.0,
    location: "Medan Timur",
    learningMode: ["Online"],
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Dwi&backgroundColor=FDB913",
    desc: "Tutor Bahasa Inggris interaktif untuk persiapan TOEFL dan percakapan sehari-hari.",
    skills: [
      { name: "TOEFL Preparation", type: "Hard Skill", level: "Advanced", certified: true },
      { name: "Public Speaking", type: "Soft Skill", level: "Advanced", certified: false }
    ],
    reviewsList: [{ user: "Kevin", rating: 4, comment: "Speaking saya jauh lebih pede sekarang." }],
    availableSchedules: ["Jumat, 16:00", "Sabtu, 09:00"]
  }
]);

export const TEAM_MEMBERS = [
  { name: "Siti Khofifah Hanif", role: "Ketua Tim / Ilmu Ekonomi" },
  { name: "Andrian", role: "Pengembang App / Bisnis Digital" },
  { name: "Laurent Damai S.", role: "Data Analis / Ilmu Ekonomi" },
  { name: "Muammar El Zaidan", role: "Riset / Ilmu Ekonomi" },
  { name: "Riyan Dinata", role: "Pengembang Web / Pendidikan TIK" }
];