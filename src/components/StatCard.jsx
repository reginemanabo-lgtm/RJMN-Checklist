export default function StatCard({ icon: Icon, label, value, note, tint }) {
  return (
    <div className="soft-shadow rounded-3xl border border-[#f0e4de] bg-white p-5 sm:p-6">
      <div className="flex items-start justify-between">
        <p className="text-sm font-medium text-[#947e76]">{label}</p>
        <span className={`flex h-10 w-10 items-center justify-center rounded-2xl ${tint}`}><Icon size={19} /></span>
      </div>
      <p className="mt-4 text-3xl font-extrabold">{value}</p>
      <p className="mt-1 text-xs text-[#b19c94]">{note}</p>
    </div>
  )
}
