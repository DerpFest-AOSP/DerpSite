import './components/css/App.css'
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/js/Navbar'
import Build from './pages/Build'
import Changelogs from './pages/Changelogs'
import Credit from './pages/Credit'
import Devices from './pages/Devices'
import FAQ from './pages/FAQ'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import PP from './pages/PP'
import TOU from './pages/TOU'

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/build" element={<Build />} />
        <Route path="/changelogs" element={<Changelogs />} />
        <Route path="/credit" element={<Credit />} />
      </Routes>
    </>
  )
}

export default App
