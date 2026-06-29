const footerLinks = [
  'privacy policy',
  'terms of service',
  'help center',
  'contact us',
]

function Footer() {
  return (
    <footer className="border-t border-glass-border bg-surface-container-low/40 px-margin-mobile py-12 backdrop-blur-2xl md:px-margin-desktop">
      <div className="mx-auto flex max-w-container-max flex-col items-center justify-between gap-gutter md:flex-row">
        <div className="flex flex-col items-center gap-2 md:items-start">
          <span className="font-headline-md text-headline-md lowercase text-primary">
            syllabux
          </span>
          <p className="font-label-sm text-label-sm text-on-surface-variant opacity-80">
            © 2026 syllabux. study with clarity.
          </p>
        </div>
        <div className="flex flex-wrap justify-center gap-6">
          {footerLinks.map((link) => (
            <a
              key={link}
              className="font-label-sm text-label-sm lowercase text-on-surface-variant transition-colors hover:text-primary"
              href={`#${link.replaceAll(' ', '-')}`}
            >
              {link}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}

export default Footer
