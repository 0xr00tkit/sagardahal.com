"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getStoredData, INITIAL_WRITEUPS, INITIAL_RESEARCHER_INFO, INITIAL_SOCIALS } from "../lib/data";

export default function WriteupsHub() {
  const [writeups, setWriteups] = useState(INITIAL_WRITEUPS);
  const [researcherInfo, setResearcherInfo] = useState(INITIAL_RESEARCHER_INFO);
  const [searchTerm, setSearchTerm] = useState("");
  const [severityFilter, setSeverityFilter] = useState("all");

  useEffect(() => {
    setWriteups(getStoredData("portfolio_writeups", INITIAL_WRITEUPS));
    setResearcherInfo(getStoredData("portfolio_info", INITIAL_RESEARCHER_INFO));
  }, []);

  const filteredWriteups = writeups.filter((w) => {
    const matchesSearch =
      w.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      w.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      w.summary?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (w.tags && w.tags.some((t) => t.toLowerCase().includes(searchTerm.toLowerCase())));
    const matchesSeverity =
      severityFilter === "all" || w.severity.toLowerCase() === severityFilter.toLowerCase();
    return matchesSearch && matchesSeverity;
  });

  return (
    <main className="main-wrapper">
      <div className="bg-ambient-mesh" />
      <div className="bg-dot-grid" />

      {/* Navigation Header */}
      <header className="main-header">
        <div className="brand-section">
          <Link href="/" className="brand-title">
            SAGAR DAHAL
          </Link>
          <span className="brand-badge">WRITEUPS HUB</span>
        </div>
        <nav className="header-nav">
          <Link href="/" className="nav-link">
            Overview
          </Link>
          <Link href="/writeups" className="nav-link active">
            Security Advisories
          </Link>
          <Link href="/sagar" className="nav-link admin-link">
            Control Panel (/sagar)
          </Link>
        </nav>
      </header>

      {/* Hub Banner */}
      <section className="cyber-panel">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <h1 style={{ fontSize: "1.8rem", fontWeight: "800", marginBottom: "8px" }}>
              Security Advisories & Research Bulletins
            </h1>
            <p style={{ color: "var(--text-sub)", fontSize: "0.9rem", maxWidth: "700px" }}>
              Technical writeups, penetration test walkthroughs, and vulnerability disclosure reports authored by {researcherInfo.name}.
            </p>
          </div>
          <Link href="/" className="advisory-link">
            ← Return to Dashboard
          </Link>
        </div>

        {/* Search & Filter Bar */}
        <div style={{ marginTop: "24px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
          <input
            type="text"
            placeholder="Search by title, ID, tag, or vulnerability concept..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="crypt-input"
            style={{ maxWidth: "450px" }}
          />
          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="contact-textbox"
            style={{ width: "160px" }}
          >
            <option value="all">All Severities</option>
            <option value="high">High Severity</option>
            <option value="medium">Medium Severity</option>
            <option value="low">Low Severity</option>
          </select>
        </div>
      </section>

      {/* Writeups List Grid */}
      <section className="writeups-wrapper">
        {filteredWriteups.map((w, idx) => (
          <article key={idx} className={`cyber-panel ${w.severity === "High" ? "advisory-card red" : "advisory-card"}`}>
            <div className="advisory-header">
              <div style={{ display: "flex", alignItems: "center", gap: "10px", flexWrap: "wrap" }}>
                <span className="advisory-id">{w.id} [SEVERITY: {w.severity.toUpperCase()}]</span>
                {w.tags && w.tags.map((t, i) => (
                  <span key={i} className="badge cyber-generic" style={{ fontSize: "0.68rem" }}>
                    {t}
                  </span>
                ))}
              </div>
              <span className="advisory-date">PUBLISHED: {w.date}</span>
            </div>

            <h2 className="advisory-title">
              <Link href={`/writeups/${w.slug}`} className="advisory-title-link">
                {w.title}
              </Link>
            </h2>

            <p style={{ color: "var(--text-sub)", fontSize: "0.9rem", lineHeight: "1.6" }}>
              {w.summary || w.content[0]}
            </p>

            <div className="advisory-footer">
              <Link href={`/writeups/${w.slug}`} className="advisory-link primary-read">
                Read Full Advisory Details →
              </Link>
              {w.sourceUrl && (
                <a href={w.sourceUrl} target="_blank" rel="noopener noreferrer" className="advisory-link">
                  External Medium Writeup ↗
                </a>
              )}
            </div>
          </article>
        ))}

        {filteredWriteups.length === 0 && (
          <div className="cyber-panel" style={{ textAlign: "center", padding: "40px 20px" }}>
            <p style={{ color: "var(--text-muted)", fontSize: "0.95rem" }}>
              No advisory writeups matched your current search filters.
            </p>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="cyber-footer">
        <p>© 2026 SAGAR DAHAL. SECURITY ADVISORIES HUB.</p>
        <div style={{ marginTop: "12px", display: "flex", justifyContent: "center", gap: "20px" }}>
          <a href={INITIAL_SOCIALS.github} target="_blank" rel="noopener noreferrer">[GITHUB]</a>
          <a href={INITIAL_SOCIALS.linkedin} target="_blank" rel="noopener noreferrer">[LINKEDIN]</a>
          <a href={INITIAL_SOCIALS.medium} target="_blank" rel="noopener noreferrer">[MEDIUM]</a>
          <a href={`/${INITIAL_RESEARCHER_INFO.resume}`} target="_blank" rel="noopener noreferrer">[RESUME]</a>
        </div>
      </footer>
    </main>
  );
}
