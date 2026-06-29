const scheduleToneClasses = {
  secondary: 'bg-secondary-container text-on-secondary-container',
  tan: 'bg-earth-tan text-white',
}

function SchedulePanel({ schedule }) {
  return (
    <section className="flex flex-col gap-6 md:col-span-4">
      <h3 className="font-headline-md text-headline-md text-primary">
        upcoming schedule
      </h3>
      <div className="glass-panel-elevated flex-grow overflow-y-auto rounded-xl p-6">
        <div className="flex flex-col gap-6">
          {schedule.items.map((item) => (
            <div key={item.id} className="flex items-start gap-4">
              <div
                className={`flex h-12 w-12 shrink-0 flex-col items-center justify-center rounded-lg ${
                  scheduleToneClasses[item.tone]
                }`}
              >
                <span className="text-label-sm font-bold">{item.day}</span>
                <span className="text-[10px] uppercase">{item.month}</span>
              </div>
              <div>
                <h4 className="font-label-md text-label-md text-primary">
                  {item.title}
                </h4>
                <p className="font-label-sm text-label-sm text-on-surface-variant">
                  {item.detail}
                </p>
              </div>
            </div>
          ))}

          <div className="mt-4 rounded-lg border border-outline-variant bg-surface-container-low p-4 font-label-sm text-label-sm italic text-on-surface-variant">
            {schedule.quote}
          </div>
        </div>
      </div>
    </section>
  )
}

export default SchedulePanel
