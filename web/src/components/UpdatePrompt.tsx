import { useRegisterSW } from 'virtual:pwa-register/react'

export function UpdatePrompt() {
  const {
    needRefresh: [needRefresh],
    updateServiceWorker,
  } = useRegisterSW()

  if (!needRefresh) return null

  return (
    <div className="no-print fixed bottom-4 left-4 right-4 z-50 flex items-center justify-between gap-3 bg-aubergine text-paper px-5 py-3 rounded-card shadow-lg">
      <p className="font-serif text-base">A new version is ready.</p>
      <button type="button" onClick={() => updateServiceWorker(true)} className="btn-pistachio flex-shrink-0">
        Update
      </button>
    </div>
  )
}
