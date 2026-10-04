import { LogoMark } from './Logo'

export function SiteFooter() {
  return (
    <footer className="no-print bg-aubergine text-paper mt-auto">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8 py-12 flex flex-wrap items-center justify-between gap-6">
        <div className="flex items-center gap-3.5">
          <LogoMark size={32} />
          <span className="font-serif italic text-[22px]">And sometimes, that person is you.</span>
        </div>
        <span className="label text-blush-border">© {new Date().getFullYear()} Mat &amp; Benny</span>
      </div>
    </footer>
  )
}
