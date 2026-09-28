import { useState, useRef } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Icon } from '@iconify/react'
import { skillsData } from '../data/skills'

function SkillCard({ skill, index }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.05 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="glass group relative flex flex-col items-center gap-3 overflow-hidden rounded-[8px] p-4"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        boxShadow: hovered ? `0 0 20px ${skill.color}33, 0 0 40px ${skill.color}11` : 'none',
        borderColor: hovered ? `${skill.color}40` : 'rgba(255,255,255,0.08)',
        transition: 'box-shadow 0.3s, border-color 0.3s',
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background: `radial-gradient(circle at 50% 50%, ${skill.color}15, transparent 70%)` }}
      />

      <div className="relative z-10">
        <Icon
          icon={skill.icon}
          width={40}
          height={40}
          style={{ color: skill.color }}
          className="transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      <span className="z-10 text-center font-mono text-xs text-gray-300 transition-colors group-hover:text-white">
        {skill.name}
      </span>

      <div className="z-10 h-0.5 w-full overflow-hidden rounded-full bg-white/5">
        <motion.div
          className="h-full rounded-full"
          initial={{ width: 0 }}
          animate={{ width: hovered ? `${skill.level}%` : '30%' }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{ background: `linear-gradient(90deg, ${skill.color}, #7C3AED)` }}
        />
      </div>

      <AnimatePresence>
        {hovered && (
          <motion.span
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="absolute right-2 top-2 z-10 font-mono text-[10px]"
            style={{ color: skill.color }}
          >
            {skill.level}%
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function Skills() {
  const [activeTab, setActiveTab] = useState('langages')
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const activeCategory = skillsData.find(c => c.id === activeTab)

  return (
    <section id="skills" className="section-pad relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-12 text-center">
            <p className="mb-3 font-mono text-sm tracking-widest text-[#00F5FF]">// compétences</p>
            <h2 className="section-title mx-auto text-white">Stack Technique</h2>
            <p className="mx-auto mt-4 max-w-xl text-sm text-gray-400">
              Technologies et outils que je maîtrise, de l'embarqué au cloud.
            </p>
          </div>

          <div className="mb-10 flex flex-wrap justify-center gap-2 sm:gap-3">
            {skillsData.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`rounded-[8px] px-4 py-2 font-grotesk text-sm font-medium transition-all duration-200 ${
                  activeTab === cat.id
                    ? 'font-bold text-[#0A0A0F]'
                    : 'glass text-gray-400 hover:text-white'
                }`}
                style={
                  activeTab === cat.id
                    ? { background: 'linear-gradient(135deg, #00F5FF, #7C3AED)', boxShadow: '0 0 20px rgba(0,245,255,0.3)' }
                    : {}
                }
              >
                {cat.category}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
            >
              {activeCategory?.skills.map((skill, i) => (
                <SkillCard key={skill.name} skill={skill} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
