import { useMemo, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ArrowLeft, Plus, Search, Check, Trash2 } from 'lucide-react'
import PageHeading from '../components/PageHeading'
import { useChecklistStore } from '../store/useChecklistStore'

export default function GroupTasksPage() {
  const { groupId } = useParams()
  const navigate = useNavigate()
  const groups = useChecklistStore((state) => state.groups)
  const tasks = useChecklistStore((state) => state.tasks)
  const addTask = useChecklistStore((state) => state.addTask)
  const toggleTask = useChecklistStore((state) => state.toggleTask)
  const deleteTask = useChecklistStore((state) => state.deleteTask)

  const group = groups.find((item) => item.id === groupId)
  const [title, setTitle] = useState('')
  const [filter, setFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [error, setError] = useState('')
  const groupTasks = tasks.filter((task) => task.groupId === groupId)

  const filtered = useMemo(() => groupTasks.filter((task) =>
    (filter === 'all' || (filter === 'done' ? task.done : !task.done)) &&
    task.title.toLowerCase().includes(search.toLowerCase())
  ), [groupTasks, filter, search])

  if (!group) {
    return <div className="py-20 text-center"><div className="text-5xl">🌷</div><h1 className="mt-4 text-2xl font-extrabold">Group not found</h1><p className="mt-2 text-sm text-[#967f77]">This group may have been deleted.</p><button onClick={() => navigate('/groups')} className="mt-5 rounded-xl bg-[#d991a7] px-4 py-2.5 text-sm font-bold text-white">Back to groups</button></div>
  }

  function submit(event) {
    event.preventDefault()
    if (!title.trim()) return setError('Write a task before adding it.')
    addTask(groupId, title)
    setTitle('')
    setError('')
  }

  return (
    <>
      <Link to="/groups" className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-[#a9858a] hover:text-[#9d5e73]"><ArrowLeft size={16} /> All task groups</Link>
      <PageHeading eyebrow="YOUR TASK SPACE" title={`${group.icon || '🌸'} ${group.name}`} description="Add a task, check off your wins, and take things at your own pace." />
      <form onSubmit={submit} className="soft-shadow mb-6 rounded-3xl border border-[#f0e4de] bg-white p-5 sm:p-6">
        <label htmlFor="taskTitle" className="mb-2 block text-sm font-bold">What would you like to get done?</label>
        <div className="flex flex-col gap-3 sm:flex-row">
          <input id="taskTitle" value={title} onChange={(event) => { setTitle(event.target.value); setError('') }} placeholder="Write your next little task..." className="min-w-0 flex-1 rounded-2xl border border-[#eadbd4] bg-[#fffcfa] px-4 py-3 text-sm outline-none placeholder:text-[#c0aca4] focus:border-[#d991a7] focus:ring-4 focus:ring-[#f8e7ec]" />
          <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#d991a7] px-5 py-3 text-sm font-bold text-white hover:bg-[#c87f97]"><Plus size={17} /> Add task</button>
        </div>
        {error && <p className="mt-2 text-xs text-[#b84f68]">{error}</p>}
      </form>

      <section className="soft-shadow rounded-3xl border border-[#f0e4de] bg-white p-5 sm:p-6">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div><h2 className="text-lg font-bold">Your checklist</h2><p className="mt-1 text-sm text-[#a08a82]">{groupTasks.filter((task) => task.done).length} of {groupTasks.length} completed</p></div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <div className="relative"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#b39a91]" /><input aria-label="Search tasks" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search tasks..." className="w-full rounded-xl border border-[#eadbd4] py-2 pl-9 pr-3 text-sm outline-none focus:border-[#d991a7] sm:w-44" /></div>
            <div className="flex rounded-xl bg-[#f8eee8] p-1">
              {[['all', 'All'], ['pending', 'To do'], ['done', 'Done']].map(([value, label]) => <button type="button" key={value} onClick={() => setFilter(value)} className={`rounded-lg px-3 py-2 text-xs font-bold ${filter === value ? 'bg-white text-[#a85f77] shadow-sm' : 'text-[#9d877f]'}`}>{label}</button>)}
            </div>
          </div>
        </div>
        <div className="mt-5 space-y-3">
          {filtered.map((task) => (
            <div key={task.id} className={`flex items-center gap-3 rounded-2xl border p-4 transition ${task.done ? 'border-[#eee8e1] bg-[#fcfaf7]' : 'border-[#f0e4de] bg-white hover:border-[#e7bdc9]'}`}>
              <button type="button" onClick={() => toggleTask(task.id)} aria-label={task.done ? 'Mark as not done' : 'Mark as done'} title={task.done ? 'Mark as not done' : 'Mark as done'} className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition ${task.done ? 'border-[#91a786] bg-[#91a786] text-white' : 'border-[#dfb6c2] text-transparent hover:border-[#c77e96]'}`}><Check size={14} strokeWidth={3} /></button>
              <span className={`min-w-0 flex-1 break-words text-sm ${task.done ? 'text-[#b0a29a] line-through' : 'font-medium text-[#5c4a44]'}`}>{task.title}</span>
              <span className={`hidden rounded-full px-2.5 py-1 text-[10px] font-bold sm:inline-flex ${task.done ? 'bg-[#e8eee4] text-[#718b68]' : 'bg-[#fbf0e7] text-[#b38b6c]'}`}>{task.done ? 'Done' : 'Not Done'}</span>
              <button type="button" onClick={() => deleteTask(task.id)} aria-label={`Delete ${task.title}`} title="Delete task" className="rounded-xl p-2 text-[#c4aaa1] hover:bg-[#fff0f2] hover:text-[#bb657e]"><Trash2 size={16} /></button>
            </div>
          ))}
          {!filtered.length && <div className="py-10 text-center"><div className="text-4xl">{search ? '🔎' : '🌷'}</div><p className="mt-3 font-bold">{search ? 'No matching tasks' : 'Nothing here just yet'}</p><p className="mt-1 text-sm text-[#a08a82]">{search ? 'Try another search term.' : 'Add a task above or choose another filter.'}</p></div>}
        </div>
      </section>
    </>
  )
}
