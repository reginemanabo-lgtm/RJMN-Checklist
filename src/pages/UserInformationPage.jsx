import { useCallback, useEffect, useState } from 'react'
import { RefreshCw, Search, Mail, AtSign } from 'lucide-react'
import PageHeading from '../components/PageHeading'
import { fetchUsers, getErrorMessage } from '../api/dummyjson'

export default function UserInformationPage() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')

  const loadUsers = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const result = await fetchUsers(30)
      setUsers(result)
    } catch (requestError) {
      setError(getErrorMessage(requestError))
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadUsers()
  }, [loadUsers])

  const filteredUsers = users.filter((user) => {
    const text = `${user.firstName} ${user.lastName} ${user.username} ${user.email}`.toLowerCase()
    return text.includes(search.toLowerCase())
  })

  return (
    <>
      <PageHeading
        eyebrow="FROM THE DUMMYJSON API"
        title="User information"
        description="Sample user profiles retrieved with Axios from dummyjson.com/users."
        action={<button onClick={loadUsers} disabled={loading} className="inline-flex items-center justify-center gap-2 rounded-2xl bg-[#d991a7] px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#c87f97] disabled:cursor-not-allowed disabled:opacity-60"><RefreshCw size={16} className={loading ? 'animate-spin' : ''} /> Refresh</button>}
      />

      <div className="relative mb-6">
        <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#b39a91]" />
        <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search by name, username or email..." className="w-full rounded-2xl border border-[#eadbd4] bg-white py-4 pl-11 pr-4 text-sm outline-none transition placeholder:text-[#b6a29a] focus:border-[#d991a7] focus:ring-4 focus:ring-[#f8e7ec]" />
      </div>

      <p className="mb-4 text-xs text-[#a08a82]">
        {loading ? 'Loading sample users...' : `Showing ${filteredUsers.length} of ${users.length} users · select a card for details`}
      </p>

      {loading && <div className="rounded-3xl border border-[#f0e4de] bg-white p-10 text-center text-sm text-[#967f77]"><RefreshCw size={22} className="mx-auto mb-3 animate-spin text-[#d991a7]" />Loading user information...</div>}
      {!loading && error && <div className="rounded-3xl border border-red-200 bg-red-50 p-6 text-sm text-red-700"><p className="font-bold">Unable to load users</p><p className="mt-1">{error}</p><button onClick={loadUsers} className="mt-4 rounded-xl bg-[#d991a7] px-4 py-2 text-white">Try again</button></div>}
      {!loading && !error && (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filteredUsers.map((user) => (
            <article key={user.id} className="soft-shadow flex min-w-0 items-center gap-4 rounded-3xl border border-[#f0e4de] bg-white p-4 transition hover:-translate-y-0.5 hover:border-[#e7bdc9]">
              <img src={user.image} alt={`${user.firstName} ${user.lastName}`} className="h-16 w-16 shrink-0 rounded-2xl bg-[#f8e6ea] object-cover" />
              <div className="min-w-0">
                <h2 className="truncate font-extrabold text-[#4d403c]">{user.firstName} {user.lastName}</h2>
                <p className="mt-1 flex items-center gap-1 truncate text-xs text-[#9a8178]"><AtSign size={13} /> {user.username}</p>
                <p className="mt-1 flex items-center gap-1 truncate text-xs text-[#9a8178]"><Mail size={13} /> {user.email}</p>
              </div>
            </article>
          ))}
          {!filteredUsers.length && <div className="col-span-full rounded-3xl border border-dashed border-[#e8d5cd] bg-white/70 p-10 text-center text-sm text-[#a08a82]">No users match your search.</div>}
        </div>
      )}
      <p className="mt-6 text-xs leading-5 text-[#a58e85]">Note: These are sample profiles from DummyJSON. They are not registered accounts in this checklist application.</p>
    </>
  )
}
