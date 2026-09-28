import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import CustomCursor from './components/CustomCursor'
import ScrollProgress from './components/ScrollProgress'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Education from './components/Education'
import Contact from './components/Contact'
import Footer from './components/Footer'

function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold text-[#07101d] shadow-lg transition-transform hover:scale-110 sm:bottom-6 sm:right-6"
          style={{
            background: 'linear-gradient(135deg, #00F5FF, #7C3AED)',
            boxShadow: '0 0 20px rgba(0,245,255,0.4)',
          }}
          aria-label="Retour en haut"
        >
          ↑
        </motion.button>
      )}
    </AnimatePresence>
  )
}

function LoadingScreen({ onDone }) {
  useEffect(() => {
    const timer = setTimeout(onDone, 1850)
    return () => clearTimeout(timer)
  }, [onDone])

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden"
      style={{
        background:
          'radial-gradient(circle at 50% 30%, rgba(0,245,255,0.16), transparent 32%), linear-gradient(135deg, #050912 0%, #071423 48%, #090813 100%)',
      }}
    >
      <div className="hero-grid-lines absolute inset-0 opacity-40" />
      <motion.div
        className="absolute h-72 w-72 rounded-full border border-[#00F5FF]/15"
        animate={{ rotate: 360, scale: [1, 1.08, 1] }}
        transition={{
          rotate: { repeat: Infinity, duration: 12, ease: 'linear' },
          scale: { repeat: Infinity, duration: 2.4, ease: 'easeInOut' },
        }}
      />

      <div className="relative flex w-[min(88vw,360px)] flex-col items-center gap-7 rounded-[8px] border border-white/10 bg-[#06101d]/72 px-7 py-9 shadow-[0_32px_110px_rgba(0,0,0,0.52)] backdrop-blur-2xl">
        <motion.div
          animate={{
            y: [0, -5, 0],
            boxShadow: [
              '0 0 22px rgba(0,245,255,0.22)',
              '0 0 44px rgba(124,58,237,0.35)',
              '0 0 22px rgba(0,245,255,0.22)',
            ],
          }}
          transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
          className="brand-mark h-20 w-20 text-xl"
        >
          <span>ML</span>
        </motion.div>

        <div className="text-center">
          <p className="font-grotesk text-lg font-black text-white">Mohamed Lakhal</p>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.34em] text-[#78a7d4]">
            AI · Web · Embedded
          </p>
        </div>

        <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full rounded-full"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.65, ease: 'easeInOut' }}
            style={{ background: 'linear-gradient(90deg, #00F5FF, #7C3AED)' }}
          />
        </div>

        <motion.p
          animate={{ opacity: [0.45, 1, 0.45] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="font-mono text-xs uppercase tracking-[0.28em] text-[#9fb3d8]"
        >
          Chargement du portfolio
        </motion.p>
      </div>
    </motion.div>
  )
}

export default function App() {
  const [loading, setLoading] = useState(true)

  return (
    <div className="relative min-h-screen bg-[#0A0A0F]">
      <div className="ascii-grid" />
      <div className="scan-lines" />
      <div className="scan-line-moving" />
      <div className="orb-cyan" />
      <div className="orb-violet" />

      <AnimatePresence>
        {loading && <LoadingScreen onDone={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <>
          <CustomCursor />
          <ScrollProgress />
          <Navbar />

          <main>
            <Hero />
            <About />
            <Skills />
            <Experience />
            <Projects />
            <Education />
            <Contact />
          </main>

          <Footer />
          <BackToTop />
        </>
      )}
    </div>
  )
}
