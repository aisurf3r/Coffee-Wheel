export const VIBRANT_COLORS = [
  '#FF6B35',
  '#00D9FF',
  '#FFD23F',
  '#B4E33D',
  '#FF006E',
  '#9B51E0',
  '#FF8C42',
  '#00B4D8',
  '#FFB627',
  '#7DDF64',
  '#F72585',
  '#8338EC',
];

export function getColorForIndex(index: number): string {
  return VIBRANT_COLORS[index % VIBRANT_COLORS.length];
}
