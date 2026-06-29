import CourseCard from './CourseCard'

function CourseGrid({ courses }) {
  if (courses.length === 0) {
    return (
      <div className="glass-panel rounded-3xl px-6 py-14 text-center">
        <h2 className="mb-2 font-headline-md text-headline-md lowercase text-primary">
          no courses found
        </h2>
        <p className="font-body-md lowercase text-on-surface-variant">
          try searching for another course path.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  )
}

export default CourseGrid
