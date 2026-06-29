function SearchInput({ searchQuery, onSearchChange }) {
  return (
    <label className="group relative block w-full transition-transform focus-within:scale-[1.02]">
      <span className="material-symbols-outlined pointer-events-none absolute left-5 top-1/2 z-10 -translate-y-1/2 text-[20px] text-on-surface-variant group-focus-within:text-primary">
        search
      </span>
      <span className="sr-only">search courses</span>
      <input
        className="w-full rounded-full border border-white/60 bg-white/55 py-3 pl-14 pr-5 font-body-md lowercase shadow-glass outline-none backdrop-blur-xl placeholder:text-on-surface-variant/60 focus:ring-2 focus:ring-primary/20"
        placeholder="find your path..."
        type="search"
        value={searchQuery}
        onChange={(event) => onSearchChange(event.target.value)}
      />
    </label>
  )
}

export default SearchInput
