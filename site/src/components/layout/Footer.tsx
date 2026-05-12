export default function Footer() {
  return (
    <footer className="border-t border-border px-4 sm:px-6 lg:px-11 py-6 sm:py-8 flex flex-col sm:flex-row items-center justify-between text-[11px] sm:text-[12px] text-ink-ghost font-sans gap-3 sm:gap-5 max-w-[100vw] overflow-x-hidden">
      <span>© 2026 Raccoon · 编程学习知识库</span>
      <div className="flex gap-5 sm:gap-6">
        <a href="#" className="text-ink-ghost hover:text-accent transition-colors hover:underline underline-offset-4">GitHub</a>
        <a href="#" className="text-ink-ghost hover:text-accent transition-colors hover:underline underline-offset-4">Obsidian</a>
        <a href="#" className="text-ink-ghost hover:text-accent transition-colors hover:underline underline-offset-4">关于</a>
      </div>
    </footer>
  )
}
