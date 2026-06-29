import { learnerCourses } from '../data/learnerCourses'

const STORAGE_PREFIX = 'syllabux:course-progress:'
const latency = 120

export class CourseServiceError extends Error {
  constructor(code, message) {
    super(message)
    this.name = 'CourseServiceError'
    this.code = code
  }
}

function wait() {
  return new Promise((resolve) => window.setTimeout(resolve, latency))
}

function getCourseRecord(courseId) {
  const course = learnerCourses[courseId]

  if (!course) {
    throw new CourseServiceError('NOT_FOUND', 'Course not found.')
  }

  return course
}

function getLessons(course) {
  return course.modules.flatMap((module) =>
    module.lessons.map((lesson) => ({
      ...lesson,
      moduleId: module.id,
      moduleTitle: module.title,
    })),
  )
}

function readStoredProgress(course) {
  const fallback = {
    completedLessonIds: course.initialCompletedLessonIds,
    lastLessonId: null,
  }

  try {
    const value = window.localStorage.getItem(`${STORAGE_PREFIX}${course.id}`)
    return value ? { ...fallback, ...JSON.parse(value) } : fallback
  } catch {
    return fallback
  }
}

function writeStoredProgress(courseId, progress) {
  window.localStorage.setItem(
    `${STORAGE_PREFIX}${courseId}`,
    JSON.stringify(progress),
  )
}

function buildProgress(course) {
  const lessons = getLessons(course)
  const stored = readStoredProgress(course)
  const validLessonIds = new Set(lessons.map((lesson) => lesson.id))
  const completedLessonIds = [
    ...new Set(
      stored.completedLessonIds.filter((lessonId) =>
        validLessonIds.has(lessonId),
      ),
    ),
  ]
  const firstIncompleteLesson = lessons.find(
    (lesson) => !completedLessonIds.includes(lesson.id),
  )
  const activeLessonId =
    (validLessonIds.has(stored.lastLessonId) && stored.lastLessonId) ||
    firstIncompleteLesson?.id ||
    lessons[lessons.length - 1]?.id

  return {
    courseId: course.id,
    completedLessonIds,
    activeLessonId,
    completedCount: completedLessonIds.length,
    totalCount: lessons.length,
    percent:
      lessons.length === 0
        ? 0
        : Math.round((completedLessonIds.length / lessons.length) * 100),
  }
}

function isLessonUnlocked(lessons, lessonIndex, completedLessonIds) {
  return (
    lessonIndex === 0 ||
    completedLessonIds.includes(lessons[lessonIndex - 1].id)
  )
}

export async function getCourse(courseId) {
  await wait()
  const course = getCourseRecord(courseId)
  return {
    id: course.id,
    title: course.title,
    category: course.category,
    description: course.description,
    imageUrl: course.imageUrl,
    instructor: course.instructor,
  }
}

export async function getCourseCurriculum(courseId) {
  await wait()
  const course = getCourseRecord(courseId)
  const progress = buildProgress(course)
  const lessons = getLessons(course)
  let lessonIndex = 0

  return course.modules.map((module) => ({
    id: module.id,
    title: module.title,
    order: module.order,
    lessons: module.lessons.map((lesson) => {
      const enrichedLesson = {
        id: lesson.id,
        title: lesson.title,
        type: lesson.type,
        isCompleted: progress.completedLessonIds.includes(lesson.id),
        isLocked: !isLessonUnlocked(
          lessons,
          lessonIndex,
          progress.completedLessonIds,
        ),
      }
      lessonIndex += 1
      return enrichedLesson
    }),
  }))
}

export async function getLesson(courseId, lessonId) {
  await wait()
  const course = getCourseRecord(courseId)
  const lessons = getLessons(course)
  const lessonIndex = lessons.findIndex((lesson) => lesson.id === lessonId)

  if (lessonIndex === -1) {
    throw new CourseServiceError('LESSON_NOT_FOUND', 'Lesson not found.')
  }

  const progress = buildProgress(course)

  if (!isLessonUnlocked(lessons, lessonIndex, progress.completedLessonIds)) {
    throw new CourseServiceError(
      'LESSON_LOCKED',
      'Complete the previous lesson to unlock this one.',
    )
  }

  const lesson = lessons[lessonIndex]
  const nextLesson = lessons[lessonIndex + 1]
  const previousLesson = lessons[lessonIndex - 1]
  const nextProgress = {
    completedLessonIds: progress.completedLessonIds,
    lastLessonId: lesson.id,
  }
  writeStoredProgress(courseId, nextProgress)

  return {
    ...lesson,
    isCompleted: progress.completedLessonIds.includes(lesson.id),
    previousLessonId: previousLesson?.id ?? null,
    nextLessonId: nextLesson?.id ?? null,
  }
}

export async function getLearnerCourseProgress(courseId) {
  await wait()
  return buildProgress(getCourseRecord(courseId))
}

export async function completeLesson(courseId, lessonId) {
  await wait()
  const course = getCourseRecord(courseId)
  const lessons = getLessons(course)
  const lessonIndex = lessons.findIndex((lesson) => lesson.id === lessonId)

  if (lessonIndex === -1) {
    throw new CourseServiceError('LESSON_NOT_FOUND', 'Lesson not found.')
  }

  const progress = buildProgress(course)

  if (!isLessonUnlocked(lessons, lessonIndex, progress.completedLessonIds)) {
    throw new CourseServiceError('LESSON_LOCKED', 'Lesson is locked.')
  }

  const completedLessonIds = [
    ...new Set([...progress.completedLessonIds, lessonId]),
  ]
  const nextLessonId = lessons[lessonIndex + 1]?.id ?? null
  writeStoredProgress(courseId, {
    completedLessonIds,
    lastLessonId: nextLessonId ?? lessonId,
  })

  return {
    ...buildProgress(course),
    nextLessonId,
  }
}
