import { useEffect, useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import CourseNavigation from '../components/learner/course/CourseNavigation'
import CourseOutline from '../components/learner/course/CourseOutline'
import LessonBlocks from '../components/learner/course/LessonBlocks'
import LessonProgress from '../components/learner/course/LessonProgress'
import {
  completeLesson,
  CourseServiceError,
  getCourse,
  getCourseCurriculum,
  getLearnerCourseProgress,
  getLesson,
} from '../services/courseService'
import { useAuth } from '../auth/authContext'

function getInitials(user) {
  return `${user.first_name.charAt(0)}${user.last_name.charAt(0)}`.toUpperCase()
}

function CourseLoadingState() {
  return (
    <div
      className="flex min-h-screen items-center justify-center bg-background"
      role="status"
    >
      <div className="text-center">
        <span className="material-symbols-outlined animate-spin text-4xl text-primary">
          progress_activity
        </span>
        <p className="mt-3 font-label-md text-on-surface-variant">
          loading course...
        </p>
      </div>
    </div>
  )
}

function CourseErrorState({ error }) {
  const message =
    error instanceof CourseServiceError
      ? error.message
      : 'The course could not be loaded. Please try again.'

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-6">
      <div className="glass-panel max-w-lg rounded-3xl p-8 text-center">
        <span className="material-symbols-outlined text-5xl text-primary">
          menu_book
        </span>
        <h1 className="mt-4 font-headline-md text-headline-md text-primary">
          Course unavailable
        </h1>
        <p className="my-4 text-on-surface-variant">{message}</p>
        <Link
          className="inline-flex rounded-full bg-primary px-6 py-3 font-label-md text-on-primary"
          to="/learn/dashboard"
        >
          return to courses
        </Link>
      </div>
    </div>
  )
}

function LearnerCoursePage() {
  const { courseId, lessonId } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [course, setCourse] = useState(null)
  const [curriculum, setCurriculum] = useState([])
  const [lesson, setLesson] = useState(null)
  const [progress, setProgress] = useState(null)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isCompleting, setIsCompleting] = useState(false)
  const [isNavigationOpen, setIsNavigationOpen] = useState(false)
  const [isOutlineOpen, setIsOutlineOpen] = useState(false)
  const [syllabusQuery, setSyllabusQuery] = useState('')

  useEffect(() => {
    let isCurrent = true

    async function loadCourse() {
      setIsLoading(true)
      setError(null)

      try {
        if (!lessonId) {
          const courseProgress = await getLearnerCourseProgress(courseId)
          if (isCurrent) {
            navigate(
              `/learn/courses/${courseId}/lessons/${courseProgress.activeLessonId}`,
              { replace: true },
            )
          }
          return
        }

        const [courseData, curriculumData, lessonData, progressData] =
          await Promise.all([
            getCourse(courseId),
            getCourseCurriculum(courseId),
            getLesson(courseId, lessonId),
            getLearnerCourseProgress(courseId),
          ])

        if (!isCurrent) return
        setCourse(courseData)
        setCurriculum(curriculumData)
        setLesson(lessonData)
        setProgress(progressData)
      } catch (loadError) {
        if (isCurrent) setError(loadError)
      } finally {
        if (isCurrent) setIsLoading(false)
      }
    }

    loadCourse()
    return () => {
      isCurrent = false
    }
  }, [courseId, lessonId, navigate])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [lessonId])

  const searchableLessons = useMemo(
    () =>
      curriculum.flatMap((module) =>
        module.lessons.map((item) => ({
          ...item,
          moduleTitle: module.title,
        })),
      ),
    [curriculum],
  )

  const searchResults = useMemo(() => {
    const normalizedQuery = syllabusQuery.trim().toLowerCase()
    if (!normalizedQuery) return []
    return searchableLessons
      .filter((item) => item.title.toLowerCase().includes(normalizedQuery))
      .slice(0, 5)
  }, [searchableLessons, syllabusQuery])

  const selectLesson = (selectedLessonId) => {
    setSyllabusQuery('')
    setIsOutlineOpen(false)
    navigate(`/learn/courses/${courseId}/lessons/${selectedLessonId}`)
  }

  const handleComplete = async () => {
    if (!lesson || isCompleting) return
    setIsCompleting(true)

    try {
      const updatedProgress = await completeLesson(courseId, lesson.id)
      if (updatedProgress.nextLessonId) {
        navigate(
          `/learn/courses/${courseId}/lessons/${updatedProgress.nextLessonId}`,
        )
      } else {
        const [updatedCurriculum, latestProgress] = await Promise.all([
          getCourseCurriculum(courseId),
          getLearnerCourseProgress(courseId),
        ])
        setCurriculum(updatedCurriculum)
        setProgress(latestProgress)
        setLesson((current) => ({ ...current, isCompleted: true }))
      }
    } catch (completionError) {
      setError(completionError)
    } finally {
      setIsCompleting(false)
    }
  }

  if (isLoading || (!lessonId && !error)) return <CourseLoadingState />
  if (error || !course || !lesson || !progress) {
    return <CourseErrorState error={error} />
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_70%_20%,#ffffff_0%,#f9f9f8_42%,#ece0dc_100%)] text-on-surface">
      <CourseNavigation
        isOpen={isNavigationOpen}
        onClose={() => setIsNavigationOpen(false)}
        onContinue={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      />

      <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-glass-border bg-white/75 px-4 backdrop-blur-xl lg:ml-64 md:px-8">
        <div className="flex items-center gap-2">
          <button
            className="rounded-full p-2 text-primary lg:hidden"
            type="button"
            aria-label="open course navigation"
            onClick={() => setIsNavigationOpen(true)}
          >
            <span className="material-symbols-outlined">menu</span>
          </button>
          <button
            className="rounded-full p-2 text-primary xl:hidden"
            type="button"
            aria-label="open course outline"
            onClick={() => setIsOutlineOpen(true)}
          >
            <span className="material-symbols-outlined">menu_book</span>
          </button>
          <nav className="hidden items-center gap-6 md:flex" aria-label="Course links">
            <Link className="text-on-surface-variant hover:text-primary" to="/learn/dashboard">
              my courses
            </Link>
            <span className="border-b-2 border-primary pb-1 text-primary">
              library
            </span>
            <span className="text-on-surface-variant">mentors</span>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative hidden sm:block">
            <span className="material-symbols-outlined pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-[18px] text-outline">
              search
            </span>
            <input
              className="w-48 rounded-full border-0 bg-surface-container-low py-2 pl-10 pr-4 font-label-md outline-none focus:ring-2 focus:ring-primary/10 lg:w-64"
              placeholder="Search syllabus..."
              value={syllabusQuery}
              onChange={(event) => setSyllabusQuery(event.target.value)}
            />
            {searchResults.length > 0 && (
              <div className="absolute right-0 top-12 w-72 rounded-2xl border border-glass-border bg-white/95 p-2 shadow-glass backdrop-blur-xl">
                {searchResults.map((result) => (
                  <button
                    key={result.id}
                    className="w-full rounded-xl px-3 py-2 text-left hover:bg-surface-container-low disabled:opacity-50"
                    type="button"
                    disabled={result.isLocked}
                    onClick={() => selectLesson(result.id)}
                  >
                    <span className="block font-label-md text-primary">
                      {result.title}
                    </span>
                    <span className="font-label-sm text-outline">
                      {result.moduleTitle}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            className="material-symbols-outlined text-on-surface-variant hover:text-primary"
            type="button"
            aria-label="notifications"
          >
            notifications
          </button>
          <div
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white bg-earth-tan text-xs font-bold text-on-primary"
            aria-label={`${user.first_name} ${user.last_name} profile`}
          >
            {getInitials(user)}
          </div>
        </div>
      </header>

      <CourseOutline
        activeLessonId={lesson.id}
        course={course}
        curriculum={curriculum}
        isOpen={isOutlineOpen}
        onClose={() => setIsOutlineOpen(false)}
        onSelectLesson={selectLesson}
      />

      <main className="min-h-[calc(100vh-4rem)] lg:ml-64 xl:ml-[36rem]">
        <div className="mx-auto max-w-5xl px-4 py-8 md:px-8 md:py-12">
          <nav
            className="mb-6 flex flex-wrap items-center gap-2 font-label-md text-outline"
            aria-label="Breadcrumb"
          >
            <span>{course.title}</span>
            <span className="material-symbols-outlined text-xs">
              chevron_right
            </span>
            <span>{lesson.moduleTitle}</span>
            <span className="material-symbols-outlined text-xs">
              chevron_right
            </span>
            <span className="font-bold text-primary">{lesson.title}</span>
          </nav>

          <section className="group relative mb-10 overflow-hidden rounded-2xl border border-glass-border bg-white/40 shadow-sm">
            <img
              className="aspect-video w-full object-cover opacity-75 transition-transform duration-700 group-hover:scale-[1.02]"
              src={course.imageUrl}
              alt={`${course.title} learning environment`}
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/5">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/90 text-primary shadow-xl">
                <span className="material-symbols-outlined text-4xl">
                  play_arrow
                </span>
              </div>
            </div>
          </section>

          <div className="mb-10">
            <span className="font-label-sm uppercase tracking-widest text-outline">
              {course.category} · {course.instructor.name}
            </span>
            <h1 className="mt-2 font-display-lg text-headline-lg-mobile text-primary md:text-headline-lg">
              {lesson.title}
            </h1>
            <p className="mt-3 font-body-lg text-on-surface-variant">
              {lesson.summary}
            </p>
          </div>

          <LessonBlocks blocks={lesson.blocks} />
        </div>

        <LessonProgress
          isCompleting={isCompleting}
          lesson={lesson}
          onComplete={handleComplete}
          onPrevious={() => selectLesson(lesson.previousLessonId)}
          progress={progress}
        />
      </main>
    </div>
  )
}

export default LearnerCoursePage
