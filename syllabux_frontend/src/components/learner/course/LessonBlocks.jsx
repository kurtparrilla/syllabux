import { useState } from 'react'

const resourceToneClasses = {
  sky: 'bg-secondary-container text-secondary',
  tan: 'bg-tertiary-fixed text-tertiary',
}

function QuizBlock({ block }) {
  const [selectedOption, setSelectedOption] = useState('')

  return (
    <section className="glass-panel rounded-2xl p-6 md:p-8">
      <span className="font-label-sm uppercase tracking-widest text-outline">
        knowledge check
      </span>
      <h3 className="mt-3 font-headline-md text-headline-md text-primary">
        {block.question}
      </h3>
      <div className="mt-6 space-y-3">
        {block.options.map((option) => (
          <label
            key={option}
            className="flex cursor-pointer items-center gap-3 rounded-xl border border-glass-border bg-white/40 p-4 hover:bg-white/70"
          >
            <input
              name={block.id}
              type="radio"
              value={option}
              checked={selectedOption === option}
              onChange={(event) => setSelectedOption(event.target.value)}
            />
            <span>{option}</span>
          </label>
        ))}
      </div>
    </section>
  )
}

function LessonBlock({ block }) {
  switch (block.type) {
    case 'richText':
      return (
        <section className="space-y-4">
          <h2 className="font-display-lg text-headline-lg-mobile text-primary md:text-headline-lg">
            {block.heading}
          </h2>
          <p className="font-body-lg leading-relaxed text-on-surface-variant">
            {block.body}
          </p>
        </section>
      )

    case 'media':
      return (
        <section className="group relative overflow-hidden rounded-2xl border border-glass-border bg-white/40 shadow-sm">
          <img
            className="aspect-video w-full object-cover opacity-85 transition-transform duration-700 group-hover:scale-[1.02]"
            src={block.posterUrl || block.url}
            alt={block.title}
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black/5">
            <button
              className="flex h-20 w-20 items-center justify-center rounded-full bg-white/90 text-primary shadow-xl transition hover:scale-105"
              type="button"
              aria-label={`play ${block.title}`}
            >
              <span className="material-symbols-outlined text-4xl">
                play_arrow
              </span>
            </button>
          </div>
        </section>
      )

    case 'resourceCards':
      return (
        <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {block.items.map((item) => (
            <article
              key={item.id}
              className="glass-panel rounded-2xl p-6 transition-shadow hover:shadow-md md:p-8"
            >
              <div
                className={`mb-6 flex h-12 w-12 items-center justify-center rounded-xl ${
                  resourceToneClasses[item.tone] ?? resourceToneClasses.sky
                }`}
              >
                <span className="material-symbols-outlined">{item.icon}</span>
              </div>
              <h3 className="mb-3 font-headline-md text-headline-md text-primary">
                {item.title}
              </h3>
              <p className="mb-6 text-on-surface-variant">{item.description}</p>
              <a
                className="inline-flex items-center gap-2 font-label-md text-primary hover:underline"
                href={item.url}
              >
                {item.actionLabel}
                <span className="material-symbols-outlined text-[18px]">
                  arrow_forward
                </span>
              </a>
            </article>
          ))}
        </section>
      )

    case 'download':
      return (
        <section className="glass-panel flex flex-col gap-5 rounded-2xl p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="font-headline-md text-headline-md text-primary">
              {block.title}
            </h3>
            <p className="text-on-surface-variant">{block.description}</p>
          </div>
          <a
            className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 font-label-md text-on-primary"
            href={block.url}
          >
            <span className="material-symbols-outlined text-[18px]">
              download
            </span>
            download
          </a>
        </section>
      )

    case 'externalTool':
      return (
        <section className="glass-panel rounded-2xl p-6 md:p-8">
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary-container text-secondary">
            <span className="material-symbols-outlined">{block.icon}</span>
          </div>
          <h3 className="font-headline-md text-headline-md text-primary">
            {block.title}
          </h3>
          <p className="my-4 text-on-surface-variant">{block.description}</p>
          <a
            className="inline-flex items-center gap-2 font-label-md text-primary hover:underline"
            href={block.url}
          >
            {block.actionLabel}
            <span className="material-symbols-outlined text-[18px]">
              open_in_new
            </span>
          </a>
        </section>
      )

    case 'quiz':
      return <QuizBlock block={block} />

    case 'simulation':
      return (
        <section className="rounded-2xl border border-outline-variant/30 bg-surface-container-highest p-4">
          <div className="mb-4 flex items-center justify-between gap-4 px-2">
            <div className="flex min-w-0 items-center gap-2">
              <span className="h-3 w-3 shrink-0 rounded-full bg-error" />
              <span className="h-3 w-3 shrink-0 rounded-full bg-sky-blue" />
              <span className="h-3 w-3 shrink-0 rounded-full bg-earth-tan" />
              <span className="ml-2 truncate font-label-md text-on-surface-variant">
                {block.title}
              </span>
            </div>
            <span className="material-symbols-outlined text-outline">
              fullscreen
            </span>
          </div>
          <div className="flex aspect-[16/7] items-center justify-center rounded-xl border border-dashed border-outline-variant bg-white/60">
            <div className="text-center">
              <span className="material-symbols-outlined mb-3 text-6xl text-outline-variant">
                {block.icon}
              </span>
              <p className="font-label-md text-outline">{block.description}</p>
              <p className="mt-1 text-xs text-outline-variant">
                Instructor integration placeholder
              </p>
            </div>
          </div>
        </section>
      )

    default:
      return (
        <section
          className="rounded-2xl border border-error/20 bg-error-container/40 p-6 text-on-error-container"
          role="alert"
        >
          This lesson contains an unsupported content block.
        </section>
      )
  }
}

function LessonBlocks({ blocks }) {
  if (!Array.isArray(blocks)) {
    return (
      <p className="rounded-2xl bg-error-container p-6 text-on-error-container">
        Lesson content is unavailable.
      </p>
    )
  }

  return (
    <div className="space-y-10">
      {blocks.map((block) => (
        <LessonBlock key={block.id} block={block} />
      ))}
    </div>
  )
}

export default LessonBlocks
