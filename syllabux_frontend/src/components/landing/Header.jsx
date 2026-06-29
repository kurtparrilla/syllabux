const navItems = ['courses', 'categories', 'about']

function Header({ onSignIn }) {
  return (
    <header className="fixed left-0 top-0 z-40 w-full border-b border-glass-border bg-white/30 px-margin-mobile py-4 backdrop-blur-xl md:px-margin-desktop">
      <div className="mx-auto flex max-w-container-max items-center justify-between gap-4">
        <div className="flex items-center gap-8">
          <a
            className="font-display-lg text-headline-md lowercase tracking-tight text-primary"
            href="#top"
          >
            syllabux
          </a>
          <nav
            className="hidden items-center gap-6 md:flex"
            aria-label="Primary navigation"
          >
            {navItems.map((item, index) => (
              <a
                key={item}
                className={`font-label-md text-label-md transition-colors duration-300 ${
                  index === 0
                    ? 'border-b-2 border-primary font-bold text-primary'
                    : 'text-on-surface-variant hover:text-primary'
                }`}
                href={`#${item}`}
              >
                {item}
              </a>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <label className="hidden items-center rounded-full border border-glass-border bg-white/40 px-4 py-2 backdrop-blur-xl lg:flex">
            <span className="material-symbols-outlined mr-2 text-outline-variant">
              search
            </span>
            <span className="sr-only">search clarity</span>
            <input
              className="w-32 border-none bg-transparent p-0 text-label-sm text-primary outline-none placeholder:text-outline-variant"
              placeholder="search clarity..."
              type="search"
            />
          </label>
          <button
            className="rounded-full bg-primary px-5 py-2 font-label-md text-label-md lowercase text-on-primary transition hover:bg-primary-container active:scale-95 sm:px-6"
            type="button"
            onClick={onSignIn}
          >
            sign in
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
