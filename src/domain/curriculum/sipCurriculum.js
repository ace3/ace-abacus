const stage = (id, levels) => ({ id, levels });

const lesson = ({
  id,
  title,
  objectives,
  rules,
  generatorPreset,
  ankiPreset,
  timeAttackPreset
}) => ({
  id,
  title,
  objectives,
  rules,
  drillPlan: {
    generator: generatorPreset,
    anki: ankiPreset,
    timeAttack: timeAttackPreset
  }
});

export const sipCurriculumStages = [
  stage("junior", [
    {
      code: "J1",
      lessons: [
        lesson({
          id: "J1-L1",
          title: { id: "Pengenalan Angka 1 Digit", en: "1-Digit Number Sense" },
          objectives: [
            { id: "Mengenali nilai manik dasar 0-9.", en: "Recognize base bead values 0-9." },
            { id: "Menjumlah dan mengurang langsung tanpa simpan-pinjam.", en: "Perform direct add/subtract without carry-borrow." }
          ],
          rules: [
            { id: "Gunakan jari konsisten untuk aktivasi manik atas/bawah.", en: "Use consistent finger pattern for upper/lower bead moves." },
            { id: "Fokus ke ritme gerakan, bukan kecepatan.", en: "Prioritize movement rhythm over speed." }
          ],
          generatorPreset: { operationMode: "addition", digits: 1, rowsPerQuestion: 3, questionCount: 20, allowNegativeIntermediate: false, allowNegativeFinal: false },
          ankiPreset: { operationMode: "addition", digits: 1, rowsPerQuestion: 3, allowNegativeIntermediate: false, allowNegativeFinal: false },
          timeAttackPreset: { operationMode: "addition", digits: 1, rowsPerQuestion: 3, allowNegativeIntermediate: false, allowNegativeFinal: false, duration: 30 }
        })
      ]
    },
    {
      code: "J2",
      lessons: [
        lesson({
          id: "J2-L1",
          title: { id: "Komplemen +5 / -5", en: "+5 / -5 Complements" },
          objectives: [
            { id: "Menguasai pola tambah/kurang 5 pada 1 digit.", en: "Master +5/-5 patterns on 1-digit numbers." },
            { id: "Mulai transisi ke soal campuran sederhana.", en: "Transition into simple mixed problems." }
          ],
          rules: [
            { id: "Gunakan rumus sahabat lima sebelum operasi langsung.", en: "Apply five-complement before direct operations." },
            { id: "Hindari jeda panjang antar baris soal.", en: "Avoid long pauses between rows." }
          ],
          generatorPreset: { operationMode: "mixed", digits: 1, rowsPerQuestion: 4, questionCount: 25, allowNegativeIntermediate: false, allowNegativeFinal: false },
          ankiPreset: { operationMode: "mixed", digits: 1, rowsPerQuestion: 4, allowNegativeIntermediate: false, allowNegativeFinal: false },
          timeAttackPreset: { operationMode: "mixed", digits: 1, rowsPerQuestion: 4, allowNegativeIntermediate: false, allowNegativeFinal: false, duration: 30 }
        })
      ]
    },
    {
      code: "J3",
      lessons: [
        lesson({
          id: "J3-L1",
          title: { id: "Komplemen +10 / -10", en: "+10 / -10 Complements" },
          objectives: [
            { id: "Menggunakan sahabat sepuluh untuk operasi cepat.", en: "Use ten-complements for faster operations." },
            { id: "Membaca soal 2 digit tanpa kehilangan urutan.", en: "Read 2-digit rows without losing order." }
          ],
          rules: [
            { id: "Aktifkan pinjam/simpan di nilai tempat berikutnya.", en: "Carry/borrow on the next place value." },
            { id: "Jaga posisi abakus netral setelah tiap soal.", en: "Reset abacus to neutral after each question." }
          ],
          generatorPreset: { operationMode: "mixed", digits: 2, rowsPerQuestion: 4, questionCount: 25, allowNegativeIntermediate: false, allowNegativeFinal: false },
          ankiPreset: { operationMode: "mixed", digits: 2, rowsPerQuestion: 4, allowNegativeIntermediate: false, allowNegativeFinal: false },
          timeAttackPreset: { operationMode: "mixed", digits: 2, rowsPerQuestion: 4, allowNegativeIntermediate: false, allowNegativeFinal: false, duration: 60 }
        })
      ]
    },
    {
      code: "J4",
      lessons: [
        lesson({
          id: "J4-L1",
          title: { id: "Campuran 2 Digit Bertempo", en: "Timed 2-Digit Mixed" },
          objectives: [
            { id: "Menyelesaikan campuran 2 digit dengan akurasi stabil.", en: "Solve 2-digit mixed questions with stable accuracy." },
            { id: "Meningkatkan ketahanan fokus untuk sesi panjang.", en: "Build concentration for longer sessions." }
          ],
          rules: [
            { id: "Gunakan chunking 2 baris sekali lihat.", en: "Use 2-row chunking while reading." },
            { id: "Catat kesalahan pola berulang untuk review.", en: "Track recurring error patterns for review." }
          ],
          generatorPreset: { operationMode: "mixed", digits: 2, rowsPerQuestion: 5, questionCount: 30, allowNegativeIntermediate: false, allowNegativeFinal: false },
          ankiPreset: { operationMode: "mixed", digits: 2, rowsPerQuestion: 5, allowNegativeIntermediate: false, allowNegativeFinal: false },
          timeAttackPreset: { operationMode: "mixed", digits: 2, rowsPerQuestion: 5, allowNegativeIntermediate: false, allowNegativeFinal: false, duration: 60 }
        })
      ]
    }
  ]),
  stage("foundation", [
    {
      code: "F1",
      lessons: [
        lesson({
          id: "F1-L1",
          title: { id: "Penguatan 2 Digit", en: "2-Digit Reinforcement" },
          objectives: [
            { id: "Memperkuat tambah-kurang 2 digit dengan simpan-pinjam.", en: "Reinforce 2-digit add/sub with carry-borrow." },
            { id: "Menjaga akurasi di atas 90%.", en: "Keep accuracy above 90%." }
          ],
          rules: [
            { id: "Periksa nilai tempat sebelum pindah baris.", en: "Check place value before moving to next row." }
          ],
          generatorPreset: { operationMode: "mixed", digits: 2, rowsPerQuestion: 5, questionCount: 35, allowNegativeIntermediate: false, allowNegativeFinal: false },
          ankiPreset: { operationMode: "mixed", digits: 2, rowsPerQuestion: 5, allowNegativeIntermediate: false, allowNegativeFinal: false },
          timeAttackPreset: { operationMode: "mixed", digits: 2, rowsPerQuestion: 5, allowNegativeIntermediate: false, allowNegativeFinal: false, duration: 60 }
        })
      ]
    },
    {
      code: "F2",
      lessons: [
        lesson({
          id: "F2-L1",
          title: { id: "Campuran 3 Digit", en: "3-Digit Mixed" },
          objectives: [
            { id: "Mengerjakan campuran 2-3 digit secara konsisten.", en: "Solve 2-3 digit mixed operations consistently." },
            { id: "Mengurangi kesalahan pinjam lintas tempat.", en: "Reduce cross-place borrow mistakes." }
          ],
          rules: [
            { id: "Gunakan strategi kiri-ke-kanan per nilai tempat.", en: "Apply left-to-right place-value strategy." }
          ],
          generatorPreset: { operationMode: "mixed", digits: 3, rowsPerQuestion: 5, questionCount: 35, allowNegativeIntermediate: false, allowNegativeFinal: false },
          ankiPreset: { operationMode: "mixed", digits: 3, rowsPerQuestion: 5, allowNegativeIntermediate: false, allowNegativeFinal: false },
          timeAttackPreset: { operationMode: "mixed", digits: 3, rowsPerQuestion: 5, allowNegativeIntermediate: false, allowNegativeFinal: false, duration: 60 }
        })
      ]
    },
    {
      code: "F3",
      lessons: [
        lesson({
          id: "F3-L1",
          title: { id: "Pengenalan Perkalian", en: "Multiplication Introduction" },
          objectives: [
            { id: "Memahami perkalian sebagai penjumlahan berulang.", en: "Understand multiplication as repeated addition." },
            { id: "Meningkatkan kelancaran perkalian sederhana.", en: "Improve fluency in simple multiplication." }
          ],
          rules: [
            { id: "Latih kombinasi 2 digit dengan pola tetap.", en: "Practice fixed-pattern 2-digit combinations." }
          ],
          generatorPreset: { operationMode: "addition", digits: 3, rowsPerQuestion: 6, questionCount: 40, allowNegativeIntermediate: false, allowNegativeFinal: false },
          ankiPreset: { operationMode: "addition", digits: 3, rowsPerQuestion: 6, allowNegativeIntermediate: false, allowNegativeFinal: false },
          timeAttackPreset: { operationMode: "addition", digits: 3, rowsPerQuestion: 6, allowNegativeIntermediate: false, allowNegativeFinal: false, duration: 60 }
        })
      ]
    },
    {
      code: "F4",
      lessons: [
        lesson({
          id: "F4-L1",
          title: { id: "Pengenalan Pembagian", en: "Division Introduction" },
          objectives: [
            { id: "Memahami pembagian sebagai kebalikan perkalian.", en: "Understand division as inverse multiplication." },
            { id: "Menguatkan kombinasi campuran tingkat menengah.", en: "Strengthen medium mixed-operation combinations." }
          ],
          rules: [
            { id: "Validasi hasil lewat perkalian balik saat latihan.", en: "Validate answers with reverse multiplication." }
          ],
          generatorPreset: { operationMode: "mixed", digits: 3, rowsPerQuestion: 6, questionCount: 40, allowNegativeIntermediate: false, allowNegativeFinal: false },
          ankiPreset: { operationMode: "mixed", digits: 3, rowsPerQuestion: 6, allowNegativeIntermediate: false, allowNegativeFinal: false },
          timeAttackPreset: { operationMode: "mixed", digits: 3, rowsPerQuestion: 6, allowNegativeIntermediate: false, allowNegativeFinal: false, duration: 60 }
        })
      ]
    }
  ]),
  stage("advanced", [
    {
      code: "A1",
      lessons: [
        lesson({
          id: "A1-L1",
          title: { id: "Perkalian Menengah", en: "Intermediate Multiplication" },
          objectives: [
            { id: "Meningkatkan kecepatan perkalian multi-digit.", en: "Increase speed for multi-digit multiplication." },
            { id: "Meminimalkan kesalahan transisi nilai tempat.", en: "Minimize place-value transition errors." }
          ],
          rules: [
            { id: "Fokus ketelitian digit tengah untuk hasil akhir.", en: "Prioritize middle-digit precision." }
          ],
          generatorPreset: { operationMode: "addition", digits: 4, rowsPerQuestion: 6, questionCount: 45, allowNegativeIntermediate: false, allowNegativeFinal: false },
          ankiPreset: { operationMode: "addition", digits: 4, rowsPerQuestion: 6, allowNegativeIntermediate: false, allowNegativeFinal: false },
          timeAttackPreset: { operationMode: "addition", digits: 4, rowsPerQuestion: 6, allowNegativeIntermediate: false, allowNegativeFinal: false, duration: 60 }
        })
      ]
    },
    {
      code: "A2",
      lessons: [
        lesson({
          id: "A2-L1",
          title: { id: "Pembagian Menengah", en: "Intermediate Division" },
          objectives: [
            { id: "Menyelesaikan pembagian multi-digit lebih cepat.", en: "Solve multi-digit division faster." },
            { id: "Menjaga akurasi saat ritme meningkat.", en: "Maintain accuracy under faster rhythm." }
          ],
          rules: [
            { id: "Gunakan estimasi awal sebelum operasi detail.", en: "Estimate first before detailed operations." }
          ],
          generatorPreset: { operationMode: "mixed", digits: 4, rowsPerQuestion: 6, questionCount: 45, allowNegativeIntermediate: false, allowNegativeFinal: false },
          ankiPreset: { operationMode: "mixed", digits: 4, rowsPerQuestion: 6, allowNegativeIntermediate: false, allowNegativeFinal: false },
          timeAttackPreset: { operationMode: "mixed", digits: 4, rowsPerQuestion: 6, allowNegativeIntermediate: false, allowNegativeFinal: false, duration: 60 }
        })
      ]
    },
    {
      code: "A3",
      lessons: [
        lesson({
          id: "A3-L1",
          title: { id: "Operasi Desimal Dasar", en: "Decimal Operations Intro" },
          objectives: [
            { id: "Mengelola posisi titik desimal saat hitung campuran.", en: "Handle decimal placement in mixed operations." },
            { id: "Melatih ketepatan bacaan digit belakang koma.", en: "Improve precision for decimal digits." }
          ],
          rules: [
            { id: "Selalu sejajarkan posisi desimal sebelum proses.", en: "Always align decimal positions first." }
          ],
          generatorPreset: { operationMode: "mixed", digits: 4, rowsPerQuestion: 7, questionCount: 45, allowNegativeIntermediate: false, allowNegativeFinal: false },
          ankiPreset: { operationMode: "mixed", digits: 4, rowsPerQuestion: 7, allowNegativeIntermediate: false, allowNegativeFinal: false },
          timeAttackPreset: { operationMode: "mixed", digits: 4, rowsPerQuestion: 7, allowNegativeIntermediate: false, allowNegativeFinal: false, duration: 120 }
        })
      ]
    },
    {
      code: "A4",
      lessons: [
        lesson({
          id: "A4-L1",
          title: { id: "Desimal Campuran Bertempo", en: "Timed Decimal Mixed" },
          objectives: [
            { id: "Menyelesaikan set desimal campuran setara mock test.", en: "Complete decimal mixed sets at mock-test pace." },
            { id: "Menjaga fokus pada presisi dan kecepatan.", en: "Balance precision with speed." }
          ],
          rules: [
            { id: "Validasi digit akhir sebelum submit jawaban.", en: "Validate final digit before submitting." }
          ],
          generatorPreset: { operationMode: "mixed", digits: 5, rowsPerQuestion: 7, questionCount: 50, allowNegativeIntermediate: true, allowNegativeFinal: true },
          ankiPreset: { operationMode: "mixed", digits: 5, rowsPerQuestion: 7, allowNegativeIntermediate: true, allowNegativeFinal: true },
          timeAttackPreset: { operationMode: "mixed", digits: 5, rowsPerQuestion: 7, allowNegativeIntermediate: true, allowNegativeFinal: true, duration: 120 }
        })
      ]
    }
  ]),
  stage("grandMaster", [
    {
      code: "G1",
      lessons: [
        lesson({
          id: "G1-L1",
          title: { id: "Kombinasi Tingkat Lanjut", en: "Advanced Mixed Combinations" },
          objectives: [
            { id: "Menjalankan kombinasi panjang dengan kesalahan minimal.", en: "Run long combinations with minimal errors." },
            { id: "Meningkatkan kontrol mental visualisasi abakus.", en: "Strengthen mental abacus visualization control." }
          ],
          rules: [
            { id: "Gunakan checkpoint internal setiap 2 baris.", en: "Use internal checkpoints every 2 rows." }
          ],
          generatorPreset: { operationMode: "mixed", digits: 5, rowsPerQuestion: 8, questionCount: 50, allowNegativeIntermediate: true, allowNegativeFinal: true },
          ankiPreset: { operationMode: "mixed", digits: 5, rowsPerQuestion: 8, allowNegativeIntermediate: true, allowNegativeFinal: true },
          timeAttackPreset: { operationMode: "mixed", digits: 5, rowsPerQuestion: 8, allowNegativeIntermediate: true, allowNegativeFinal: true, duration: 120 }
        })
      ]
    },
    {
      code: "G2",
      lessons: [
        lesson({
          id: "G2-L1",
          title: { id: "Akar Kuadrat/Kubik Dasar", en: "Square/Cube Root Intro" },
          objectives: [
            { id: "Mengenal pola akar dasar untuk hitung mental.", en: "Recognize root patterns for mental calculation." },
            { id: "Menyusun strategi penyelesaian bertahap.", en: "Build stepwise solution strategies." }
          ],
          rules: [
            { id: "Mulai dari estimasi rentang hasil akar terlebih dahulu.", en: "Start with root range estimation first." }
          ],
          generatorPreset: { operationMode: "addition", digits: 5, rowsPerQuestion: 8, questionCount: 50, allowNegativeIntermediate: false, allowNegativeFinal: false },
          ankiPreset: { operationMode: "addition", digits: 5, rowsPerQuestion: 8, allowNegativeIntermediate: false, allowNegativeFinal: false },
          timeAttackPreset: { operationMode: "addition", digits: 5, rowsPerQuestion: 8, allowNegativeIntermediate: false, allowNegativeFinal: false, duration: 120 }
        })
      ]
    },
    {
      code: "G3",
      lessons: [
        lesson({
          id: "G3-L1",
          title: { id: "Mock Test Grand Master", en: "Grand Master Mock Test" },
          objectives: [
            { id: "Menyimulasikan performa ujian penuh.", en: "Simulate full exam performance." },
            { id: "Mencapai keseimbangan akurasi dan kecepatan tinggi.", en: "Reach high speed-accuracy balance." }
          ],
          rules: [
            { id: "Jaga disiplin tempo per soal sesuai target.", en: "Maintain strict target pace per question." }
          ],
          generatorPreset: { operationMode: "mixed", digits: 5, rowsPerQuestion: 10, questionCount: 60, allowNegativeIntermediate: true, allowNegativeFinal: true },
          ankiPreset: { operationMode: "mixed", digits: 5, rowsPerQuestion: 10, allowNegativeIntermediate: true, allowNegativeFinal: true },
          timeAttackPreset: { operationMode: "mixed", digits: 5, rowsPerQuestion: 10, allowNegativeIntermediate: true, allowNegativeFinal: true, duration: 120 }
        })
      ]
    }
  ])
];

export const getLessonById = (lessonId) => {
  for (const currentStage of sipCurriculumStages) {
    for (const level of currentStage.levels) {
      for (const currentLesson of level.lessons) {
        if (currentLesson.id === lessonId) {
          return { stageId: currentStage.id, levelCode: level.code, lesson: currentLesson };
        }
      }
    }
  }

  return null;
};
