// Pola jaringan (network) transparan sebagai latar CSS (SVG kecil 280×280, diulang). Tanpa gambar eksternal.
const nodes = [[20, 40], [90, 15], [150, 70], [230, 30], [60, 120], [130, 150], [210, 130], [260, 200], [170, 230], [80, 250], [20, 200]];

export function networkPattern(color: string) {
  const dots = nodes.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="2.2"/>`).join("");
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="280" height="280" viewBox="0 0 280 280" fill="none"><g stroke="${color}" stroke-width="1"><path d="M20 40L90 15L150 70L230 30M20 40L60 120L130 150L150 70M130 150L210 130L230 30M210 130L260 200L170 230L130 150M170 230L80 250M60 120L20 200L80 250"/></g><g fill="${color}">${dots}</g></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}
