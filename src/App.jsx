import './components/css/App.css'
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/js/Navbar'
import Footer from './components/js/Footer'
import Build from './pages/Build'
import Changelogs from './pages/Changelogs'
import Credit from './pages/Credit'
import Devices from './pages/Devices'
import FAQ from './pages/FAQ'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Screenshots from './pages/Screenshots'
import Team from './pages/Team'
import TOU from './pages/TOU'

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const path = params.get('path');

    if (path) {
      params.delete('path');
      const newSearch = params.toString() ? `?${params.toString()}` : '';
      
      navigate({
        pathname: `/${path}`,
        search: newSearch,
        hash: location.hash
      }, { replace: true });
    }
  }, [location, navigate]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/build" element={<Build />} />
        <Route path="/changelogs" element={<Changelogs />} />
        <Route path="/credit" element={<Credit />} />
        <Route path="/devices" element={<Devices />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/screenshots" element={<Screenshots />} />
        <Route path="/team" element={<Team />} />
        <Route path="/tou" element={<TOU />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
