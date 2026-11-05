// App.jsx contains only the route configuration.
// BrowserRouter is already provided in main.jsx.
import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './pages/Dashboard'
import GroupsPage from './pages/GroupsPage'
import GroupTasksPage from './pages/GroupTasksPage'
import GuidePage from './pages/GuidePage'
import UserInformationPage from './pages/UserInformationPage'
import DevelopersPage from './pages/DevelopersPage'
import NotFoundPage from './pages/NotFoundPage'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/groups" element={<GroupsPage />} />
        <Route path="/groups/:groupId" element={<GroupTasksPage />} />
        <Route path="/guide" element={<GuidePage />} />
        <Route path="/users" element={<UserInformationPage />} />
        <Route path="/developers" element={<DevelopersPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}
