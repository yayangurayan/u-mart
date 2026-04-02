// Data statis untuk simulasi backend
export const CURRENT_USER = {
  name: "Budi Santoso",
  role: "Konsumen",
  ipk: "3.75",
  major: "Manajemen Bisnis",
  email: "budi.santoso@mhs.unimed.ac.id",
  phone: "0812-3456-7890",
  avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Budi&backgroundColor=e2e8f0"
};

export const MOCK_TUTORS = [
  {
    id: 1,
    name: "Siti Khofifah Hanif",
    major: "Ilmu Ekonomi",
    ipk: 3.90,
    rate: 50000,
    rating: 4.9,
    reviews: 120,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Siti&backgroundColor=008542",
    desc: "Mahasiswa berprestasi dengan pengalaman mengajar akuntansi dasar hingga menengah. Telah tersertifikasi oleh BNSP.",
    skills: [
      { name: "Akuntansi", type: "Hard Skill", level: "Intermediate", certified: true },
      { name: "Ekonomi Mikro", type: "Hard Skill", level: "Beginner", certified: false },
      { name: "Public Speaking", type: "Soft Skill", level: "Advanced", certified: false }
    ]
  },
  {
    id: 2,
    name: "Andrian",
    major: "Bisnis Digital",
    ipk: 3.85,
    rate: 45000,
    rating: 4.8,
    reviews: 85,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Andrian&backgroundColor=FDB913",
    desc: "Praktisi bisnis digital yang aktif mengelola kampanye. Membantu Anda memahami algoritma media sosial dan pemasaran modern.",
    skills: [
      { name: "Digital Marketing", type: "Hard Skill", level: "Advanced", certified: true },
      { name: "Copywriting", type: "Hard Skill", level: "Beginner", certified: false }
    ]
  },
  {
    id: 3,
    name: "Riyan Dinata",
    major: "Pendidikan TIK",
    ipk: 3.95,
    rate: 60000,
    rating: 5.0,
    reviews: 200,
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Riyan&backgroundColor=00539C",
    desc: "Asisten laboratorium komputer dengan passion mengajar bahasa pemrograman dari dasar hingga mahir dengan pendekatan praktikal.",
    skills: [
      { name: "VueJS & React", type: "Hard Skill", level: "Advanced", certified: true },
      { name: "Problem Solving", type: "Soft Skill", level: "Advanced", certified: false }
    ]
  }
];

export const TEAM_MEMBERS = [
  { name: "Siti Khofifah Hanif", role: "Ketua Tim / Ilmu Ekonomi" },
  { name: "Andrian", role: "Pengembang App / Bisnis Digital" },
  { name: "Laurent Damai S.", role: "Data Analis / Ilmu Ekonomi" },
  { name: "Muammar El Zaidan", role: "Riset / Ilmu Ekonomi" },
  { name: "Riyan Dinata", role: "Pengembang Web / Pendidikan TIK" }
];