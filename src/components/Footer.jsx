import { Icon } from '@iconify/react'
import { Link } from 'react-scroll'

const navLinks = [
  { to: 'about', label: 'À propos' },
  { to: 'skills', label: 'Compétences' },
  { to: 'experience', label: 'Expérience' },
  { to: 'projects', label: 'Projets' },
  { to: 'education', label: 'Formation' },
  { to: 'contact', label: 'Contact' },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative border-t border-white/5 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row">
          <div className="flex flex-col items-center gap-2 md:items-start">
            <div className="flex items-center gap-2">
              <div className="brand-mark h-8 w-8 text-xs">
                <span>ML</span>
              </div>
              <span className="font-grotesk font-bold text-white">Mohamed Lakhal</span>
            </div>
            <p className="text-center font-mono text-xs text-gray-500 md:text-left">
              Ingénieur Systèmes Embarqués & Dev Full-Stack IA
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                smooth
                duration={500}
                offset={-64}
                className="font-mono text-xs text-gray-500 transition-colors hover:text-[#00F5FF]"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <a
              href="https://github.com/Hmoham404"
              target="_blank"
              rel="noopener noreferrer"
              className="glass flex h-8 w-8 items-center justify-center rounded-[8px] text-gray-400 transition-all hover:border-white/20 hover:text-white"
              aria-label="GitHub"
            >
              <Icon icon="mdi:github" width={16} />
            </a>
            <a
              href="https://www.linkedin.com/in/mohamed-lakhal-874ab1218/"
              target="_blank"
              rel="noopener noreferrer"
              className="glass flex h-8 w-8 items-center justify-center rounded-[8px] text-gray-400 transition-all hover:text-[#0A66C2]"
              aria-label="LinkedIn"
            >
              <Icon icon="mdi:linkedin" width={16} />
            </a>
            <a
              href="mailto:Lakhalm300@gmail.com"
              className="glass flex h-8 w-8 items-center justify-center rounded-[8px] text-gray-400 transition-all hover:text-[#00F5FF]"
              aria-label="Email"
            >
              <Icon icon="mdi:email" width={16} />
            </a>
          </div>
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-white/5 pt-6 sm:flex-row">
          <p className="font-mono text-xs text-gray-600">
            © {year} Mohamed Lakhal. Tous droits réservés.
          </p>
          <p className="flex items-center gap-1 font-mono text-xs text-gray-600">
            Réalisé avec <span className="text-[#00F5FF]">React</span> + <span className="text-[#7C3AED]">Framer Motion</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
