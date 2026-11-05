import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Trash2, ChevronRight } from 'lucide-react'
import PageHeading from '../components/PageHeading'
import EmptyState from '../components/EmptyState'
import { useChecklistStore } from '../store/useChecklistStore'

export default function GroupsPage() {
  const groups = useChecklistStore((state) => state.groups)
  const tasks = useChecklistStore((state) => state.tasks)
  const addGroup = useChecklistStore((state) => state.addGroup)
  const deleteGroup = useChecklistStore((state) => state.deleteGroup)
  const [name, setName] = useState('')
  const [error, setError] = useState('')

  function submit(event) {
    event.preventDefault()
    if (!name.trim()) return setError('Please enter a group name.')
    if (!addGroup(name)) return setError('That group already exists. Try another name.')
    setName('')
    setError('')
  }

  return (
    <>
      <PageHeading eyebrow="KEEP IT ORGANIZED" title="Your task groups" description="Separate school, personal, and project tasks into little spaces of their own." />
      <form onSubmit={submit} className="soft-shadow mb-7 flex flex-col gap-3 rounded-3xl border border-[#f0e4de] bg-white p-5 sm:flex-row sm:items-start sm:p-6">
        <div className="flex-1">
          <label htmlFor="groupName" className="mb-2 block text-sm font-bold">Create a new group</label>
          <input id="groupName" value={name} onChange={(event) => { setName(event.target.value); setError('') }} placeholder="e.g. Exam Review, Errands..." className="w-full rounded-2xl border border-[#eadbd4] bg-[#fffcfa] px-4 py-3 text-sm outline-none transition placeholder:text-[#c0aca4] focus:border-[#d991a7] focus:ring-4 focus:ring-[#f8e7ec]" />
          {error && <p className="mt-2 text-xs text-[#b84f68]">{error}</p>}
        </div>
        <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#d991a7] px-5 py-3 text-sm font-bold text-white hover:bg-[#c87f97] sm:mt-7"><Plus size={17} /> Add group</button>
      </form>

      <div className="mb-4 flex items-center justify-between"><h2 className="text-lg font-bold">All groups <span className="ml-1 text-sm font-medium text-[#b29a91]">({groups.length})</span></h2><span className="text-xs text-[#a58e85]">Choose a group to open it</span></div>
      {groups.length ? (
        <div className="grid gap-4 sm:grid-cols-2">
          {groups.map((group, index) => {
            const groupTasks = tasks.filter((task) => task.groupId === group.id)
            const done = groupTasks.filter((task) => task.done).length
            return (
              <div key={group.id} className="soft-shadow rounded-3xl border border-[#f0e4de] bg-white p-5 sm:p-6">
                <div className="flex items-start justify-between">
                  <span className={`flex h-14 w-14 items-center justify-center rounded-2xl text-2xl ${['bg-[#f8e2e8]', 'bg-[#f6eadb]', 'bg-[#e8eee4]', 'bg-[#eee7f5]'][index % 4]}`}>{group.icon || '🌸'}</span>
                  <button onClick={() => { if (window.confirm(`Delete "${group.name}" and all its tasks?`)) deleteGroup(group.id) }} className="rounded-xl p-2 text-[#c4aaa1] hover:bg-[#fff0f2] hover:text-[#bb657e]" aria-label={`Delete ${group.name}`} title="Delete group"><Trash2 size={17} /></button>
                </div>
                <h3 className="mt-4 text-lg font-extrabold">{group.name}</h3>
                <p className="mt-1 text-sm text-[#a08a82]">{groupTasks.length} {groupTasks.length === 1 ? 'task' : 'tasks'} · {done} completed</p>
                <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[#f4ece7]"><div className="h-full rounded-full bg-[#d991a7]" style={{ width: `${groupTasks.length ? (done / groupTasks.length) * 100 : 0}%` }} /></div>
                <Link to={`/groups/${group.id}`} className="mt-5 flex items-center justify-between rounded-xl bg-[#fbf3f0] px-4 py-3 text-sm font-bold text-[#9e6878] transition hover:bg-[#f8e6ea]">Open task list <ChevronRight size={17} /></Link>
              </div>
            )
          })}
        </div>
      ) : <EmptyState title="Your first group starts here" text="Create a group above to organize your tasks." />}
    </>
  )
}
