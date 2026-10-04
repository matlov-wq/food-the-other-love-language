import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Layout } from './components/Layout'
import { HomePage } from './pages/HomePage'
import { RecipePage } from './pages/RecipePage'
import { EpisodesPage } from './pages/EpisodesPage'
import { AboutPage } from './pages/AboutPage'
import { UpdatePrompt } from './components/UpdatePrompt'

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/recipe/:id" element={<RecipePage />} />
          <Route path="/episodes" element={<EpisodesPage />} />
          <Route path="/about" element={<AboutPage />} />
          {/* Old browse page now lives on the contents homepage */}
          <Route path="/recipes" element={<Navigate to="/" replace />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
      <UpdatePrompt />
    </BrowserRouter>
  )
}
