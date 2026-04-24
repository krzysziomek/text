import confetti from "canvas-confetti";

/** Krótki strzał konfetti w kolorach motywu (zielony MC + złoty). */
export function fireConfetti() {
  const colors = ["#5cbf3a", "#ffaa00", "#ffffff"];
  const defaults = {
    spread: 70,
    ticks: 60,
    gravity: 1,
    decay: 0.94,
    startVelocity: 35,
    colors,
  };

  confetti({ ...defaults, particleCount: 80, origin: { x: 0.5, y: 0.7 } });
  setTimeout(() => {
    confetti({ ...defaults, particleCount: 40, angle: 60, origin: { x: 0, y: 0.8 } });
    confetti({ ...defaults, particleCount: 40, angle: 120, origin: { x: 1, y: 0.8 } });
  }, 150);
}