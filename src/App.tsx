import { lazy } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'

import { Layout } from '@/components/Layout'
import { HomePage } from '@/pages/HomePage'

// Un fichier JS par écran : l'accueil s'affiche sans attendre le code des autres écrans.
const TrainPage = lazy(() => import('@/pages/TrainPage').then((m) => ({ default: m.TrainPage })))
const CoursesPage = lazy(() => import('@/pages/CoursesPage').then((m) => ({ default: m.CoursesPage })))
const CourseUePage = lazy(() => import('@/pages/CourseUePage').then((m) => ({ default: m.CourseUePage })))
const CoursePrintPage = lazy(() => import('@/pages/CoursePrintPage').then((m) => ({ default: m.CoursePrintPage })))
const CoursePage = lazy(() => import('@/pages/CoursePage').then((m) => ({ default: m.CoursePage })))
const ProgressPage = lazy(() => import('@/pages/ProgressPage').then((m) => ({ default: m.ProgressPage })))
const SessionPage = lazy(() => import('@/pages/SessionPage').then((m) => ({ default: m.SessionPage })))
const SettingsPage = lazy(() => import('@/pages/SettingsPage').then((m) => ({ default: m.SettingsPage })))
const SearchPage = lazy(() => import('@/pages/SearchPage').then((m) => ({ default: m.SearchPage })))
const OralPage = lazy(() => import('@/pages/OralPage').then((m) => ({ default: m.OralPage })))
const ExercisePage = lazy(() => import('@/pages/ExercisePage').then((m) => ({ default: m.ExercisePage })))

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="entrainement" element={<TrainPage />} />
        <Route path="cours" element={<CoursesPage />} />
        <Route path="cours/ue/:ueId" element={<CourseUePage />} />
        <Route path="cours/ue/:ueId/imprimer" element={<CoursePrintPage />} />
        <Route path="cours/:notionId" element={<CoursePage />} />
        <Route path="progression" element={<ProgressPage />} />
        <Route path="session" element={<SessionPage />} />
        <Route path="recherche" element={<SearchPage />} />
        <Route path="reglages" element={<SettingsPage />} />
        <Route path="exercice/:exerciseId" element={<ExercisePage />} />
        <Route path="oral" element={<OralPage />} />
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
