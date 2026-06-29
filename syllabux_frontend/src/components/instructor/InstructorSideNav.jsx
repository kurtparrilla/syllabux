function InstructorSideNav({ navigation }) {
  return (
    <aside className="group fixed left-0 top-0 z-40 hidden h-full w-20 flex-col border-r border-glass-border bg-glass-bg py-6 shadow-md backdrop-blur-xl transition-all duration-300 hover:w-64 lg:flex">
      <nav className="mt-20 flex flex-col gap-4 px-2" aria-label="Instructor navigation">
        {navigation.map((item) => (
          <a
            key={item.id}
            className={`flex items-center gap-4 rounded-xl p-3 transition-all duration-200 ease-in-out ${
              item.active
                ? 'bg-primary-container text-on-primary-container'
                : 'text-on-surface-variant hover:bg-secondary-container/30 hover:text-primary'
            }`}
            href={item.href}
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            <span className="font-label-md text-label-md opacity-0 transition-opacity group-hover:opacity-100">
              {item.label}
            </span>
          </a>
        ))}
      </nav>
    </aside>
  )
}

export default InstructorSideNav
