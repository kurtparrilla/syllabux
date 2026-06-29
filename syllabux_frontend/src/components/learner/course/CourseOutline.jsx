import { useMemo, useState } from 'react'

const lessonIcons = {
  activity: 'extension',
  document: 'description',
  quiz: 'check_circle',
  video: 'play_circle',
}

function CourseOutline({
  activeLessonId,
  course,
  curriculum,
  isOpen,
  onClose,
  onSelectLesson,
}) {
  const [activeTab, setActiveTab] = useState('outline')
  const [query, setQuery] = useState('')
  const [collapsedModules, setCollapsedModules] = useState({})

  const filteredModules = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase()
    if (!normalizedQuery) return curriculum

    return curriculum
      .map((module) => ({
        ...module,
        lessons: module.lessons.filter((lesson) =>
          lesson.title.toLowerCase().includes(normalizedQuery),
        ),
      }))
      .filter((module) => module.lessons.length > 0)
  }, [curriculum, query])

  const resources = useMemo(
    () =>
      curriculum.flatMap((module) =>
        module.lessons
          .filter((lesson) => ['activity', 'document'].includes(lesson.type))
          .map((lesson) => ({ ...lesson, moduleTitle: module.title })),
      ),
    [curriculum],
  )

  return (
    <>
      <button
        className={`fixed inset-0 z-30 bg-primary/20 backdrop-blur-sm transition-opacity xl:hidden ${
          isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        type="button"
        aria-label="close course outline"
        onClick={onClose}
      />
      <aside
        className={`fixed bottom-0 left-0 top-16 z-40 flex w-80 flex-col border-r border-glass-border bg-white/85 backdrop-blur-2xl transition-transform duration-300 lg:left-64 xl:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        aria-label="Course outline"
      >
        <div className="border-b border-glass-border p-5">
          <div className="mb-4 flex items-center justify-between xl:hidden">
            <p className="font-label-md text-primary">{course.title}</p>
            <button
              className="rounded-full p-1 text-primary"
              type="button"
              aria-label="close course outline"
              onClick={onClose}
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>
          <div className="mb-4 flex gap-2 rounded-lg bg-surface-container-low p-1">
            {['outline', 'resources'].map((tab) => (
              <button
                key={tab}
                className={`flex-1 rounded-md px-3 py-2 font-label-md transition ${
                  activeTab === tab
                    ? 'bg-white text-primary shadow-sm'
                    : 'text-on-surface-variant hover:bg-white/50'
                }`}
                type="button"
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
          {activeTab === 'outline' && (
            <label className="relative block">
              <span className="sr-only">find module</span>
              <span className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-[18px] text-outline">
                filter_list
              </span>
              <input
                className="w-full rounded-lg border border-glass-border bg-white/50 py-2 pl-10 pr-3 font-label-md outline-none focus:border-primary focus:ring-2 focus:ring-primary/10"
                placeholder="Find module..."
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </label>
          )}
        </div>

        <div className="flex-1 space-y-5 overflow-y-auto p-4">
          {activeTab === 'outline' ? (
            filteredModules.map((module) => {
              const isCollapsed = collapsedModules[module.id]
              return (
                <section key={module.id}>
                  <button
                    className="flex w-full items-center justify-between gap-3 py-1 text-left"
                    type="button"
                    aria-expanded={!isCollapsed}
                    onClick={() =>
                      setCollapsedModules((current) => ({
                        ...current,
                        [module.id]: !current[module.id],
                      }))
                    }
                  >
                    <span className="font-label-md uppercase tracking-wider text-on-surface">
                      {String(module.order).padStart(2, '0')}. {module.title}
                    </span>
                    <span className="material-symbols-outlined text-[18px] text-outline">
                      {isCollapsed ? 'chevron_right' : 'expand_more'}
                    </span>
                  </button>

                  {!isCollapsed && (
                    <div className="mt-2 space-y-1 border-l border-outline-variant/50 pl-2">
                      {module.lessons.map((lesson) => (
                        <button
                          key={lesson.id}
                          className={`flex w-full items-center gap-3 rounded-lg border p-2 text-left transition ${
                            lesson.id === activeLessonId
                              ? 'border-primary/20 bg-primary-container/10 text-primary'
                              : 'border-transparent text-on-surface-variant hover:bg-surface-container-low'
                          } ${lesson.isLocked ? 'cursor-not-allowed opacity-50' : ''}`}
                          type="button"
                          disabled={lesson.isLocked}
                          onClick={() => onSelectLesson(lesson.id)}
                        >
                          <span className="material-symbols-outlined text-[19px]">
                            {lesson.isLocked
                              ? 'lock'
                              : lesson.isCompleted
                                ? 'check_circle'
                                : lessonIcons[lesson.type] ?? 'play_circle'}
                          </span>
                          <span className="font-label-md">{lesson.title}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </section>
              )
            })
          ) : (
            <div className="space-y-2">
              {resources.length > 0 ? (
                resources.map((lesson) => (
                  <button
                    key={lesson.id}
                    className="w-full rounded-xl border border-glass-border bg-white/40 p-3 text-left transition hover:bg-white/70 disabled:opacity-50"
                    type="button"
                    disabled={lesson.isLocked}
                    onClick={() => onSelectLesson(lesson.id)}
                  >
                    <span className="font-label-sm uppercase tracking-wider text-outline">
                      {lesson.moduleTitle}
                    </span>
                    <span className="mt-1 block font-label-md text-primary">
                      {lesson.title}
                    </span>
                  </button>
                ))
              ) : (
                <p className="p-4 text-center text-on-surface-variant">
                  No course resources yet.
                </p>
              )}
            </div>
          )}
        </div>
      </aside>
    </>
  )
}

export default CourseOutline
