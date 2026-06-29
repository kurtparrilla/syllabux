function EngagementPanel({ engagement }) {
  return (
    <section className="flex flex-col gap-6 md:col-span-8">
      <h3 className="font-headline-md text-headline-md text-primary">
        student engagement trends
      </h3>
      <div className="glass-panel-elevated relative h-[340px] overflow-hidden rounded-xl p-6 md:p-8">
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="font-label-md text-label-md text-secondary">
              {engagement.label}
            </p>
            <div className="mt-1 flex items-center gap-2">
              <span className="font-headline-md text-headline-md text-primary">
                {engagement.value}
              </span>
              <span className="rounded-full bg-green-100 px-2 py-0.5 text-label-sm text-green-700">
                {engagement.deltaLabel}
              </span>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              className="rounded-full bg-primary px-3 py-1 text-label-sm text-white"
              type="button"
            >
              {engagement.range}
            </button>
            <button
              className="glass-panel rounded-full px-3 py-1 text-label-sm text-on-surface-variant"
              type="button"
            >
              month
            </button>
          </div>
        </div>

        <div className="mt-10 flex h-32 w-full items-end justify-between gap-1">
          {engagement.bars.map((bar, index) => (
            <div
              key={bar.label}
              className="w-full rounded-t-lg bg-primary"
              style={{
                height: `${bar.percent}%`,
                opacity: 0.1 + Math.min(index + 1, 6) * 0.1,
              }}
              title={bar.label}
            />
          ))}
        </div>
        <div className="mt-2 flex justify-between px-1 text-label-sm text-secondary">
          {engagement.bars.map((bar) => (
            <span key={bar.label}>{bar.label}</span>
          ))}
        </div>
        <div className="pointer-events-none absolute -bottom-20 -right-20 h-64 w-64 rounded-full bg-earth-tan/20 blur-[80px]" />
      </div>
    </section>
  )
}

export default EngagementPanel
