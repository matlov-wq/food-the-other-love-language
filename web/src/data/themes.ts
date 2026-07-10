export interface Theme {
  id: string
  title: string
  subtitle: string
  description: string
  startMonth: number
  startDay: number
  endMonth: number
  endDay: number
  featuredRecipeIds: string[]
}

// Day-of-year (non-leap) — used for range comparisons
function doy(month: number, day: number): number {
  const offsets = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334]
  return offsets[month - 1] + day
}

export const THEMES: Theme[] = [
  {
    id: 'new-year',
    title: 'New Year, Same Kitchen',
    subtitle: 'January',
    description:
      "The resolutions can wait. Right now there's leftover pie and someone to share it with. January is for slow cooking and not making plans.",
    startMonth: 1, startDay: 1,
    endMonth: 1, endDay: 31,
    featuredRecipeIds: [],
  },
  {
    id: 'valentines',
    title: 'Cook for Someone',
    subtitle: "Valentine's Day",
    description:
      "You don't need a reservation. You need a good recipe, a little time, and someone worth feeding. These are meals that say the thing.",
    startMonth: 2, startDay: 1,
    endMonth: 2, endDay: 17,
    featuredRecipeIds: [],
  },
  {
    id: 'citrus-season',
    title: 'Citrus Season',
    subtitle: 'Late Winter',
    description:
      'February and March are peak citrus — blood oranges, Meyer lemons, kumquats. The best antidote to a gray month is something that smells like sunshine.',
    startMonth: 2, startDay: 18,
    endMonth: 3, endDay: 19,
    featuredRecipeIds: [],
  },
  {
    id: 'spring',
    title: 'Something New',
    subtitle: 'Spring',
    description:
      'Asparagus, strawberries, snap peas still in the pod. Spring produce doesn\'t need much. It just needs you to show up and not overcook it.',
    startMonth: 3, startDay: 20,
    endMonth: 5, endDay: 9,
    featuredRecipeIds: [],
  },
  {
    id: 'mothers-day',
    title: "For the People Who Fed Us",
    subtitle: "Mother's Day",
    description:
      "The recipes in this section exist because someone made them first. We're just writing them down so they don't disappear.",
    startMonth: 5, startDay: 10,
    endMonth: 6, endDay: 17,
    featuredRecipeIds: ['moms-chow-chow'],
  },
  {
    id: 'juneteenth',
    title: 'Roots',
    subtitle: 'Juneteenth & Early Summer',
    description:
      "Southern cooking is a love language of its own. These are the recipes that have been passed down, adapted, fought over, and made ours.",
    startMonth: 6, startDay: 18,
    endMonth: 7, endDay: 3,
    featuredRecipeIds: ['collards', 'green-beans', 'moms-chow-chow'],
  },
  {
    id: 'high-summer',
    title: 'High Summer',
    subtitle: 'July & August',
    description:
      "The tomatoes are heavy on the vine, the peaches are dripping, and the corn is ready. These are the months that reward simplicity — when the best thing you can do for good produce is stay out of its way.",
    startMonth: 7, startDay: 4,
    endMonth: 8, endDay: 15,
    featuredRecipeIds: ['brown-butter-coconut-lime-macaroon-cookies'],
  },
  {
    id: 'muscadine',
    title: 'Muscadine Season',
    subtitle: 'Late Summer',
    description:
      "If you grew up in the South, you know the smell. Musky, floral, a little wild. Muscadines don't last long — they're ripe, then they're gone. Every recipe in this section is built around that window.",
    startMonth: 8, startDay: 16,
    endMonth: 9, endDay: 30,
    featuredRecipeIds: [],
  },
  {
    id: 'fall-harvest',
    title: 'Fall Harvest',
    subtitle: 'October',
    description:
      "Apples, pears, butternut squash, sweet potatoes starting to come in. The air is cool enough to have the oven on all day. This is the season for long recipes and no particular hurry.",
    startMonth: 10, startDay: 1,
    endMonth: 10, endDay: 31,
    featuredRecipeIds: ['sweet-potato-souffle'],
  },
  {
    id: 'thanksgiving',
    title: 'The Big One',
    subtitle: 'Thanksgiving',
    description:
      "Everyone has feelings about Thanksgiving. Strong, specific feelings. Here's where we work through ours — the sides that steal the show, the things your people always bring, the dishes that make it feel like home.",
    startMonth: 11, startDay: 1,
    endMonth: 11, endDay: 28,
    featuredRecipeIds: ['collards', 'green-beans', 'sweet-potato-souffle', 'moms-chow-chow'],
  },
  {
    id: 'holiday',
    title: 'The Season',
    subtitle: 'Holiday',
    description:
      "The time of year when everyone ends up in the kitchen together, whether they planned to or not. These recipes are built for that — for a crowd, for a counter full of people helping, for the kind of cooking that turns into a memory.",
    startMonth: 11, startDay: 29,
    endMonth: 12, endDay: 31,
    featuredRecipeIds: ['burnt-butter-hazelnut-cookies', 'bennys-holiday-tea'],
  },
]

export function getCurrentTheme(): Theme {
  const now = new Date()
  const today = doy(now.getMonth() + 1, now.getDate())

  const match = THEMES.find(t => {
    const start = doy(t.startMonth, t.startDay)
    const end = doy(t.endMonth, t.endDay)
    return today >= start && today <= end
  })

  return match ?? THEMES[0]
}

export function getNextTheme(): Theme {
  const current = getCurrentTheme()
  const idx = THEMES.indexOf(current)
  return THEMES[(idx + 1) % THEMES.length]
}
