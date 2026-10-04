/** Shorten a recipe's totalTime for the contents page, e.g.
 *  "4 hours 45 minutes minimum, ideally overnight (includes 4-hour chill)" → "4 hr 45 min". */
export function shortTime(t?: string): string {
  if (!t) return ''
  return t
    .split('(')[0]
    .split(',')[0]
    .replace(/\bminimum\b/i, '')
    .replace(/~|about\s/gi, '')
    .replace(/\bhours?\b/gi, 'hr')
    .replace(/\bminutes?\b/gi, 'min')
    .replace(/\s+/g, ' ')
    .trim()
}

const QTY_RE = /^((?:\d+\s+\d+\/\d+|\d+\/\d+|\d*[½¼¾⅓⅔⅛⅜⅝⅞]|\d+(?:\.\d+)?(?:[–-]\d+)?)(?:\s+(?:cups?|tbsp|tsp|tablespoons?|teaspoons?|oz|lbs?|g|ml|pinch(?:es)?|cloves?|sticks?)\b\.?)?)\s+(.*)$/i

/** Split "¾ cup (95g) flour" into ["¾ cup", "(95g) flour"] so the amount can be set in Work Sans. */
export function splitQuantity(text: string): [string, string] {
  const m = text.match(QTY_RE)
  return m ? [m[1], m[2]] : ['', text]
}
