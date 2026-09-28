import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { experienceData } from '../data/experience'

const typeColors = {
  'CDI / Contrat': '#00F5FF',
  'Stage PFE': '#7C3AED',
  "Stage d'été": '#F59E0B',
}

export default function Experience() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="experience" className="section-pad relative">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-16 text-center">
            <p className="mb-3 font-mono text-sm tracking-widest text-[#00F5FF]">// expérience</p>
            <h2 className="section-title mx-auto text-white">Parcours professionnel</h2>
          </div>

          <div className="relative">
            <div className="timeline-line absolute bottom-0 left-4 top-0 w-0.5 rounded-full sm:left-8" />

            <div className="flex flex-col gap-12">
              {experienceData.map((exp, i) => (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, x: -40 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: i * 0.16, duration: 0.6 }}
                  className="relative pl-14 sm:pl-24"
                >
                  <div className="timeline-dot absolute left-[9px] top-6 sm:left-[25px]" />

                  <div className="glass group rounded-[8px] p-5 transition-all duration-300 hover:border-[#00F5FF]/20 hover:shadow-lg hover:shadow-[#00F5FF]/5 sm:p-8">
                    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <h3 className="mb-1 font-grotesk text-lg font-bold text-white">{exp.role}</h3>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="gradient-text font-grotesk font-bold">{exp.company}</span>
                          <span
                            className="rounded-full px-2 py-0.5 font-mono text-xs"
                            style={{
                              color: typeColors[exp.type] || '#888',
                              background: `${typeColors[exp.type] || '#888888'}15`,
                              border: `1px solid ${typeColors[exp.type] || '#888888'}30`,
                            }}
                          >
                            {exp.type}
                          </span>
                        </div>
                      </div>
                      <span className="whitespace-nowrap font-mono text-sm text-gray-500">{exp.period}</span>
                    </div>

                    <p className="mb-5 text-sm leading-relaxed text-gray-400">{exp.description}</p>

                    <ul className="mb-5 flex flex-col gap-2">
                      {exp.highlights.map(h => (
                        <li key={h} className="flex items-start gap-2 text-sm text-gray-300">
                          <span className="mt-0.5 flex-shrink-0 text-[#00F5FF]">▸</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-2">
                      {exp.stack.map(tech => (
                        <span key={tech} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
