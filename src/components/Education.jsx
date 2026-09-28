import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Icon } from '@iconify/react'

const educationData = [
  {
    degree: "Diplôme National d'Ingénieur",
    field: 'Microélectronique et Systèmes Embarqués',
    institution: "ISIMM - Institut Supérieur d'Informatique et de Mathématiques de Monastir",
    period: '2021 - 2024',
    icon: 'ph:graduation-cap-duotone',
    color: '#00F5FF',
    highlights: [
      'Mention Bien',
      "Projet de fin d'études chez LZ Industrie",
      'Spécialisation systèmes embarqués, électronique et informatique',
    ],
  },
  {
    degree: 'Licence STIC',
    field: 'Électronique et Informatique',
    institution: "ISIMM - Institut Supérieur d'Informatique et de Mathématiques de Monastir",
    period: '2018 - 2021',
    icon: 'ph:book-open-duotone',
    color: '#7C3AED',
    highlights: [
      'Formation pluridisciplinaire',
      'Électronique, informatique et télécommunications',
      'Bases solides en programmation, systèmes et électronique',
    ],
  },
]

export default function Education() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="education" className="section-pad relative">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-12 text-center">
            <p className="mb-3 font-mono text-sm tracking-widest text-[#00F5FF]">// formation</p>
            <h2 className="section-title mx-auto text-white">Parcours académique</h2>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {educationData.map((edu, i) => (
              <motion.div
                key={edu.degree}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.2, duration: 0.6 }}
                className="glass group relative overflow-hidden rounded-[8px] p-6 transition-all duration-300 hover:border-[#00F5FF]/20 sm:p-8"
              >
                <div
                  className="absolute left-0 right-0 top-0 h-0.5"
                  style={{ background: `linear-gradient(90deg, ${edu.color}, transparent)` }}
                />

                <div className="relative z-10">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="glass grid h-12 w-12 place-items-center rounded-[8px]" style={{ color: edu.color }}>
                      <Icon icon={edu.icon} width={28} height={28} />
                    </div>
                    <span
                      className="rounded-full px-2 py-0.5 font-mono text-xs"
                      style={{
                        color: edu.color,
                        background: `${edu.color}15`,
                        border: `1px solid ${edu.color}30`,
                      }}
                    >
                      {edu.period}
                    </span>
                  </div>

                  <h3 className="mb-1 font-grotesk text-lg font-bold text-white">{edu.degree}</h3>
                  <p className="mb-2 font-mono text-sm" style={{ color: edu.color }}>{edu.field}</p>
                  <p className="mb-5 text-xs leading-relaxed text-gray-400">{edu.institution}</p>

                  <ul className="flex flex-col gap-2">
                    {edu.highlights.map(h => (
                      <li key={h} className="flex items-center gap-2 text-xs text-gray-300">
                        <span style={{ color: edu.color }}>▸</span>
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="glass mt-6 flex items-center gap-4 rounded-[8px] p-4"
          >
            <Icon icon="ph:certificate-duotone" width={28} height={28} className="text-[#00F5FF]" />
            <div>
              <p className="font-grotesk text-sm font-medium text-white">Certification</p>
              <p className="mt-0.5 text-xs text-gray-400">
                Formateur certifié en Intelligence Artificielle, avec veille continue en cloud, DevOps et automatisation.
              </p>
            </div>
            <div className="ml-auto hidden flex-shrink-0 sm:block">
              <span className="tech-tag">Certifié IA</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
