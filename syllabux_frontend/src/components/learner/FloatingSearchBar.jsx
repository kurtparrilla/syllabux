import SearchInput from './SearchInput'

function FloatingSearchBar({ isVisible, searchQuery, onSearchChange }) {
  return (
    <div
      className={`fixed left-1/2 top-4 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 transition-all duration-300 lg:left-[calc(50%+3rem)] ${
        isVisible
          ? 'pointer-events-auto translate-y-0 opacity-100'
          : 'pointer-events-none -translate-y-4 opacity-0'
      }`}
    >
      <SearchInput searchQuery={searchQuery} onSearchChange={onSearchChange} />
    </div>
  )
}

export default FloatingSearchBar
