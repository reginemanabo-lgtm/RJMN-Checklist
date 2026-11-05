import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="py-20 text-center">
      <div className="text-5xl">🌷</div>
      <h1 className="mt-4 text-3xl font-extrabold">Page not found</h1>
      <p className="mt-2 text-sm text-[#967f77]">Let's get you back to your planner.</p>
      <Link to="/" className="mt-5 inline-flex rounded-xl bg-[#d991a7] px-4 py-2.5 text-sm font-bold text-white">Back to dashboard</Link>
    </div>
  )
}
