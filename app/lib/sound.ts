"use client";

/**
 * Sound Manager for Portfolio
 * Provides a nostalgic, warm Macintosh chime synthesized via Web Audio API.
 * Handles mobile and desktop browser autoplay restrictions by unlocking AudioContext on user gestures.
 */

let sharedAudioCtx: AudioContext | null = null;
let isAudioUnlocked = false;
let isMutedState = false;
const listeners = new Set<(muted: boolean) => void>();

// Read initial muted state from localStorage if available
if (typeof window !== "undefined") {
  try {
    const saved = localStorage.getItem("portfolio_sound_muted");
    if (saved !== null) {
      isMutedState = saved === "true";
    }
  } catch {
    // localStorage might be unavailable or restricted
  }
}

/**
 * Safely retrieve or instantiate the Web Audio Context
 */
function getAudioContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!sharedAudioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      sharedAudioCtx = new AudioContextClass();
    }
  }
  return sharedAudioCtx;
}

/**
 * Pre-warm and unlock the AudioContext on first user interaction (touch, click, wheel, keydown).
 * Crucial for iOS Safari and Android Chrome to allow audio on slide transition.
 */
export function unlockAudio() {
  if (typeof window === "undefined" || isAudioUnlocked) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  if (ctx.state === "suspended") {
    ctx.resume().then(() => {
      isAudioUnlocked = true;
    }).catch(() => {
      // Audio resume will retry on next interaction
    });
  } else {
    isAudioUnlocked = true;
  }
}

// Auto-register unlock listeners on browser window
if (typeof window !== "undefined") {
  const unlockEvents = ["touchstart", "touchend", "pointerdown", "mousedown", "keydown", "wheel"];
  const handleUnlock = () => {
    unlockAudio();
    unlockEvents.forEach((evt) => window.removeEventListener(evt, handleUnlock));
  };
  unlockEvents.forEach((evt) => {
    window.addEventListener(evt, handleUnlock, { passive: true, once: true });
  });
}

/**
 * Play the warm nostalgic Apple Macintosh chord chime (C5, E5, G5, C6 arpeggio)
 */
export function playHelloChime() {
  if (typeof window === "undefined" || isMutedState) return;

  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    if (ctx.state === "suspended") {
      ctx.resume().catch(() => {});
    }

    const now = ctx.currentTime;
    // Classic C5 major chord arpeggio notes [C5, E5, G5, C6]
    const notes = [
      { freq: 523.25, timeOffset: 0.00, gain: 0.07 },
      { freq: 659.25, timeOffset: 0.07, gain: 0.065 },
      { freq: 783.99, timeOffset: 0.14, gain: 0.065 },
      { freq: 1046.50, timeOffset: 0.21, gain: 0.08 },
    ];

    notes.forEach(({ freq, timeOffset, gain: noteGain }) => {
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      // Subtle warm sine oscillator with rounded timbre
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, now + timeOffset);

      // Attack and exponential decay envelope
      gainNode.gain.setValueAtTime(0.0001, now + timeOffset);
      gainNode.gain.exponentialRampToValueAtTime(noteGain, now + timeOffset + 0.035);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + timeOffset + 1.25);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc.start(now + timeOffset);
      osc.stop(now + timeOffset + 1.35);
    });
  } catch (err) {
    console.warn("Audio playback not allowed yet by browser policy:", err);
  }
}

/**
 * Sound Mute / Unmute State Controls
 */
export function isSoundMuted(): boolean {
  return isMutedState;
}

export function setSoundMuted(muted: boolean) {
  isMutedState = muted;
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem("portfolio_sound_muted", String(muted));
    } catch {}
  }
  listeners.forEach((fn) => fn(isMutedState));
}

export function toggleSoundMuted(): boolean {
  setSoundMuted(!isMutedState);
  if (!isMutedState) {
    // Quick test chime when unmuting
    setTimeout(() => playHelloChime(), 60);
  }
  return isMutedState;
}

export function subscribeSoundMuted(fn: (muted: boolean) => void): () => void {
  listeners.add(fn);
  return () => {
    listeners.delete(fn);
  };
}
