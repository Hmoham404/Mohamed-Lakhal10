import { useEffect, useState, useCallback, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-scroll'
import { Icon } from '@iconify/react'
import Particles from '@tsparticles/react'
import { loadSlim } from '@tsparticles/slim'

const typedStrings = [
  'AI Solutions Builder',
  'Développeur Full-Stack',
  'Ingénieur Systèmes Embarqués',
  'Formateur IA certifié',
]

const capabilityCards = [
  {
    title: 'Intelligence artificielle',
    text: 'Modèles, automatisation et applications IA.',
    icon: 'ph:brain-duotone',
    align: 'right-8 top-[18%]',
  },
  {
    title: 'Développement web',
    text: 'React, Next.js, Laravel, Django et APIs.',
    icon: 'ph:code-duotone',
    align: 'right-6 top-[44%]',
  },
  {
    title: 'Systèmes embarqués',
    text: 'STM32, ESP32, Qt/C++, RFID, TCP/IP.',
    icon: 'ph:cpu-duotone',
    align: 'left-8 bottom-[28%]',
  },
]

function TypedText() {
  const [textIndex, setTextIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [charIndex, setCharIndex] = useState(0)

  useEffect(() => {
    const current = typedStrings[textIndex]
    let timeout

    if (!isDeleting && charIndex <= current.length) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIndex))
        setCharIndex(i => i + 1)
      }, 70)
    } else if (!isDeleting && charIndex > current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 1500)
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIndex - 1))
        setCharIndex(i => i - 1)
      }, 35)
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false)
      setTextIndex(i => (i + 1) % typedStrings.length)
    }

    return () => clearTimeout(timeout)
  }, [charIndex, isDeleting, textIndex])

  return (
    <span className="font-mono text-[#00F5FF]">
      {displayed}
      <span className="animate-pulse">|</span>
    </span>
  )
}

function FloatingCard({ card, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, rotate: index === 0 ? -4 : 4 }}
      animate={{ opacity: 1, y: 0, rotate: index === 0 ? -4 : 4 }}
      transition={{ delay: 0.65 + index * 0.16, duration: 0.7 }}
      className={`absolute hidden xl:flex ${card.align} hero-satellite-card`}
    >
      <div className="hero-satellite-icon">
        <Icon icon={card.icon} width={34} height={34} />
      </div>
      <div>
        <h3>{card.title}</h3>
        <p>{card.text}</p>
      </div>
    </motion.div>
  )
}

function CodePanel() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50, rotate: -7 }}
      animate={{ opacity: 1, x: 0, rotate: -7 }}
      transition={{ delay: 0.55, duration: 0.8, ease: 'easeOut' }}
      className="hero-code-panel hidden xl:block"
    >
      <div className="mb-6 flex gap-2">
        <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
        <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
        <span className="h-3 w-3 rounded-full bg-[#28c840]" />
      </div>
      <p className="mb-4 text-[#9fb3d8]">Passion & Code</p>
      <pre>
        <code>{`const developer = {
  name: "Mohamed Lakhal",
  focus: ["AI", "Web", "Embedded"],
  goal: "Build useful solutions",
};`}</code>
      </pre>
      <p className="mt-6 text-[#89a0c8]">// Des idées aux projets concrets</p>
    </motion.div>
  )
}

export default function Hero() {
  const particlesInit = useCallback(async engine => {
    await loadSlim(engine)
  }, [])

  const particlesOptions = useMemo(
    () => ({
      background: { color: { value: 'transparent' } },
      fpsLimit: 45,
      interactivity: {
        events: { onHover: { enable: true, mode: 'repulse' } },
        modes: { repulse: { distance: 90, duration: 0.35 } },
      },
      particles: {
        color: { value: ['#00F5FF', '#8B5CF6', '#ffffff'] },
        links: {
          color: '#00F5FF',
          distance: 145,
          enable: true,
          opacity: 0.12,
          width: 1,
        },
        move: {
          direction: 'none',
          enable: true,
          outModes: { default: 'bounce' },
          speed: 0.45,
        },
        number: { density: { enable: true, area: 950 }, value: 58 },
        opacity: { value: 0.33 },
        shape: { type: 'circle' },
        size: { value: { min: 1, max: 3 } },
      },
      detectRetina: true,
    }),
    [],
  )

  return (
    <section id="hero" className="hero-stage relative min-h-screen overflow-hidden">
      <Particles id="tsparticles" init={particlesInit} options={particlesOptions} />
      <div className="hero-grid-lines" />
      <div className="hero-energy-ring" />
      <CodePanel />
      {capabilityCards.map((card, index) => (
        <FloatingCard key={card.title} card={card} index={index} />
      ))}

      <div className="relative z-10 mx-auto flex min-h-screen w-full max-w-[1540px] items-center px-4 pb-16 pt-28 sm:px-6 sm:pb-20 lg:px-10">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[1fr_390px] xl:grid-cols-[1fr_500px]">
          <div className="mx-auto max-w-4xl text-center lg:mx-0 lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: -18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex max-w-full items-center gap-3 rounded-full border border-[#00F5FF]/25 bg-[#031420]/70 px-4 py-3 text-xs shadow-[0_0_35px_rgba(0,245,255,0.12)] backdrop-blur-xl sm:px-5 sm:text-sm"
            >
              <span className="pulse-dot" />
              <span className="min-w-0 font-mono text-[#dce8ff]">
                <span className="font-semibold text-[#19ffb7]">Disponible</span> pour missions freelance
              </span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="hero-kicker mt-7 font-mono text-[0.68rem] uppercase text-[#9fb3d8] sm:text-sm"
            >
              Développer · Automatiser · Innover
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.45, duration: 0.75 }}
              className="hero-title mt-5 select-none font-grotesk text-[clamp(3.1rem,18vw,8.9rem)] font-black uppercase leading-[0.86] text-white"
            >
              Mohamed
              <span>Lakhal</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65 }}
              className="mt-6 min-h-9 text-lg font-semibold sm:text-2xl"
            >
              <TypedText />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mx-auto mt-6 max-w-3xl text-sm leading-7 text-[#b9c7e5] sm:text-lg sm:leading-8 lg:mx-0"
            >
              Ingénieur en systèmes embarqués, développeur full-stack et formateur certifié IA.
              Je transforme les besoins métiers en solutions digitales fiables: tableaux de bord,
              applications web, automatisation et systèmes intelligents.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.95 }}
              className="mt-8 grid gap-3 sm:flex sm:flex-wrap sm:justify-center sm:gap-4 lg:justify-start"
            >
              <Link to="projects" smooth duration={500} offset={-64}>
                <button className="btn-primary w-full sm:w-auto">
                  <span className="flex items-center justify-center gap-2">
                    <Icon icon="ph:rocket-launch-duotone" width={20} height={20} />
                    Voir mes projets
                    <Icon icon="ph:arrow-right-bold" width={18} height={18} />
                  </span>
                </button>
              </Link>

              <a href="/CV_Mohamed_Lakhal.pdf" download className="btn-outline w-full justify-center sm:w-auto">
                <Icon icon="ph:file-text-duotone" width={20} height={20} />
                Télécharger CV
              </a>

              <Link to="contact" smooth duration={500} offset={-64}>
                <button className="btn-outline w-full justify-center border-[#9B6FFF]/60 text-[#c694ff] sm:w-auto">
                  <Icon icon="ph:envelope-duotone" width={20} height={20} />
                  Me contacter
                </button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="hero-stats mt-9 grid grid-cols-2 gap-0 overflow-hidden rounded-[8px] border border-[#00F5FF]/12 bg-[#061523]/78 backdrop-blur-xl sm:grid-cols-4"
            >
              {[
                ['+3', "Années d'expérience"],
                ['10+', 'Projets réalisés'],
                ['3', "Domaines d'expertise"],
                ['100%', 'Passion & motivation'],
              ].map(([value, label]) => (
                <div key={label} className="px-4 py-4 sm:px-5 sm:py-5">
                  <strong>{value}</strong>
                  <span>{label}</span>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.75, duration: 0.8 }}
            className="relative mx-auto w-full max-w-[330px] sm:max-w-[390px] lg:max-w-[430px]"
          >
            <div className="hero-portrait-frame">
              <img src="/Mohamed Lakhal.png" alt="Mohamed Lakhal" />
              <div className="hero-portrait-chip">ML</div>
            </div>
            <div className="mt-4 grid grid-cols-3 gap-2 sm:mt-5 sm:gap-3">
              {['AI', 'WEB', 'IOT'].map(item => (
                <div key={item} className="hero-mini-chip">{item}</div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
