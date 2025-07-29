import React, { useState, useEffect } from 'react';

const DeviceImage = ({ imageUrl, deviceName }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [imageUrl]);

  return (
    <div className="device-image h-56 flex items-center justify-center overflow-hidden relative">
      {!hasError ? (
        <div className="relative w-full h-full flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-black/80 to-black z-0"></div>
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-800/50 to-transparent z-0"></div>
          <img
            src={imageUrl}
            alt={deviceName}
            className="w-3/4 h-full object-contain z-10 transition-all duration-500 ease-in-out group-hover:scale-105 group-hover:rotate-2 group-hover:drop-shadow-glow"
          />
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-black to-transparent z-10"></div>
          <div className="absolute bottom-5 left-5 text-xl font-bold text-white z-20 text-shadow transition-transform duration-300 group-hover:translate-x-1">
            {deviceName}
          </div>
        </div>
      ) : (
        <div className='image-placeholder text-5xl text-white/15'>
          <i className='fas fa-mobile-alt'></i>
        </div>
      )}
    </div>
  );
};

const Devices = () => {
  const GITHUB_REPO = 'DerpFest-AOSP/Updater-Stuff';
  const GITHUB_BASE_URL = `https://raw.githubusercontent.com/${GITHUB_REPO}/master/`;
  const GITHUB_API_URL = `https://api.github.com/repos/${GITHUB_REPO}/contents/`;
  const DEVICE_IMAGE_BASE = 'https://wiki.lineageos.org/images/devices/';
  const DEVICES_PER_PAGE = 15;
  
  const [allDevices, setAllDevices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [maintainersData, setMaintainersData] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [deviceDetails, setDeviceDetails] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [changelogContent, setChangelogContent] = useState('');
  const [changelogDevice, setChangelogDevice] = useState('');
  const [pageChanging, setPageChanging] = useState(false);

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };
  
  const getDeviceName = (filename) => filename.replace('.json', '').replace(/_/g, ' ');
  const getDeviceImageUrl = (deviceName) => `${DEVICE_IMAGE_BASE}${deviceName.replace(/ /g, '_')}.png`;

  useEffect(() => {
    const initialize = async () => {
      setLoading(true);
      try {
        const maintResponse = await fetch(`${GITHUB_BASE_URL}maintainers.json`);
        if (maintResponse.ok) {
          const rawData = await maintResponse.json();
          // Transform keys to match our device name format
          const transformedData = {};
          Object.keys(rawData).forEach(key => {
            const normalizedKey = key.replace(/_/g, ' ');
            transformedData[normalizedKey] = rawData[key];
          });
          setMaintainersData(transformedData);
        }
      } catch (error) {
        console.error('Error fetching maintainers:', error);
      }
      try {
        const devicesResponse = await fetch(GITHUB_API_URL);
        if (!devicesResponse.ok) throw new Error(`GitHub API error`);
        const files = await devicesResponse.json();
        const jsonFiles = files.filter(file => 
          file.name.endsWith('.json') && !file.name.includes('changelog') && !file.name.includes('maintainers') && file.type === 'file'
        );
        const devices = jsonFiles.map(file => ({
          filename: file.name,
          name: getDeviceName(file.name),
          imageUrl: getDeviceImageUrl(getDeviceName(file.name))
        }));
        setAllDevices(devices);
      } catch (error) {
        console.error('Error fetching devices:', error);
      }
      setLoading(false);
    };
    initialize();
  }, []);

  useEffect(() => {
    const fetchPageDetails = async () => {
      setPageChanging(true);
      const filtered = allDevices.filter(d => d.name.toLowerCase().includes(searchTerm.toLowerCase()));
      setTotalPages(Math.ceil(filtered.length / DEVICES_PER_PAGE));
      
      const startIndex = (currentPage - 1) * DEVICES_PER_PAGE;
      const devicesOnPage = filtered.slice(startIndex, startIndex + DEVICES_PER_PAGE);

      if (devicesOnPage.length === 0) {
        setDeviceDetails([]);
        setPageChanging(false);
        return;
      }
      const details = await Promise.all(
        devicesOnPage.map(async (device) => {
          try {
            const res = await fetch(GITHUB_BASE_URL + device.filename);
            if (!res.ok) return null;
            const data = await res.json();
            return (data.response && data.response.length > 0) ? { device, build: data.response[0] } : null;
          } catch { return null; }
        })
      );
      setDeviceDetails(details.filter(Boolean));
      setTimeout(() => setPageChanging(false), 300);
    };
    if (!loading) fetchPageDetails();
  }, [allDevices, currentPage, searchTerm, loading]);
  
  useEffect(() => { setCurrentPage(1); }, [searchTerm]);

  const handleShowChangelog = async (deviceName) => {
    setChangelogDevice(deviceName);
    setShowModal(true);
    setChangelogContent('Loading changelog...');
    try {
      const res = await fetch(`${GITHUB_BASE_URL}changelog_${deviceName.replace(/ /g, '_')}.txt`);
      if (!res.ok) throw new Error('Not found');
      setChangelogContent(await res.text());
    } catch {
      setChangelogContent(`Changelog not available for ${deviceName}.`);
    }
  };

  const filteredDevices = allDevices.filter(d => d.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages && newPage !== currentPage) {
      setPageChanging(true);
      setTimeout(() => {
        setCurrentPage(newPage);
      }, 300);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-700 text-slate-100 pb-8">
      <header className="bg-slate-900/80 backdrop-blur-md p-6 text-center top-0 z-50">
        <div className="flex items-center justify-center gap-3 mb-2">
          <i className="fas fa-download text-4xl text-emerald-400"></i>
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">DerpFest Downloads</h1>
        </div>
        <h2 className="text-slate-400 text-lg max-w-2xl mx-auto">Browse and download the latest builds for supported devices</h2>
      </header>
      <div className="flex justify-center gap-4 my-6 max-w-6xl mx-auto px-4 flex-wrap">
        <div className="relative flex-1 max-w-lg">
          <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400"></i>
          <input 
            type="text" 
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
            placeholder="Search devices..." 
            className="w-full pl-12 pr-4 py-3 rounded-full border-2 border-slate-600 bg-slate-900/70 text-slate-100 text-base transition-all focus:outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/30"
          />
        </div>
        <div className="flex items-center bg-slate-900/70 px-5 py-2.5 rounded-full text-sm border-2 border-slate-600">
          <i className="fas fa-mobile-alt mr-2 text-emerald-400"></i>
          <span>{loading ? 'Loading...' : `${filteredDevices.length} devices found`}</span>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4">
        {loading ? (
          <div className="text-center py-12 slide-up">
            <div className="w-12 h-12 border-4 border-slate-600 border-t-cyan-400 rounded-full animate-spin mx-auto mb-4"></div>
            <p>Fetching device information...</p>
          </div>
        ) : (
          <>
            <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4 ${pageChanging ? 'opacity-50 transition-opacity duration-300' : 'opacity-100 transition-opacity duration-300'}`}>
              {deviceDetails.length > 0 ? (
                deviceDetails.map(({ device, build }, index) => (
                  <div 
                    key={`${device.name}-${currentPage}`}
                    className="group bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl border border-slate-700 flex flex-col h-full card-appear"
                    style={{ 
                      animationDelay: `${index * 50}ms`,
                      boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                    }}
                  >
                    <DeviceImage imageUrl={device.imageUrl} deviceName={device.name} />
                    <div className="p-5 flex-1 flex flex-col text-gray-800">
                      <div className="flex items-center mb-6">
                        <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-emerald-400 rounded-lg flex items-center justify-center mr-4 text-2xl text-white transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
                          <i className="fas fa-user-cog"></i>
                        </div>
                        <div className="text-lg">Maintainer: <strong className="font-semibold">{maintainersData[device.name] || 'Unknown'}</strong></div>
                      </div>
                      <div className="grid grid-cols-2 gap-3 mb-5">
                        <div className="bg-slate-100 p-3 rounded-lg"><div className="text-xs text-slate-600 mb-1">Version</div><div className="font-semibold text-slate-900">{build.version}</div></div>
                        <div className="bg-slate-100 p-3 rounded-lg"><div className="text-xs text-slate-600 mb-1">Date</div><div className="font-semibold text-slate-900">{formatDate(build.datetime)}</div></div>
                        <div className="bg-slate-100 p-3 rounded-lg"><div className="text-xs text-slate-600 mb-1">Size</div><div className="font-semibold text-slate-900">{formatFileSize(build.size)}</div></div>
                        <div className="bg-slate-100 p-3 rounded-lg"><div className="text-xs text-slate-600 mb-1">Type</div><div className="font-semibold text-slate-900">{build.romtype}</div></div>
                      </div>
                      <div className="flex gap-3 mt-auto">
                        <a href={build.url} target="_blank" rel="noopener noreferrer" className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-3 rounded-lg font-semibold transition-all hover:opacity-90 hover:-translate-y-1 flex items-center justify-center gap-2 shadow-lg">
                          <i className="fas fa-download"></i> Download
                        </a>
                        <button onClick={() => handleShowChangelog(device.name)} className="flex-1 bg-gradient-to-r from-emerald-500 to-green-500 text-white py-3 rounded-lg font-semibold transition-all hover:opacity-90 hover:-translate-y-1 flex items-center justify-center gap-2 shadow-lg">
                          <i className="fas fa-file-alt"></i> Changelog
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center py-12 bg-slate-800/50 rounded-xl fade-in">
                  <i className="fas fa-search-minus text-5xl mb-4 text-slate-400"></i>
                  <h3 className="text-xl font-semibold mb-2">No Devices Found</h3>
                  <p className="text-slate-400">Please try adjusting your search term.</p>
                </div>
              )}
            </div>

            <div className="flex justify-center items-center gap-2 mt-8 slide-up">
              <button 
                onClick={() => handlePageChange(currentPage - 1)} 
                disabled={currentPage === 1} 
                className="bg-cyan-500 text-white border-none rounded-lg px-6 py-3 cursor-pointer transition-all hover:bg-cyan-600 disabled:bg-slate-600 disabled:cursor-not-allowed flex items-center gap-2 shadow-md"
              >
                <i className="fas fa-chevron-left"></i> Previous
              </button>
              <span className="mx-4 text-lg">Page {currentPage} of {totalPages || 1}</span>
              <button 
                onClick={() => handlePageChange(currentPage + 1)} 
                disabled={currentPage >= totalPages} 
                className="bg-cyan-500 text-white border-none rounded-lg px-6 py-3 cursor-pointer transition-all hover:bg-cyan-600 disabled:bg-slate-600 disabled:cursor-not-allowed flex items-center gap-2 shadow-md"
              >
                Next <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          </>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 fade-in" onClick={() => setShowModal(false)}>
          <div className="bg-slate-800 w-full max-w-4xl rounded-xl shadow-2xl max-h-[85vh] flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="p-5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Changelog: {changelogDevice}</h2>
              <button onClick={() => setShowModal(false)} className="bg-transparent border-none text-white text-3xl cursor-pointer transition-transform hover:scale-110">&times;</button>
            </div>
            <div className="p-6 overflow-y-auto bg-slate-900">
              <pre className="whitespace-pre-wrap font-mono leading-relaxed text-slate-300">{changelogContent}</pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Devices;
