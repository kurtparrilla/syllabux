import { useEffect, useRef, useState } from 'react'

function SideNavigation({ learner, navigation, onLogout }) {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false)
  const profileMenuRef = useRef(null)

  useEffect(() => {
    if (!isProfileMenuOpen) {
      return undefined
    }

    const handlePointerDown = (event) => {
      if (!profileMenuRef.current?.contains(event.target)) {
        setIsProfileMenuOpen(false)
      }
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsProfileMenuOpen(false)
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isProfileMenuOpen])

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-24 flex-col items-center border-r border-glass-border bg-glass-bg py-8 backdrop-blur-xl lg:flex">
      <div className="mb-12">
        <span className="font-display-lg text-headline-md lowercase text-primary">sy</span>
      </div>

      <nav className="flex flex-1 flex-col gap-8" aria-label="Learner navigation">
        {navigation.map((item) => (
          <a
            key={item.id}
            className={`group flex flex-col items-center gap-1 p-2 transition-colors ${
              item.active
                ? 'border-r-2 border-primary bg-surface-container-high/30 font-bold text-primary'
                : 'rounded-xl text-on-surface-variant hover:bg-surface-container-high/50'
            }`}
            href={item.href}
          >
            <span className="material-symbols-outlined text-[24px]">{item.icon}</span>
            <span className="font-body-md text-[10px] lowercase">{item.label}</span>
          </a>
        ))}
      </nav>

      <div className="relative mt-auto" ref={profileMenuRef}>
        <button
          className="h-10 w-10 overflow-hidden rounded-full border border-glass-border transition-all hover:border-primary/30 focus:outline-none focus:ring-2 focus:ring-primary/20"
          type="button"
          aria-expanded={isProfileMenuOpen}
          aria-label="open learner profile"
          onClick={() => setIsProfileMenuOpen((current) => !current)}
        >
          <img
            className="h-full w-full object-cover"
            src={learner.avatarUrl}
            alt={`${learner.name} profile`}
          />
        </button>

        {isProfileMenuOpen && (
          <div className="glass-panel-heavy absolute bottom-0 left-14 w-56 rounded-2xl p-3 text-left shadow-glass">
            <div className="mb-3 border-b border-glass-border pb-3">
              <p className="font-label-md lowercase text-primary">{learner.name}</p>
              <p className="font-label-sm lowercase text-on-surface-variant">
                {learner.planLabel}
              </p>
            </div>
            <button
              className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left font-label-sm lowercase text-on-surface-variant transition-colors hover:bg-white/50 hover:text-primary"
              type="button"
            >
              <span className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[18px]">
                  notifications
                </span>
                notifications
              </span>
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-bold text-white">
                {learner.notificationCount}
              </span>
            </button>
            <button
              className="mt-1 flex w-full items-center gap-2 rounded-xl px-3 py-2 text-left font-label-sm lowercase text-on-surface-variant transition-colors hover:bg-white/50 hover:text-primary"
              type="button"
              onClick={onLogout}
            >
              <span className="material-symbols-outlined text-[18px]">logout</span>
              logout
            </button>
          </div>
        )}
      </div>
    </aside>
  )
}

export default SideNavigation
