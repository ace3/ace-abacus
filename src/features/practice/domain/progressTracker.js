const DAY_MS = 24 * 60 * 60 * 1000;

const pad = (value) => String(value).padStart(2, "0");

export const getLocalDateKey = (date = new Date()) => {
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  return `${year}-${month}-${day}`;
};

const parseDateKey = (value) => {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value || "")) {
    return null;
  }

  return new Date(`${value}T00:00:00`);
};

const diffDays = (fromKey, toKey) => {
  const from = parseDateKey(fromKey);
  const to = parseDateKey(toKey);

  if (!from || !to) {
    return null;
  }

  const delta = Math.round((to.getTime() - from.getTime()) / DAY_MS);
  return Number.isInteger(delta) ? delta : null;
};

const normalizeSession = (session) => {
  const attempted = Number.parseInt(String(session?.attempted), 10);
  const correct = Number.parseInt(String(session?.correct), 10);
  const durationSec = Number.parseInt(String(session?.durationSec), 10);

  const safeAttempted = Number.isInteger(attempted) && attempted > 0 ? attempted : 0;
  const safeCorrectRaw = Number.isInteger(correct) ? correct : 0;
  const safeCorrect = Math.max(0, Math.min(safeAttempted, safeCorrectRaw));

  const accuracy = safeAttempted > 0
    ? Math.round((safeCorrect / safeAttempted) * 100)
    : 0;

  return {
    mode: session?.mode === "timeAttack" ? "timeAttack" : "anki",
    attempted: safeAttempted,
    correct: safeCorrect,
    accuracy,
    durationSec: Number.isInteger(durationSec) && durationSec > 0 ? durationSec : null,
    timestamp: typeof session?.timestamp === "string" && session.timestamp ? session.timestamp : new Date().toISOString()
  };
};

export const createInitialProgress = () => ({
  lastActiveDate: "",
  currentStreak: 0,
  bestStreak: 0,
  totalSessions: 0,
  totalAttempted: 0,
  totalCorrect: 0,
  bestAccuracy: 0,
  bestTimeAttackCorrect: 0,
  daily: {},
  recentSessions: []
});

export const sanitizeProgress = (value) => {
  const base = createInitialProgress();
  const next = {
    ...base,
    ...(value || {})
  };

  next.lastActiveDate = typeof next.lastActiveDate === "string" ? next.lastActiveDate : "";

  for (const key of ["currentStreak", "bestStreak", "totalSessions", "totalAttempted", "totalCorrect", "bestAccuracy", "bestTimeAttackCorrect"]) {
    const parsed = Number.parseInt(String(next[key]), 10);
    next[key] = Number.isInteger(parsed) && parsed >= 0 ? parsed : 0;
  }

  next.daily = typeof next.daily === "object" && next.daily ? next.daily : {};
  next.recentSessions = Array.isArray(next.recentSessions) ? next.recentSessions : [];

  return next;
};

export const applySessionToProgress = (currentProgress, rawSession, now = new Date()) => {
  const progress = sanitizeProgress(currentProgress);
  const session = normalizeSession(rawSession);

  if (session.attempted <= 0) {
    return progress;
  }

  const todayKey = getLocalDateKey(now);
  const dayGap = diffDays(progress.lastActiveDate, todayKey);
  const nextStreak = dayGap === null
    ? 1
    : dayGap === 0
      ? Math.max(1, progress.currentStreak)
      : dayGap === 1
        ? progress.currentStreak + 1
        : 1;

  const todayEntry = progress.daily[todayKey] || {
    sessions: 0,
    attempted: 0,
    correct: 0,
    bestAccuracy: 0,
    bestTimeAttackCorrect: 0
  };

  const nextTodayEntry = {
    ...todayEntry,
    sessions: todayEntry.sessions + 1,
    attempted: todayEntry.attempted + session.attempted,
    correct: todayEntry.correct + session.correct,
    bestAccuracy: Math.max(todayEntry.bestAccuracy, session.accuracy),
    bestTimeAttackCorrect: session.mode === "timeAttack"
      ? Math.max(todayEntry.bestTimeAttackCorrect, session.correct)
      : todayEntry.bestTimeAttackCorrect
  };

  const sessionRecord = {
    id: `${session.mode}-${session.timestamp}`,
    ...session,
    dateKey: todayKey
  };

  return {
    ...progress,
    lastActiveDate: todayKey,
    currentStreak: nextStreak,
    bestStreak: Math.max(progress.bestStreak, nextStreak),
    totalSessions: progress.totalSessions + 1,
    totalAttempted: progress.totalAttempted + session.attempted,
    totalCorrect: progress.totalCorrect + session.correct,
    bestAccuracy: Math.max(progress.bestAccuracy, session.accuracy),
    bestTimeAttackCorrect: session.mode === "timeAttack"
      ? Math.max(progress.bestTimeAttackCorrect, session.correct)
      : progress.bestTimeAttackCorrect,
    daily: {
      ...progress.daily,
      [todayKey]: nextTodayEntry
    },
    recentSessions: [sessionRecord, ...progress.recentSessions].slice(0, 20)
  };
};

export const buildMilestones = (progress) => {
  const data = sanitizeProgress(progress);

  return {
    firstSession: data.totalSessions >= 1,
    hotStreak: data.currentStreak >= 3,
    accuracyAce: data.bestAccuracy >= 80,
    speedRunner: data.bestTimeAttackCorrect >= 10
  };
};

export const buildMotivationSnapshot = (progress, todayKey = getLocalDateKey()) => {
  const data = sanitizeProgress(progress);
  const today = data.daily[todayKey] || {
    sessions: 0,
    attempted: 0,
    correct: 0,
    bestAccuracy: 0,
    bestTimeAttackCorrect: 0
  };

  return {
    streak: {
      current: data.currentStreak,
      best: data.bestStreak
    },
    totals: {
      sessions: data.totalSessions,
      attempted: data.totalAttempted,
      correct: data.totalCorrect,
      accuracy: data.totalAttempted > 0 ? Math.round((data.totalCorrect / data.totalAttempted) * 100) : 0
    },
    today,
    milestones: buildMilestones(data),
    recentSessions: data.recentSessions.slice(0, 5)
  };
};
