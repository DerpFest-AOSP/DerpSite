import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from 'react-router-dom';

const PAGE_SIZE = 12;

function fmtDateShort(ts) {
  if (!ts) return null;
  return new Date(ts * 1000).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
}

function getPageNumbers(page, pageCount) {
  if (pageCount <= 5) return Array.from({ length: pageCount }, (_, i) => i + 1);
  const set = new Set([1, pageCount]);
  for (let i = Math.max(2, page - 1); i <= Math.min(pageCount - 1, page + 1); i++) set.add(i);
  return Array.from(set).sort((a, b) => a - b);
}

const fileCache = {};

async function fetchDeviceFile(status) {
  const url = status === "Active" ? "/active-devices.json" : "/discontinued-devices.json";
  if (fileCache[url]) return fileCache[url];
  const res = await fetch(url, { cache: "no-cache" });
  if (!res.ok) throw new Error(`${url} not found (did build-action run?)`);
  const data = await res.json();
  fileCache[url] = data;
  return data;
}

export default function Devices() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch]             = useState(searchParams.get('s') || "");
  const [statusFilter, setStatusFilter] = useState("Active");
  const [oemFilter, setOemFilter]       = useState("All");
  const [page, setPage]                 = useState(1);
  const [changelog, setChangelog]       = useState({ open: false, codename: null, loading: false, content: "" });

  const [activeData, setActiveData]     = useState(null);
  const [discData, setDiscData]         = useState(null);
  const [loadingStatus, setLoadingStatus] = useState({ Active: true, Discontinued: false });
  const [errors, setErrors]             = useState({});

  useEffect(() => {
    const urlVal = searchParams.get('s') || '';
    if (search !== urlVal) setSearch(urlVal);
  }, [searchParams]);

  useEffect(() => {
    fetchDeviceFile("Active")
      .then(data => setActiveData(data))
      .catch(err => setErrors(e => ({ ...e, Active: err.message })))
      .finally(() => setLoadingStatus(s => ({ ...s, Active: false })));
  }, []);

  useEffect(() => {
    if (statusFilter !== "Discontinued" || discData !== null) return;
    setLoadingStatus(s => ({ ...s, Discontinued: true }));
    fetchDeviceFile("Discontinued")
      .then(data => setDiscData(data))
      .catch(err => setErrors(e => ({ ...e, Discontinued: err.message })))
      .finally(() => setLoadingStatus(s => ({ ...s, Discontinued: false })));
  }, [statusFilter]);

  const currentRaw   = statusFilter === "Active" ? activeData : discData;
  const isLoading    = loadingStatus[statusFilter];
  const currentError = errors[statusFilter];

  const oems = useMemo(() => {
    if (!currentRaw?.oems) return ["All"];
    return ["All", ...currentRaw.oems];
  }, [currentRaw]);

  useEffect(() => { setOemFilter("All"); }, [statusFilter]);

  const devices = useMemo(() => {
    return currentRaw?.devices ?? [];
  }, [currentRaw]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return devices.filter(d => {
      if (oemFilter !== "All" && (!Array.isArray(d.oem) || !d.oem.includes(oemFilter))) return false;
      if (!q) return true;
      return (
        (d.aliases || []).some(a => a.toLowerCase().includes(q)) ||
        (d.displayName || "").toLowerCase().includes(q) ||
        (d.codename || "").toLowerCase().includes(q)
      );
    });
  }, [devices, oemFilter, search]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  useEffect(() => { if (page > pageCount) setPage(1); }, [pageCount]);

  const pageItems = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filtered.slice(start, start + PAGE_SIZE);
  }, [filtered, page]);

  async function openChangelog(codename, rawUrl) {
    setChangelog({ open: true, codename, loading: true, content: "" });
    try {
      const r = await fetch(rawUrl);
      if (!r.ok) {
        setChangelog({ open: true, codename, loading: false, content: `No changelog found for ${codename}.` });
        return;
      }
      setChangelog({ open: true, codename, loading: false, content: await r.text() });
    } catch (err) {
      setChangelog({ open: true, codename, loading: false, content: `Failed to load changelog: ${err.message}` });
    }
  }

  function closeChangelog() {
    setChangelog({ open: false, codename: null, loading: false, content: "" });
  }

  function StatusBadge({ status }) {
    if (!status) return null;
    return (
      <span className={`dc-badge dc-badge--${status === "Active" ? "active" : "disc"}`}>
        {status}
      </span>
    );
  }

  const pageNumbers = getPageNumbers(page, pageCount);

  return (
    <section className="dc-page">

      {/* Hero */}
      <header className="dc-hero">
        <div className="dc-hero-inner">
          <h1 className="dc-title"><span className="devices-colored-a">DerpFest Downloads</span></h1>
        </div>
      </header>

      {/* Status tabs */}
      <div className="dc-status-bar">
        <div className="dc-status-bar-inner">
          {["Active", "Discontinued"].map(s => (
            <button
              key={s}
              className={`dc-status-tab dc-status-tab--${s.toLowerCase()}${statusFilter === s ? " dc-status-tab--selected" : ""}`}
              onClick={() => { setStatusFilter(s); setPage(1); }}
            >
              <span className="dc-status-dot"></span>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Search */}
      <div className="dc-search-wrap">
        <input
          value={search}
          onChange={e => {
            const v = e.target.value;
            setSearch(v);
            setPage(1);
            setSearchParams(v ? { s: v } : {});
          }}
          className="dc-search"
          placeholder="Search by device name, alias, or codename…"
        />
      </div>

      {/* OEM filters */}
      <div className="dc-oem-section">
        <div className="dc-oem-filters">
          {oems.map(o => (
            <button
              key={o}
              className={`dc-oem-btn${oemFilter === o ? " dc-oem-btn--active" : ""}`}
              onClick={() => { setOemFilter(o); setPage(1); }}
            >
              {o}
            </button>
          ))}
        </div>
        <p className="dc-stats">{filtered.length} device{filtered.length !== 1 ? "s" : ""} &bull; page {page}/{pageCount}</p>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="dc-loader-wrap">
          <div className="dc-dotwrap" role="status" aria-label="Loading">
            <span className="dc-dot dc-dot--a"></span>
            <span className="dc-dot dc-dot--b"></span>
            <span className="dc-dot dc-dot--c"></span>
          </div>
          <p className="dc-loading-text">Loading device index…</p>
        </div>
      )}

      {!isLoading && currentError && (
        <p className="dc-error">{currentError}</p>
      )}

      {/* Device grid */}
      {!isLoading && !currentError && (
        <main className="dc-grid">
          {pageItems.map(d => {
            const displayCodename = d.codename === "lemonkebab" ? "kebab" : d.codename;
            const dateStr         = fmtDateShort(d.latest?.datetime);

            return (
              <article key={d.codename} className="dc-card">

                {/* Image */}
                <div className="dc-img-wrap">
                  <img
                    loading="lazy"
                    className="dc-img"
                    src={`/img/devices/${d.codename}.webp`}
                    alt={(d.aliases || [d.codename]).join(" / ")}
                    onError={e => { e.target.onerror = null; e.target.src = "/img/logo.png"; }}
                  />
                  <StatusBadge status={d.status} />
                </div>

                {/* Body */}
                <div className="dc-body">
                  <div className="dc-body-top">
                    <div className="dc-codename">{displayCodename}</div>
                    <div className="dc-devnames hide-scrollbar">
                      {(d.aliases || [d.codename]).map((name, i, arr) => (
                        <span key={i} className="dc-devname-item">
                          {name}
                          {i < arr.length - 1 && <span className="dc-devname-sep">/</span>}
                        </span>
                      ))}
                    </div>

                    <div className="dc-info-row">
                      <span className="dc-info-label">Version</span>
                      <span className="dc-info-val">{d.latest?.version || "—"}</span>
                    </div>

                    {dateStr && (
                      <div className="dc-info-row">
                        <span className="dc-info-label">Released</span>
                        <span className="dc-info-val">{dateStr}</span>
                      </div>
                    )}

                    <div className="dc-info-row">
                      <span className="dc-info-label">Maintainer</span>
                      <span className="dc-info-val">{d.maintainer}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="dc-body-bottom">
                    <div className="dc-actions-row">
                      {d.latest?.url
                        ? <a className="dc-btn dc-btn--primary" href={d.latest.url} target="_blank" rel="noopener noreferrer">Download</a>
                        : <button className="dc-btn dc-btn--primary" disabled>Download</button>
                      }
                      <button
                        className="dc-btn dc-btn--secondary"
                        disabled={!d.changelog_raw_url}
                        onClick={() => openChangelog(d.codename, d.changelog_raw_url)}
                      >
                        Changelog
                      </button>
                    </div>
                    {d.support_group
                      ? (
                        <a
                          className="dc-btn dc-btn--support"
                          href={d.support_group}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          Support Group
                        </a>
                      )
                      : <span className="dc-btn dc-btn--support dc-btn--support-none">No support group</span>
                    }
                  </div>
                </div>

              </article>
            );
          })}
        </main>
      )}

      {/* Pagination */}
      {!isLoading && !currentError && pageCount > 1 && (
        <div className="dc-pagination">
          {pageNumbers.map((pn, idx) => {
            const prev = pageNumbers[idx - 1];
            return (
              <React.Fragment key={pn}>
                {prev && pn - prev > 1 && <span className="dc-page-ellipsis">…</span>}
                <button
                  className={`dc-page-btn${pn === page ? " dc-page-btn--active" : ""}`}
                  onClick={() => setPage(pn)}
                >
                  {pn}
                </button>
              </React.Fragment>
            );
          })}
        </div>
      )}

      {/* Changelog modal */}
      <div
        className={`dc-modal${changelog.open ? " dc-modal--open" : ""}`}
        role="dialog"
        aria-hidden={!changelog.open}
        onClick={closeChangelog}
      >
        <div className="dc-modal-inner" onClick={e => e.stopPropagation()}>
          <button className="dc-modal-close" onClick={closeChangelog} aria-label="Close">✕</button>
          <h3 className="dc-modal-title">Changelog — {changelog.codename}</h3>
          {changelog.loading
            ? <p className="dc-modal-loading">Loading changelog…</p>
            : <pre className="dc-modal-pre">{changelog.content}</pre>
          }
        </div>
      </div>

    </section>
  );
}
