const feedbackToneClasses = {
  sky: 'bg-sky-blue text-on-secondary-container',
  tan: 'bg-earth-tan/30 text-primary',
  secondary: 'bg-secondary-container text-on-secondary-container',
}

function FeedbackPanel({ feedback }) {
  return (
    <section className="flex flex-col gap-6 md:col-span-4">
      <h3 className="font-headline-md text-headline-md text-primary">latest feedback</h3>
      <div className="flex flex-col gap-4">
        {feedback.map((item) => (
          <article
            key={item.id}
            className={`glass-panel cursor-pointer rounded-xl p-4 transition-colors hover:bg-white/50 ${
              item.highlight ? 'border-l-4 border-earth-tan' : ''
            }`}
          >
            <div className="mb-2 flex items-center gap-3">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-[10px] font-bold ${
                  feedbackToneClasses[item.tone]
                }`}
              >
                {item.studentInitials}
              </div>
              <span className="font-label-sm text-label-sm text-primary">
                {item.studentName}{' '}
                <span className="font-normal text-secondary">- {item.timeAgo}</span>
              </span>
            </div>
            <p className="font-label-sm text-label-sm leading-relaxed text-on-surface-variant">
              &quot;{item.message}&quot;
            </p>
          </article>
        ))}
      </div>
      <button
        className="w-full rounded-lg border border-glass-border py-2 font-label-md text-label-md text-secondary transition-all hover:bg-white/30"
        type="button"
      >
        view all activity
      </button>
    </section>
  )
}

export default FeedbackPanel
