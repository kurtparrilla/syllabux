import workspaceImage from '../../assets/stitch/workspace.png'

function Philosophy() {
  return (
    <section
      id="about"
      className="mx-auto max-w-container-max px-margin-mobile pb-24 md:px-margin-desktop"
    >
      <div className="mb-16 flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <div className="max-w-2xl">
          <h2 className="mb-6 font-display-lg text-headline-lg-mobile text-primary md:text-headline-lg">
            education, refined.
          </h2>
          <p className="font-body-lg text-body-lg text-on-surface-variant">
            We believe that learning should be as serene as a morning walk. No
            noise, no clutter, just pure academic discovery in a space designed
            for focus.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="font-display-lg text-headline-md text-primary">
              12k+
            </p>
            <p className="font-label-sm text-label-sm text-on-surface-variant">
              active learners
            </p>
          </div>
          <div className="h-12 w-px bg-outline-variant" />
          <div className="text-right">
            <p className="font-display-lg text-headline-md text-primary">
              4.9/5
            </p>
            <p className="font-label-sm text-label-sm text-on-surface-variant">
              course satisfaction
            </p>
          </div>
        </div>
      </div>

      <div id="courses" className="grid grid-cols-1 gap-gutter md:grid-cols-3">
        <article className="glass-panel rounded-[3rem] p-8 transition duration-500 hover:-translate-y-1 hover:bg-white/60 hover:shadow-glass-hover md:col-span-2 md:p-10">
          <div className="flex h-full flex-col justify-between">
            <div>
              <span className="material-symbols-outlined mb-6 text-4xl text-primary [font-variation-settings:'FILL'_1]">
                spa
              </span>
              <h3 className="mb-4 font-headline-md text-headline-md text-primary">
                cognitive ease
              </h3>
              <p className="max-w-md font-body-md text-on-surface-variant">
                Our interface is meticulously crafted to reduce visual cognitive
                load, allowing your brain to focus entirely on new concepts.
              </p>
            </div>
            <a
              className="mt-12 flex items-center gap-4 font-bold text-primary transition-all hover:gap-6"
              href="#about"
            >
              <span>explore our philosophy</span>
              <span className="material-symbols-outlined">arrow_forward</span>
            </a>
          </div>
        </article>

        <article
          id="categories"
          className="glass-panel rounded-[3rem] bg-earth-tan/10 p-8 transition duration-500 hover:-translate-y-1 hover:bg-white/60 hover:shadow-glass-hover md:p-10"
        >
          <span className="material-symbols-outlined mb-6 text-4xl text-primary">
            auto_awesome
          </span>
          <h3 className="mb-4 font-headline-md text-headline-md text-primary">
            curated tracks
          </h3>
          <p className="font-body-md text-on-surface-variant">
            Each course is hand-vetted by academic curators to ensure depth,
            quality, and a cohesive learning arc.
          </p>
        </article>

        <article className="glass-panel rounded-[3rem] p-8 transition duration-500 hover:-translate-y-1 hover:bg-white/60 hover:shadow-glass-hover md:p-10">
          <span className="material-symbols-outlined mb-6 text-4xl text-primary">
            menu_book
          </span>
          <h3 className="mb-4 font-headline-md text-headline-md text-primary">
            paperless comfort
          </h3>
          <p className="font-body-md text-on-surface-variant">
            A reading experience that mimics premium paper, optimized for long
            study sessions without eye strain.
          </p>
        </article>

        <article className="glass-panel overflow-hidden rounded-[3rem] p-1 md:col-span-2">
          <div className="relative h-[240px] overflow-hidden rounded-[2.8rem]">
            <img
              className="h-full w-full object-cover"
              src={workspaceImage}
              alt="minimalist workspace with notebook and pen"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/10 px-8 text-center backdrop-blur-[2px]">
              <p className="font-headline-md text-headline-md italic text-white">
                &quot;clarity is the foundation of mastery.&quot;
              </p>
            </div>
          </div>
        </article>
      </div>
    </section>
  )
}

export default Philosophy
