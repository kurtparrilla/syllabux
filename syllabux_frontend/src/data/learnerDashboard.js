export const learnerDashboardData = {
  learner: {
    id: 'learner_001',
    name: 'alex rivera',
    planLabel: 'pro learner',
    avatarUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC28sHuGrqztS2zlZr9671VS_nhcXVY2-p_Z5k3khfMiZT3f-60OcheoSIPDVeRAxZjwvq4DbU_sgfoBlDOQAjj4R-SOByaAle48flwxVEsAGJXod_M7fRCJdGe4-zfAX3BtbTRPM0kgBGfwNaW99XNTQZR6IMbaUBDUCj_IWcvy2TT-Os2TXPmmZmq2t9cNl3jxNSLh8qXuyr40l0aApzKLvSqm6AORt8H2gDrF0rfLLqYwQrARHLoz5rutHrcaOv-g8T6IJuDxr4P',
    streakDays: 3,
    notificationCount: 6,
  },
  navigation: [
    { id: 'home', label: 'home', icon: 'home', href: '/learn/dashboard' },
    {
      id: 'courses',
      label: 'courses',
      icon: 'school',
      href: '/learn/dashboard',
      active: true,
    },
    { id: 'progress', label: 'progress', icon: 'trending_up', href: '/learn/dashboard' },
    {
      id: 'calendar',
      label: 'calendar',
      icon: 'calendar_today',
      href: '/learn/dashboard',
    },
    { id: 'chat', label: 'chat', icon: 'chat_bubble', href: '/learn/dashboard' },
    { id: 'english', label: 'english', icon: 'language', href: '/learn/dashboard' },
    { id: 'jobs', label: 'jobs', icon: 'work', href: '/learn/dashboard' },
  ],
  hero: {
    title: 'level up your skills',
    subtitle:
      'explore top courses, learn from industry experts, and build job-ready skills for your future!',
  },
  courses: [
    {
      id: 'course_ui_ux',
      title: 'ui/ux designer',
      description: 'master the principles of user interface and user experience design.',
      badge: { label: 'student', tone: 'primary' },
      imageUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDVIN8ka56K6CfGgVBqE5Gca2yOFavbuaEfxx9-Xl5Rc9AoCBBkCGFlxQHvnvAUrfvATDcXJQ2Hk6hXNMNPmTTsV9nzNkw9MaAxTrysvrfCh4VPECJUZ4Jcy1MUD5lxrPeArgu9OPBnkfRHbkqp0hMcfFSrZcgMASj1MnNN5QSCwDOz1UH-AIBYtcINQ-8HxWLZ5ZbVPumBULTy7i7Co4FZyg_MiDGLbkYXO3vTM3hL__SUJl_iXmCrJDU0NUVsrg9YuhyBqaTyk7-o',
      ratingLabel: '4.8/5',
      isEnrolled: true,
      progressPercent: 72,
      metadata: [
        { icon: 'list_alt', label: '350 tasks' },
        { icon: 'folder', label: '3 projects' },
      ],
      action: { label: 'continue', variant: 'primary' },
    },
    {
      id: 'course_qa',
      title: 'qa engineer',
      description: 'learn the fundamentals of quality assurance and software testing.',
      badge: { label: 'recommended', tone: 'sky' },
      imageUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCNqcYJcKMOKG0qp1r2rzIbizDTwpef8bk9_9xzazyzwNKglrIZTefo3ZW9hD3wF5PNupPM6vCa0c_F2gzPEYuMIQnhaTCJAWGBTGvL5_grgyXTUqcekHQW91X7Xeds9A8vq5HQMf9ki-In9XLdz4fJjAJWWbU15_Pu0EL-kk-p55rJP77KWfUR8oJ9tTy5JH4UGelPWlvCKrP_59gGh768mf3vixJ4XjmFtC7n6XB4QLZVrEim6QUM_L5VwXeLri0qMc6y8fadC_SG',
      ratingLabel: '4.7/5',
      isEnrolled: false,
      startDateLabel: 'start date: 20 july',
      elevated: true,
      metadata: [
        { icon: 'list_alt', label: '622 tasks' },
        { icon: 'folder', label: '4 projects' },
      ],
      action: { label: 'apply', variant: 'secondary' },
    },
    {
      id: 'course_recruiter',
      title: 'recruiter',
      description: 'understand the hiring process, talent sourcing, and team building.',
      badge: { label: 'popular', tone: 'tan' },
      imageUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuDzkN4mH_ittNghJaycQTS-UWOl0ywlPz1gOXoQsOQW5UocHm12vt1-cxU8INVmKSA8CaW-_hZEao30IVyhy0c4OSyrken69nf5z2UpwGf6TFh0rmCTJcON4GJJb0DDpqRdhGKXkmRRGVGmyHEg_XSM2eOgg-wrPPTjsto3avsVxWkaN5szJCqLT3OW301OTSC1hSRXlVU2EJd0txudNXwpfb7DmXaOdbcvIp1wXOmgQFYEkbVGZg9dTTD8rjkxP5aw2iFuZkGaYvzr',
      ratingLabel: '4.8/5',
      isEnrolled: false,
      metadata: [
        { icon: 'group', label: '2k students' },
        { icon: 'star', label: '4.8 rating' },
      ],
      action: { label: 'view details', variant: 'secondary' },
    },
    {
      id: 'course_frontend',
      title: 'front-end developer',
      description: 'build stunning and responsive websites using modern web technologies.',
      badge: { label: 'student', tone: 'primary' },
      imageUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCHgWjxHqS0yNAyyNH6jDE3dzhMy8Rc37nnLuv6lH-aFf2JH6bBfFzVEqujZ1FPPKCfMZeiUCJVcUjE_OjwTS7AwXx48WcYe0FR_K-h3tfgdorAMvYtRI6RenyuP_ulAZNRc4PqahhS7Qrdk8QDoHUpxvhPcj35on_dGQdxtvbdCpdcFJnpzt369AV2CZnGERzz2GWs65ZCc_TBZGXOVVgZylONrEXHhsDgAhldbU5KFOwa_TmfkEaNZEkp4ESZGPCqx3iZfu3dU1la',
      ratingLabel: '4.9/5',
      isEnrolled: true,
      progressPercent: 45,
      metadata: [
        { icon: 'code', label: '480 exercises' },
        { icon: 'terminal', label: '8 labs' },
      ],
      action: { label: 'continue', variant: 'primary' },
    },
  ],
  filters: {
    active: ['intermediate', 'english', '6+ months'],
    groups: [
      {
        id: 'difficulty',
        label: 'difficulty level',
        options: [
          { id: 'beginner', label: 'beginner', checked: false },
          { id: 'intermediate', label: 'intermediate', checked: true },
          { id: 'advanced', label: 'advanced', checked: false },
        ],
      },
      {
        id: 'duration',
        label: 'course duration',
        options: [
          { id: 'less_than_1_month', label: 'less than 1 month', checked: false },
          { id: '1_to_3_months', label: '1-3 months', checked: false },
          { id: '6_plus_months', label: '6+ months', checked: true },
        ],
      },
      {
        id: 'popularity',
        label: 'popularity',
        options: [
          { id: 'most_enrolled', label: 'most enrolled', checked: false },
          { id: 'highest_rated', label: 'highest rated', checked: false },
        ],
      },
      {
        id: 'language',
        label: 'language',
        options: [
          { id: 'english', label: 'english', checked: true },
          { id: 'spanish', label: 'spanish', checked: false },
          { id: 'german', label: 'german', checked: false },
        ],
      },
    ],
  },
}

export function getLearnerDashboardData() {
  return learnerDashboardData
}
