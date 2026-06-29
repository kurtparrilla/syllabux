function FiltersSidebar({
  activeFilterLabels,
  checkedFilters,
  filterGroups,
  isOpen,
  onClose,
  onToggleFilter,
}) {
  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-300 ${
        isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      <button
        className="absolute inset-0 cursor-default bg-primary/10 backdrop-blur-sm"
        type="button"
        aria-label="close filters"
        onClick={onClose}
      />
      <aside
        className={`glass-panel-heavy absolute bottom-0 right-0 top-0 flex w-full max-w-sm flex-col overflow-y-auto rounded-l-3xl p-6 shadow-glass transition-transform duration-300 md:p-8 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="mb-8 flex items-center justify-between">
          <h2 className="font-headline-md text-headline-md lowercase text-primary">
            filters
          </h2>
          <button
            className="rounded-full p-1 transition-colors hover:bg-white/40"
            type="button"
            aria-label="close filters"
            onClick={onClose}
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div className="mb-10 flex flex-wrap gap-2">
          {activeFilterLabels.map((label) => (
            <div
              key={label}
              className="flex items-center gap-2 rounded-full border border-primary/10 bg-white/60 px-3 py-1.5"
            >
              <span className="font-label-sm lowercase text-primary">{label}</span>
              <span className="material-symbols-outlined text-[14px]">close</span>
            </div>
          ))}
        </div>

        <div className="space-y-10">
          {filterGroups.map((group) => (
            <fieldset key={group.id}>
              <legend className="mb-4 w-full border-b border-glass-border pb-2 font-label-md lowercase text-on-surface-variant">
                {group.label}
              </legend>
              <div className="space-y-3">
                {group.options.map((option) => {
                  const isChecked = checkedFilters[option.id]

                  return (
                    <label
                      key={option.id}
                      className="group flex cursor-pointer items-center gap-3"
                    >
                      <input
                        checked={isChecked}
                        className="h-5 w-5 rounded border-glass-border bg-white/40 text-primary focus:ring-primary/20"
                        type="checkbox"
                        onChange={() => onToggleFilter(option.id)}
                      />
                      <span
                        className={`font-body-md lowercase transition-colors group-hover:text-primary ${
                          isChecked
                            ? 'font-bold text-primary'
                            : 'text-on-surface-variant'
                        }`}
                      >
                        {option.label}
                      </span>
                    </label>
                  )
                })}
              </div>
            </fieldset>
          ))}
        </div>

        <button
          className="mt-12 w-full rounded-2xl bg-primary py-4 font-label-md lowercase text-on-primary transition-colors hover:bg-tertiary"
          type="button"
          onClick={onClose}
        >
          apply filters
        </button>
      </aside>
    </div>
  )
}

export default FiltersSidebar
