const id = {
  app: {
    brand: "Abakus Ceria",
    primaryNav: "Navigasi utama",
    bottomNav: "Navigasi bawah"
  },
  nav: {
    home: "Beranda",
    curriculum: "Kurikulum",
    generator: "Generator",
    anki: "Latihan Kartu",
    timeAttack: "Kejar Waktu"
  },
  language: {
    label: "Bahasa",
    id: "Indonesia",
    en: "English"
  },
  theme: {
    label: "Tema",
    neutral: "Netral",
    brightA: "Cerah A",
    brightB: "Cerah B"
  },
  common: {
    mode: {
      addition: "Penjumlahan",
      subtraction: "Pengurangan",
      mixed: "Campuran",
      multiplication: "Perkalian",
      division: "Pembagian"
    },
    yes: "Ya",
    no: "Tidak",
    loading: "Memuat..."
  },
  home: {
    eyebrow: "Belajar Matematika Seru",
    title: "Studio Kurikulum & Latihan Abakus",
    description: "Belajar bertahap sesuai level, cetak lembar kerja, dan latihan cepat dalam satu tempat.",
    startPractice: "Mulai Latihan",
    goGenerator: "Buka Generator",
    capabilitiesLabel: "Fitur website",
    benefitsTitle: "Yang bisa dilakukan website ini",
    benefits: [
      "Belajar semua tahap kurikulum abakus secara terstruktur.",
      "Membuat worksheet deterministik dengan dukungan seed.",
      "Latihan kartu angka dengan numpad ramah ponsel.",
      "Melatih kecepatan dengan mode hitung mundur."
    ],
    features: {
      curriculum: {
        title: "Peta Kurikulum",
        description: "Pelajari seluruh tahap Junior sampai Grand Master dengan target belajar yang jelas.",
        cta: "Buka Kurikulum"
      },
      generator: {
        title: "Generator Worksheet",
        description: "Buat worksheet abakus siap cetak dalam hitungan detik.",
        cta: "Buka Generator"
      },
      anki: {
        title: "Latihan Kartu",
        description: "Latihan soal satu per satu dengan umpan balik langsung.",
        cta: "Mulai Latihan"
      },
      timeAttack: {
        title: "Kejar Waktu",
        description: "Tingkatkan akurasi dan kecepatan dengan sesi bertimer.",
        cta: "Mulai Kejar Waktu"
      }
    }
  },
  generatorPage: {
    title: "Generator Worksheet",
    description: "Atur parameter dan cetak worksheet abakus sesuai kebutuhan belajar.",
    prefillLoaded: "Preset kurikulum dimuat: {{lesson}}",
    prefillInvalid: "Sebagian preset tidak valid dan diabaikan."
  },
  worksheet: {
    settingsTitle: "Pengaturan Worksheet",
    operation: "Operasi",
    questions: "Jumlah Soal",
    rowsPerQuestion: "Baris per Soal",
    maxDigits: "Maksimal Digit per Baris",
    paperSize: "Ukuran Kertas",
    seed: "Seed (Opsional)",
    seedPlaceholder: "Seed sama = worksheet sama",
    allowNegativeIntermediate: "Izinkan total sementara negatif",
    allowNegativeFinal: "Izinkan jawaban akhir negatif",
    includeAnswerKey: "Sertakan halaman kunci jawaban",
    generate: "Buat Worksheet",
    printWorksheet: "Cetak Worksheet",
    printAnswerKey: "Cetak Kunci Jawaban",
    previewTitle: "Worksheet Abakus",
    generatedAt: "Dibuat",
    name: "Nama",
    date: "Tanggal",
    class: "Kelas",
    modeLabel: "Mode",
    questionLabel: "Soal",
    rowsLabel: "Baris",
    digitsLabel: "Digit",
    answerKeyTitle: "Kunci Jawaban",
    generationNotes: "Catatan Generasi",
    printBeforeGenerate: "Buat worksheet dulu sebelum mencetak.",
    answerKeyPrereq: "Aktifkan dan buat kunci jawaban dulu sebelum mencetak.",
    fallbackWarning: "Soal {{index}}: menggunakan generator fallback deterministik."
  },
  practice: {
    settingsTitle: "Pengaturan Latihan",
    reset: "Atur Ulang",
    digits: "Digit",
    rowsPerQuestion: "Baris per Soal",
    allowNegativeIntermediate: "Izinkan total sementara negatif",
    allowNegativeFinal: "Izinkan jawaban akhir negatif",
    answerLabel: "Jawaban kamu",
    clear: "Hapus",
    check: "Periksa",
    next: "Lanjut",
    submit: "Kirim",
    questionRows: "Baris soal",
    numpadLabel: "Numpad",
    prefillLoaded: "Preset kurikulum dimuat: {{lesson}}",
    prefillInvalid: "Sebagian preset tidak valid dan diabaikan."
  },
  anki: {
    title: "Latihan Kartu",
    description: "Cek jawabanmu, lihat umpan balik, lalu lanjut ke kartu berikutnya.",
    correct: "Benar",
    attempted: "Dijawab",
    accuracy: "Akurasi",
    enterValidInteger: "Masukkan jawaban bilangan bulat yang valid.",
    correctShort: "Benar.",
    incorrectWithAnswer: "Salah. Jawaban benar: {{answer}}"
  },
  timeAttack: {
    title: "Kejar Waktu",
    description: "Pilih durasi lalu jawab sebanyak mungkin sebelum waktu habis.",
    duration: "Durasi",
    timeLeft: "Sisa Waktu",
    start: "Mulai",
    tryAgain: "Coba Lagi",
    ready: "Siap memulai sesi latihan bertimer.",
    sessionComplete: "Sesi selesai. Skor: {{correct}} benar, akurasi {{accuracy}}%."
  },
  audio: {
    title: "Audio Latihan",
    enableBgm: "Aktifkan BGM",
    masterVolume: "Volume ambient",
    countdownVolume: "Volume countdown",
    defaultOffNote: "Audio nonaktif secara default dan hanya berjalan setelah interaksi kamu.",
    playbackError: "Audio tidak bisa diputar di perangkat ini. Kamu tetap bisa lanjut tanpa suara."
  },
  motivation: {
    title: "Motivasi Latihan",
    saveSession: "Simpan Sesi",
    sessionSaved: "Sesi tersimpan. Progress diperbarui.",
    currentStreak: "Streak saat ini",
    bestStreak: "Streak terbaik",
    totalSessions: "Total sesi",
    overallAccuracy: "Akurasi keseluruhan",
    dailyTarget: "Target hari ini: {{attempted}} / {{target}} percobaan",
    dailyTargetAria: "Progres target harian {{percent}} persen",
    badges: {
      firstSession: {
        title: "Langkah Awal",
        description: "Selesaikan minimal satu sesi tersimpan."
      },
      hotStreak: {
        title: "Streak Panas",
        description: "Pertahankan streak latihan 3 hari."
      },
      accuracyAce: {
        title: "Akurasi Jagoan",
        description: "Capai minimal 80% akurasi pada sesi tersimpan."
      },
      speedRunner: {
        title: "Pelari Cepat",
        description: "Raih 10+ jawaban benar di Kejar Waktu."
      }
    }
  },
  pwa: {
    installTitle: "Pasang Aplikasi",
    installDescription: "Tambahkan aplikasi ini ke layar utama agar terasa seperti aplikasi penuh dan halaman penting tetap tersedia saat offline.",
    installNow: "Pasang sekarang",
    dismiss: "Nanti saja",
    iosSteps: {
      share: "Ketuk tombol Bagikan di Safari.",
      addToHome: "Pilih Tambah ke Layar Utama.",
      openAsWebApp: "Konfirmasi lalu buka sebagai web app dari layar utama."
    }
  },
  curriculum: {
    title: "Kurikulum Abakus",
    description: "Belajar dari dasar hingga mahir lewat tahap Junior, Foundation, Advanced, dan Grand Master.",
    stageLabel: "Tahap",
    levelLabel: "Level",
    objectives: "Target Belajar",
    rules: "Aturan Inti",
    drillPlan: "Rencana Latihan",
    openGenerator: "Buka di Generator",
    openAnki: "Buka di Latihan Kartu",
    openTimeAttack: "Buka di Kejar Waktu",
    stage: {
      junior: "Junior",
      foundation: "Foundation",
      advanced: "Advanced",
      grandMaster: "Grand Master"
    }
  }
};

export default id;
