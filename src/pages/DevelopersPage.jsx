
import { Users } from 'lucide-react'
import PageHeading from '../components/PageHeading'

const members = [
  {
    name: 'Marielle Ditoya',
    id: '202415479',
    role: 'Project Coordinator & UI Design',
    description:
      'Helped plan the website structure, organized the page layout, and worked on the visual design and user experience.',
    image: '/images/marielle.jpg',
  },
  {
    name: 'Nathalie Sanchez',
    id: '251110389',
    role: 'Dashboard & Task Groups',
    description:
      'Worked on the Dashboard overview and Task Groups interface, including the presentation of categories and task progress.',
    image: '/images/nathalie.jpg',
  },
  {
    name: 'Judy Anne Perry',
    id: '202415515',
    role: 'Task Management',
    description:
      'Worked on task features such as adding tasks, marking tasks done or not done, and deleting tasks.',
    image: '/images/judy.jpg',
  },
  {
    name: 'Arnie Pitao',
    id: '202415303',
    role: 'User Guide & Testing',
    description:
      'Prepared the User Guide content and helped test the website pages and features.',
    image: '/images/arnie.jpg',
  },
  {
    name: 'Regine Manabo',
    id: '202415267',
    role: 'API Integration & Documentation',
    description:
      'Worked on the User Information page using Axios and DummyJSON, and helped prepare project documentation.',
    image: '/images/regine.jpg',
  },
]

export default function DevelopersPage() {
  return (
    <>
      <PageHeading
        eyebrow="THE PEOPLE BEHIND THE PROJECT"
        title="Meet the developers"
        description="The team behind RJMN CheckList and their project contributions."
      />

      <div className="mb-6 rounded-3xl bg-[#f7e3e7] p-6">
        <div className="flex items-center gap-4">
          <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-[#bd7890]">
            <Users size={24} />
          </span>

          <div>
            <h2 className="font-extrabold">Our project team</h2>
            <p className="mt-1 text-sm text-[#896f69]">
              DCIT 26 · Laboratory 3 · CheckList Website
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {members.map((member, index) => (
          <div
            key={member.id}
            className="soft-shadow overflow-hidden rounded-3xl border border-[#f0e4de] bg-white"
          >
            <div className="bg-[#f7e3e7] p-5">
              <img
                src={member.image}
                alt={member.name}
                className="mx-auto h-40 w-32 rounded-2xl border-2 border-white object-cover shadow-sm"
              />
            </div>

            <div className="p-5">
              <p className="mb-2 text-[10px] font-bold uppercase text-[#a58e85]">
                Member {index + 1}
              </p>

              <h3 className="text-base font-extrabold text-[#4d403c]">
                {member.name}
              </h3>

              <p className="mt-1 text-xs text-[#8e7770]">
                ID: {member.id}
              </p>

              <div className="mt-5">
                <p className="text-[10px] font-bold uppercase text-[#a58e85]">
                  Contribution & Responsibilities
                </p>

                <h4 className="mt-2 text-sm font-bold text-[#4d403c]">
                  {member.role}
                </h4>

                <p className="mt-2 text-xs leading-5 text-[#786963]">
                  {member.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
