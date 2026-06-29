function OverviewSection({ hero, stats }) {
  return (
    <section className="mb-12">
      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <h2 className="font-headline-lg text-headline-lg italic text-primary">
            {hero.title}
          </h2>
          <p className="mt-2 max-w-xl font-body-lg text-on-surface-variant">
            {hero.subtitle}
          </p>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-2">
          {stats.map((stat) => (
            <div
              key={stat.id}
              className="glass-panel-elevated flex min-w-[160px] flex-col rounded-xl p-6"
            >
              <span className="font-label-sm text-label-sm uppercase tracking-widest text-secondary">
                {stat.label}
              </span>
              <span className="mt-1 font-headline-md text-headline-md text-primary">
                {stat.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default OverviewSection
