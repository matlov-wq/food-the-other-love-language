function parseFraction(s: string): number {
  const mixed = s.match(/^(\d+)\s+(\d+)\/(\d+)$/)
  if (mixed) return +mixed[1] + +mixed[2] / +mixed[3]
  const frac = s.match(/^(\d+)\/(\d+)$/)
  if (frac) return +frac[1] / +frac[2]
  return parseFloat(s)
}

const NICE_FRACS: [number, string][] = [
  [1 / 8, '1/8'],
  [1 / 4, '1/4'],
  [1 / 3, '1/3'],
  [1 / 2, '1/2'],
  [2 / 3, '2/3'],
  [3 / 4, '3/4'],
  [7 / 8, '7/8'],
]

function formatAmount(n: number): string {
  if (n <= 0) return '0'
  const whole = Math.floor(n)
  const frac = n - whole

  if (frac < 0.04) return String(whole)

  let bestStr = ''
  let bestDiff = Infinity
  for (const [val, str] of NICE_FRACS) {
    const diff = Math.abs(frac - val)
    if (diff < bestDiff) {
      bestDiff = diff
      bestStr = str
    }
  }

  if (bestDiff < 0.08) {
    return whole > 0 ? `${whole} ${bestStr}` : bestStr
  }

  return n % 1 === 0 ? String(n) : n.toFixed(1)
}

// Matches leading numbers in forms: "1 1/2", "1/2", "3", "2.5"
const LEADING_NUM_RE = /^(\d+(?:\s+\d+\/\d+)?|\d+\/\d+|\d+\.?\d*)\s+/

export function scaleIngredient(text: string, scale: number): string {
  if (scale === 1) return text
  const match = text.match(LEADING_NUM_RE)
  if (!match) return text
  const amount = parseFraction(match[1].trim())
  if (isNaN(amount) || amount === 0) return text
  const scaled = amount * scale
  const formatted = formatAmount(scaled)
  return text.replace(match[0], `${formatted} `)
}
