import { Link } from 'react-router-dom'

const navigation = [
  { id: 'overview', label: 'overview', icon: 'dashboard' },
  { id: 'curriculum', label: 'curriculum', icon: 'menu_book', active: true },
  { id: 'resources', label: 'resources', icon: 'folder_open' },
  { id: 'discussions', label: 'discussions', icon: 'forum' },
  { id: 'notes', label: 'notes', icon: 'sticky_note_2' },
]

function CourseNavigation({ isOpen, onClose, onContinue }) {
  return (
    <>
      <button
        className={`fixed inset-0 z-40 bg-primary/20 backdrop-blur-sm transition-opacity lg:hidden ${
          isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        type="button"
        aria-label="close course navigation"
        onClick={onClose}
      />
      <aside
        className={`fixed left-0 top-0 z-50 flex h-screen w-64 flex-col border-r border-glass-border bg-white/80 px-4 py-8 shadow-glass backdrop-blur-2xl transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-label="Course navigation"
      >
        <div className="mb-10 flex items-start justify-between px-2">
          <div>
            <Link
              className="font-display-lg text-headline-md lowercase text-primary"
              to="/learn/dashboard"
            >
              syllabux
            </Link>
            <p className="font-label-sm text-on-surface-variant/70">
              academic dashboard
            </p>
          </div>
          <button
            className="rounded-full p-1 text-primary lg:hidden"
            type="button"
            aria-label="close navigation"
            onClick={onClose}
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <nav className="flex-1 space-y-1">
          {navigation.map((item) => (
            <button
              key={item.id}
              className={`flex w-full items-center gap-4 rounded-lg px-3 py-3 text-left font-label-md transition-colors ${
                item.active
                  ? 'border-r-2 border-primary bg-surface-container-low font-bold text-primary'
                  : 'text-on-surface-variant hover:bg-surface-container-low'
              }`}
              type="button"
              onClick={onClose}
            >
              <span className="material-symbols-outlined">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <button
          className="mt-auto w-full rounded-xl bg-primary px-4 py-3 font-label-md text-on-primary transition hover:bg-primary-container"
          type="button"
          onClick={onContinue}
        >
          continue learning
        </button>
      </aside>
    </>
  )
}

export default CourseNavigation
