import { BookOpen } from 'lucide-react'
import PageHeading from '../components/PageHeading'

const steps = [
  ['Create a task group', 'Open Task Groups from the navigation. Enter a category name, such as School Activities or Personal Tasks, then click Add group.'],
  ['Add a task', 'Open Task Groups and choose Open task list on the group you want. Type your task into the input field and select Add task.'],
  ['Mark a task Done or Not Done', 'Select the round checkbox beside a task. Select it again to change the task back to Not Done.'],
  ['Delete a task or group', 'Use the trash icon beside a task to delete it. To delete a group, open Task Groups and use its trash icon. Deleting a group also deletes its tasks.'],
  ['Navigate between pages', 'Use the sidebar or mobile menu to open Dashboard, Task Groups, User Guide, User Information, or Developers. Select a group card to view that group’s tasks.'],
  ['View sample user information', 'Open User Information. The page uses Axios to request sample user profiles from the DummyJSON API. A loading message appears while the request is running, and an error message appears if the request fails.'],
  ['Understand shared task data', 'Zustand stores the task groups and tasks so the Dashboard, Task Groups, and selected task list show the same updated information. Data is saved in this browser using persistent storage.'],
]

export default function GuidePage() {
  return (
    <>
      <PageHeading eyebrow="A LITTLE HELP" title="How to use RJMN CheckList" description="Everything you need to get started, in a few simple steps." />
      <div className="mb-6 rounded-3xl bg-[#f7e3e7] p-6 sm:p-8">
        <div className="flex items-start gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-white text-[#bd7890]"><BookOpen size={22} /></span>
          <div><h2 className="text-lg font-extrabold">Your guide to a calmer checklist</h2><p className="mt-2 text-sm leading-6 text-[#896f69]">Organize your work into groups, add small tasks, and mark each one complete when you're done. Your progress is saved in this browser.</p></div>
        </div>
      </div>
      <div className="space-y-4">
        {steps.map(([title, description], index) => (
          <div key={title} className="soft-shadow flex gap-4 rounded-3xl border border-[#f0e4de] bg-white p-5 sm:p-6">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[#f8e6ea] font-extrabold text-[#b96f87]">{String(index + 1).padStart(2, '0')}</span>
            <div><h3 className="font-bold">{title}</h3><p className="mt-2 text-sm leading-6 text-[#947e76]">{description}</p></div>
          </div>
        ))}
      </div>
    </>
  )
}
