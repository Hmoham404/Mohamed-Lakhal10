import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-scroll'
import { Icon } from '@iconify/react'

const navLinks = [
  { to: 'about', label: 'À propos' },
  { to: 'skills', label: 'Compétences' },
  { to: 'experience', label: 'Expérience' },
  { to: 'projects', label: 'Projets' },
  { to: 'education', label: 'Formation' },
  { to: 'contact', label: 'Contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.65, ease: 'easeOut' }}
      className="fixed left-0 right-0 top-0 z-50 px-3 pt-3 sm:px-5"
    >
      <div
        className={`mx-auto max-w-[1540px] rounded-[8px] border px-3 transition-all duration-300 sm:px-5 lg:px-7 ${
          scrolled || menuOpen
            ? 'border-[#00F5FF]/20 bg-[#06101d]/90 shadow-[0_18px_65px_rgba(0,0,0,0.42)] backdrop-blur-2xl'
            : 'border-white/8 bg-[#06101d]/58 backdrop-blur-xl'
        }`}
      >
        <div className="flex h-[62px] items-center justify-between sm:h-[70px]">
          <Link
            to="hero"
            smooth
            duration={500}
            className="group flex min-w-0 items-center gap-3 sm:gap-4"
            onClick={() => setMenuOpen(false)}
          >
            <motion.div className="brand-mark h-11 w-11 text-sm sm:h-12 sm:w-12" whileHover={{ scale: 1.04, rotate: 3 }}>
              <span>ML</span>
            </motion.div>
            <div className="flex min-w-0 flex-col leading-tight">
              <span className="truncate font-grotesk text-base font-black text-white sm:text-lg">
                Mohamed <span className="text-[#39C8FF]">Lakhal</span>
              </span>
              <span className="hidden font-mono text-[10px] font-semibold uppercase tracking-[0.34em] text-[#78a7d4] sm:block">
                Engineer · Dev · AI
              </span>
            </div>
          </Link>

          <div className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link, i) => (
              <Link
                key={link.to}
                to={link.to}
                smooth
                duration={500}
                offset={-78}
                className="group relative px-4 py-3 text-sm font-semibold text-[#c2d3ef] transition-colors hover:text-white"
                activeClass="text-[#00F5FF]"
                spy
              >
                <motion.span
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * i }}
                >
                  {link.label}
                </motion.span>
                <span className="absolute bottom-2 left-4 h-[2px] w-0 bg-gradient-to-r from-[#00F5FF] to-[#9B6FFF] transition-all duration-300 group-hover:w-[calc(100%-2rem)]" />
              </Link>
            ))}
          </div>

          <div className="hidden lg:block">
            <Link to="contact" smooth duration={500} offset={-78}>
              <button className="btn-primary px-6 py-3 text-sm">
                <span className="flex items-center gap-2">
                  Me contacter
                  <Icon icon="ph:arrow-right-bold" width={18} height={18} />
                </span>
              </button>
            </Link>
          </div>

          <button
            className="grid h-11 w-11 place-items-center rounded-[8px] border border-[#00F5FF]/18 bg-white/[0.03] text-gray-300 lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={menuOpen}
          >
            <div className="flex w-5 flex-col gap-1.5">
              <motion.span
                animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 8 : 0 }}
                className="block h-0.5 rounded-full bg-[#00F5FF]"
              />
              <motion.span
                animate={{ opacity: menuOpen ? 0 : 1 }}
                className="block h-0.5 rounded-full bg-[#00F5FF]"
              />
              <motion.span
                animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -8 : 0 }}
                className="block h-0.5 rounded-full bg-[#00F5FF]"
              />
            </div>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="mx-3 mt-2 overflow-hidden rounded-[8px] border border-[#00F5FF]/18 bg-[#06101d]/96 shadow-2xl backdrop-blur-xl lg:hidden"
          >
            <div className="grid gap-1 p-2">
              {navLinks.map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  smooth
                  duration={500}
                  offset={-78}
                  className="rounded-[8px] px-4 py-3 text-sm font-semibold text-gray-300 transition-all hover:bg-white/5 hover:text-[#00F5FF]"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link to="contact" smooth duration={500} offset={-78} onClick={() => setMenuOpen(false)}>
                <button className="btn-primary mt-1 w-full py-3 text-sm">
                  <span>Me contacter</span>
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
