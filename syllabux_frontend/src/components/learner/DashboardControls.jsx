function DashboardControls({ onOpenFilters }) {
  return (
    <div className="mb-8 flex justify-end">
      <button
        className="flex items-center gap-2 rounded-full border border-primary/10 bg-white/50 px-5 py-2.5 font-label-md lowercase text-primary shadow-glass backdrop-blur-xl transition-colors hover:bg-white/70"
        type="button"
        onClick={onOpenFilters}
      >
        <span className="material-symbols-outlined text-[18px]">tune</span>
        filters
      </button>
    </div>
  )
}

export default DashboardControls
