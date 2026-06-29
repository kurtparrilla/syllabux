export const instructorDashboardData = {
  instructor: {
    id: 'instructor_001',
    name: 'Prof. Aristhène',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuBmeB4QQX7biBdIBaI6LcvN8JYIJ5u3t0r7f7x84FVahgxqy7XtPRdhB2rAp0AnCrqHOD23iN1H3MV-SRBZMIjRpwq2QVY1bGpGTql8a1NW7SmkLmbB4xv31jGoP48woavIB6iGOPd_T9JDDf0sOn18fHrK6VFIay14MJFyxpfOoa-SXtwht2ciws6JEn6lTuQqyKxYAw4lEEa0NZ1jOwVav3g6gOLa-FK8GTJPQpGZVF5eDYobu02U9gxbWAWr0DrC98-weQQ5fJSp',
    notificationCount: 0,
  },
  topNav: [
    { id: 'explore', label: 'Explore', href: '/instructor/dashboard', active: true },
    { id: 'about', label: 'About', href: '/' },
    { id: 'help', label: 'Help', href: '/instructor/dashboard' },
  ],
  navigation: [
    { id: 'home', label: 'home', icon: 'home', href: '/instructor/dashboard', active: true },
    { id: 'courses', label: 'courses', icon: 'school', href: '/instructor/dashboard' },
    {
      id: 'progress',
      label: 'progress',
      icon: 'trending_up',
      href: '/instructor/dashboard',
    },
    {
      id: 'calendar',
      label: 'calendar',
      icon: 'calendar_today',
      href: '/instructor/dashboard',
    },
    { id: 'chat', label: 'chat', icon: 'chat_bubble', href: '/instructor/dashboard' },
    { id: 'students', label: 'students', icon: 'group', href: '/instructor/dashboard' },
    { id: 'analytics', label: 'analytics', icon: 'insights', href: '/instructor/dashboard' },
  ],
  hero: {
    title: 'welcome back, professor',
    subtitle:
      'the quiet hum of discovery awaits. here is the state of your academic ecosystem today.',
  },
  stats: [
    { id: 'students', label: 'Total Students', value: '1,248' },
    { id: 'courses', label: 'Active Courses', value: '4' },
    { id: 'rating', label: 'Avg. Rating', value: '4.92' },
  ],
  courses: [
    {
      id: 'advanced_epistemology',
      title: 'Advanced Epistemology',
      statusLabel: 'In Progress',
      imageUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDxIdO0aDjMdU0S6ugaScW24_S7D9MAFYWcOZkeP4POuDIpS-I7RiuIyGJVOpKdKbmdxU0dMReajP_MN-RvszlqI_U4tpf4R1xcjdX5Jl1dTQTjridVX-9H8iDSRnakKkIYnvRXk7NlLlveW92QEeIuAmu3gxVsIAHkHRMyDG8C04hx_DHMvbZcZmoBdkCFnv8ke77-S6GXv_lLGado-vjLFaaDosFozvw_VuOG5rIHFpcq6kA18mGonb5ckcrKEWk3DuC-uGew7XhY',
      studentsLabel: '342 Students Enrolled',
      progressLabel: 'Term Progress',
      progressPercent: 65,
      action: { label: 'manage', variant: 'primary' },
    },
    {
      id: 'literary_deconstruction',
      title: 'Literary Deconstruction',
      statusLabel: 'Term B',
      imageUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuD0oSqb2leqvxaewAhHOi1UCu3Pfvw0TcbOiWkSrAjESyUGPwEf_nl9U5DfIvSPZVSdY_r5GpMjGIoBKdpT5RoDASKrF5OFWU1iT5XXm9t_j3zqIJJMEBHDbnzE7QaOVKzOdbthOVHugrnyjXTa08EG7UEZMmGQNyKvAD-mN5X9d3T0L1lhZieZGv8-qejEsEKIY6CptZFfPy1ICLWxJybD56uEXi4i_Huyi3lsehHNaH9I6LmGjr9Ob8nb6_tNhgy5qkcBcRUzzjqJ',
      studentsLabel: '512 Students Enrolled',
      progressLabel: 'Term Progress',
      progressPercent: 12,
      action: { label: 'manage', variant: 'secondary' },
    },
  ],
  schedule: {
    quote: '"The beautiful is that which, apart from a concept, pleases universally."',
    items: [
      {
        id: 'lecture_kantian_critique',
        day: '14',
        month: 'Oct',
        title: 'Live Lecture: Kantian Critique',
        detail: '10:00 AM - Virtual Room A',
        tone: 'secondary',
      },
      {
        id: 'grading_essay_1',
        day: '16',
        month: 'Oct',
        title: 'Grading Deadline: Essay 1',
        detail: '11:59 PM - Literary Studies',
        tone: 'tan',
      },
      {
        id: 'seminar_digital_humanities',
        day: '18',
        month: 'Oct',
        title: 'Seminar: Digital Humanities',
        detail: '2:00 PM - Main Hall',
        tone: 'secondary',
      },
    ],
  },
  engagement: {
    label: 'Weekly Engagement Index',
    value: '82.4%',
    deltaLabel: '+4.2%',
    range: 'week',
    bars: [
      { label: 'Mon', percent: 40 },
      { label: 'Tue', percent: 55 },
      { label: 'Wed', percent: 60 },
      { label: 'Thu', percent: 75 },
      { label: 'Fri', percent: 90 },
      { label: 'Sat', percent: 45 },
      { label: 'Sun', percent: 30 },
    ],
  },
  feedback: [
    {
      id: 'feedback_001',
      studentInitials: 'JL',
      studentName: 'Julien L.',
      timeAgo: '2h ago',
      message:
        'The lecture on phenomenological reduction was incredibly clear. Looking forward to the seminar.',
      highlight: true,
      tone: 'sky',
    },
    {
      id: 'feedback_002',
      studentInitials: 'MS',
      studentName: 'Mia S.',
      timeAgo: '5h ago',
      message:
        'Submitted my draft for the mid-term paper. Would appreciate early feedback on the thesis.',
      tone: 'tan',
    },
    {
      id: 'feedback_003',
      studentInitials: 'TK',
      studentName: 'Thomas K.',
      timeAgo: '1d ago',
      message:
        'Can we move the office hours to Wednesday? The current slot overlaps with Lit Theory.',
      tone: 'secondary',
    },
  ],
}

export function getInstructorDashboardData() {
  return instructorDashboardData
}
