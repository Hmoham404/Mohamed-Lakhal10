import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { projectsData } from '../data/projects'

function ProjectCard({ project, index }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)
  const cardRef = useRef(null)

  const handleMouseMove = (e) => {
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 15
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -15
    setTilt({ x, y })
  }

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 })
    setHovered(false)
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) translateZ(${hovered ? 10 : 0}px)`,
        transition: hovered ? 'transform 0.1s' : 'transform 0.5s ease',
      }}
      className="glass group relative flex flex-col gap-5 overflow-hidden rounded-[8px] p-5 sm:p-6"
    >
      <div
        className="absolute left-0 right-0 top-0 h-0.5"
        style={{ background: `linear-gradient(90deg, transparent, ${project.color}, transparent)` }}
      />

      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `radial-gradient(circle at 50% 0%, ${project.color}12, transparent 60%)` }}
      />

      <div className="relative z-10 flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="text-3xl">{project.emoji}</span>
          <h3 className="font-grotesk text-base font-bold leading-tight text-white sm:text-lg">
            {project.title}
          </h3>
        </div>
        <div className="flex flex-shrink-0 gap-2">
          <a
            href={project.github}
            className="glass flex h-8 w-8 items-center justify-center rounded-[8px] font-mono text-xs text-gray-400 transition-all hover:border-white/20 hover:text-white"
            title="GitHub"
          >
            GH
          </a>
          <a
            href={project.demo}
            className="flex h-8 w-8 items-center justify-center rounded-[8px] text-xs font-bold text-[#0A0A0F] transition-all"
            style={{ background: project.color }}
            title="Demo"
          >
            ↗
          </a>
        </div>
      </div>

      <p className="relative z-10 text-sm leading-relaxed text-gray-400">{project.description}</p>

      <ul className="relative z-10 flex flex-col gap-1.5">
        {project.features.map((f, i) => (
          <li key={i} className="flex items-center gap-2 text-xs text-gray-300">
            <span style={{ color: project.color }}>◆</span>
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <div className="relative z-10 mt-auto flex flex-wrap gap-2">
        {project.stack.map(tech => (
          <span
            key={tech}
            className="rounded-md px-2 py-0.5 font-mono text-[11px]"
            style={{
              color: project.color,
              background: `${project.color}12`,
              border: `1px solid ${project.color}30`,
            }}
          >
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="projects" className="section-pad relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-12 text-center">
            <p className="mb-3 font-mono text-sm tracking-widest text-[#00F5FF]">// projets</p>
            <h2 className="section-title mx-auto text-white">Réalisations</h2>
            <p className="mx-auto mt-4 max-w-xl text-sm text-gray-400">
              Une sélection de projets qui illustrent mon expertise technique et ma créativité.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {projectsData.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
