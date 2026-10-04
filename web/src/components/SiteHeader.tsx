import { Link, NavLink } from 'react-router-dom'
import { LogoLockup } from './Logo'

const NAV = [
  { to: '/contents', label: 'Recipes', end: false, active: 'text-fig' },
  { to: '/episodes', label: 'Episodes', end: false, active: 'text-pistachio-deep' },
  { to: '/about', label: 'About', end: false, active: 'text-fig' },
]

export function SiteHeader() {
  return (
    <header className="no-print w-full max-w-[1200px] mx-auto px-4 sm:px-8 py-6 flex flex-wrap items-center justify-between gap-4">
      <Link to="/" aria-label="Food: the other love language — home">
        <LogoLockup />
      </Link>
      <nav aria-label="Main" className="flex gap-6 sm:gap-8">
        {NAV.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={({ isActive }) =>
              `label py-3.5 transition-colors hover:text-fig ${isActive ? item.active : 'text-aubergine'}`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </header>
  )
}
