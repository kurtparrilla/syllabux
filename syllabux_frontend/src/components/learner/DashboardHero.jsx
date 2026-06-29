function DashboardHero({ hero }) {
  return (
    <section className="relative mb-14 text-center md:mb-20">
      <div className="pointer-events-none absolute -top-12 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full bg-primary/5 blur-[100px]" />
      <h1 className="mx-auto mb-5 max-w-5xl font-display-lg text-[48px] font-bold lowercase leading-[0.95] tracking-tight text-primary md:text-[72px] lg:text-[92px]">
        {hero.title}
      </h1>
      <p className="mx-auto max-w-xl font-body-lg lowercase leading-relaxed text-on-surface-variant">
        {hero.subtitle}
      </p>
    </section>
  )
}

export default DashboardHero
