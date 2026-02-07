import { useCallback, useEffect, useRef } from "react";

const clamp = (value) => Math.max(0, Math.min(1, value));

const createAudioContext = () => {
  const Ctor = window.AudioContext || window.webkitAudioContext;
  return Ctor ? new Ctor() : null;
};

const stopNodes = (nodes) => {
  for (const node of nodes) {
    try {
      node.stop();
    } catch {
      // ignored: node may have already stopped.
    }
    try {
      node.disconnect();
    } catch {
      // ignored: disconnect may fail for already-disconnected nodes.
    }
  }
};

export const usePracticeAudio = ({ enabled, ambientVolume, countdownVolume, onError }) => {
  const contextRef = useRef(null);
  const ambientNodesRef = useRef([]);
  const countdownNodesRef = useRef([]);
  const countdownIntervalRef = useRef(null);
  const modeRef = useRef("idle");

  const reportError = useCallback((message) => {
    if (typeof onError === "function") {
      onError(message);
    }
  }, [onError]);

  const ensureContext = useCallback(async () => {
    if (typeof window === "undefined") {
      return null;
    }

    if (!contextRef.current) {
      contextRef.current = createAudioContext();
    }

    if (!contextRef.current) {
      reportError("Audio not supported in this browser.");
      return null;
    }

    try {
      if (contextRef.current.state === "suspended") {
        await contextRef.current.resume();
      }
      return contextRef.current;
    } catch {
      reportError("Unable to start audio playback.");
      return null;
    }
  }, [reportError]);

  const stopAmbient = useCallback(() => {
    stopNodes(ambientNodesRef.current);
    ambientNodesRef.current = [];
  }, []);

  const stopCountdown = useCallback(() => {
    stopNodes(countdownNodesRef.current);
    countdownNodesRef.current = [];

    if (countdownIntervalRef.current) {
      window.clearInterval(countdownIntervalRef.current);
      countdownIntervalRef.current = null;
    }
  }, []);

  const stopAll = useCallback(() => {
    stopAmbient();
    stopCountdown();
    modeRef.current = "idle";
  }, [stopAmbient, stopCountdown]);

  const startAmbient = useCallback(async () => {
    if (!enabled || modeRef.current === "ambient") {
      return;
    }

    const context = await ensureContext();
    if (!context) {
      return;
    }

    stopAll();

    const gainNode = context.createGain();
    gainNode.gain.value = clamp(ambientVolume) * 0.28;
    gainNode.connect(context.destination);

    const oscA = context.createOscillator();
    oscA.type = "sine";
    oscA.frequency.value = 220;

    const oscB = context.createOscillator();
    oscB.type = "triangle";
    oscB.frequency.value = 277.18;

    oscA.connect(gainNode);
    oscB.connect(gainNode);

    const lfo = context.createOscillator();
    const lfoGain = context.createGain();
    lfo.frequency.value = 0.25;
    lfoGain.gain.value = 8;
    lfo.connect(lfoGain);
    lfoGain.connect(oscB.frequency);

    oscA.start();
    oscB.start();
    lfo.start();

    ambientNodesRef.current = [oscA, oscB, lfo, lfoGain, gainNode];
    modeRef.current = "ambient";
  }, [ambientVolume, enabled, ensureContext, stopAll]);

  const playCountdownPulse = useCallback((context, gainLevel) => {
    const pulseGain = context.createGain();
    pulseGain.gain.value = gainLevel;
    pulseGain.connect(context.destination);

    const osc = context.createOscillator();
    osc.type = "square";
    osc.frequency.value = 880;
    osc.connect(pulseGain);

    const now = context.currentTime;
    pulseGain.gain.setValueAtTime(gainLevel, now);
    pulseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

    osc.start(now);
    osc.stop(now + 0.22);

    countdownNodesRef.current = [...countdownNodesRef.current, osc, pulseGain];
    window.setTimeout(() => {
      try {
        osc.disconnect();
      } catch {
        // ignored: oscillator is already disconnected.
      }
      try {
        pulseGain.disconnect();
      } catch {
        // ignored: gain node is already disconnected.
      }

      countdownNodesRef.current = countdownNodesRef.current.filter((node) => node !== osc && node !== pulseGain);
    }, 260);
  }, []);

  const startCountdown = useCallback(async () => {
    if (!enabled || modeRef.current === "countdown") {
      return;
    }

    const context = await ensureContext();
    if (!context) {
      return;
    }

    stopAll();

    const gainLevel = Math.max(0.04, clamp(countdownVolume) * 0.35);
    playCountdownPulse(context, gainLevel);
    countdownIntervalRef.current = window.setInterval(() => {
      playCountdownPulse(context, gainLevel);
    }, 350);

    modeRef.current = "countdown";
  }, [countdownVolume, enabled, ensureContext, playCountdownPulse, stopAll]);

  useEffect(() => {
    if (!enabled) {
      stopAll();
    }
  }, [enabled, stopAll]);

  useEffect(() => () => {
    stopAll();

    if (contextRef.current) {
      contextRef.current.close().catch(() => {
        // ignored: close failure does not impact UI behavior.
      });
      contextRef.current = null;
    }
  }, [stopAll]);

  return {
    startAmbient,
    startCountdown,
    stopAll
  };
};
