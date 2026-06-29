function LessonProgress({
  isCompleting,
  lesson,
  onComplete,
  onPrevious,
  progress,
}) {
  return (
    <footer className="sticky bottom-0 z-20 border-t border-glass-border bg-white/85 px-4 py-4 backdrop-blur-xl md:px-8">
      <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4">
        <button
          className="flex items-center gap-2 font-label-md text-on-surface-variant transition hover:text-primary disabled:cursor-not-allowed disabled:opacity-40"
          type="button"
          disabled={!lesson.previousLessonId}
          onClick={onPrevious}
        >
          <span className="material-symbols-outlined">west</span>
          <span className="hidden sm:inline">Previous Lesson</span>
        </button>

        <div className="order-3 flex w-full flex-col items-center gap-1 sm:order-none sm:w-auto">
          <div
            className="h-1 w-full overflow-hidden rounded-full bg-surface-container-high sm:w-48"
            role="progressbar"
            aria-label="course progress"
            aria-valuemin="0"
            aria-valuemax="100"
            aria-valuenow={progress.percent}
          >
            <div
              className="h-full rounded-full bg-primary transition-all duration-500"
              style={{ width: `${progress.percent}%` }}
            />
          </div>
          <span className="text-[10px] uppercase tracking-widest text-outline">
            {progress.percent}% complete
          </span>
        </div>

        <button
          className="rounded-full bg-primary px-5 py-2.5 font-label-md text-white shadow-lg shadow-primary/20 transition hover:bg-primary-container disabled:cursor-wait disabled:opacity-60 md:px-8"
          type="button"
          disabled={isCompleting}
          onClick={onComplete}
        >
          {isCompleting
            ? 'saving...'
            : lesson.nextLessonId
              ? 'Complete & Continue'
              : lesson.isCompleted
                ? 'Course Complete'
                : 'Complete Course'}
        </button>
      </div>
    </footer>
  )
}

export default LessonProgress
