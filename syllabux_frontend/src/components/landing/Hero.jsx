import studentPortrait from "../../assets/stitch/studying.jpg";

const categories = ["design", "writing", "business"];

function Hero() {
  return (
    <section
      id="top"
      className="mx-auto mb-28 max-w-container-max px-margin-mobile pt-32 md:mb-32 md:px-margin-desktop"
    >
      <div className="grid grid-cols-1 items-center gap-gutter lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p className="animate-fade-up font-label-md text-label-md uppercase tracking-[0.2em] text-primary opacity-0">
            education, refined
          </p>
          <h1 className="mt-4 animate-fade-up font-display-lg text-headline-lg-mobile text-primary opacity-0 [animation-delay:100ms] md:text-display-lg">
            study with clarity.
          </h1>

          <div className="mt-8 max-w-xl animate-fade-up opacity-0 [animation-delay:200ms]">
            <form
              className="glass-panel-heavy flex flex-col gap-3 rounded-[1.5rem] p-4 transition duration-500 focus-within:bg-white/60 focus-within:shadow-glass-hover sm:flex-row sm:items-center"
              onSubmit={(event) => event.preventDefault()}
            >
              <div className="flex min-w-0 flex-1 items-center">
                <span className="material-symbols-outlined mx-3 text-2xl text-primary">
                  search
                </span>
                <label className="sr-only" htmlFor="course-search">
                  find your next course
                </label>
                <input
                  id="course-search"
                  className="w-full min-w-0 border-none bg-transparent p-0 font-body-lg text-body-lg text-primary outline-none placeholder:text-outline"
                  placeholder="Find your next course..."
                  type="search"
                />
              </div>
              <button
                className="rounded-2xl bg-primary px-8 py-3 font-label-md lowercase text-on-primary transition hover:scale-[1.02] active:scale-95"
                type="submit"
              >
                search
              </button>
            </form>
          </div>

          <div className="mt-12 flex animate-fade-up flex-wrap gap-4 opacity-0 [animation-delay:300ms]">
            {categories.map((category) => (
              <span
                key={category}
                className="rounded-full border border-glass-border bg-white/40 px-4 py-1.5 font-label-sm text-label-sm lowercase text-primary backdrop-blur-xl"
              >
                {category}
              </span>
            ))}
          </div>
        </div>

        <div className="relative flex min-h-[420px] items-center justify-center lg:col-span-5">
          <div className="relative aspect-square w-full max-w-md animate-fade-up opacity-0 [animation-delay:200ms]">
            <div className="glass-panel absolute inset-0 overflow-hidden rounded-[4rem] border-2 border-white/40">
              <img
                className="h-full w-full object-cover opacity-80 mix-blend-overlay"
                src={studentPortrait}
                alt="focused student in a minimalist study setting"
              />
            </div>

            <div className="absolute -right-2 -top-8 w-64 animate-float-slow rounded-3xl border border-white/60 bg-white/50 p-6 shadow-lg [backface-visibility:hidden] [will-change:transform] backdrop-blur-2xl sm:-right-4">
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary shadow-inner">
                  <span className="material-symbols-outlined text-xl text-on-primary">
                    palette
                  </span>
                </div>
                <div>
                  <p className="font-label-sm text-label-sm text-primary">
                    featured
                  </p>
                  <h2 className="font-label-md text-label-md text-primary">
                    UI fundamentals
                  </h2>
                </div>
              </div>
              <div className="h-1 w-full rounded-full bg-primary/10">
                <div className="h-1 w-3/4 rounded-full bg-primary" />
              </div>
            </div>

            <div className="absolute -bottom-6 left-0 w-56 animate-float-slow rounded-3xl border border-white/60 bg-white/50 p-5 shadow-lg [backface-visibility:hidden] [will-change:transform] backdrop-blur-2xl sm:-left-12">
              <div className="mb-2 flex items-center gap-4">
                <span className="material-symbols-outlined text-secondary">
                  edit_note
                </span>
                <p className="font-label-md text-label-md text-primary">
                  creative writing
                </p>
              </div>
              <p className="text-label-sm text-on-surface-variant">
                42 modules complete
              </p>
              <div className="mt-3 flex -space-x-2">
                <div className="h-8 w-8 rounded-full border-2 border-white bg-earth-tan" />
                <div className="h-8 w-8 rounded-full border-2 border-white bg-sky-blue" />
                <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-secondary text-[10px] font-bold text-white">
                  +12
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
