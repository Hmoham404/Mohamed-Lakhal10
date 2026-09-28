import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Icon } from '@iconify/react'

function CountUp({ target, suffix = '', prefix = '' }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const duration = 1800
    const step = target / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= target) {
        setCount(target)
        clearInterval(timer)
      } else {
        setCount(Math.floor(start))
      }
    }, 16)
    return () => clearInterval(timer)
  }, [inView, target])

  return (
    <span ref={ref} className="gradient-text font-grotesk font-bold">
      {prefix}{count}{suffix}
    </span>
  )
}

const stats = [
  { target: 3, suffix: '+', label: "Années d'expérience" },
  { target: 10, suffix: '+', label: 'Projets réalisés' },
  { target: 3, suffix: '', label: "Domaines d'expertise" },
]

const pillars = [
  'Systèmes embarqués',
  'Web full-stack',
  'Intelligence artificielle',
  'IoT',
  'Automatisation',
]

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.16 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  }

  return (
    <section id="about" className="section-pad relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20"
        >
          <motion.div variants={itemVariants} className="flex flex-col items-center gap-8 lg:items-start">
            <div className="relative">
              <div className="avatar-border h-64 w-64 overflow-hidden rounded-[8px] sm:h-72 sm:w-72">
                <img
                  src="/Mohamed Lakhal.png"
                  alt="Mohamed Lakhal"
                  className="h-full w-full object-cover object-[50%_18%]"
                />
              </div>

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
                className="glass absolute -bottom-4 -right-4 rounded-[8px] px-3 py-2 font-mono text-xs text-[#00F5FF]"
              >
                &lt;Ingénieur /&gt;
              </motion.div>

              <div
                className="absolute -left-4 -top-4 h-20 w-20 animate-spin rounded-full border border-[#7C3AED]/30"
                style={{ animationDuration: '12s' }}
              />
            </div>

            <div className="grid w-full max-w-sm grid-cols-3 gap-4">
              {stats.map((stat, i) => (
                <motion.div key={i} variants={itemVariants} className="glass rounded-[8px] p-4 text-center">
                  <div className="mb-1 text-2xl sm:text-3xl">
                    <CountUp target={stat.target} suffix={stat.suffix} />
                  </div>
                  <div className="font-grotesk text-xs leading-tight text-gray-400">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="flex flex-col gap-6">
            <div>
              <motion.p variants={itemVariants} className="mb-3 font-mono text-sm tracking-widest text-[#00F5FF]">
                // à propos
              </motion.p>
              <motion.h2 variants={itemVariants} className="section-title text-white">
                Profil compatible CV
              </motion.h2>
            </div>

            <motion.p variants={itemVariants} className="text-base leading-relaxed text-gray-300">
              Ingénieur en systèmes embarqués avec une forte expertise en{' '}
              <span className="text-[#00F5FF]">développement web full-stack</span>, en{' '}
              <span className="text-[#7C3AED]">intelligence artificielle</span> et en automatisation.
              Je transforme les besoins métiers en solutions fiables: dashboards, applications web,
              systèmes intelligents et outils digitaux.
            </motion.p>

            <motion.p variants={itemVariants} className="text-sm leading-relaxed text-gray-400">
              Diplômé en Microélectronique et Systèmes Embarqués, j'ai travaillé sur des projets
              mêlant React, Next.js, Laravel, Django, Python, Qt/C++, RFID, TCP/IP, bases de données
              et analyse de signal. Mon approche combine rigueur d'ingénierie, sens produit et
              exécution concrète.
            </motion.p>

            <motion.div variants={itemVariants} className="flex flex-wrap gap-3">
              {pillars.map(tag => (
                <span key={tag} className="tech-tag">{tag}</span>
              ))}
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <a
                href="mailto:Lakhalm300@gmail.com"
                className="inline-flex items-center gap-2 font-mono text-sm text-[#00F5FF] hover:underline"
              >
                <Icon icon="ph:envelope-duotone" width={18} height={18} />
                Lakhalm300@gmail.com
              </a>
              <a
                href="tel:+21628809961"
                className="inline-flex items-center gap-2 font-mono text-sm text-gray-400 hover:text-white"
              >
                <Icon icon="ph:phone-duotone" width={18} height={18} />
                +216 28 80 99 61
              </a>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
