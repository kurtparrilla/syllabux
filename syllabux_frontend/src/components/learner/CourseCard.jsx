const badgeClasses = {
  primary: 'bg-primary text-on-primary',
  sky: 'bg-sky-blue text-on-secondary-container',
  tan: 'bg-earth-tan text-white',
}

import { useNavigate } from 'react-router-dom'

function CourseCard({ course }) {
  const navigate = useNavigate()
  const shouldShowProgress =
    course.isEnrolled &&
    typeof course.progressPercent === 'number' &&
    course.progressPercent >= 0

  const openCourse = () => {
    if (course.isEnrolled) {
      navigate(`/learn/courses/${course.id}`)
    }
  }

  return (
    <article
      className={`${
        course.elevated ? 'glass-panel-elevated' : 'glass-panel'
      } flex flex-col rounded-3xl p-6 transition-transform duration-300 ${
        course.isEnrolled
          ? 'cursor-pointer hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary/20'
          : ''
      } md:p-8`}
      role={course.isEnrolled ? 'link' : undefined}
      tabIndex={course.isEnrolled ? 0 : undefined}
      aria-label={course.isEnrolled ? `open ${course.title}` : undefined}
      onClick={openCourse}
      onKeyDown={(event) => {
        if (course.isEnrolled && (event.key === 'Enter' || event.key === ' ')) {
          event.preventDefault()
          openCourse()
        }
      }}
    >
      <div className="mb-6 flex items-start justify-between gap-4">
        <span
          className={`rounded-full px-4 py-1 font-label-sm lowercase ${
            badgeClasses[course.badge.tone]
          }`}
        >
          {course.badge.label}
        </span>

        <span className="font-label-md text-primary">{course.ratingLabel}</span>
      </div>

      <div className="mb-8 flex flex-col gap-6 sm:flex-row sm:items-center">
        <div className="h-24 w-24 shrink-0 overflow-hidden rounded-2xl border border-glass-border">
          <img className="h-full w-full object-cover" src={course.imageUrl} alt="" />
        </div>
        <div>
          <h2 className="mb-2 font-headline-md text-headline-md lowercase text-primary">
            {course.title}
          </h2>
          <p className="line-clamp-2 font-body-md lowercase text-on-surface-variant">
            {course.description}
          </p>
        </div>
      </div>

      <div className="mb-8 flex flex-wrap items-center gap-6 text-on-surface-variant">
        {course.metadata.map((item) => (
          <div key={`${course.id}-${item.label}`} className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
            <span className="font-label-sm">{item.label}</span>
          </div>
        ))}
      </div>

      <div className="mt-auto flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <button
          className={`rounded-full px-8 py-3 font-label-md lowercase transition-colors ${
            course.action.variant === 'primary'
              ? 'bg-primary text-on-primary hover:bg-tertiary'
              : 'border border-primary/20 bg-white text-primary hover:bg-primary/5'
          }`}
          type="button"
          onClick={(event) => {
            event.stopPropagation()
            openCourse()
          }}
        >
          {course.action.label}
        </button>

        {shouldShowProgress && (
          <div
            className="h-1.5 w-full overflow-hidden rounded-full bg-surface-container sm:w-32"
            role="progressbar"
            aria-label={`${course.title} progress`}
            aria-valuemin="0"
            aria-valuemax="100"
            aria-valuenow={course.progressPercent}
          >
            <div
              className="h-full rounded-full bg-primary"
              style={{ width: `${course.progressPercent}%` }}
            />
          </div>
        )}
      </div>
    </article>
  )
}

export default CourseCard
