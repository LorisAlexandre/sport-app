export function formatTime(milliseconds: number): {
  minutes: number;
  seconds: number;
} {
  // Convertir les millisecondes en secondes
  const totalSeconds = Math.floor(milliseconds / 1000);

  // Calculer les minutes et les secondes
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  // Construire la chaîne de caractères formatée

  return { minutes, seconds };
}

export function turnIntoMS(
  d: number = 0,
  h: number = 0,
  min: number = 0,
  s: number = 0
) {
  let milliseconds = 0;

  milliseconds += d * 86400000;
  milliseconds += h * 3600000;
  milliseconds += min * 60000;
  milliseconds += s * 1000;

  return milliseconds;
}
