import { useMemo } from 'react'
import CourseManagement from '../components/instructor/CourseManagement'
import EngagementPanel from '../components/instructor/EngagementPanel'
import FeedbackPanel from '../components/instructor/FeedbackPanel'
import InstructorSideNav from '../components/instructor/InstructorSideNav'
import InstructorTopNav from '../components/instructor/InstructorTopNav'
import OverviewSection from '../components/instructor/OverviewSection'
import SchedulePanel from '../components/instructor/SchedulePanel'
import { getInstructorDashboardData } from '../data/instructorDashboard'
import { useAuth } from '../auth/authContext'

function InstructorDashboard() {
  const { user } = useAuth()
  const dashboard = useMemo(() => {
    const data = getInstructorDashboardData()
    return {
      ...data,
      instructor: {
        ...data.instructor,
        id: user.user_id,
        name: `${user.first_name} ${user.last_name}`.trim(),
      },
    }
  }, [user])

  return (
    <div className="min-h-screen overflow-x-hidden bg-background font-body-md text-on-background">
      <InstructorTopNav
        instructor={dashboard.instructor}
        topNav={dashboard.topNav}
      />
      <InstructorSideNav navigation={dashboard.navigation} />

      <main className="mx-auto max-w-screen-2xl px-margin-mobile pb-20 pt-24 md:px-margin-desktop lg:pl-28">
        <OverviewSection hero={dashboard.hero} stats={dashboard.stats} />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-12">
          <CourseManagement courses={dashboard.courses} />
          <SchedulePanel schedule={dashboard.schedule} />
          <EngagementPanel engagement={dashboard.engagement} />
          <FeedbackPanel feedback={dashboard.feedback} />
        </div>
      </main>
    </div>
  )
}

export default InstructorDashboard
