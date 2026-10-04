import { useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { SiteHeader } from './SiteHeader'
import { SiteFooter } from './SiteFooter'

export function Layout() {
  const { pathname, hash } = useLocation()

  // New page → start at the top (but let in-page anchors work)
  useEffect(() => {
    if (!hash) window.scrollTo(0, 0)
  }, [pathname, hash])

  return (
    <div className="min-h-screen flex flex-col bg-paper text-aubergine">
      <SiteHeader />
      <Outlet />
      <SiteFooter />
    </div>
  )
}
