import { useState } from 'react'
import { Plus, Trash2, Users } from 'lucide-react'
import PageHeading from '../components/PageHeading'

const initialMembers = [
  { name: '', role: '' },
  { name: '', role: '' },
  { name: '', role: '' },
  { name: '', role: '' },
]

export default function DevelopersPage() {
  const [members, setMembers] = useState(() => {
    try {
      const saved = localStorage.getItem('rjmn-developers')
      return saved ? JSON.parse(saved) : initialMembers
    } catch {
      return initialMembers
    }
  })
  const [saved, setSaved] = useState(false)

  function update(index, key, value) {
    setMembers((current) => current.map((member, i) => i === index ? { ...member, [key]: value } : member))
    setSaved(false)
  }

  function saveMembers() {
    localStorage.setItem('rjmn-developers', JSON.stringify(members))
    setSaved(true)
  }

  return (
    <>
      <PageHeading eyebrow="THE PEOPLE BEHIND THE PROJECT" title="Meet the developers" description="The team behind RJMN CheckList." />
      <div className="mb-6 rounded-3xl bg-[#f7e3e7] p-6">
        <div className="flex items-center gap-4">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#bd7890]"><Users size={24} /></span>
          <div><h2 className="font-extrabold">Our project team</h2><p className="mt-1 text-sm text-[#896f69]">DCIT 26 · Laboratory 4 · To-Do List Website</p></div>
        </div>
      </div>
      <div className="soft-shadow rounded-3xl border border-[#f0e4de] bg-white p-5 sm:p-7">
        <div className="mb-5 flex items-center justify-between gap-3">
          <h2 className="text-lg font-bold">Group members</h2>
          <button onClick={() => { setMembers((current) => [...current, { name: '', role: '' }]); setSaved(false) }} className="inline-flex items-center gap-1 rounded-xl bg-[#fbf0f2] px-3 py-2 text-xs font-bold text-[#a85f77] hover:bg-[#f7dfe5]"><Plus size={15} /> Add member</button>
        </div>
        <div className="space-y-4">
          {members.map((member, index) => (
            <div key={index} className="flex flex-col gap-3 rounded-2xl border border-[#f0e4de] p-4 sm:flex-row sm:items-start">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#f8e6ea] font-bold text-[#b96f87]">{index + 1}</div>
              <div className="grid flex-1 gap-3 sm:grid-cols-2">
                <label className="text-xs font-bold text-[#8e7770]">Complete name<input value={member.name} onChange={(event) => update(index, 'name', event.target.value)} placeholder="Enter complete name" className="mt-2 w-full rounded-xl border border-[#eadbd4] px-3 py-2.5 text-sm font-normal text-[#4d403c] outline-none focus:border-[#d991a7]" /></label>
                <label className="text-xs font-bold text-[#8e7770]">Role / contribution<input value={member.role} onChange={(event) => update(index, 'role', event.target.value)} placeholder="e.g. UI Design, React Development" className="mt-2 w-full rounded-xl border border-[#eadbd4] px-3 py-2.5 text-sm font-normal text-[#4d403c] outline-none focus:border-[#d991a7]" /></label>
              </div>
              {members.length > 1 && <button onClick={() => setMembers((current) => current.filter((_, i) => i !== index))} title="Remove member" aria-label="Remove member" className="self-end rounded-xl p-2 text-[#c4aaa1] hover:bg-[#fff0f2] hover:text-[#bb657e] sm:self-center"><Trash2 size={16} /></button>}
            </div>
          ))}
        </div>
        <button onClick={saveMembers} className="mt-5 rounded-2xl bg-[#d991a7] px-5 py-3 text-sm font-bold text-white hover:bg-[#c87f97]">Save team details</button>
        {saved && <span className="ml-3 text-sm font-semibold text-[#718b68]">Team details saved!</span>}
        <p className="mt-4 text-xs leading-5 text-[#a58e85]">Please check and update the names and contributions to match your actual group members before submission.</p>
      </div>
    </>
  )
}
