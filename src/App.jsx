import { useState, useEffect, useRef, useCallback } from 'react'
import confetti from 'canvas-confetti'
import { Volume2, VolumeX, MapPin } from 'lucide-react'

// ─── Asset paths ────────────────────────────────────────────────────────────
const A = {
  welcomeBg: '/assets/g-welcome-bg-BCda9f2G.png',
  shivaParvati: '/assets/g-shiva-parvati-D5GA8Xot.png',
  ganesh: '/assets/ganesh-idol-TubyYjSJ.png',
  envelope: '/assets/maroonenvelop-DVcZBctQ.png',
  envelopeBg: '/assets/g-envelope-bg-B_YE_ECq.png',
  logo: '/assets/ASlogo-DWhlfaJZ.png',
  haldiBg: '/assets/g-haldi-bg-CB-4YaJG.png',
  mehnidBg: '/assets/g-mehndi-bg-qHMm73q3.png',
  sangeetBg: '/assets/g-sangeet-bg-B0tRJ9nE.png',
  weddingBg: '/assets/g-wedding-bg-8_wipKLl.png',
  haldiCouple: '/assets/haldi-B4kzVy-F.png',
  coupleHaldi: '/assets/couple-haldi-CsWjfUdv.png',
  mehndiCouple: '/assets/01-ojlgGeHc.png',
  sangeetCouple: '/assets/03-CckZCPLj.png',
  weddingCouple: '/assets/04-CC6lrDGi.png',
  wHaldi: '/assets/w-haldi-DjMtDyPQ.png',
  wMehndi: '/assets/w-mehndi-CUpnixOF.png',
  wSangeet: '/assets/w-sangeet-qh49Zsmo.png',
  wWedding: '/assets/w-wedding-BtwN4UQz.png',
  weddingHero: '/assets/wedding-hero-BBfn2Y6k.jpg',
  fallingDaisy: '/assets/falling-daisy-DWyrh5i3.png',
  fallingRose: '/assets/falling-rose-petal-CzrX2ZBd.png',
  audio: '/audio/background.mp3',
}

// ─── Preloader ───────────────────────────────────────────────────────────────
function Preloader() {
  useEffect(() => {
    Object.values(A).filter(v => !v.endsWith('.mp3')).forEach(src => {
      const img = new Image(); img.src = src
    })
  }, [])
  return null
}

// ─── Divider ─────────────────────────────────────────────────────────────────
function Divider() {
  return (
    <div className="my-5 flex items-center justify-center gap-3">
      <span className="h-px w-16 bg-gold-soft" />
      <span className="text-amber-600 text-lg font-emoji">❀</span>
      <span className="h-px w-16 bg-gold-soft" />
    </div>
  )
}

// ─── Bell Icon (SVG) ─────────────────────────────────────────────────────────
function BellIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="11.25" y="1" width="1.5" height="4" rx="0.5" />
      <path d="M12 5C8.13401 5 5 8.13401 5 12V16H19V12C19 8.13401 15.866 5 12 5Z" />
      <path d="M4 16.5C4 16.2239 4.22386 16 4.5 16H19.5C19.7761 16 20 16.2239 20 16.5V18H4V16.5Z" />
      <circle cx="12" cy="20" r="2" />
    </svg>
  )
}

// ─── Butterfly ───────────────────────────────────────────────────────────────
function Butterfly() {
  return (
    <div className="butterfly-path" aria-hidden="true">
      <span className="butterfly-wings">
        <svg width="38" height="32" viewBox="0 0 64 52" xmlns="http://www.w3.org/2000/svg">
          <g>
            <ellipse cx="32" cy="26" rx="1.6" ry="11" fill="#1f2937" />
            <circle cx="32" cy="14" r="2.2" fill="#1f2937" />
            <path d="M32 13 C 29 8, 27 6, 25 5" stroke="#1f2937" strokeWidth="1" fill="none" strokeLinecap="round" />
            <path d="M32 13 C 35 8, 37 6, 39 5" stroke="#1f2937" strokeWidth="1" fill="none" strokeLinecap="round" />
            <path d="M30 22 C 10 10, 2 22, 6 32 C 10 42, 24 38, 30 30 Z" fill="#3b82f6" opacity="0.95" />
            <path d="M30 30 C 18 38, 10 44, 14 48 C 20 50, 28 42, 30 36 Z" fill="#60a5fa" opacity="0.95" />
            <path d="M34 22 C 54 10, 62 22, 58 32 C 54 42, 40 38, 34 30 Z" fill="#3b82f6" opacity="0.95" />
            <path d="M34 30 C 46 38, 54 44, 50 48 C 44 50, 36 42, 34 36 Z" fill="#60a5fa" opacity="0.95" />
            <circle cx="14" cy="26" r="1.6" fill="#fff" opacity="0.85" />
            <circle cx="50" cy="26" r="1.6" fill="#fff" opacity="0.85" />
          </g>
        </svg>
      </span>
    </div>
  )
}

// ─── Falling Petals ──────────────────────────────────────────────────────────
const PETAL_TYPES = [
  { type: 'img', src: A.fallingDaisy },
  { type: 'img', src: A.fallingRose },
  { type: 'emoji', char: '🌸' },
  { type: 'emoji', char: '🍃' },
]

function FallingPetals({ count = 24 }) {
  const petals = useRef(
    Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      duration: 12 + Math.random() * 14,
      delay: Math.random() * 10,
      size: 22 + Math.random() * 26,
      rotation: Math.random() * 360,
      type: PETAL_TYPES[i % PETAL_TYPES.length],
    }))
  ).current

  return (
    <div className="pointer-events-none fixed inset-0 z-10 overflow-hidden">
      {petals.map(p => (
        <div
          key={p.id}
          className="absolute animate-float-petal"
          style={{
            left: `${p.left}%`,
            top: '-10vh',
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            transform: `rotate(${p.rotation}deg)`,
            filter: 'drop-shadow(0 2px 4px rgba(83,15,20,0.18))',
          }}
        >
          {p.type.type === 'img'
            ? <img src={p.type.src} alt="" width={p.size} height={p.size} style={{ width: p.size, height: p.size, objectFit: 'contain' }} />
            : <span className="font-emoji" style={{ fontSize: p.size * 0.55, lineHeight: 1, display: 'inline-block' }}>{p.type.char}</span>
          }
        </div>
      ))}
    </div>
  )
}

// ─── Music Player ─────────────────────────────────────────────────────────────
function MusicPlayer({ play }) {
  const audioRef = useRef(null)
  const [muted, setMuted] = useState(false)

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = 0.45
    audio.loop = true
    if (play && !muted) {
      audio.play().catch(() => { })
    } else {
      audio.pause()
    }
  }, [play, muted])

  return (
    <>
      <audio ref={audioRef} src={A.audio} preload="auto" />
      {play && (
        <button
          type="button"
          aria-label={muted ? 'Unmute background music' : 'Mute background music'}
          onClick={() => setMuted(m => !m)}
          className="fixed bottom-5 right-5 z-50 h-11 w-11 rounded-full bg-foreground/80 text-cream backdrop-blur shadow-elegant flex items-center justify-center hover:scale-105 transition"
        >
          {muted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
        </button>
      )}
    </>
  )
}

// ─── Countdown Timer ──────────────────────────────────────────────────────────
const WEDDING_TIME = new Date('2026-08-04T16:00:00+05:30').getTime()

function getTimeLeft() {
  const diff = Math.max(0, WEDDING_TIME - Date.now())
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor(diff / 3600000 % 24),
    minutes: Math.floor(diff / 60000 % 60),
    seconds: Math.floor(diff / 1000 % 60),
  }
}

function CountdownTimer() {
  const [time, setTime] = useState(getTimeLeft)

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  const units = [
    { v: time.days, l: 'Days' },
    { v: time.hours, l: 'Hours' },
    { v: time.minutes, l: 'Minutes' },
    { v: time.seconds, l: 'Seconds' },
  ]

  return (
    <div className="flex justify-center gap-3 sm:gap-6">
      {units.map(u => (
        <div key={u.l} className="flex flex-col items-center min-w-[68px] sm:min-w-[90px]">
          <div className="w-full aspect-square rounded-2xl bg-cream border border-gold-soft shadow-soft flex items-center justify-center backdrop-blur-sm">
            <span className="font-cinzel text-2xl sm:text-4xl text-rose-deep tabular-nums">
              {String(u.v).padStart(2, '0')}
            </span>
          </div>
          <span className="mt-2 text-xs sm:text-sm tracking-widest uppercase text-sage-deep">{u.l}</span>
        </div>
      ))}
    </div>
  )
}

// ─── Scratch Card ─────────────────────────────────────────────────────────────
function ScratchCard({ onRevealed, revealed }) {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)
  const isDrawing = useRef(false)
  const [done, setDone] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const dpr = window.devicePixelRatio || 1
    const draw = () => {
      const rect = container.getBoundingClientRect()
      canvas.width = rect.width * dpr
      canvas.height = rect.height * dpr
      canvas.style.width = `${rect.width}px`
      canvas.style.height = `${rect.height}px`
      const ctx = canvas.getContext('2d')
      ctx.scale(dpr, dpr)
      const grad = ctx.createLinearGradient(0, 0, rect.width, rect.height)
      grad.addColorStop(0, '#5c0f14')
      grad.addColorStop(0.25, '#8b1e24')
      grad.addColorStop(0.5, '#b3262d')
      grad.addColorStop(0.75, '#8b1e24')
      grad.addColorStop(1, '#4a0b10')
      ctx.fillStyle = grad
      ctx.fillRect(0, 0, rect.width, rect.height)
      ctx.fillStyle = '#f8d7a8'
      ctx.font = '600 14px "Cinzel", serif'
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'
      ctx.fillText('✦  SCRATCH TO REVEAL  ✦', rect.width / 2, rect.height / 2)
    }
    draw()
    window.addEventListener('resize', draw)
    return () => window.removeEventListener('resize', draw)
  }, [])

  const fireConfetti = useCallback(() => {
    const fire = (opts) => confetti({
      particleCount: 120, spread: 90, startVelocity: 45,
      colors: ['#f9c8d9', '#f4a3bf', '#e87aa3', '#c75a85', '#fff'],
      scalar: 1.1, ...opts,
    })
    fire({ origin: { x: 0.2, y: 0.4 } })
    fire({ origin: { x: 0.5, y: 0.3 } })
    fire({ origin: { x: 0.8, y: 0.4 } })
    setTimeout(() => fire({ origin: { x: 0.5, y: 0.5 } }), 250)
  }, [])

  const checkReveal = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas || done) return
    const ctx = canvas.getContext('2d')
    const { width, height } = canvas
    const data = ctx.getImageData(0, 0, width, height).data
    let scratched = 0
    for (let i = 3; i < data.length; i += 160) if (data[i] < 60) scratched++
    if (scratched / (data.length / 160) > 0.45) {
      setDone(true)
      ctx.clearRect(0, 0, width, height)
      fireConfetti()
      onRevealed()
    }
  }, [done, fireConfetti, onRevealed])

  const scratch = useCallback((x, y) => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const rect = canvas.getBoundingClientRect()
    ctx.globalCompositeOperation = 'destination-out'
    ctx.beginPath()
    ctx.arc(x - rect.left, y - rect.top, 28, 0, Math.PI * 2)
    ctx.fill()
  }, [])

  return (
    <div ref={containerRef} className="relative mx-auto w-full max-w-md h-32 rounded-2xl overflow-hidden border-2 border-gold-soft shadow-elegant select-none">
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-cream">
        <p className="font-cinzel tracking-[0.35em] text-sage-deep text-base">SAVE THE DATE</p>
        <p className="font-cinzel text-2xl text-rose-deep mt-1">4th August 2026</p>
      </div>
      {!revealed && (
        <canvas
          ref={canvasRef}
          onPointerDown={e => { e.target.setPointerCapture(e.pointerId); isDrawing.current = true; scratch(e.clientX, e.clientY) }}
          onPointerMove={e => { if (isDrawing.current) { e.preventDefault(); scratch(e.clientX, e.clientY) } }}
          onPointerUp={() => { isDrawing.current = false; checkReveal() }}
          onPointerLeave={() => { isDrawing.current = false; checkReveal() }}
          className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing touch-none"
        />
      )}
    </div>
  )
}

// ─── Envelope View (closed) ──────────────────────────────────────────────────
function EnvelopeView({ onOpen, opening }) {
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center relative bg-[#FCF8F2] px-6 overflow-hidden">
      <img src={A.envelopeBg} alt="" className="absolute inset-0 w-full h-full object-cover pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-b from-cream/20 via-transparent to-cream/40 pointer-events-none" />
      <span className="absolute top-6 left-6 text-3xl opacity-70 animate-drift pointer-events-none">🪷</span>
      <span className="absolute bottom-8 left-10 text-3xl opacity-70 animate-drift pointer-events-none" style={{ animationDelay: '2s' }}>🌿</span>

      <div className="relative z-10 flex flex-col items-center justify-center max-w-md w-full text-center">
        <div className={`mb-6 transition-all duration-500 ${opening ? 'opacity-0 scale-95' : 'animate-fade-up'}`}>
          <img src={A.ganesh} alt="Lord Ganesha" className="w-20 h-20 sm:w-24 sm:h-24 object-contain mx-auto drop-shadow-md animate-shimmer" />
        </div>

        <button
          onClick={onOpen}
          aria-label="Open invitation"
          className={`relative group transition-transform duration-500 hover:scale-105 active:scale-95 ${opening ? 'animate-envelope-open' : 'animate-fade-up delay-100'}`}
          style={{ perspective: '1000px' }}
        >
          <img src={A.envelope} alt="Wedding invitation envelope" className="w-[280px] sm:w-[340px] md:w-[380px] h-auto drop-shadow-2xl" />
          <span className="absolute inset-0 flex items-center justify-center">
            <img src={A.logo} alt="SR wax seal monogram" className="w-14 h-14 sm:w-16 sm:h-16 object-contain drop-shadow-lg group-hover:rotate-12 transition-transform duration-500" />
          </span>
        </button>

        <div className={`mt-10 text-center transition-all duration-500 ${opening ? 'opacity-0 translate-y-4 pointer-events-none' : 'animate-fade-up delay-200'}`}>
          <h1 className="font-cinzel text-3xl sm:text-4xl text-rose-deep font-semibold tracking-[0.15em]">YOU'RE INVITED</h1>
          <p className="mt-3 font-bold font-serif-display text-foreground/80 italic tracking-wide text-base sm:text-lg">
            Tap the envelope to open our invitation
          </p>
        </div>
      </div>
    </div>
  )
}

// ─── Main Invitation ──────────────────────────────────────────────────────────
function MainInvitation() {
  const [dateRevealed, setDateRevealed] = useState(false)
  const [visible, setVisible] = useState({})
  const welcomeRef = useRef(null)
  const wardrobeRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const id = e.target.getAttribute('data-id')
          if (id) setVisible(v => ({ ...v, [id]: true }))
        }
      })
    }, { threshold: 0.15 })

    if (welcomeRef.current) observer.observe(welcomeRef.current)
    if (wardrobeRef.current) observer.observe(wardrobeRef.current)
    document.querySelectorAll('.wardrobe-card').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <main className="relative bg-[#FCF8F2] min-h-screen text-rose-deep overflow-hidden select-none animate-fade-in font-serif-display">

      {/* Fixed watermark */}
      <div className="fixed inset-0 pointer-events-none opacity-[0.08] z-0 mix-blend-overlay">
        <img src={A.welcomeBg} alt="" className="w-full h-full object-cover" />
      </div>

      {/* ── Welcome Section ── */}
      <section
        ref={welcomeRef}
        data-id="welcome"
        className="relative min-h-screen w-full flex flex-col items-center justify-between py-12 px-6 bg-cover bg-center overflow-hidden z-10"
        style={{ backgroundImage: `url(${A.welcomeBg})` }}
      >
        <div className="absolute inset-0 bg-[#FCF8F2]/10 pointer-events-none" />

        {/* Hanging bells */}
        <div className="absolute top-0 left-0 right-0 z-20 flex justify-between px-4 sm:px-12 pointer-events-none">
          <div className="flex gap-4 sm:gap-8 items-start">
            {[{ h: 'h-16 sm:h-28', s: 'w-10 h-10 sm:w-16 sm:h-16', delay: '0.2s' },
            { h: 'h-10 sm:h-20', s: 'w-8 h-8 sm:w-12 sm:h-12', delay: '0.8s' }].map((b, i) => (
              <div key={i} className="flex flex-col items-center animate-bell-swing origin-top" style={{ animationDelay: b.delay }}>
                <div className={`w-0.5 ${b.h} bg-amber-700/40`} />
                <BellIcon className={`${b.s} text-amber-700 drop-shadow-md`} />
              </div>
            ))}
          </div>
          <div className="flex gap-4 sm:gap-8 items-start">
            {[{ h: 'h-12 sm:h-24', s: 'w-9 h-9 sm:w-14 sm:h-14', delay: '0.5s' },
            { h: 'h-20 sm:h-32', s: 'w-10 h-10 sm:w-16 sm:h-16', delay: '1.1s' }].map((b, i) => (
              <div key={i} className="flex flex-col items-center animate-bell-swing origin-top" style={{ animationDelay: b.delay }}>
                <div className={`w-0.5 ${b.h} bg-amber-700/40`} />
                <BellIcon className={`${b.s} text-amber-700 drop-shadow-md`} />
              </div>
            ))}
          </div>
        </div>

        {/* Main content */}
        <div className="relative z-10 w-full max-w-2xl mx-auto flex flex-col items-center text-center mt-12 sm:mt-16">
          {/* Ganesh + Mantra */}
          <div className="mb-4 animate-fade-up">
            <img src={A.ganesh} alt="Lord Ganesha" width={80} height={80} className="mx-auto h-20 w-20 sm:h-24 sm:w-24 object-contain drop-shadow-md animate-shimmer" />
            <h3 className="font-cinzel text-xs sm:text-sm tracking-[0.25em] text-[#5C0F14] font-bold bg-[#FCF8F2]/90 border border-gold-soft/60 px-6 py-1.5 rounded-full shadow-sm inline-block mt-3 backdrop-blur-[1px]">
              || Om Shree Ganeshaya Namah ||
            </h3>
          </div>

          {/* Sanskrit blessing */}
          <div className="max-w-lg mx-auto bg-[#FCF8F2]/95 border-2 border-gold-soft p-5 rounded-2xl mb-6 shadow-elegant animate-fade-up delay-200 backdrop-blur-sm">
            <p className="tiro-devanagari-hindi-regular sm:text-lg text-[#5C0F14] font-bold leading-relaxed tracking-wider">
              मङ्गलम् भगवान विष्णुः मङ्गलम् गरुडध्वजः ।<br />
              मङ्गलम् पुण्डरी काक्षः मङ्गलाय तनो हरिः ।।
            </p>
            <div className="w-20 h-px bg-gold-soft mx-auto my-3" />
            <p className="text-xs sm:text-sm text-rose-deep/80 font-medium italic leading-relaxed uppercase tracking-wider">
              Mangalam Bhagwan Vishnu · Mangalam Garudadhwajah<br />
              Mangalam Pundarikakshah · Mangalaya Tano Harih
            </p>
          </div>

          <p className="font-serif-display text-sm sm:text-base text-foreground/80 max-w-md px-4 animate-fade-up delay-300">
            We request the honor of your gracious presence on the auspicious occasion of the wedding celebration of
          </p>

          {/* Groom */}
          <div className="mt-6 flex flex-col items-center">
            <h1 className="animate-fade-up delay-400">
              <span className="font-script text-6xl sm:text-8xl text-rose leading-none drop-shadow-sm hover:scale-105 transition-transform duration-500 block">Shrey</span>
            </h1>
            <div className="mt-2 text-xs sm:text-sm text-foreground/80 tracking-wide leading-relaxed animate-fade-up delay-500">
              <p className="font-medium">S/o Mrs. Panna Khokhra &amp; Mr. Bharat Khokhra</p>
            </div>
          </div>

          {/* Weds separator */}
          <div className="my-3 flex items-center justify-center gap-3 animate-fade-up delay-500">
            <span className="h-px w-10 bg-gold-soft/60" />
            <span className="font-script text-2xl sm:text-3xl text-rose-deep italic">weds</span>
            <span className="h-px w-10 bg-gold-soft/60" />
          </div>

          {/* Bride */}
          <div className="flex flex-col items-center">
            <h1 className="animate-fade-up delay-500">
              <span className="font-script text-6xl sm:text-8xl text-rose leading-none drop-shadow-sm hover:scale-105 transition-transform duration-500 block">Kirti</span>
            </h1>
            <div className="mt-2 text-xs sm:text-sm text-foreground/80 tracking-wide leading-relaxed animate-fade-up delay-700">
              <p className="font-medium">D/o Mr. Brijesh Upadhyay &amp; Mrs. Laxmi Upadhyay</p>
            </div>
          </div>
        </div>

        {/* Shiva-Parvati caricature */}
        <div className="relative z-10 w-full max-w-[280px] sm:max-w-[340px] mt-8 flex justify-center items-end animate-fade-up delay-1000">
          <img src={A.shivaParvati} alt="Shiva-Parvati wedding caricature" className="w-full h-auto object-contain drop-shadow-xl select-none" />
        </div>
      </section>

      {/* ── Save the Date ── */}
      <section className="relative py-20 px-6 bg-cream border-y border-gold-soft/30 z-10">
        <img src={A.weddingHero} alt="" className="absolute inset-0 w-full h-full object-cover opacity-15 pointer-events-none" />
        <div className="relative max-w-3xl mx-auto text-center z-10">
          <h2 className="font-cinzel text-xl sm:text-2xl text-rose-deep tracking-[0.2em] mb-4">SAVE THE DATE</h2>
          <Divider />
          <div className="mb-10 mt-8">
            <ScratchCard revealed={dateRevealed} onRevealed={() => setDateRevealed(true)} />
          </div>
          <div className={`transition-all duration-1000 ${dateRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none h-0 overflow-hidden'}`} aria-hidden={!dateRevealed}>
            <CountdownTimer />
          </div>
        </div>
      </section>

      {/* ── Events Schedule ── */}
      <section className="relative py-20 px-4 sm:px-6 bg-[#FCF8F2] z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-cinzel text-3xl sm:text-5xl text-rose-deep font-bold tracking-[0.15em]">EVENTS SCHEDULE</h2>
            <p className="font-cinzel text-xs tracking-[0.25em] text-rose-deep/75 mt-1">CELEBRATE WITH US</p>
            <Divider />
          </div>

          <div className="space-y-16">
            {/* Engagement Ceremony */}
            <div className="relative rounded-3xl overflow-hidden border border-gold-soft bg-white text-cream p-6 sm:p-12 shadow-elegant hover:shadow-2xl transition-all duration-500 group flex flex-col justify-between min-h-[500px] isolate">
              <img src={A.sangeetBg} alt="" className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none scale-[1.06] origin-center" />
              <div className="absolute top-2 left-0 right-0 flex justify-around pointer-events-none px-4 z-10">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-yellow-100 animate-twinkle" style={{ animationDelay: `${i * 0.18}s` }} />
                ))}
              </div>
              <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
                {['✨', '💖', '✨', '💖'].map((n, i) => (
                  <div key={i} className="absolute text-xl opacity-0 animate-float-note text-amber-200" style={{ left: `${15 + Math.random() * 70}%`, bottom: '25%', animationDelay: `${i * 1.6}s` }}>{n}</div>
                ))}
              </div>
              <div className="relative z-10 text-center flex flex-col items-center w-full mx-auto bg-white/15 backdrop-blur-md border border-white/15 p-5 sm:p-6 rounded-3xl shadow-elegant mt-16 sm:mt-20">
                <img src={A.logo} alt="SR Monogram" className="w-12 h-12 object-contain opacity-95 mb-2" />
                <p className="font-serif-display italic text-amber-200 text-lg font-semibold tracking-wider">#SKForever</p>
                <h3 className="font-cinzel text-xs tracking-[0.2em] text-amber-200/80 mt-2 uppercase">PLEASE JOIN US FOR AN EVENING</h3>
                <p className="font-serif-display text-sm sm:text-base text-amber-200 mt-1 italic">Witness the moment two rings lock in the promise of a lifetime.</p>
                <div className="w-24 h-px bg-gold-soft/30 my-5" />
                <h2 className="font-cinzel text-2xl sm:text-3xl tracking-[0.15em] font-bold text-[#47296b]">ENGAGEMENT CEREMONY</h2>
                <div className="mt-4 bg-black/20 border border-gold-soft/25 px-6 py-2 rounded-full font-cinzel text-xs sm:text-sm text-[#47296b] font-semibold shadow-soft">
                  4th August 2026 | 4:00 PM
                </div>
              </div>
              <div className="relative z-10 w-full max-w-[200px] sm:max-w-[240px] mx-auto mt-8 flex justify-center items-end self-end">
                <img src={A.sangeetCouple} alt="Engagement Couple Caricature" className="w-full h-auto object-contain drop-shadow-xl group-hover:scale-105 transition-transform duration-500" />
              </div>
            </div>

            {/* Haldi */}
            <div className="relative rounded-3xl overflow-hidden border border-gold-soft bg-white p-6 sm:p-12 shadow-elegant hover:shadow-2xl transition-all duration-500 group flex flex-col justify-between min-h-[500px] isolate">
              <img src={A.haldiBg} alt="" className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none scale-[1.06] origin-center" />
              <div className="absolute inset-0 pointer-events-none overflow-hidden mix-blend-color-burn z-10">
                {Array.from({ length: 15 }).map((_, i) => (
                  <div key={i} className="absolute w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-amber-400 opacity-60 animate-turmeric"
                    style={{ left: `${Math.random() * 100}%`, top: `${10 + Math.random() * 80}%`, animationDelay: `${Math.random() * 3}s`, animationDuration: `${2.5 + Math.random() * 3}s` }} />
                ))}
              </div>
              <div className="relative top-4 z-10 text-center flex flex-col items-center w-full mx-auto bg-white/40 backdrop-blur-md border border-white/30 p-5 sm:p-6 rounded-3xl shadow-elegant mt-20 sm:mt-24">
                <img src={A.logo} alt="SR Monogram" className="w-12 h-12 object-contain opacity-90 mb-2" />
                <p className="font-serif-display italic text-amber-700 text-lg font-semibold tracking-wider">#SKForever</p>
                <h3 className="font-cinzel text-xs tracking-[0.2em] text-amber-700/80 mt-2 uppercase">PLEASE JOIN US FOR A MORNING</h3>
                <p className="font-serif-display text-sm sm:text-base text-foreground/80 mt-1 italic">Filled with love, laughter and turmeric.</p>
                <div className="w-24 h-px bg-gold-soft/50 my-5" />
                <h2 className="font-cinzel text-2xl sm:text-3xl tracking-[0.15em] font-bold text-amber-700">HALDI CEREMONY</h2>
                <div className="mt-4 bg-amber-500/10 border border-amber-600/30 px-6 py-2 rounded-full font-cinzel text-xs sm:text-sm text-amber-800 font-semibold shadow-soft">
                  To Be Decided
                </div>
              </div>
              <div className="relative z-10 w-full max-w-[200px] sm:max-w-[240px] mx-auto mt-8 flex justify-center items-end self-end">
                <img src={A.haldiCouple} alt="Haldi Couple Caricature" className="w-full h-auto object-contain drop-shadow-lg group-hover:scale-105 transition-transform duration-500" />
              </div>
            </div>

            {/* Mehndi */}
            <div className="relative rounded-3xl overflow-hidden border border-gold-soft bg-white p-6 sm:p-12 shadow-elegant hover:shadow-2xl transition-all duration-500 group flex flex-col justify-between min-h-[550px] isolate">
              <img src={A.mehnidBg} alt="" className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none scale-[1.06] origin-center" />
              <div className="absolute top-0 left-0 pointer-events-none w-20 h-20 sm:w-32 sm:h-32 text-emerald-800/20 z-10">
                <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-current stroke-1 animate-draw">
                  <path d="M 0,20 C 10,20 20,10 20,0 M 0,40 C 20,40 40,20 40,0 M 0,60 C 30,60 60,30 60,0 M 0,80 C 40,80 80,40 80,0" />
                  <circle cx="10" cy="10" r="3" className="fill-current" />
                  <circle cx="30" cy="30" r="3" className="fill-current" />
                  <circle cx="50" cy="50" r="3" className="fill-current" />
                </svg>
              </div>
              <div className="absolute top-0 right-0 scale-x-[-1] pointer-events-none w-20 h-20 sm:w-32 sm:h-32 text-emerald-800/20 z-10">
                <svg viewBox="0 0 100 100" className="w-full h-full fill-none stroke-current stroke-1 animate-draw">
                  <path d="M 0,20 C 10,20 20,10 20,0 M 0,40 C 20,40 40,20 40,0 M 0,60 C 30,60 60,30 60,0" />
                  <circle cx="15" cy="15" r="2.5" className="fill-current" />
                  <circle cx="35" cy="35" r="2.5" className="fill-current" />
                </svg>
              </div>
              <div className="relative z-10 text-center flex flex-col items-center w-full mx-auto bg-white/40 backdrop-blur-md border border-white/30 p-5 sm:p-6 rounded-3xl shadow-elegant mt-6 sm:mt-8">
                <img src={A.logo} alt="SR Monogram" className="w-12 h-12 object-contain opacity-90 mb-2" />
                <p className="font-serif-display italic text-emerald-800 text-lg font-semibold tracking-wider">#KirtiShrey</p>
                <h3 className="font-cinzel text-xs tracking-[0.2em] text-emerald-800/80 mt-2 uppercase">PLEASE JOIN US FOR AN AFTERNOON</h3>
                <p className="font-serif-display text-sm sm:text-base text-foreground/80 mt-1 italic">Filled with vibrant hues, joyful moments and the fragrance of henna.</p>
                <div className="w-24 h-px bg-gold-soft/50 my-5" />
                <h2 className="font-cinzel text-2xl sm:text-3xl tracking-[0.15em] font-bold text-emerald-800">MEHNDI CEREMONY</h2>
                <div className="mt-4 bg-emerald-500/10 border border-emerald-600/30 px-6 py-2 rounded-full font-cinzel text-xs sm:text-sm text-emerald-800 font-semibold shadow-soft">
                  To Be Decided
                </div>
              </div>
              <div className="relative z-10 w-full max-w-[200px] sm:max-w-[240px] mx-auto mt-8 flex justify-center items-end self-end">
                <img src={A.mehndiCouple} alt="Mehndi Couple Caricature" className="w-full h-auto object-contain drop-shadow-lg group-hover:scale-105 transition-transform duration-500" />
              </div>
            </div>

            {/* Sangeet */}
            <div className="relative rounded-3xl overflow-hidden border border-gold-soft bg-white text-cream p-6 sm:p-12 shadow-elegant hover:shadow-2xl transition-all duration-500 group flex flex-col justify-between min-h-[500px] isolate">
              <img src={A.sangeetBg} alt="" className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none scale-[1.06] origin-center" />
              <div className="absolute top-2 left-0 right-0 flex justify-around pointer-events-none px-4 z-10">
                {Array.from({ length: 12 }).map((_, i) => (
                  <div key={i} className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-yellow-100 animate-twinkle" style={{ animationDelay: `${i * 0.18}s` }} />
                ))}
              </div>
              <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
                {['🎵', '🎶', '🎵', '🎶'].map((n, i) => (
                  <div key={i} className="absolute text-xl opacity-0 animate-float-note text-amber-200" style={{ left: `${15 + Math.random() * 70}%`, bottom: '25%', animationDelay: `${i * 1.6}s` }}>{n}</div>
                ))}
              </div>
              <div className="relative z-10 text-center flex flex-col items-center w-full mx-auto bg-white/15 backdrop-blur-md border border-white/15 p-5 sm:p-6 rounded-3xl shadow-elegant mt-16 sm:mt-20">
                <img src={A.logo} alt="SR Monogram" className="w-12 h-12 object-contain opacity-95 mb-2" />
                <p className="font-serif-display italic text-amber-200 text-lg font-semibold tracking-wider">#ShreyKiKirti</p>
                <h3 className="font-cinzel text-xs tracking-[0.2em] text-amber-200/80 mt-2 uppercase">PLEASE JOIN US FOR AN EVENING</h3>
                <p className="font-serif-display text-sm sm:text-base text-amber-200 mt-1 italic">Where melodies meet memories and hearts dance with joy.</p>
                <div className="w-24 h-px bg-gold-soft/30 my-5" />
                <h2 className="font-cinzel text-2xl sm:text-3xl tracking-[0.15em] font-bold text-[#47296b]">SANGEET CELEBRATION</h2>
                <div className="mt-4 bg-black/20 border border-gold-soft/25 px-6 py-2 rounded-full font-cinzel text-xs sm:text-sm text-[#47296b] font-semibold shadow-soft">
                  To Be Decided
                </div>
              </div>
              <div className="relative z-10 w-full max-w-[200px] sm:max-w-[240px] mx-auto mt-8 flex justify-center items-end self-end">
                <img src={A.sangeetCouple} alt="Sangeet Couple Caricature" className="w-full h-auto object-contain drop-shadow-xl group-hover:scale-105 transition-transform duration-500" />
              </div>
            </div>

            {/* Wedding */}
            <div className="relative rounded-3xl overflow-hidden border border-gold-soft bg-white text-cream p-6 sm:p-12 shadow-elegant hover:shadow-2xl transition-all duration-500 group flex flex-col justify-between min-h-[530px] isolate">
              <img src={A.weddingBg} alt="" className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none scale-[1.06] origin-center" />
              <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="absolute animate-float-petal opacity-75"
                    style={{ left: `${10 + Math.random() * 80}%`, animationDuration: `${12 + Math.random() * 8}s`, animationDelay: `${Math.random() * 5}s` }}>
                    <span className="text-xl sm:text-2xl opacity-70">🌸</span>
                  </div>
                ))}
              </div>
              <div className="relative z-10 text-center flex flex-col items-center w-full mx-auto bg-white/15 backdrop-blur-md border border-white/15 p-5 sm:p-6 rounded-3xl shadow-elegant mt-16 sm:mt-20">
                <img src={A.logo} alt="SR Monogram" className="w-12 h-12 object-contain opacity-95 mb-2" />
                <p className="font-serif-display italic text-red-900 text-lg font-semibold tracking-wider">#SKForever</p>
                <h3 className="font-cinzel text-xs tracking-[0.2em] text-red-900/80 mt-2 uppercase">PLEASE JOIN US FOR A SACRED CELEBRATION</h3>
                <p className="font-serif-display text-sm sm:text-base text-red-900/80 mt-1 italic">As two hearts, two families and two journeys become one.</p>
                <div className="w-24 h-px bg-gold-soft/30 my-4" />
                <h2 className="font-cinzel text-2xl sm:text-3xl tracking-[0.15em] font-bold text-red-900">WEDDING CEREMONY</h2>
                <div className="mt-2 text-gold-soft text-xs sm:text-sm font-semibold tracking-widest uppercase">To Be Decided</div>
                <div className="my-4" />
                <div className="bg-black/20 border border-gold-soft/25 px-6 sm:px-8 py-3 rounded-2xl w-full max-w-[280px] sm:max-w-xs font-serif-display text-sm sm:text-base text-red-900 space-y-1.5 text-left shadow-soft">
                  <p className="flex justify-between gap-4"><span>✦ Baraat</span><span className="font-semibold">To Be Decided</span></p>
                  <p className="flex justify-between gap-4"><span>✦ Varmala</span><span className="font-semibold">To Be Decided</span></p>
                  <p className="flex justify-between gap-4"><span>✦ Rituals</span><span className="font-semibold">To Be Decided</span></p>
                </div>
              </div>
              <div className="relative z-10 w-full max-w-[200px] sm:max-w-[240px] mx-auto mt-8 flex justify-center items-end self-end">
                <img src={A.weddingCouple} alt="Wedding Couple Caricature" className="w-full h-auto object-contain drop-shadow-xl group-hover:scale-105 transition-transform duration-500" />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Wardrobe Guide ── */}
      <section
        ref={wardrobeRef}
        data-id="wardrobe"
        className="relative py-24 px-6 bg-[#FAF6F0] border-t border-gold-soft/30 z-10"
      >
        <div className="absolute inset-0 opacity-[0.12] bg-cover bg-center pointer-events-none" style={{ backgroundImage: `url(${A.weddingHero})` }} />
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <img src={A.logo} alt="SR Monogram" className="w-14 h-14 object-contain mx-auto opacity-80 mb-2" />
            <h2 className="font-cinzel text-2xl sm:text-4xl text-rose-deep font-bold tracking-[0.25em]">WARDROBE GUIDE</h2>
            <Divider />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 mt-12">
            {[
              { id: 'w1', img: A.wHaldi, imgAlt: 'Haldi Bowl', label: 'HALDI', sub: 'Sunshine Shades', desc: 'Think comfortable festive wear in cheerful shades of yellow.', color: 'text-amber-700', subColor: 'text-amber-600' },
              { id: 'w2', img: A.wMehndi, imgAlt: 'Mehndi Hands', label: 'MEHNDI', sub: 'Henna Hues', desc: 'Think vibrant greens with festive accents inspired by the colors of celebration.', color: 'text-emerald-800', subColor: 'text-emerald-700', delay: '150ms' },
              { id: 'w3', img: A.wSangeet, imgAlt: 'Dhol & Music', label: 'SANGEET', sub: 'Glitz & Glam', desc: 'Think elegant Indo-Western silhouettes, fusion fits, and a touch of festive sparkle.', color: 'text-indigo-800', subColor: 'text-indigo-700', delay: '300ms' },
              { id: 'w4', img: A.wWedding, imgAlt: 'Kalash', label: 'WEDDING', sub: 'Royal Wedding Hues', desc: 'Think timeless sarees, lehengas, sherwanis, and bandhgalas in rich, regal tones.', color: 'text-rose-800', subColor: 'text-rose-700', delay: '450ms' },
            ].map(w => (
              <div
                key={w.id}
                data-id={w.id}
                className={`wardrobe-card bg-white/70 backdrop-blur-sm border border-gold-soft/40 p-6 rounded-3xl shadow-soft hover:shadow-elegant transition-all duration-700 flex gap-5 items-start ${visible[w.id] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: w.delay }}
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex-shrink-0 flex items-center justify-center border-2 border-gold-soft/40 bg-white overflow-hidden shadow-soft hover:rotate-12 transition-transform duration-500">
                  <img src={w.img} alt={w.imgAlt} className="w-full h-full object-cover" />
                </div>
                <div className="space-y-1">
                  <h3 className={`font-cinzel text-base tracking-widest ${w.color} font-bold`}>{w.label}</h3>
                  <h4 className={`font-script text-2xl ${w.subColor} leading-none`}>{w.sub}</h4>
                  <p className="font-serif-display text-sm sm:text-base text-foreground/80 leading-relaxed pt-1">{w.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Awaiting Presence ── */}
      <section className="relative py-24 px-6 bg-cream text-center z-10 border-t border-gold-soft/30">
        <img src={A.weddingHero} alt="" className="absolute inset-0 w-full h-full object-cover opacity-10 pointer-events-none" />
        <div className="relative max-w-2xl mx-auto z-10">
          <h2 className="font-script text-4xl sm:text-5xl text-rose-deep font-semibold">Awaiting Your Noble Presence</h2>
          <Divider />
          <p className="font-serif-display italic text-lg sm:text-xl text-foreground/90 leading-relaxed max-w-xl mx-auto">
            Join us as we celebrate love, laughter, and the beginning of forever beautiful together. 🧿
          </p>
          <div className="w-16 h-px bg-gold-soft/60 mx-auto my-6" />
          <p className="font-cinzel text-xs tracking-[0.25em] text-rose-deep/70">WITH LOVE</p>
          <h3 className="font-script text-3xl sm:text-4xl text-rose mt-1">Khokhra &amp; Upadhyay Families</h3>
          <div className="w-16 h-px bg-gold-soft/60 mx-auto my-2" />
          <p className="font-cinzel text-xs tracking-[0.25em] text-rose-deep/70">LOVINGLY INVITED BY</p>
          <h3 className="font-script text-xl sm:text-2xl text-rose mt-1">Friends &amp; Family</h3>
          <p className="font-serif-display text-xs text-foreground/60 mt-1 italic">
            Eagerly awaiting the pleasure of your presence and blessings.
          </p>
        </div>
      </section>

      {/* ── Venue ── */}
      <section className="relative py-20 px-6 bg-[#FAF6F0] z-10 border-t border-gold-soft/30">
        <div className="absolute inset-0 opacity-[0.08] bg-cover bg-center pointer-events-none" style={{ backgroundImage: `url(${A.weddingHero})` }} />
        <div className="relative max-w-4xl mx-auto text-center z-10">
          <p className="font-cinzel text-xs text-rose-deep/80 tracking-[0.25em] uppercase">WHERE WE CELEBRATE</p>
          <h2 className="font-script text-4xl sm:text-5xl text-rose-deep mt-2">To Be Decided</h2>
          <Divider />
          <p className="font-serif-display text-base sm:text-lg text-foreground/80 max-w-xl mx-auto">
            Join us for the celebrations at:<br />
            <span className="font-semibold text-rose-deep">📍 To Be Decided</span><br />
            <span className="italic mt-1 block text-sm text-foreground/60">Venue details will be announced soon.</span>
          </p>
          <a
            href="https://maps.app.goo.gl/fe4uhWgaaA24qzvJA"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 mt-8 px-8 py-3 rounded-full gradient-gold text-white font-cinzel text-xs tracking-wider shadow-gold hover:opacity-90 transition"
          >
            <MapPin className="h-4 w-4" /> Get Directions
          </a>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="relative bg-gradient-to-b from-[#3A050B] to-[#5C0F14] text-cream py-16 px-6 text-center z-10 border-t-2 border-gold-soft/40">
        <div className="absolute inset-0 bg-black/10 pointer-events-none" />
        <p className="font-cinzel text-xs tracking-[0.4em] text-amber-200">WITH LOVE</p>
        <h3 className="font-script text-5xl sm:text-6xl text-amber-200 mt-3">Shrey &amp; Kirti</h3>
        <div className="my-5 flex items-center justify-center gap-3">
          <span className="h-px w-12 bg-gold-soft/30" />
          <span className="text-2xl font-emoji">❤️</span>
          <span className="h-px w-12 bg-gold-soft/30" />
        </div>
        <p className="font-serif-display text-lg italic text-amber-100">4th August 2026</p>
        <p className="mt-3 font-cinzel text-xs tracking-[0.25em] text-amber-100">#SKForever</p>
      </footer>

    </main>
  )
}

// ─── App Root ────────────────────────────────────────────────────────────────
export default function App() {
  const [opened, setOpened] = useState(false)
  const [opening, setOpening] = useState(false)

  const handleOpen = () => {
    setOpening(true)
    setTimeout(() => setOpened(true), 900)
  }

  return (
    <div className="relative">
      <Preloader />
      <FallingPetals />
      {opened && <Butterfly />}
      <MusicPlayer play={opening || opened} />
      {opened
        ? <MainInvitation />
        : <EnvelopeView onOpen={handleOpen} opening={opening} />
      }
    </div>
  )
}
