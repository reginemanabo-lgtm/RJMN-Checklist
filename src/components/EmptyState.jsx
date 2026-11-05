import { Link } from 'react-router-dom'

export default function EmptyState({ title, text, link, linkText = 'Get started' }) {
  return (
    <div className="rounded-3xl border border-dashed border-[#e8d5cd] bg-white/70 px-6 py-12 text-center">
      <div className="text-4xl">🌸</div>
      <h3 className="mt-3 font-bold">{title}</h3>
      <p className="mt-2 text-sm text-[#a08a82]">{text}</p>
      {link && <Link to={link} className="mt-4 inline-flex rounded-xl bg-[#d991a7] px-4 py-2.5 text-sm font-bold text-white">{linkText}</Link>}
    </div>
  )
}
