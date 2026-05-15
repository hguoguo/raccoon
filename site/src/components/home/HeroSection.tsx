// Hero section for the homepage

const domainNodes = [
  { icon: '☕', label: 'Java', color: '#c8782a', bg: 'from-[#fff4e9] to-[#fff0de]', ring: 'rgba(200,120,42,0.20)' },
  { icon: '📦', label: 'Collections', color: '#4a9956', bg: 'from-[#eff8ef] to-[#e8f4e8]', ring: 'rgba(74,153,86,0.20)' },
  { icon: '🧵', label: '并发', color: '#6b5fc7', bg: 'from-[#f4f1ff] to-[#eeeaff]', ring: 'rgba(107,95,199,0.20)' },
  { icon: '🐍', label: 'Python', color: '#c8782a', bg: 'from-[#fff4e9] to-[#fff0de]', ring: 'rgba(200,120,42,0.20)' },
  { icon: '🤖', label: 'AI / LLM', color: '#6b5fc7', bg: 'from-[#f4f1ff] to-[#eeeaff]', ring: 'rgba(107,95,199,0.20)' },
]

const floatingLabels = ['JVM', 'HashMap', 'Spring', 'LangChain', 'GIL', '红黑树']

export default function HeroSection() {
  return (
    <section className="px-4 sm:px-6 lg:px-11 pt-2 sm:pt-3 lg:pt-4 pb-2 sm:pb-3 lg:pb-4 relative max-w-[100vw] overflow-x-hidden">
      <div className="rounded-[32px] overflow-hidden bg-gradient-to-br from-[#fff8ef] via-[#f7f2e8] to-[#f0e8d5] border border-[#eadbc8] relative">
        {/* Paper texture overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")' }} />

        <div className="relative z-10 flex flex-col lg:flex-row items-stretch">
          {/* ===== Left Column: Copy ===== */}
          <div className="flex-1 px-8 sm:px-10 lg:px-12 pt-5 sm:pt-6 pb-4 lg:pb-5 max-w-[680px]">
            {/* Tag */}
            <div className="inline-flex items-center gap-[6px] bg-accent-soft border border-accent/18 text-accent text-[11px] sm:text-[12px] font-medium px-[12px] sm:px-[14px] py-1 rounded-[20px] mb-2 sm:mb-3 font-sans animate-fade-in-up">
              <span>🦝</span>
              <span>Raccoon · 程序员的底层认知库 · v1.6.0</span>
            </div>

            {/* Title */}
            <h1 className="font-display font-bold text-[24px] sm:text-display-lg lg:text-[38px] text-ink mb-2 sm:mb-3 animate-fade-in-up leading-[1.2]" style={{ animationDelay: '0.1s' }}>
              像小浣熊一样<br />
              <span className="relative inline-block">
                掏透每一行代码
                <span className="absolute left-0 bottom-1 w-full h-2.5 bg-accent/12 rounded-[2px] -z-[1]" />
              </span>
            </h1>

            {/* Description */}
            <p className="text-[13px] sm:text-[14px] text-ink-muted leading-[1.7] sm:leading-[1.8] max-w-[520px] mb-3 sm:mb-4 font-body animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              浣熊翻垃圾桶是找好吃的，我们翻源码是找好玩的——HashMap 的负载因子为什么偏偏是 0.75？JVM 看到你的代码时在想什么？Python 的 GIL 到底在保护谁？帮你把源码读薄、把原理讲透——毕竟，懂了才能装得更有底气 🤫
            </p>
          </div>

          {/* ===== Right Column: Knowledge Constellation ===== */}
          <div className="hidden lg:flex relative items-center justify-center w-[340px] xl:w-[380px] min-h-[300px] xl:min-h-[320px] animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            {/* Orbit rings */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[220px] h-[220px] xl:w-[250px] xl:h-[250px] rounded-full border border-dashed border-border/40" />
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[140px] h-[140px] xl:w-[160px] xl:h-[160px] rounded-full border border-dashed border-border/25" />
            </div>

            {/* Central hub */}
            <div className="absolute z-20 flex items-center justify-center">
              <div className="w-16 h-16 xl:w-18 xl:h-18 rounded-full bg-gradient-to-br from-accent to-accent-warm shadow-paper-md flex items-center justify-center animate-[gentlePulse_3s_ease-in-out_infinite]">
                <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Raccoon Logo" className="w-8 h-8 object-contain" />
              </div>
            </div>

            {/* Domain nodes */}
            {domainNodes.map((node, i) => (
              <OrbitalNode key={node.label} {...node} index={i} total={domainNodes.length} />
            ))}

            {/* Floating tech labels */}
            {floatingLabels.map((label, i) => (
              <FloatingLabel key={label} text={label} index={i} />
            ))}
          </div>
        </div>

        {/* Bottom accent line */}
        <div className="h-[2px] bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      </div>

      {/* Inline keyframes */}
      <style>{`
        @keyframes gentleFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
        @keyframes gentlePulse {
          0%, 100% { transform: scale(1); box-shadow: 0 4px 12px rgba(44,36,22,0.08); }
          50% { transform: scale(1.04); box-shadow: 0 6px 20px rgba(181,101,29,0.18); }
        }
        @keyframes orbitDrift {
          0%, 100% { transform: translateY(0) scale(1); }
          33% { transform: translateY(-4px) scale(1.02); }
          66% { transform: translateY(2px) scale(0.98); }
        }
        @keyframes labelFloat {
          0%, 100% { transform: translateY(0) rotate(0deg); opacity: 0.55; }
          50% { transform: translateY(-8px) rotate(2deg); opacity: 0.8; }
        }
      `}</style>
    </section>
  )
}

/* ===== Orbital Node ===== */
function OrbitalNode({ icon, label, color, bg, ring, index, total }: {
  icon: string; label: string; color: string; bg: string; ring: string; index: number; total: number
}) {
  const angle = (index / total) * Math.PI * 2 - Math.PI / 2
  const radius = 110
  const x = Math.cos(angle) * radius
  const y = Math.sin(angle) * radius

  return (
    <div
      className="absolute z-10 flex flex-col items-center gap-1"
      style={{
        left: `calc(50% + ${x}px)`,
        top: `calc(50% + ${y}px)`,
        transform: 'translate(-50%, -50%)',
        animation: `orbitDrift ${3 + index * 0.4}s ease-in-out infinite`,
        animationDelay: `${index * 0.3}s`,
      }}
    >
      {/* Node circle */}
      <div
        className={`w-12 h-12 rounded-full bg-gradient-to-br ${bg} border border-white/60 shadow-paper-sm flex items-center justify-center cursor-default transition-transform hover:scale-110`}
        style={{ boxShadow: `0 0 0 3px ${ring}` }}
      >
        <span className="text-lg select-none">{icon}</span>
      </div>
      {/* Label */}
      <span className="text-[10px] font-sans font-semibold tracking-wide whitespace-nowrap" style={{ color }}>
        {label}
      </span>
    </div>
  )
}

/* ===== Floating Tech Label ===== */
function FloatingLabel({ text, index }: { text: string; index: number }) {
  const positions = [
    { left: '12%', top: '18%' },
    { right: '14%', top: '22%' },
    { left: '8%', bottom: '28%' },
    { right: '10%', bottom: '22%' },
    { left: '22%', bottom: '12%' },
    { right: '18%', top: '55%' },
  ]
  const pos = positions[index % positions.length]

  return (
    <div
      className="absolute font-mono text-[10px] text-ink-faded/60 select-none pointer-events-none"
      style={{
        ...pos,
        animation: `labelFloat ${4 + index * 0.5}s ease-in-out infinite`,
        animationDelay: `${index * 0.7}s`,
      }}
    >
      {text}
    </div>
  )
}

/* ===== Stat Card ===== */
function StatCard({ value, accent, label }: { value: string; accent: string; label: string }) {
  return (
    <div className="bg-white/50 border border-border/30 rounded-paper-md px-3 py-2.5 sm:px-4 sm:py-3 backdrop-blur-sm">
      <span className="font-display font-bold text-[20px] sm:text-[24px] text-ink tracking-tight leading-none">
        <span className="text-accent">{accent}</span>{value.replace(accent, '')}
      </span>
      <span className="block text-[10px] sm:text-[11px] text-ink-faded mt-1 font-sans">{label}</span>
    </div>
  )
}
