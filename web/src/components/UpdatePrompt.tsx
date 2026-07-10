import { useRegisterSW } from 'virtual:pwa-register/react'

export function UpdatePrompt() {
  const {
    needRefresh: [needRefresh],
    updateServiceWorker,
  } = useRegisterSW()

  if (!needRefresh) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 flex items-center justify-between gap-3 bg-stone-900 text-white px-4 py-3 rounded-2xl shadow-lg">
      <p className="text-sm">A new version is ready.</p>
      <button
        onClick={() => updateServiceWorker(true)}
        className="flex-shrink-0 bg-butter-500 hover:bg-butter-400 text-white text-sm font-semibold px-4 py-1.5 rounded-full transition-colors"
      >
        Update
      </button>
    </div>
  )
}
