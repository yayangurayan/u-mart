import { reactive } from 'vue';

// Menggunakan reactive agar rating/ulasan baru langsung ter-update di UI
export const CURRENT_USER = reactive({
  name: "Budi Santoso",
  role: "Konsumen",
  ipk: "3.75",
  major: "Manajemen Bisnis",
  email: "budi.santoso@mhs.unimed.ac.id",
  phone: "0812-3456-7890",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Budi&backgroundColor=e2e8f0",
  joined: "Agustus 2024"
});

export const MOCK_TUTORS = reactive([
  {
    id: 1,
    name: "Siti Khofifah Hanif",
    major: "Ilmu Ekonomi",
    ipk: 3.90,
    rate: 50000,
    rating: 4.9,
    reviews: 120,
    distance: 1.2, // Jarak dummy dalam km
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Siti&backgroundColor=00A651",
    desc: "Mahasiswa berprestasi dengan pengalaman mengajar akuntansi dasar hingga menengah. Telah tersertifikasi oleh BNSP.",
    skills: [
      { name: "Akuntansi", type: "Hard Skill", level: "Intermediate", certified: true },
      { name: "Ekonomi Mikro", type: "Hard Skill", level: "Beginner", certified: false },
      { name: "Public Speaking", type: "Soft Skill", level: "Advanced", certified: false }
    ],
    reviewsList: [
      { user: "Andi R.", rating: 5, comment: "Sangat sabar mengajar akuntansi dari nol!" }
    ],
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
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Andrian&backgroundColor=FDB913",
    desc: "Praktisi bisnis digital yang aktif mengelola kampanye nyata.",
    skills: [
      { name: "Digital Marketing", type: "Hard Skill", level: "Advanced", certified: true },
      { name: "Copywriting", type: "Hard Skill", level: "Beginner", certified: false }
    ],
    reviewsList: [
      { user: "Dinda K.", rating: 4, comment: "Insight full banget buat nambah skill sosmed." }
    ],
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
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Riyan&backgroundColor=00539C",
    desc: "Fokus pada pengembangan Web (Frontend) dengan pendekatan praktikal project-based.",
    skills: [
      { name: "VueJS & React", type: "Hard Skill", level: "Advanced", certified: true },
      { name: "UI/UX Design", type: "Hard Skill", level: "Intermediate", certified: true }
    ],
    reviewsList: [
      { user: "Fajar H.", rating: 5, comment: "Tutor coding terbaik di UNIMED!" }
    ],
    availableSchedules: ["Kamis, 15:00", "Minggu, 10:00"]
  }
]);

export const TEAM_MEMBERS = [
  { name: "Siti Khofifah Hanif", role: "Ketua Tim / Ilmu Ekonomi" },
  { name: "Andrian", role: "Pengembang App / Bisnis Digital" },
  { name: "Laurent Damai S.", role: "Data Analis / Ilmu Ekonomi" },
  { name: "Muammar El Zaidan", role: "Riset / Ilmu Ekonomi" },
  { name: "Riyan Dinata", role: "Pengembang Web / Pendidikan TIK" }
];