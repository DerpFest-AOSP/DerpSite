import './components/css/App.css'
import { Routes, Route, useLocation, useNavigate, Navigate, useParams } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './components/js/Navbar'
import Footer from './components/js/Footer'
import ContributionNotice from './components/js/ContributionNotice'
import Build from './pages/Build'
import Credit from './pages/Credit'
import Devices from './pages/Devices'
import FAQ from './pages/FAQ'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import Screenshots from './pages/Screenshots'
import Team from './pages/Team'
import TOU from './pages/TOU'
import PageSeo from './components/js/PageSeo'

function DeviceCodenameRedirect() {
  const { codename } = useParams();
  return <Navigate to={`/devices?s=${encodeURIComponent(codename)}`} replace />;
}

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
      <PageSeo />
      <Navbar />
      <main id="main-content">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/build" element={<Build />} />
        <Route path="/credit" element={<Credit />} />
        <Route path="/devices" element={<Devices />} />
        <Route path="/devices/:codename" element={<DeviceCodenameRedirect />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/screenshots" element={<Screenshots />} />
        <Route path="/team" element={<Team />} />
        <Route path="/tou" element={<TOU />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      </main>
      <ContributionNotice />
      <Footer />
    </>
  )
}

export default App
