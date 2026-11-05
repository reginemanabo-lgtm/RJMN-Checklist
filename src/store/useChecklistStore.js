import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

const starterGroups = [
  { id: 'school', name: 'School Activities', icon: '🎀' },
  { id: 'personal', name: 'Personal Tasks', icon: '🌷' },
  { id: 'projects', name: 'Projects', icon: '🪴' },
  { id: 'daily', name: 'Daily Tasks', icon: '☁️' },
]

const starterTasks = [
  { id: 't1', groupId: 'school', title: 'Review laboratory instructions', done: false, createdAt: Date.now() },
  { id: 't2', groupId: 'school', title: 'Finish project documentation', done: true, createdAt: Date.now() - 1000 },
  { id: 't3', groupId: 'personal', title: 'Organize study desk', done: false, createdAt: Date.now() },
]

export const useChecklistStore = create(
  persist(
    (set, get) => ({
      groups: starterGroups,
      tasks: starterTasks,

      addGroup: (name) => {
        const clean = name.trim()
        if (!clean) return false
        if (get().groups.some((group) => group.name.toLowerCase() === clean.toLowerCase())) return false

        set((state) => ({
          groups: [...state.groups, { id: `group-${Date.now()}`, name: clean, icon: '🌸' }],
        }))
        return true
      },

      deleteGroup: (groupId) => set((state) => ({
        groups: state.groups.filter((group) => group.id !== groupId),
        tasks: state.tasks.filter((task) => task.groupId !== groupId),
      })),

      addTask: (groupId, title) => {
        const clean = title.trim()
        if (!clean) return false
        set((state) => ({
          tasks: [{
            id: `task-${Date.now()}-${Math.random().toString(16).slice(2)}`,
            groupId,
            title: clean,
            done: false,
            createdAt: Date.now(),
          }, ...state.tasks],
        }))
        return true
      },

      toggleTask: (taskId) => set((state) => ({
        tasks: state.tasks.map((task) =>
          task.id === taskId ? { ...task, done: !task.done } : task
        ),
      })),

      deleteTask: (taskId) => set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== taskId),
      })),

      clearCompleted: () => set((state) => ({
        tasks: state.tasks.filter((task) => !task.done),
      })),
    }),
    {
      name: 'rjmn-checklist-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
