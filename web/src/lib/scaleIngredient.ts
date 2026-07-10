const UNICODE_FRAC_VALUES: Record<string, number> = {
  '½': 0.5,   '¼': 0.25,  '¾': 0.75,
  '⅓': 1 / 3, '⅔': 2 / 3,
  '⅛': 0.125, '⅜': 0.375, '⅝': 0.625, '⅞': 0.875,
}

function parseFraction(s: string): number {
  // digit + unicode frac e.g. "2½"
  const unicodeMixed = s.match(/^(\d+)([½¼¾⅓⅔⅛⅜⅝⅞])$/)
  if (unicodeMixed) return +unicodeMixed[1] + UNICODE_FRAC_VALUES[unicodeMixed[2]]

  // unicode frac alone e.g. "½"
  if (s in UNICODE_FRAC_VALUES) return UNICODE_FRAC_VALUES[s]

  // mixed number e.g. "1 1/2"
  const mixed = s.match(/^(\d+)\s+(\d+)\/(\d+)$/)
  if (mixed) return +mixed[1] + +mixed[2] / +mixed[3]

  // ASCII fraction e.g. "1/2"
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

// Matches leading amount: unicode frac, digit+unicode frac, mixed number, ASCII frac, integer, decimal
const LEADING_NUM_RE = /^(\d*[½¼¾⅓⅔⅛⅜⅝⅞]|\d+\s+\d+\/\d+|\d+\/\d+|\d+\.?\d*)\s+/

// Matches gram weights e.g. "(220g)" or "(215 g)"
const GRAM_RE = /\((\d+(?:\.\d+)?)\s*g\)/g

export function scaleIngredient(text: string, scale: number): string {
  if (scale === 1) return text

  const match = text.match(LEADING_NUM_RE)
  if (!match) return text

  const amount = parseFraction(match[1].trim())
  if (isNaN(amount) || amount === 0) return text

  const scaled = formatAmount(amount * scale)

  return (scaled + ' ' + text.slice(match[0].length))
    .replace(GRAM_RE, (_, g) => `(${Math.round(parseFloat(g) * scale)}g)`)
}
