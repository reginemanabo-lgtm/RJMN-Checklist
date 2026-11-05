import { Link } from 'react-router-dom'
import { Plus, ListTodo, CircleCheck, Clock3, Sparkles, ChevronRight } from 'lucide-react'
import PageHeading from '../components/PageHeading'
import StatCard from '../components/StatCard'
import EmptyState from '../components/EmptyState'
import { useChecklistStore } from '../store/useChecklistStore'

export default function Dashboard() {
  const groups = useChecklistStore((state) => state.groups)
  const tasks = useChecklistStore((state) => state.tasks)
  const done = tasks.filter((task) => task.done).length
  const pending = tasks.length - done
  const percent = tasks.length ? Math.round((done / tasks.length) * 100) : 0

  return (
    <>
      <PageHeading
        eyebrow="YOUR CALM CORNER"
        title="A little progress, every day."
        description="Welcome back! Make space for what matters, one task at a time."
        action={<Link to="/groups" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#d991a7] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#c87f97]"><Plus size={17} /> Manage groups</Link>}
      />
      <section className="pink-gradient soft-shadow relative mb-7 overflow-hidden rounded-[2rem] p-6 sm:p-9">
        <div className="relative z-10 max-w-xl">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1.5 text-xs font-bold text-[#a66c7d]"><Sparkles size={14} /> YOUR DAILY CHECKLIST</div>
          <h2 className="text-2xl font-extrabold leading-tight sm:text-3xl">You don't have to do it all.<br />Just start with one thing.</h2>
          <p className="mt-3 max-w-md text-sm leading-6 text-[#896f69]">Keep your tasks organized and celebrate every little win along the way.</p>
          <Link to={groups.length ? `/groups/${groups[0].id}` : '/groups'} className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-bold text-[#a85f77] hover:bg-[#fff9fa]">View my tasks <ChevronRight size={16} /></Link>
        </div>
        <div className="pointer-events-none absolute -right-3 -top-8 text-[180px] opacity-25 sm:right-8 sm:text-[220px]">🌸</div>
      </section>

      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <StatCard icon={ListTodo} label="Total tasks" value={tasks.length} note="Everything on your list" tint="bg-[#f8e7df] text-[#b77f6b]" />
        <StatCard icon={CircleCheck} label="Completed" value={done} note="Look at you go!" tint="bg-[#e6eee2] text-[#718b68]" />
        <StatCard icon={Clock3} label="Still to do" value={pending} note="One step at a time" tint="bg-[#f5dfe6] text-[#bd7790]" />
      </div>

      <section className="soft-shadow rounded-3xl border border-[#f0e4de] bg-white p-5 sm:p-7">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div><h2 className="text-lg font-bold">Your task groups</h2><p className="mt-1 text-sm text-[#a08a82]">A home for every little thing.</p></div>
          <Link to="/groups" className="text-sm font-bold text-[#bd7c91] hover:text-[#9d5e73]">See all →</Link>
        </div>
        {groups.length ? (
          <div className="grid gap-3 sm:grid-cols-2">
            {groups.slice(0, 4).map((group, index) => {
              const groupTasks = tasks.filter((task) => task.groupId === group.id)
              const completed = groupTasks.filter((task) => task.done).length
              return (
                <Link key={group.id} to={`/groups/${group.id}`} className="group flex items-center gap-4 rounded-2xl border border-[#f0e5df] p-4 transition hover:border-[#e7bdc9] hover:bg-[#fff9fa]">
                  <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-xl ${['bg-[#f8e2e8]', 'bg-[#f6eadb]', 'bg-[#e8eee4]', 'bg-[#eee7f5]'][index % 4]}`}>{group.icon || '🌸'}</span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate font-bold">{group.name}</span>
                    <span className="mt-1 block text-xs text-[#a58e85]">{completed} of {groupTasks.length} completed</span>
                    <span className="mt-2 block h-1.5 overflow-hidden rounded-full bg-[#f4ece7]"><span className="block h-full rounded-full bg-[#d991a7]" style={{ width: `${groupTasks.length ? (completed / groupTasks.length) * 100 : 0}%` }} /></span>
                  </span>
                  <ChevronRight size={17} className="text-[#c6aaa1] transition group-hover:translate-x-1" />
                </Link>
              )
            })}
          </div>
        ) : <EmptyState title="No groups yet" text="Create a group to start organizing your tasks." link="/groups" linkText="Create a group" />}
        <div className="mt-6 flex items-center gap-3 rounded-2xl bg-[#fbf5f0] p-4"><span className="text-2xl">🌼</span><div><p className="text-sm font-bold">{percent}% of your tasks are complete</p><p className="mt-1 text-xs text-[#a58e85]">Every completed task is progress worth celebrating.</p></div></div>
      </section>
    </>
  )
}
