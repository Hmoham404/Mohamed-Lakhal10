import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Icon } from '@iconify/react'

const socialLinks = [
  {
    name: 'GitHub',
    icon: 'mdi:github',
    href: 'https://github.com/Hmoham404',
    color: '#fff',
    label: 'github.com/Hmoham404',
  },
  {
    name: 'LinkedIn',
    icon: 'mdi:linkedin',
    href: 'https://www.linkedin.com/in/mohamed-lakhal-874ab1218/',
    color: '#0A66C2',
    label: 'linkedin.com/in/mohamed-lakhal',
  },
  {
    name: 'Email',
    icon: 'mdi:email',
    href: 'mailto:Lakhalm300@gmail.com',
    color: '#00F5FF',
    label: 'Lakhalm300@gmail.com',
  },
]

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [formState, setFormState] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Message de ${formState.name} - Portfolio`)
    const body = encodeURIComponent(`Nom: ${formState.name}\nEmail: ${formState.email}\n\nMessage:\n${formState.message}`)
    window.location.href = `mailto:Lakhalm300@gmail.com?subject=${subject}&body=${body}`
    setSent(true)
    setTimeout(() => setSent(false), 3000)
  }

  return (
    <section id="contact" className="section-pad relative">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-12 text-center">
            <p className="mb-3 font-mono text-sm tracking-widest text-[#00F5FF]">// contact</p>
            <h2 className="section-title mx-auto text-white">Travaillons Ensemble</h2>
            <p className="mx-auto mt-4 max-w-xl text-sm text-gray-400">
              Disponible pour des missions freelance, des collaborations ou simplement pour échanger.
              N'hésitez pas à me contacter !
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 lg:grid-cols-5">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="lg:col-span-3"
            >
              <form onSubmit={handleSubmit} className="glass flex flex-col gap-5 rounded-[8px] p-6 sm:p-8">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-xs text-gray-400" htmlFor="contact-name">
                      Nom complet
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      className="form-input"
                      placeholder="John Doe"
                      value={formState.name}
                      onChange={e => setFormState(s => ({ ...s, name: e.target.value }))}
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="font-mono text-xs text-gray-400" htmlFor="contact-email">
                      Adresse email
                    </label>
                    <input
                      id="contact-email"
                      type="email"
                      className="form-input"
                      placeholder="john@example.com"
                      value={formState.email}
                      onChange={e => setFormState(s => ({ ...s, email: e.target.value }))}
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-mono text-xs text-gray-400" htmlFor="contact-message">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    className="form-input resize-none"
                    rows={5}
                    placeholder="Votre message ici..."
                    value={formState.message}
                    onChange={e => setFormState(s => ({ ...s, message: e.target.value }))}
                    required
                  />
                </div>

                <button type="submit" className="btn-primary w-full">
                  <span className="flex items-center justify-center gap-2">
                    <Icon icon={sent ? 'ph:check-circle-duotone' : 'ph:paper-plane-tilt-duotone'} width={20} height={20} />
                    {sent ? 'Message envoyé !' : 'Envoyer le message'}
                  </span>
                </button>
              </form>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="flex flex-col gap-6 lg:col-span-2"
            >
              <div className="glass flex flex-col gap-4 rounded-[8px] p-6">
                <h3 className="mb-2 font-grotesk text-sm font-bold text-white">Contact direct</h3>
                <a
                  href="tel:+21628809961"
                  className="group flex items-center gap-3 text-gray-300 transition-colors hover:text-white"
                >
                  <div className="glass flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-[8px] text-[#00F5FF]">
                    <Icon icon="ph:phone-duotone" width={18} height={18} />
                  </div>
                  <div>
                    <div className="font-mono text-xs text-gray-500">Téléphone</div>
                    <div className="font-mono text-sm transition-colors group-hover:text-[#00F5FF]">+216 28 80 99 61</div>
                  </div>
                </a>
                <a
                  href="mailto:Lakhalm300@gmail.com"
                  className="group flex items-center gap-3 text-gray-300 transition-colors hover:text-white"
                >
                  <div className="glass flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-[8px] text-[#00F5FF]">
                    <Icon icon="ph:envelope-duotone" width={18} height={18} />
                  </div>
                  <div>
                    <div className="font-mono text-xs text-gray-500">Email</div>
                    <div className="font-mono text-sm transition-colors group-hover:text-[#00F5FF]">Lakhalm300@gmail.com</div>
                  </div>
                </a>
              </div>

              <div className="glass flex flex-col gap-4 rounded-[8px] p-6">
                <h3 className="mb-2 font-grotesk text-sm font-bold text-white">Réseaux sociaux</h3>
                {socialLinks.map(social => (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 text-gray-300 transition-all hover:text-white"
                  >
                    <div className="glass flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-[8px] transition-all group-hover:shadow-lg">
                      <Icon
                        icon={social.icon}
                        width={18}
                        style={{ color: social.color }}
                        className="transition-transform group-hover:scale-110"
                      />
                    </div>
                    <div className="min-w-0">
                      <div className="font-mono text-xs text-gray-500">{social.name}</div>
                      <div className="max-w-[180px] truncate font-mono text-xs text-gray-400">{social.label}</div>
                    </div>
                  </a>
                ))}
              </div>

              <div
                className="flex items-center gap-3 rounded-[8px] p-4"
                style={{
                  background: 'linear-gradient(135deg, rgba(0,245,255,0.08), rgba(124,58,237,0.08))',
                  border: '1px solid rgba(0,245,255,0.15)',
                }}
              >
                <span className="pulse-dot flex-shrink-0" />
                <div>
                  <p className="font-grotesk text-sm font-medium text-white">Disponible</p>
                  <p className="font-mono text-xs text-gray-400">Missions freelance & CDI</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
