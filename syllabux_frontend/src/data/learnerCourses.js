const courseImages = {
  course_ui_ux:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuDVIN8ka56K6CfGgVBqE5Gca2yOFavbuaEfxx9-Xl5Rc9AoCBBkCGFlxQHvnvAUrfvATDcXJQ2Hk6hXNMNPmTTsV9nzNkw9MaAxTrysvrfCh4VPECJUZ4Jcy1MUD5lxrPeArgu9OPBnkfRHbkqp0hMcfFSrZcgMASj1MnNN5QSCwDOz1UH-AIBYtcINQ-8HxWLZ5ZbVPumBULTy7i7Co4FZyg_MiDGLbkYXO3vTM3hL__SUJl_iXmCrJDU0NUVsrg9YuhyBqaTyk7-o',
  course_frontend:
    'https://lh3.googleusercontent.com/aida-public/AB6AXuCHgWjxHqS0yNAyyNH6jDE3dzhMy8Rc37nnLuv6lH-aFf2JH6bBfFzVEqujZ1FPPKCfMZeiUCJVcUjE_OjwTS7AwXx48WcYe0FR_K-h3tfgdorAMvYtRI6RenyuP_ulAZNRc4PqahhS7Qrdk8QDoHUpxvhPcj35on_dGQdxtvbdCpdcFJnpzt369AV2CZnGERzz2GWs65ZCc_TBZGXOVVgZylONrEXHhsDgAhldbU5KFOwa_TmfkEaNZEkp4ESZGPCqx3iZfu3dU1la',
}

function createLesson({
  id,
  title,
  type = 'video',
  summary,
  blocks = [],
}) {
  return { id, title, type, summary, blocks }
}

function createCourse({
  id,
  title,
  category,
  description,
  imageUrl,
  modules,
  initialCompletedLessonIds,
}) {
  return {
    id,
    title,
    category,
    description,
    imageUrl,
    instructor: {
      id: 'instructor_001',
      name: 'Jordan Diaz',
    },
    modules,
    initialCompletedLessonIds,
  }
}

const uiUxCourse = createCourse({
  id: 'course_ui_ux',
  title: 'UI/UX Designer',
  category: 'Design',
  description:
    'Build thoughtful interfaces by connecting user research, visual systems, and interaction design.',
  imageUrl: courseImages.course_ui_ux,
  initialCompletedLessonIds: [
    'uiux_resources',
    'uiux_foundations',
    'uiux_research',
  ],
  modules: [
    {
      id: 'uiux_module_intro',
      title: 'course introduction',
      order: 1,
      lessons: [
        createLesson({
          id: 'uiux_resources',
          title: 'Student Resources',
          summary:
            'Prepare your design workspace and collect the reference materials used throughout the course.',
          blocks: [
            {
              id: 'uiux_resources_intro',
              type: 'richText',
              heading: 'Student Resources & Tools',
              body:
                'Welcome to your UI/UX learning workspace. This lesson gathers the design files, research templates, and reference material you will use to move from early discovery to polished interface decisions.',
            },
            {
              id: 'uiux_resource_cards',
              type: 'resourceCards',
              items: [
                {
                  id: 'figma_workspace',
                  title: 'Figma Practice File',
                  description:
                    'Open a structured practice file containing components, tokens, and responsive frames.',
                  icon: 'design_services',
                  tone: 'sky',
                  actionLabel: 'Open workspace',
                  url: '#figma-workspace',
                },
                {
                  id: 'research_bundle',
                  title: 'Research Bundle',
                  description:
                    'Download interview prompts, affinity mapping sheets, and usability testing notes.',
                  icon: 'cloud_download',
                  tone: 'tan',
                  actionLabel: 'Download bundle',
                  url: '#research-bundle',
                },
              ],
            },
            {
              id: 'uiux_canvas',
              type: 'simulation',
              title: 'component_library.fig',
              description: 'Interactive design-system canvas',
              icon: 'dashboard_customize',
            },
          ],
        }),
        createLesson({
          id: 'uiux_foundations',
          title: 'Design Foundations',
          summary: 'Learn the principles that make interfaces clear and consistent.',
          blocks: [
            {
              id: 'uiux_foundations_text',
              type: 'richText',
              heading: 'Clarity before decoration',
              body:
                'Strong interfaces establish hierarchy, rhythm, contrast, and predictable interaction before visual detail is added. Use these principles to make every screen easier to scan and understand.',
            },
            {
              id: 'uiux_foundations_video',
              type: 'media',
              mediaType: 'video',
              title: 'Interface hierarchy walkthrough',
              url: courseImages.course_ui_ux,
              posterUrl: courseImages.course_ui_ux,
            },
          ],
        }),
      ],
    },
    {
      id: 'uiux_module_research',
      title: 'user research',
      order: 2,
      lessons: [
        createLesson({
          id: 'uiux_research',
          title: 'Interview Planning',
          type: 'document',
          summary: 'Turn product assumptions into focused research questions.',
          blocks: [
            {
              id: 'uiux_research_text',
              type: 'richText',
              heading: 'Plan useful conversations',
              body:
                'Define what the team needs to learn, recruit representative participants, and write neutral prompts that encourage detailed stories instead of yes-or-no answers.',
            },
            {
              id: 'uiux_research_download',
              type: 'download',
              title: 'Interview planning worksheet',
              description: 'Editable PDF · 1.8 MB',
              url: '#interview-planning-worksheet',
            },
          ],
        }),
        createLesson({
          id: 'uiux_synthesis',
          title: 'Synthesis Workshop',
          type: 'activity',
          summary: 'Group observations into patterns and actionable insights.',
          blocks: [
            {
              id: 'uiux_synthesis_tool',
              type: 'externalTool',
              title: 'Affinity Mapping Board',
              description:
                'Organize research notes and identify repeated behaviors, goals, and pain points.',
              actionLabel: 'Launch board',
              url: '#affinity-board',
              icon: 'account_tree',
            },
          ],
        }),
      ],
    },
    {
      id: 'uiux_module_prototype',
      title: 'prototyping',
      order: 3,
      lessons: [
        createLesson({
          id: 'uiux_prototype',
          title: 'Interactive Prototypes',
          summary: 'Connect screens into a testable product flow.',
          blocks: [
            {
              id: 'uiux_prototype_text',
              type: 'richText',
              heading: 'Prototype the critical path',
              body:
                'Build only the interactions needed to test the riskiest assumptions. Keep transitions purposeful and ensure participants always understand what changed.',
            },
          ],
        }),
        createLesson({
          id: 'uiux_quiz',
          title: 'Design Review',
          type: 'quiz',
          summary: 'Check your understanding of the design process.',
          blocks: [
            {
              id: 'uiux_quiz_block',
              type: 'quiz',
              question: 'What should determine the fidelity of a prototype?',
              options: [
                'The learning goal of the test',
                'The number of screens in the product',
                'The visual style preferred by stakeholders',
              ],
            },
          ],
        }),
      ],
    },
  ],
})

const frontendCourse = createCourse({
  id: 'course_frontend',
  title: 'Front-End Developer',
  category: 'Development',
  description:
    'Build accessible, responsive interfaces with modern HTML, CSS, JavaScript, and React.',
  imageUrl: courseImages.course_frontend,
  initialCompletedLessonIds: ['frontend_resources', 'frontend_html'],
  modules: [
    {
      id: 'frontend_module_intro',
      title: 'course introduction',
      order: 1,
      lessons: [
        createLesson({
          id: 'frontend_resources',
          title: 'Student Resources',
          summary:
            'Set up the tools, references, and starter projects used throughout the course.',
          blocks: [
            {
              id: 'frontend_resources_intro',
              type: 'richText',
              heading: 'Student Resources & Tools',
              body:
                'This workspace contains the browser tools, starter repositories, and reference guides used throughout your front-end learning path. Keep these resources nearby as you complete each lab.',
            },
            {
              id: 'frontend_resource_cards',
              type: 'resourceCards',
              items: [
                {
                  id: 'browser_lab',
                  title: 'Browser Lab',
                  description:
                    'Practice responsive layouts and inspect live DOM and CSS changes directly in the browser.',
                  icon: 'terminal',
                  tone: 'sky',
                  actionLabel: 'Launch lab',
                  url: '#browser-lab',
                },
                {
                  id: 'frontend_bundle',
                  title: 'Resource Bundle',
                  description:
                    'Download starter files, accessibility checklists, and JavaScript reference sheets.',
                  icon: 'cloud_download',
                  tone: 'tan',
                  actionLabel: 'Download bundle',
                  url: '#frontend-bundle',
                },
              ],
            },
            {
              id: 'frontend_simulation',
              type: 'simulation',
              title: 'responsive_layout.lab',
              description: 'Interactive browser preview canvas',
              icon: 'code',
            },
          ],
        }),
        createLesson({
          id: 'frontend_html',
          title: 'Semantic HTML',
          type: 'document',
          summary: 'Structure content so browsers and assistive technology understand it.',
          blocks: [
            {
              id: 'frontend_html_text',
              type: 'richText',
              heading: 'Meaningful structure',
              body:
                'Semantic HTML communicates purpose, not appearance. Choose landmarks and elements based on the role content plays, then layer styling and behavior on top.',
            },
          ],
        }),
      ],
    },
    {
      id: 'frontend_module_css',
      title: 'responsive styling',
      order: 2,
      lessons: [
        createLesson({
          id: 'frontend_css',
          title: 'Modern CSS Layout',
          summary: 'Use Grid and Flexbox to build resilient page structures.',
          blocks: [
            {
              id: 'frontend_css_media',
              type: 'media',
              mediaType: 'video',
              title: 'Responsive layout walkthrough',
              url: courseImages.course_frontend,
              posterUrl: courseImages.course_frontend,
            },
            {
              id: 'frontend_css_text',
              type: 'richText',
              heading: 'Design for available space',
              body:
                'Responsive layouts should react to their container and content rather than a fixed list of devices. Start fluid, add constraints, and introduce breakpoints only when the layout needs them.',
            },
          ],
        }),
        createLesson({
          id: 'frontend_accessibility',
          title: 'Accessible Interfaces',
          type: 'activity',
          summary: 'Build keyboard-friendly controls with clear names and states.',
          blocks: [
            {
              id: 'frontend_a11y_tool',
              type: 'externalTool',
              title: 'Accessibility Audit',
              description:
                'Run a guided audit against a sample interface and resolve its keyboard and contrast issues.',
              actionLabel: 'Start audit',
              url: '#accessibility-audit',
              icon: 'accessibility_new',
            },
          ],
        }),
      ],
    },
    {
      id: 'frontend_module_react',
      title: 'react applications',
      order: 3,
      lessons: [
        createLesson({
          id: 'frontend_react',
          title: 'Components and State',
          summary: 'Build interfaces from reusable components and predictable state.',
          blocks: [
            {
              id: 'frontend_react_text',
              type: 'richText',
              heading: 'Make state ownership explicit',
              body:
                'Keep state close to the components that need it, lift it only when multiple branches must coordinate, and derive display values instead of storing duplicate state.',
            },
          ],
        }),
        createLesson({
          id: 'frontend_quiz',
          title: 'Front-End Review',
          type: 'quiz',
          summary: 'Review the core principles from the course.',
          blocks: [
            {
              id: 'frontend_quiz_block',
              type: 'quiz',
              question: 'Which value should normally be derived rather than stored?',
              options: [
                'A filtered list computed from existing state',
                'Text entered into a controlled input',
                'The currently selected lesson ID',
              ],
            },
          ],
        }),
      ],
    },
  ],
})

export const learnerCourses = {
  [uiUxCourse.id]: uiUxCourse,
  [frontendCourse.id]: frontendCourse,
}
