import { CATEGORIES } from '../data/recipes'
import type { Category } from '../types/recipe'

interface Props {
  selected: Category | 'Favorites' | null
  onSelect: (c: Category | 'Favorites' | null) => void
  favoriteCount: number
}

export function CategoryNav({ selected, onSelect, favoriteCount }: Props) {
  const ALL = null

  return (
    <nav
      aria-label="Filter recipes"
      className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide"
      style={{ WebkitOverflowScrolling: 'touch' }}
    >
      <Chip active={selected === ALL} onClick={() => onSelect(ALL)}>
        All
      </Chip>
      {favoriteCount > 0 && (
        <Chip active={selected === 'Favorites'} onClick={() => onSelect('Favorites')}>
          ♥ Favorites
        </Chip>
      )}
      {CATEGORIES.map(cat => (
        <Chip key={cat} active={selected === cat} onClick={() => onSelect(cat)}>
          {cat}
        </Chip>
      ))}
    </nav>
  )
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      onClick={onClick}
      className="flex-shrink-0 px-3.5 py-1.5 rounded-full text-sm font-medium transition-colors focus:outline-none"
      style={
        active
          ? { backgroundColor: '#3D2817', color: '#FAF3E7' }
          : { backgroundColor: '#E8C888', color: '#6B4226' }
      }
    >
      {children}
    </button>
  )
}
