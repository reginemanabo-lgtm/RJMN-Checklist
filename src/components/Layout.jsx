import { useState } from 'react'
import { NavLink, Link, Outlet } from 'react-router-dom'
import { House, Layers3, BookOpen, Users, Flower2, Heart, Menu, X, UserRound } from 'lucide-react'

const navItems = [
  { to: '/', label: 'Dashboard', icon: House, end: true },
  { to: '/groups', label: 'Task Groups', icon: Layers3 },
  { to: '/guide', label: 'User Guide', icon: BookOpen },
  { to: '/users', label: 'User Information', icon: UserRound },
  { to: '/developers', label: 'Developers', icon: Users },
]

function Brand() {
  return (
    <Link to="/" className="flex items-center gap-3">
      <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#f4d6df] text-[#a85f77]">
        <Flower2 size={23} />
      </span>
      <span>
        <span className="block text-lg font-extrabold tracking-tight text-[#594640]">RJMN CheckList <span className="text-[#d18ba0]">.</span></span>
        <span className="block text-[11px] tracking-wide text-[#b29a91]">YOUR LITTLE PLANNER</span>
      </span>
    </Link>
  )
}

function SideLink({ item, onClick }) {
  const Icon = item.icon
  return (
    <NavLink
      to={item.to}
      end={item.end}
      onClick={onClick}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
          isActive
            ? 'bg-[#f5dfe4] text-[#a85f77]'
            : 'text-[#8d7770] hover:bg-[#f8eee8] hover:text-[#6a5149]'
        }`
      }
    >
      <Icon size={18} strokeWidth={1.8} />
      {item.label}
    </NavLink>
  )
}

export default function Layout() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="min-h-screen bg-[#fbf7f3] text-[#4d403c] md:flex">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-[#eee0d9] bg-[#fffaf7] px-5 py-7 md:flex lg:w-72">
        <Brand />
        <p className="mb-3 mt-10 px-3 text-[11px] font-bold uppercase tracking-[.2em] text-[#b39a91]">Workspace</p>
        <nav className="space-y-2">
          {navItems.map((item) => <SideLink key={item.to} item={item} />)}
        </nav>
        <div className="mt-auto rounded-3xl bg-[#f8e6e8] p-5">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-2xl bg-white text-[#c87991]"><Heart size={19} /></div>
          <p className="font-semibold">One thing at a time.</p>
          <p className="mt-1 text-sm leading-6 text-[#876f69]">Small steps make lovely progress. You've got this!</p>
          <div className="mt-4 flex gap-1 text-[#c87991]"><span>✿</span><span>✿</span><span>✿</span></div>
        </div>
        <p className="mt-5 text-center text-xs text-[#b5a39b]">RJMN CheckList · Stay organized softly</p>
      </aside>

      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-20 flex items-center justify-between border-b border-[#eee0d9] bg-[#fbf7f3]/95 px-4 py-4 backdrop-blur md:hidden">
          <Brand />
          <button onClick={() => setMobileOpen((open) => !open)} className="rounded-xl border border-[#eadbd4] bg-white p-2" aria-label="Toggle navigation">
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </header>

        {mobileOpen && (
          <nav className="space-y-2 border-b border-[#eee0d9] bg-[#fffaf7] p-4 md:hidden">
            {navItems.map((item) => <SideLink key={item.to} item={item} onClick={() => setMobileOpen(false)} />)}
          </nav>
        )}

        <main className="mx-auto max-w-6xl px-4 py-7 sm:px-6 md:px-8 md:py-10">
          <Outlet />
          <footer className="mt-12 border-t border-[#eee0d9] pt-5 text-center text-xs text-[#aa958d]">
            Made with care <span className="text-[#d48fa2]">♥</span> · RJMN CheckList
          </footer>
        </main>
      </div>
    </div>
  )
}
