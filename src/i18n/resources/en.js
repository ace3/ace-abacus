const en = {
  app: {
    brand: "Abacus Joy",
    primaryNav: "Primary navigation",
    bottomNav: "Bottom navigation"
  },
  nav: {
    home: "Home",
    curriculum: "Curriculum",
    generator: "Generator",
    anki: "Anki",
    timeAttack: "Time Attack"
  },
  language: {
    label: "Language",
    id: "Indonesia",
    en: "English"
  },
  theme: {
    label: "Theme",
    neutral: "Neutral",
    brightA: "Bright A",
    brightB: "Bright B"
  },
  common: {
    mode: {
      addition: "Addition",
      subtraction: "Subtraction",
      mixed: "Mixed"
    },
    yes: "Yes",
    no: "No",
    loading: "Loading..."
  },
  home: {
    eyebrow: "Fun Math Learning",
    title: "Abacus Curriculum & Practice Studio",
    description: "Learn stage by stage, print worksheets, and train speed in one place.",
    startPractice: "Start Practice",
    goGenerator: "Open Generator",
    capabilitiesLabel: "Website features",
    benefitsTitle: "What this website can do",
    benefits: [
      "Learn all abacus stages in a structured curriculum flow.",
      "Generate deterministic worksheets with seed support.",
      "Practice card-by-card arithmetic with mobile-friendly numpad.",
      "Improve speed and accuracy with countdown sessions."
    ],
    features: {
      curriculum: {
        title: "Curriculum Map",
        description: "Study all stages from Junior to Grand Master with clear goals.",
        cta: "Open Curriculum"
      },
      generator: {
        title: "Worksheet Generator",
        description: "Create print-ready abacus worksheets in seconds.",
        cta: "Open Generator"
      },
      anki: {
        title: "Card Practice",
        description: "Train one question at a time with instant feedback.",
        cta: "Start Practice"
      },
      timeAttack: {
        title: "Time Attack",
        description: "Boost speed and accuracy with timer-based sessions.",
        cta: "Start Time Attack"
      }
    }
  },
  generatorPage: {
    title: "Worksheet Generator",
    description: "Configure parameters and print abacus worksheets for your lessons.",
    prefillLoaded: "Curriculum preset loaded: {{lesson}}",
    prefillInvalid: "Some preset values were invalid and ignored."
  },
  worksheet: {
    settingsTitle: "Worksheet Settings",
    operation: "Operation",
    questions: "Questions",
    rowsPerQuestion: "Rows per Question",
    maxDigits: "Max Digits per Row",
    paperSize: "Paper Size",
    seed: "Seed (Optional)",
    seedPlaceholder: "Same seed = same worksheet",
    allowNegativeIntermediate: "Allow negative intermediate totals",
    allowNegativeFinal: "Allow negative final answers",
    includeAnswerKey: "Include separate answer key page",
    generate: "Generate Worksheet",
    printWorksheet: "Print Worksheet",
    printAnswerKey: "Print Answer Key",
    previewTitle: "Abacus Worksheet",
    generatedAt: "Generated",
    name: "Name",
    date: "Date",
    class: "Class",
    modeLabel: "Mode",
    questionLabel: "Questions",
    rowsLabel: "Rows",
    digitsLabel: "Digits",
    answerKeyTitle: "Answer Key",
    generationNotes: "Generation Notes",
    printBeforeGenerate: "Generate a worksheet before printing.",
    answerKeyPrereq: "Enable and generate an answer key before printing it.",
    fallbackWarning: "Question {{index}}: used deterministic fallback generator."
  },
  practice: {
    settingsTitle: "Practice Settings",
    reset: "Reset",
    digits: "Digits",
    rowsPerQuestion: "Rows per Question",
    allowNegativeIntermediate: "Allow negative intermediate totals",
    allowNegativeFinal: "Allow negative final answers",
    answerLabel: "Your answer",
    clear: "Clear",
    check: "Check",
    next: "Next",
    submit: "Submit",
    questionRows: "Question rows",
    numpadLabel: "Numpad",
    prefillLoaded: "Curriculum preset loaded: {{lesson}}",
    prefillInvalid: "Some preset values were invalid and ignored."
  },
  anki: {
    title: "Anki Practice",
    description: "Check your answer, review feedback, then move to the next card.",
    correct: "Correct",
    attempted: "Attempted",
    accuracy: "Accuracy",
    enterValidInteger: "Enter a valid integer answer.",
    correctShort: "Correct.",
    incorrectWithAnswer: "Incorrect. Correct answer: {{answer}}"
  },
  timeAttack: {
    title: "Time Attack",
    description: "Pick a countdown and solve as many as possible before time runs out.",
    duration: "Duration",
    timeLeft: "Time Left",
    start: "Start",
    tryAgain: "Try Again",
    ready: "Ready to start your timed drill.",
    sessionComplete: "Session complete. Score: {{correct}} correct, {{accuracy}}% accuracy."
  },
  curriculum: {
    title: "Abacus Curriculum",
    description: "Study from beginner to expert through Junior, Foundation, Advanced, and Grand Master stages.",
    stageLabel: "Stage",
    levelLabel: "Level",
    objectives: "Learning Objectives",
    rules: "Core Rules",
    drillPlan: "Drill Plan",
    openGenerator: "Open in Generator",
    openAnki: "Open in Anki",
    openTimeAttack: "Open in Time Attack",
    stage: {
      junior: "Junior",
      foundation: "Foundation",
      advanced: "Advanced",
      grandMaster: "Grand Master"
    }
  }
};

export default en;
