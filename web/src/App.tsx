import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LandingPage } from './pages/LandingPage'
import { BrowsePage } from './pages/BrowsePage'
import { RecipePage } from './pages/RecipePage'
import { UpdatePrompt } from './components/UpdatePrompt'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/recipes" element={<BrowsePage />} />
        <Route path="/recipe/:id" element={<RecipePage />} />
      </Routes>
      <UpdatePrompt />
    </BrowserRouter>
  )
}
