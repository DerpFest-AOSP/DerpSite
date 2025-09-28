import React, { useEffect, useMemo, useState } from "react";

const PAGE_SIZE = 12;

function fmtBytes(bytes = 0) {
  if (!bytes) return "0 B";
  const units = ["B","KB","MB","GB","TB"];
  const i = Math.floor(Math.log(bytes)/Math.log(1024));
  return (bytes/Math.pow(1024,i)).toFixed(i?2:0) + " " + units[i];
}
function fmtDate(ts) {
  if (!ts) return "Unknown";
  return new Date(ts*1000).toLocaleString();
}

export default function Devices() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [devices, setDevices] = useState([]);
  const [search, setSearch] = useState("");
  const [companyFilter, setCompanyFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [changelog, setChangelog] = useState({ open: false, codename: null, loading: false, content: "" });

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/devices-index.json", { cache: "no-cache" });
        if (!res.ok) throw new Error("devices-index.json not found on site (did build-action run?)");
        const j = await res.json();

        const list = Array.isArray(j.devices) ? j.devices : [];
        var modifiedList = [];
        var overrideFailed = false;
        
        const res2 = await fetch("/devices-override.json", { cache: "no-cache" });
        try {
          const k = await res2.json();
          const overrideMap = new Map(k.map(item => [item.codename, item]));

          modifiedList = list.map(entry => {
            const override = overrideMap.get(entry.codename);
            if(override) {
              //delete from map to have only new ones later
              overrideMap.delete(override.codename);
              return {...entry, ...override}
            }
            return entry;
          });

          //append defined overrides that didn't exist in original list
          for (const newEntry of overrideMap.values()) {
            modifiedList.push(newEntry);
          }
        }
        catch(_) {
          overrideFailed = true;
        }

        if (!cancelled) {
          setDevices(
            overrideFailed
              ? list
              : modifiedList
          );
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err.message || String(err));
          setLoading(false);
        }
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const companies = useMemo(() => {
    const s = new Set();
    devices.forEach(d => {
      (d.aliases || []).forEach(a => {
        const c = (a.split(" ")[0] || "Unknown").trim();
        if (c) s.add(c);
      });
    });
    return ["All", ...Array.from(s).sort()];
  }, [devices]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return devices.filter(d => {
      if (companyFilter !== "All") {
        const matchesCompany = (d.aliases || []).some(a => (a.split(" ")[0] || "").trim() === companyFilter);
        if (!matchesCompany) return false;
      }
      if (!q) return true;
      const aliasMatch = (d.aliases || []).some(a => a.toLowerCase().includes(q));
      return aliasMatch || (d.displayName && d.displayName.toLowerCase().includes(q)) || (d.codename && d.codename.toLowerCase().includes(q));
    });
  }, [devices, companyFilter, search]);

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
      const text = await r.text();
      setChangelog({ open: true, codename, loading: false, content: text });
    } catch (err) {
      setChangelog({ open: true, codename, loading: false, content: `Failed to load changelog: ${err.message}` });
    }
  }
  function closeChangelog() { setChangelog({ open: false, codename: null, loading: false, content: "" }); }

  async function copyCurl(url, filename) {
    const safe = filename || (url && url.split("/").pop()) || "download.bin";
    const cmd = `curl -L -o "${safe}" "${url}"`;
    try {
      await navigator.clipboard.writeText(cmd);
      // replace with toast if you add one
      alert("Copied curl command to clipboard");
    } catch {
      alert("Failed to copy");
    }
  }

  if (loading) {
    return (
      <section className="devices-w devices-page">
        <div className="devices-loader-wrap">
          <div className="devices-dotwrap" role="status" aria-label="Loading">
            <span className="devices-dot devices-dot--a"></span>
            <span className="devices-dot devices-dot--b"></span>
            <span className="devices-dot devices-dot--c"></span>
          </div>
          <div className="devices-loading-text">Loading device index…</div>
        </div>
      </section>
    );
  }

  if (error) {
    return <section className="devices-w devices-page"><div className="devices-error">{error}</div></section>;
  }

  return (
    <section className="devices-w devices-page">
      <header className="devices-hero" aria-hidden>
        <div className="devices-hero-inner">
          <h1 className="devices-title"><span className="devices-colored-a">DerpFest Downloads</span></h1>
          <p className="devices-sub">Find your device and download official builds.</p>
          <div className="devices-hero-ctas">
            <input value={search} onChange={(e)=>{ setSearch(e.target.value); setPage(1); }} className="devices-search" placeholder="Search device name, alias, or codename..." />
          </div>
        </div>
      </header>

      <div className="devices-controls">
        <div className="devices-filters">
          {companies.map(c => (
            <button key={c} className={`devices-filter ${companyFilter === c ? "devices-filter--active" : ""}`} onClick={()=>{ setCompanyFilter(c); setPage(1); }}>
              {c}
            </button>
          ))}
        </div>
        <div className="devices-stats">{filtered.length} devices • page {page}/{pageCount}</div>
      </div>

      <main className="devices-grid">
        {pageItems.map(d => (
          <article key={d.codename} className="devices-card">
            <div className="devices-card-media">
              <div className="devices-stage">
                <img className="devices-img" src={`/img/devices/${d.codename}.png`} alt={`${d.displayName} (${d.codename})`} onError={(e)=>{ e.target.onerror=null; e.target.src = "/img/logo.png"; }} />
              </div>
            </div>

            <div className="devices-card-body">
              <h3 className="devices-name">{d.displayName} <span className="devices-codename">({d.codename === "lemonkebab" ? "kebab" : d.codename})</span></h3>
              <div className="devices-meta">
                <div><strong>Maintainer:</strong> {d.maintainer}</div>
                <div><strong>Aliases:</strong> {(d.aliases||[]).join(" / ")}</div>
              </div>

              <div className="devices-build">
                <div><strong>Version:</strong> {d.latest ? d.latest.version || "—" : "—"}</div>
                <div><strong>Released:</strong> {d.latest ? fmtDate(d.latest.datetime) : "—"}</div>
                <div><strong>Size:</strong> {d.latest ? fmtBytes(d.latest.size) : "—"}</div>
              </div>

              <div className="devices-actions">
                {d.latest && d.latest.url ? <a className="devices-btn devices-btn--primary" href={d.latest.url} target="_blank" rel="noopener noreferrer">Download</a> : <button className="devices-btn devices-btn--primary" disabled>Download</button>}
                <button className="devices-btn devices-btn--light" onClick={()=>openChangelog(d.codename, d.changelog_raw_url)}>View changelog</button>
                {d.latest && d.latest.url ? <button className="devices-btn devices-btn--ghost" onClick={()=>copyCurl(d.latest.url, d.latest.filename)}>Copy curl</button> : <button className="devices-btn devices-btn--ghost" disabled>Copy curl</button>}
              </div>
            </div>
          </article>
        ))}
      </main>

      <div className="devices-pagination">
        <button className="devices-page-btn" onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={page===1}>Prev</button>
        {Array.from({ length: pageCount }, (_,i)=>i+1).filter(pn => Math.abs(pn - page) <= 3 || pn === 1 || pn === pageCount).map(pn => (
          <button key={pn} className={`devices-page-btn ${pn === page ? "devices-page-btn--active" : ""}`} onClick={()=>setPage(pn)}>{pn}</button>
        ))}
        <button className="devices-page-btn" onClick={()=>setPage(p=>Math.min(pageCount,p+1))} disabled={page===pageCount}>Next</button>
      </div>

      <div className={`devices-modal ${changelog.open ? "devices-modal--open" : ""}`} role="dialog" aria-hidden={!changelog.open}>
        <div className="devices-modal-inner">
          <button className="devices-modal-close" onClick={closeChangelog} aria-label="Close">✕</button>
          <h3 className="devices-modal-title">Changelog — {changelog.codename}</h3>
          {changelog.loading ? <div className="devices-modal-loading">Loading changelog…</div> : <pre className="devices-modal-pre">{changelog.content}</pre>}
        </div>
      </div>
    </section>
  );
}