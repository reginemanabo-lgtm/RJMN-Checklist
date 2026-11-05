export default function PageHeading({ eyebrow, title, description, action }) {
  return (
    <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
      <div>
        <p className="mb-2 text-xs font-bold uppercase tracking-[.2em] text-[#c17f93]">{eyebrow}</p>
        <h1 className="text-3xl font-extrabold tracking-tight text-[#4d403c] sm:text-4xl">{title}</h1>
        <p className="mt-2 max-w-xl text-sm leading-6 text-[#967f77]">{description}</p>
      </div>
      {action}
    </div>
  )
}
