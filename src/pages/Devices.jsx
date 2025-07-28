import React, { useState, useEffect } from 'react';

const Devices = () => {
  // Configuration
  const GITHUB_REPO = 'DerpFest-AOSP/Updater-Stuff';
  const GITHUB_BASE_URL = `https://raw.githubusercontent.com/${GITHUB_REPO}/master/`;
  const GITHUB_API_URL = `https://api.github.com/repos/${GITHUB_REPO}/contents/`;
  
  // Pagination
  const DEVICES_PER_PAGE = 24;
  
  // State
  const [allDevices, setAllDevices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [maintainers, setMaintainers] = useState(new Set());
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedMaintainer, setSelectedMaintainer] = useState('all');
  const [loading, setLoading] = useState(true);
  const [deviceDetails, setDeviceDetails] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [changelogContent, setChangelogContent] = useState('');
  const [changelogDevice, setChangelogDevice] = useState('');

  // Utility functions
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

  const getDeviceName = (filename) => {
    return filename.replace('.json', '').replace(/_/g, ' ');
  };

  const getMaintainer = (deviceName) => {
    const maintainerNames = [
      "Alex Thompson", "Sarah Johnson", "Michael Chen", 
      "David Williams", "Emma Davis", "James Brown",
      "Olivia Miller", "Robert Wilson", "Sophia Martinez"
    ];
    
    const index = deviceName.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0) % maintainerNames.length;
    return maintainerNames[index];
  };

  // Fetch devices from GitHub
  const fetchDevices = async () => {
    try {
      const response = await fetch(GITHUB_API_URL);
      if (!response.ok) {
        throw new Error(`GitHub API returned ${response.status}`);
      }
      
      const files = await response.json();
      const jsonFiles = files.filter(file => 
        file.name.endsWith('.json') && 
        !file.name.includes('changelog') &&
        file.type === 'file'
      );
      
      const devices = jsonFiles.map(file => {
        const deviceName = getDeviceName(file.name);
        const maintainer = getMaintainer(deviceName);
        
        return {
          filename: file.name,
          name: deviceName,
          maintainer: maintainer
        };
      });

      const maintainerSet = new Set(devices.map(device => device.maintainer));
      setMaintainers(maintainerSet);
      setAllDevices(devices);
      return devices;
    } catch (error) {
      console.error('Error fetching devices:', error);
      return [];
    }
  };

  // Fetch device details
  const fetchDeviceDetails = async (filename) => {
    try {
      const response = await fetch(GITHUB_BASE_URL + filename);
      if (!response.ok) {
        throw new Error(`Failed to fetch ${filename}: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error(`Error fetching details for ${filename}:`, error);
      return null;
    }
  };

  // Fetch changelog
  const fetchChangelog = async (deviceName) => {
    try {
      const changelogFilename = `changelog_${deviceName.replace(/ /g, '_')}.txt`;
      const response = await fetch(GITHUB_BASE_URL + changelogFilename);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch changelog: ${response.status}`);
      }
      
      return await response.text();
    } catch (error) {
      console.error('Error loading changelog:', error);
      return `Changelog not available for ${deviceName}\n\nError: ${error.message}`;
    }
  };

  // Filter devices based on search and maintainer
  const filterDevices = () => {
    return allDevices.filter(device => {
      const matchesSearch = device.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesMaintainer = selectedMaintainer === 'all' || device.maintainer === selectedMaintainer;
      
      return matchesSearch && matchesMaintainer;
    });
  };

  // Get devices for current page
  const getCurrentPageDevices = () => {
    const filteredDevices = filterDevices();
    setTotalPages(Math.ceil(filteredDevices.length / DEVICES_PER_PAGE));
    
    const startIndex = (currentPage - 1) * DEVICES_PER_PAGE;
    const endIndex = startIndex + DEVICES_PER_PAGE;
    return filteredDevices.slice(startIndex, endIndex);
  };

  // Load device details for current page
  const loadDeviceDetails = async (devices) => {
    if (devices.length === 0) {
      setDeviceDetails([]);
      return;
    }

    try {
      const details = await Promise.all(
        devices.map(device => fetchDeviceDetails(device.filename))
      );
      
      const validDetails = details.map((detail, index) => {
        if (!detail || !detail.response || detail.response.length === 0) {
          return null;
        }
        return {
          device: devices[index],
          build: detail.response[0]
        };
      }).filter(item => item !== null);
      
      setDeviceDetails(validDetails);
    } catch (error) {
      console.error('Error loading device details:', error);
      setDeviceDetails([]);
    }
  };

  // Handle changelog modal
  const handleShowChangelog = async (deviceName) => {
    setChangelogDevice(deviceName);
    setShowModal(true);
    setChangelogContent('Loading changelog...');
    
    try {
      const changelog = await fetchChangelog(deviceName);
      setChangelogContent(changelog);
    } catch (error) {
      console.error('Error loading changelog:', error);
      setChangelogContent('Failed to load changelog. Please try again later.');
    }
  };

  // Effects
  useEffect(() => {
    const initializeDevices = async () => {
      setLoading(true);
      await fetchDevices();
      setLoading(false);
    };
    
    initializeDevices();
  }, []);

  useEffect(() => {
    const currentDevices = getCurrentPageDevices();
    loadDeviceDetails(currentDevices);
  }, [allDevices, currentPage, searchTerm, selectedMaintainer]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedMaintainer]);

  const filteredDevices = filterDevices();
  const deviceCount = `${filteredDevices.length} devices (${allDevices.length} total)`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-700 text-slate-100 pb-8">
      {/* Header */}
      <header className="bg-slate-900/80 backdrop-blur-md p-6 text-center top-0 z-50">
        <div className="flex items-center justify-center gap-3 mb-2">
          <i className="fas fa-download text-4xl text-emerald-400"></i>
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-cyan-400 to-emerald-400 bg-clip-text text-transparent">
            DerpFest Downloads
          </h1>
        </div>
        <h2 className="text-slate-400 text-lg max-w-2xl mx-auto">
          Browse and download the latest builds for supported devices
        </h2>
      </header>

      {/* Controls */}
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
          <span>{loading ? 'Loading devices...' : deviceCount}</span>
        </div>
        <select
          value={selectedMaintainer}
          onChange={(e) => setSelectedMaintainer(e.target.value)}
          className="bg-slate-900/70 border-2 border-slate-600 rounded-full px-5 py-2.5 text-slate-100 text-sm"
        >
          <option value="all">All Maintainers</option>
          {Array.from(maintainers).map(maintainer => (
            <option key={maintainer} value={maintainer}>{maintainer}</option>
          ))}
        </select>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4">
        {loading ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-slate-600 border-t-cyan-400 rounded-full animate-spin mx-auto mb-4"></div>
            <p>Fetching device information from GitHub...</p>
          </div>
        ) : (
          <>
            {/* Devices Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4">
              {deviceDetails.length === 0 && !loading ? (
                <div className="col-span-full text-center py-12 bg-slate-800/50 rounded-xl">
                  <i className="fas fa-exclamation-triangle text-5xl mb-4 text-slate-400"></i>
                  <h3 className="text-xl font-semibold mb-2">No devices found</h3>
                  <p className="text-slate-400">No devices match your current search or filter.</p>
                </div>
              ) : (
                deviceDetails.map(({ device, build }, index) => (
                  <div key={index} className="bg-white rounded-xl overflow-hidden shadow-lg transition-all hover:-translate-y-2 hover:shadow-xl border border-slate-600 flex flex-col h-full">
                    {/* Device Image */}
                    <div className="h-32 bg-gradient-to-br from-slate-700 to-slate-600 flex items-center justify-center">
                      <i className="fas fa-mobile-alt text-6xl text-white/10"></i>
                    </div>
                    
                    {/* Card Header */}
                    <div className="p-5 bg-gradient-to-r from-cyan-400 to-emerald-400 text-white flex items-center">
                      <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center mr-4 text-2xl">
                        <i className="fas fa-microchip"></i>
                      </div>
                      <div className="flex-1">
                        <div className="text-xl font-bold mb-1">{device.name}</div>
                        <div className="text-sm opacity-90">Maintainer: {device.maintainer}</div>
                      </div>
                    </div>
                    
                    {/* Card Body */}
                    <div className="p-5 flex-1 flex flex-col">
                      <div className="grid grid-cols-2 gap-3 mb-5">
                        <div className="bg-slate-100 p-3 rounded-lg">
                          <div className="text-xs text-slate-600 mb-1">Version</div>
                          <div className="font-semibold text-slate-900">{build.version}</div>
                        </div>
                        <div className="bg-slate-100 p-3 rounded-lg">
                          <div className="text-xs text-slate-600 mb-1">Build Date</div>
                          <div className="font-semibold text-slate-900">{formatDate(build.datetime)}</div>
                        </div>
                        <div className="bg-slate-100 p-3 rounded-lg">
                          <div className="text-xs text-slate-600 mb-1">Size</div>
                          <div className="font-semibold text-slate-900">{formatFileSize(build.size)}</div>
                        </div>
                        <div className="bg-slate-100 p-3 rounded-lg">
                          <div className="text-xs text-slate-600 mb-1">Type</div>
                          <div className="font-semibold text-slate-900">{build.romtype}</div>
                        </div>
                      </div>
                      
                      {/* Card Actions */}
                      <div className="flex gap-3 mt-auto">
                        <button
                          onClick={() => window.open(build.url, '_blank')}
                          className="flex-1 bg-gradient-to-r from-cyan-400 to-emerald-400 text-white py-3 rounded-lg font-semibold transition-all hover:opacity-90 hover:-translate-y-1 flex items-center justify-center gap-2"
                        >
                          <i className="fas fa-download text-lg"></i> Download
                        </button>
                        <button
                          onClick={() => handleShowChangelog(device.name)}
                          className="flex-1 bg-slate-200 text-slate-900 py-3 rounded-lg font-semibold transition-all hover:bg-slate-300 flex items-center justify-center gap-2"
                        >
                          <i className="fas fa-file-alt text-lg"></i> Changelog
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Pagination */}
            <div className="flex justify-center items-center gap-2 mt-8">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="bg-cyan-400 text-white border-none rounded px-4 py-2 cursor-pointer transition-all hover:bg-emerald-400 disabled:bg-slate-600 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <i className="fas fa-chevron-left"></i> Previous
              </button>
              <span className="mx-4">Page {currentPage} of {totalPages}</span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages || totalPages === 0}
                className="bg-cyan-400 text-white border-none rounded px-4 py-2 cursor-pointer transition-all hover:bg-emerald-400 disabled:bg-slate-600 disabled:cursor-not-allowed flex items-center gap-2"
              >
                Next <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          </>
        )}
      </div>

      {/* Changelog Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 overflow-auto">
          <div className="bg-slate-800 my-20 mx-auto w-11/12 max-w-4xl rounded-xl overflow-hidden shadow-2xl max-h-4/5 flex flex-col">
            <div className="p-5 bg-gradient-to-r from-cyan-400 to-emerald-400 text-white flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Changelog - {changelogDevice}</h2>
              <button
                onClick={() => setShowModal(false)}
                className="bg-none border-none text-white text-3xl cursor-pointer transition-transform hover:scale-110"
              >
                &times;
              </button>
            </div>
            <div className="p-6 overflow-y-auto flex-1 bg-slate-900">
              <pre className="whitespace-pre-wrap font-mono leading-relaxed text-slate-300">
                {changelogContent}
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Devices;