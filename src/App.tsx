import { Navigate, Route, Routes } from 'react-router-dom'
import { VisitorPage } from './pages/VisitorPage'
import { AdminPage } from './pages/AdminPage'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<VisitorPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
