import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../auth/authContext'

function InstructorTopNav({ instructor, topNav }) {
  const navigate = useNavigate()
  const { logout } = useAuth()

  return (
    <header className="fixed left-0 top-0 z-50 flex h-20 w-full items-center justify-between border-b border-glass-border bg-glass-bg px-margin-mobile shadow-sm backdrop-blur-md md:px-margin-desktop">
      <div className="flex items-center gap-8">
        <h1 className="font-display-lg text-headline-md font-bold tracking-tight text-primary">
          syllabux
        </h1>
        <nav className="hidden items-center gap-6 md:flex" aria-label="Instructor top navigation">
          {topNav.map((item) => (
            <a
              key={item.id}
              className={`font-label-md text-label-md transition-colors ${
                item.active
                  ? 'border-b-2 border-primary pb-1 font-bold text-primary'
                  : 'font-medium text-on-surface-variant hover:bg-white/20'
              }`}
              href={item.href}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>

      <div className="flex items-center gap-4">
        <button
          className="material-symbols-outlined rounded-full p-2 text-primary transition-all hover:bg-white/20 active:opacity-80"
          type="button"
          aria-label={`${instructor.notificationCount} notifications`}
        >
          notifications
        </button>
        <div className="glass-panel flex items-center gap-3 rounded-full px-3 py-1.5">
          <span className="hidden font-label-md text-label-md text-primary sm:inline">
            {instructor.name}
          </span>
          <img
            className="h-8 w-8 rounded-full border border-primary object-cover"
            src={instructor.avatarUrl}
            alt={`${instructor.name} profile`}
          />
        </div>
        <button
          className="material-symbols-outlined rounded-full p-2 text-primary transition-all hover:bg-white/20 active:opacity-80"
          type="button"
          aria-label="logout"
          onClick={() => {
            logout()
            navigate('/')
          }}
        >
          logout
        </button>
      </div>
    </header>
  )
}

export default InstructorTopNav
