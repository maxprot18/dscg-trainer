import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { Layout } from '@/components/Layout'
import { CoursePage } from '@/pages/CoursePage'
import { CoursesPage } from '@/pages/CoursesPage'
import { ExercisePage } from '@/pages/ExercisePage'
import { HomePage } from '@/pages/HomePage'
import { ProgressPage } from '@/pages/ProgressPage'
import { SearchPage } from '@/pages/SearchPage'
import { SessionPage } from '@/pages/SessionPage'
import { TrainPage } from '@/pages/TrainPage'

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="entrainement" element={<TrainPage />} />
        <Route path="cours" element={<CoursesPage />} />
        <Route path="cours/:notionId" element={<CoursePage />} />
        <Route path="progression" element={<ProgressPage />} />
        <Route path="session" element={<SessionPage />} />
        <Route path="recherche" element={<SearchPage />} />
        <Route path="exercice/:exerciseId" element={<ExercisePage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <AppRoutes />
    </BrowserRouter>
  )
}
